interface WatchlistFilterProps {
  presetAvoidedIngredients: string[];
  activeAvoidedIngredients: string[];
  onToggleAvoidedIngredient: (ingredient: string) => void;
}

export function WatchlistFilter({
  presetAvoidedIngredients,
  activeAvoidedIngredients,
  onToggleAvoidedIngredient,
}: WatchlistFilterProps) {
  return (
    <section className="filter-section">
      <div className="filter-header">
        <h3>Ingredients to Avoid</h3>
        <p className="filter-subtitle">Selected ingredients trigger a DANGER warning when scanned</p>
      </div>
      <div className="pills-grid">
        {presetAvoidedIngredients.map(ingredient => {
          const isAvoided = activeAvoidedIngredients.includes(ingredient);
          return (
            <button
              key={ingredient}
              type="button"
              className={`pill-btn ${isAvoided ? 'active' : ''}`}
              onClick={() => onToggleAvoidedIngredient(ingredient)}
            >
              {isAvoided ? `${ingredient}` : ingredient}
            </button>
          );
        })}
      </div>
    </section>
  );
}
