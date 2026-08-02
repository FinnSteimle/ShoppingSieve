import { useState } from "react";
import type { Category } from "../types/types"
import { CategoryDetailView } from "./CategoryDetailView";

interface FilterSelectionProps {
  setIngredientsToFilter: (set: Set<string>) => void;
}

export function FilterSelection({setIngredientsToFilter}: FilterSelectionProps) {
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
  const [expandButtonText, setExpandButtonText] = useState<string>("more");

  // to do
  // const handleCategoryCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.target.checked
  // }

  const handleDetailViewButtonPress = (category: Category) => {
    // minimize
    if (expandedCategories.includes(category.name)) {
      setExpandedCategories((prev: string[]) => [...prev].filter(categoryName => categoryName !== category.name));
      setExpandButtonText("more");
    }
    // expand
    else {
      setExpandedCategories((prev: string[]) => [...prev, category.name]);
      setExpandButtonText("less");
    }

  }

  return (
    <fieldset>
      <legend>Select all ingredients from a category or click the right arrow for more detailed options</legend>
      <ul>
      {categories.map(cat => {
        return (
          <li key={cat.name}>
            <input type="checkbox" id={cat.name} name={cat.name} />
            <label htmlFor={cat.name}>{cat.name}</label>
            <button type="button" onClick={() => handleDetailViewButtonPress(cat)}>{expandButtonText}</button>
            {expandedCategories.includes(cat.name) ? <CategoryDetailView ingredients={cat.ingredients}/> : <></>}
          </li>
        );
      })}
      </ul>
    </fieldset>
  );
}
