import { useState } from "react";
import { FilterSelection } from "./FilterSelection";

interface FilterProps {
  ingredientsToFilter: string[];
  setIngredientsToFilter: (set: Set<string>) => void;
}

export function Filter({ ingredientsToFilter, setIngredientsToFilter }: FilterProps) {
  const [selectionMenuIsOpen, setSelectionMenuIsOpen] = useState<boolean>(false);
  return (
    <div>
      <h3>Current ingredients you filter for:</h3>
      <ul>
        {ingredientsToFilter.map((i: string) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setSelectionMenuIsOpen(prev => !prev)}>Add more things to filter</button>
      {selectionMenuIsOpen ? <FilterSelection setIngredientsToFilter={setIngredientsToFilter} /> : null }
    </div>
  )
}
