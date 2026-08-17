import { useState } from 'react';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import './App.css';

interface ProductData {
  productName: string;
  ingredients: string;
}

function App() {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (scannedBarcode: string) => {
    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      // Use relative path so Vite proxy handles SSL and CORS to backend localhost:5000
      const res = await fetch(`/api/product/${scannedBarcode}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Product not found (${res.status})`);
      }
      const data: ProductData = await res.json();
      setProduct(data);
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

  return (
    <div className="container">
      <header className="header">
        <h1>ShoppingSieve</h1>
        <p className="subtitle">Scan a food product barcode</p>
      </header>

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

        {product && (
          <div className="product-card">
            <h2>{product.productName}</h2>
            <h3>Ingredients</h3>
            <p>{product.ingredients}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
