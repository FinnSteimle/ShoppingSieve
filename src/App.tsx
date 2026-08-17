import { CurrentProductIngredients } from './components/CurrentProductIngredients';
import { Filter } from './components/Filter';
import { CodeScanner } from './components/CodeScanner';

// const PRESET_AVOIDED_INGREDIENTS = ['Weizen', 'Roggen', 'Urdinkel', 'Hafer', 'Mais', 'Reis', 'Quinoa', 'Gerste', 'Hirse', "Dinkel"];

function App() {
  return (
    <>
      <CodeScanner />
      <Filter />
      <CurrentProductIngredients />
    </>
  )
}

export default App;
