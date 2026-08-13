import { CurrentProductIngredients } from './components/CurrentProductIngredients';
import { Filter } from './components/Filter/Filter';
import { CodeScanner } from './components/CodeScanner';
import { useState } from 'react';

// const PRESET_AVOIDED_INGREDIENTS = ['Weizen', 'Roggen', 'Urdinkel', 'Hafer', 'Mais', 'Reis', 'Quinoa', 'Gerste', 'Hirse', "Dinkel"];

function App() {
  const [ingredientsToFilter, setIngredientsToFilter] = useState<string[]>([]);

  return (
    <>
      <CodeScanner />
      <Filter ingredientsToFilter={ingredientsToFilter} setIngredientsToFilter={setIngredientsToFilter} />
      <CurrentProductIngredients />
    </>
  )
}

export default App;
