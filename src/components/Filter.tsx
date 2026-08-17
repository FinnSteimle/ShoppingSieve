import { useState, type Dispatch, type SetStateAction } from "react";
import { FilterSelection } from "./FilterSelection";

import styles from "./Filter.module.css";

interface FilterProps {
  ingredientsToFilter: string[];
  setIngredientsToFilter: Dispatch<SetStateAction<string[]>>;
}

export function Filter({ ingredientsToFilter, setIngredientsToFilter }: FilterProps) {
  const [selectionMenuIsOpen, setSelectionMenuIsOpen] = useState<boolean>(false);
  return (
    <div>
      <h3>Current ingredients you filter for:</h3>
      <ul className={styles.ingredientsToFilterList}>
        {ingredientsToFilter.map((i: string) => (
          <li key={i}>{i}</li>
        ))}
        <li>
          <button className={styles.filterSelectionButton} type="button" onClick={() => setSelectionMenuIsOpen(prev => !prev)}>+</button>
        </li>
      </ul>
      <div className={styles.filterSelectionMenuContainer}>
        {selectionMenuIsOpen ? <FilterSelection ingredientsToFilter={ingredientsToFilter} setIngredientsToFilter={setIngredientsToFilter} /> : null}
      </div>
    </div>
  )
}
