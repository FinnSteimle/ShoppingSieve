import { useState } from "react";
import type { Category } from "../types/types"
import { CategoryDetailView } from "./CategoryDetailView";

export function FilterSelection() {
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
    <>
      <fieldset>
        <legend>Select all ingredients from a category or click the right arrow for more detailed options</legend>
        {categories.map(cat => {
          return (
            <div>
              <input type="checkbox" id={cat.name} name={cat.name} />
              <label htmlFor={cat.name}>{cat.name}</label>
              <button type="button" onClick={() => handleDetailViewButtonPress(cat)}>{"more"}</button>
              {expandedCategories.includes(cat.name) ? <CategoryDetailView /> : <></>}
            </div>
          )
        })}
      </fieldset>
    </>

  )
}
