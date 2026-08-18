import { CurrentProductIngredients } from "./components/CurrentProductIngredients";
import { Filter } from "./components/Filter/Filter";
import { CodeScanner } from "./components/CodeScanner";
import { useState } from "react";

import styles from "./App.module.css";

function App() {
  const [ingredientsToFilter, setIngredientsToFilter] = useState<string[]>([]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.placeholder}></div>
      <div className={styles.componentContainer}>
        <CodeScanner />
        <Filter
          ingredientsToFilter={ingredientsToFilter}
          setIngredientsToFilter={setIngredientsToFilter}
        />
        <CurrentProductIngredients />
      </div>
      <div className={styles.placeholder}></div>
    </div>
  );
}

export default App;
