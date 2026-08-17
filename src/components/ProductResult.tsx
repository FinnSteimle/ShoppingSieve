export interface ProductData {
  productName: string;
  ingredients: string;
}

interface ProductResultProps {
  product: ProductData;
  flaggedGrains: string[];
}

export function ProductResult({ product, flaggedGrains }: ProductResultProps) {
  const isSafe = flaggedGrains.length === 0;

  return (
    <div className="product-card">
      <div className={`safety-banner ${isSafe ? 'safe' : 'danger'}`}>
        <span className="safety-title">{isSafe ? 'SAFE' : 'DANGER!'}</span>
        <p className="safety-desc">
          {isSafe
            ? 'None of your active watchlist ingredients were found.'
            : `Contains: ${flaggedGrains.join(', ')}`}
        </p>
      </div>

      <h2>{product.productName}</h2>
      <h3>Full Ingredients List</h3>
      <p className="ingredients-text">{product.ingredients}</p>
    </div>
  );
}
