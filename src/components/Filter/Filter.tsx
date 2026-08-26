import { type Dispatch, type SetStateAction } from "react";
import { CategoryList } from "./CategoryList";
import { Card } from "../Card";

import styles from "./Filter.module.css";

interface FilterProps {
  ingredientsToFilter: string[];
  setIngredientsToFilter: Dispatch<SetStateAction<string[]>>;
}

export function Filter({ ingredientsToFilter, setIngredientsToFilter }: FilterProps) {
  return (
    <Card>
      <div className={styles.filteredIngredientsOuterContainer}>
        <div>
          <h2 className={styles.title}>Ingredients to avoid</h2>
          <p className={styles.subtitle}>Selected ingredients trigger a DANGER warning when scanned</p>
        </div>
        <ul className={styles.filteredIngredientsList}>
          {ingredientsToFilter.map((i: string) => (
            <div className={styles.filteredIngredient}>
              <li key={i}>{i}</li>
            </div>
          ))}
        </ul>
      </div>
      <CategoryList
        ingredientsToFilter={ingredientsToFilter}
        setIngredientsToFilter={setIngredientsToFilter}
      />
    </Card>
  );
}
