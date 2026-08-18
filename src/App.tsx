import { CurrentProductIngredients } from "./components/CurrentProductIngredients";
import { Filter } from "./components/Filter/Filter";
import { CodeScanner } from "./components/CodeScanner";
import { useState } from "react";

function App() {
  const [ingredientsToFilter, setIngredientsToFilter] = useState<string[]>([]);

  return (
    <>
      <CodeScanner />
      <Filter
        ingredientsToFilter={ingredientsToFilter}
        setIngredientsToFilter={setIngredientsToFilter}
      />
      <CurrentProductIngredients />
    </>
  );
}

export default App;
