import { useState } from "react";
import { FilterSelection } from "./FilterSelection";

export function Filter() {
  const [selectionMenuIsOpen, setSelectionMenuIsOpen] = useState<boolean>(false);

  const currentIngredientsToFilter: string[] = ["test", "dinkel"];
  return (
    <div>
      <h3>Current ingredients you filter for:</h3>
      <ul>
        {currentIngredientsToFilter.map((i: string) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setSelectionMenuIsOpen(prev => !prev)}>Add more things to filter</button>
      {selectionMenuIsOpen ? <FilterSelection /> : null }
    </div>
  )
}
