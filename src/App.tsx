import { useState } from 'react';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { WatchlistFilter } from './components/WatchlistFilter';
import './App.css';

const PRESET_AVOIDED_INGREDIENTS = ['Weizen', 'Roggen', 'Urdinkel', 'Hafer', 'Mais', 'Reis', 'Quinoa', 'Gerste', 'Hirse'];

export interface ProductData {
  productName: string;
  ingredientsText: string;
}

function App() {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeAvoidedIngredients, setActiveAvoidedIngredients] = useState<string[]>(PRESET_AVOIDED_INGREDIENTS);

  const isPaused = loading || product !== null || error !== null;

  const resetScan = () => {
    setBarcode(null);
    setProduct(null);
    setError(null);
  };

  const toggleAvoidedIngredient = (ingredient: string) => {
    setActiveAvoidedIngredients(prev =>
      prev.includes(ingredient) ? prev.filter(i => i !== ingredient) : [...prev, ingredient]
    );
  };

  const getDetectedAvoidedIngredients = (ingredientsText: string): string[] => {
    const textLower = ingredientsText.toLowerCase();
    return activeAvoidedIngredients.filter(ingredient => {
      return textLower.includes(ingredient.toLowerCase());
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

      const ingredientsText = productNode.ingredients_text_de
        || productNode.ingredients_text
        || productNode.ingredients_text_fr
        || productNode.ingredients_text_en
        || 'Ingredients list unavailable for this barcode.';

      setProduct({ productName, ingredientsText });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (isPaused) return;

    if (detectedCodes.length > 0) {
      const code = detectedCodes[0].rawValue;
      if (code) {
        setBarcode(code);
        fetchProduct(code);
      }
    }
  };

  const detectedAvoidedIngredients = product ? getDetectedAvoidedIngredients(product.ingredientsText) : [];
  const isSafe = product ? detectedAvoidedIngredients.length === 0 : false;

  return (
    <div className="container">
      <header className="header">
        <h1>ShoppingSieve</h1>
        <p className="subtitle">Scan a food product barcode</p>
      </header>

      {/* Main Camera & Controls Area */}
      <main className="main">
        <div className={`scanner-wrapper ${isPaused && product ? (isSafe ? 'safe-border' : 'danger-border') : ''}`}>
          <Scanner
            onScan={handleScan}
            onError={(err) => console.error(err)}
            paused={isPaused}
            scanDelay={500}
            formats={['ean_13', 'ean_8', 'qr_code']}
            components={{ finder: false, torch: true }}
          />

          {/* Loading Overlay */}
          {loading && (
            <div className="scanner-overlay loading-overlay">
              <span className="overlay-status-title">SCANNING...</span>
              <p className="overlay-subtext">Fetching product ingredients</p>
            </div>
          )}

          {/* Result / Error Overlay */}
          {isPaused && !loading && (
            <div
              className={`scanner-overlay ${error || !isSafe ? 'danger-overlay' : 'safe-overlay'}`}
              onClick={resetScan}
            >
              <div className="overlay-content">
                <span className="overlay-status-title">
                  {error ? 'NOT FOUND' : (isSafe ? 'SAFE' : 'DANGER!')}
                </span>

                {product && (
                  <p className="overlay-product-name">{product.productName}</p>
                )}

                {barcode && <span className="overlay-barcode-tag">EAN: {barcode}</span>}

                {product && !isSafe && (
                  <p className="overlay-danger-list">Contains: {detectedAvoidedIngredients.join(', ')}</p>
                )}

                {error && <p className="overlay-subtext">{error}</p>}

                <button type="button" className="huge-scan-again-btn" onClick={resetScan}>
                  SCAN AGAIN! ↻
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Watchlist Filter */}
        <WatchlistFilter
          presetAvoidedIngredients={PRESET_AVOIDED_INGREDIENTS}
          activeAvoidedIngredients={activeAvoidedIngredients}
          onToggleAvoidedIngredient={toggleAvoidedIngredient}
        />

        {/* Full Ingredients List */}
        <div className="ingredients-card">
          <h3>Scanned Product Ingredients</h3>
          <p className="ingredients-text">
            {product ? product.ingredientsText : 'Scan a product barcode to view ingredients list.'}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
