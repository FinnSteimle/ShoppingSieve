import { CurrentIngredients } from './components/CurrentIngredients';
import { Filter } from './components/Filter';
import { Scanner } from './components/Scanner';

// const PRESET_AVOIDED_INGREDIENTS = ['Weizen', 'Roggen', 'Urdinkel', 'Hafer', 'Mais', 'Reis', 'Quinoa', 'Gerste', 'Hirse', "Dinkel"];

function App() {
  return (
    <>
      <Scanner />
      <Filter />
      <CurrentIngredients />
    </>
  )
}

export default App;
