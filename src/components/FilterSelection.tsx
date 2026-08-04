import { useState, type Dispatch, type SetStateAction } from "react";
import type { Category } from "../types/types"
import { CategoryDetailView } from "./CategoryDetailView";

interface FilterSelectionProps {
  ingredientsToFilter: string[];
  setIngredientsToFilter: Dispatch<SetStateAction<string[]>>;
}

export function FilterSelection({ingredientsToFilter, setIngredientsToFilter}: FilterSelectionProps) {
  const categories: Category[] = [
    {
      name: "Getreide",
      ingredients: ['Weizen', 'Roggen', 'Urdinkel', 'Hafer', 'Mais', 'Reis', 'Quinoa', 'Gerste', 'Hirse', "Dinkel"]
    },
    {
      name: "Süssstoffe",
      ingredients: ["Aspartam (E951)", "Acesulfam K (E950)", "Sucralose (E955)", "Cyclamat (E952)", "Sorbit", "Xylit (Zuckeralkohole)"]
    }
  ]

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleCategoryCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: Category) => {
    if (e.target.checked) {
      // to do: catch bug where you can "readd" all elements if you select all via "category select"
      // and then deselect one ingredient individually and then "readd" all via category select again
      setIngredientsToFilter(prev => [...prev, ...category.ingredients]);
    }
    else {
      setIngredientsToFilter((prev: string[]) => [...prev].filter((ingredient: string) => !category.ingredients.includes(ingredient)));
    }
  }

  const handleDetailViewButtonPress = (category: Category) => {
    // minimize
    if (expandedCategories.includes(category.name)) {
      setExpandedCategories((prev: string[]) => [...prev].filter(categoryName => categoryName !== category.name));
    }
    // expand
    else {
      setExpandedCategories((prev: string[]) => [...prev, category.name]);
    }

  }

  return (
    <fieldset>
      <legend>Select all ingredients from a category or click the right arrow for more detailed options</legend>
      <ul>
      {categories.map(cat => {
        return (
          <li key={cat.name}>
            <input type="checkbox"
              id={cat.name}
              name={cat.name}
              checked={cat.ingredients.every(catIngredient => ingredientsToFilter.includes(catIngredient))}
              onChange={(e) => handleCategoryCheckboxChange(e, cat)}
            />
            <label htmlFor={cat.name}>{cat.name}</label>
            <button type="button" onClick={() => handleDetailViewButtonPress(cat)}>
              {expandedCategories.includes(cat.name) ? "less" : "more"}
            </button>
            {expandedCategories.includes(cat.name) ?
              <CategoryDetailView
              ingredients={cat.ingredients}
              ingredientsToFilter={ingredientsToFilter}
              setIngredientsToFilter={setIngredientsToFilter}
            /> : <></>}
          </li>
        );
      })}
      </ul>
    </fieldset>
  );
}
