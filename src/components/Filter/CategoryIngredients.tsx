import type { Dispatch, SetStateAction } from 'react';

interface CategoryIngredientsProps {
  ingredients: string[];
  ingredientsToFilter: string[];
  setIngredientsToFilter: Dispatch<SetStateAction<string[]>>;
}

export function CategoryIngredients({ ingredients, ingredientsToFilter, setIngredientsToFilter }: CategoryIngredientsProps) {

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIngredientsToFilter((prev: string[]) => [...prev, e.target.name]);
    }
    else {
      setIngredientsToFilter((prev: string[]) => [...prev].filter((ingredient: string) => e.target.name !== ingredient));
    }
  }
  return (
    <fieldset>
      <ul >
        {ingredients.map(ing => {
          return (
            <li key={ing}>
              <input type="checkbox"
                id={ing}
                name={ing}
                checked={ingredientsToFilter.includes(ing)}
                onChange={(e) => handleCheckboxChange(e)}
              />
              <label htmlFor={ing}>{ing}</label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
