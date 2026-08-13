import { useState, type Dispatch, type SetStateAction } from "react";
import type { Category } from "../../types/types"
import { CategoryIngredients } from "./CategoryIngredients";

import styles from "./CategoryList.module.css";

interface CategoryListProps {
  ingredientsToFilter: string[];
  setIngredientsToFilter: Dispatch<SetStateAction<string[]>>;
}

export function CategoryList({ ingredientsToFilter, setIngredientsToFilter }: CategoryListProps) {
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

  const [isCategoryListOpen, setIsCategoryListOpen] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleCategoryCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: Category) => {
    if (e.target.checked) {
      setIngredientsToFilter((prev: string[]) => [...prev.filter((ingredient: string) => !category.ingredients.includes(ingredient)), ...category.ingredients]);
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
      <ul className={styles.ingredientCategories}>
        <li>
          <button type="button" onClick={() => setIsCategoryListOpen(prev => !prev)}>
            {isCategoryListOpen ? "-" : "+"}
          </button>
        </li>
      {isCategoryListOpen ? categories.map(cat => {
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
              {expandedCategories.includes(cat.name) ? "-" : "+"}
            </button>
            {expandedCategories.includes(cat.name) ?
              <CategoryIngredients
              ingredients={cat.ingredients}
              ingredientsToFilter={ingredientsToFilter}
              setIngredientsToFilter={setIngredientsToFilter}
            /> : null}
          </li>
        );
      }) : null}
      </ul>
    </fieldset>
  );
}
