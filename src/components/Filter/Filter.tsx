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
      <h3>Current ingredients you filter for:</h3>
      <ul className={styles.categoryList}>
        {ingredientsToFilter.map((i: string) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <CategoryList
        ingredientsToFilter={ingredientsToFilter}
        setIngredientsToFilter={setIngredientsToFilter}
      />
    </Card>
  );
}
