interface WatchlistFilterProps {
  presetIngredients: string[];
  selectedIngredients: string[];
  onToggleIngredient: (ingredient: string) => void;
}

export function WatchlistFilter({ presetIngredients, selectedIngredients, onToggleIngredient }: WatchlistFilterProps) {
  return (
    <section className="filter-section">
      <h3>Watchlist Ingredients</h3>
      <div className="pills-grid">
        {presetIngredients.map(ingredient => {
          const isActive = selectedIngredients.includes(ingredient);
          return (
            <button
              key={ingredient}
              type="button"
              className={`pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onToggleIngredient(ingredient)}
            >
              {ingredient}
            </button>
          );
        })}
      </div>
    </section>
  );
}
