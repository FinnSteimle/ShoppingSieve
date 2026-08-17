import { useState } from 'react';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { WatchlistFilter } from './components/WatchlistFilter';
import { ProductResult, type ProductData } from './components/ProductResult';
import './App.css';

const PRESET_GRAINS = ['Weizen', 'Roggen', 'Urdinkel', 'Hafer', 'Mais', 'Reis', 'Quinoa', 'Gerste', 'Hirse'];

function App() {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGrains, setSelectedGrains] = useState<string[]>(PRESET_GRAINS);

  const toggleGrain = (grain: string) => {
    setSelectedGrains(prev =>
      prev.includes(grain) ? prev.filter(g => g !== grain) : [...prev, grain]
    );
  };

  const getDetectedFlaggedGrains = (ingredientsText: string): string[] => {
    const textLower = ingredientsText.toLowerCase();
    return selectedGrains.filter(grain => {
      const grainLower = grain.toLowerCase();
      if (grainLower === 'urdinkel') {
        return textLower.includes('urdinkel') || textLower.includes('dinkel');
      }
      return textLower.includes(grainLower);
    });
  };

  const fetchProduct = async (scannedBarcode: string) => {
    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      let res = await fetch(`https://ch.openfoodfacts.org/api/v0/product/${scannedBarcode}.json`);
      if (!res.ok) {
        res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${scannedBarcode}.json`);
      }

      if (!res.ok) {
        throw new Error(`Product lookup failed (HTTP ${res.status})`);
      }

      const json = await res.json();
      if ((json.status ?? 0) !== 1 || !json.product) {
        throw new Error(`Product not found for barcode ${scannedBarcode}`);
      }

      const productNode = json.product;
      let productName = productNode.product_name_de
        || productNode.product_name
        || productNode.product_name_en
        || productNode.abbreviated_product_name
        || 'Unknown Product';

      const brand = productNode.brands || '';
      if (brand && !productName.toLowerCase().includes(brand.toLowerCase())) {
        productName = `${brand} - ${productName}`;
      }

      const ingredients = productNode.ingredients_text_de
        || productNode.ingredients_text
        || productNode.ingredients_text_fr
        || productNode.ingredients_text_en
        || 'Ingredients list unavailable for this barcode.';

      setProduct({ productName, ingredients });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const code = detectedCodes[0].rawValue;
      if (code && code !== barcode) {
        setBarcode(code);
        fetchProduct(code);
      }
    }
  };

  const flaggedGrains = product ? getDetectedFlaggedGrains(product.ingredients) : [];

  return (
    <div className="container">
      <header className="header">
        <h1>ShoppingSieve</h1>
        <p className="subtitle">Scan a food product barcode</p>
      </header>

      <WatchlistFilter
        presetGrains={PRESET_GRAINS}
        selectedGrains={selectedGrains}
        onToggleGrain={toggleGrain}
      />

      <main className="main">
        <div className="scanner-wrapper">
          <Scanner
            onScan={handleScan}
            onError={(err) => console.error(err)}
            formats={['ean_13', 'ean_8', 'qr_code']}
          />
        </div>

        {barcode && <div className="barcode-badge">Scanned EAN: <strong>{barcode}</strong></div>}
        {loading && <div className="status-card">Fetching ingredients...</div>}
        {error && <div className="status-card error-card">{error}</div>}
        {product && <ProductResult product={product} flaggedGrains={flaggedGrains} />}
      </main>
    </div>
  );
}

export default App;
