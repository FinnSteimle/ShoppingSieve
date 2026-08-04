import { useState, type Dispatch, type SetStateAction } from "react";
import { FilterSelection } from "./FilterSelection";

interface FilterProps {
  ingredientsToFilter: string[];
  setIngredientsToFilter: Dispatch<SetStateAction<string[]>>;
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
      {selectionMenuIsOpen ? <FilterSelection ingredientsToFilter={ingredientsToFilter} setIngredientsToFilter={setIngredientsToFilter} /> : null }
    </div>
  )
}
