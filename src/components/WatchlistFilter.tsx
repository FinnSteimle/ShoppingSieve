interface WatchlistFilterProps {
  presetGrains: string[];
  selectedGrains: string[];
  onToggleGrain: (grain: string) => void;
}

export function WatchlistFilter({ presetGrains, selectedGrains, onToggleGrain }: WatchlistFilterProps) {
  return (
    <section className="filter-section">
      <h3>Watchlist Ingredients</h3>
      <div className="pills-grid">
        {presetGrains.map(grain => {
          const isActive = selectedGrains.includes(grain);
          return (
            <button
              key={grain}
              type="button"
              className={`pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onToggleGrain(grain)}
            >
              {grain}
            </button>
          );
        })}
      </div>
    </section>
  );
}
