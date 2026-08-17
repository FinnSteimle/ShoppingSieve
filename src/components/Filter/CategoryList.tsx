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
    },
    {
      name: "Milchprodukte",
      ingredients: ["Milch", "Milchpulver", "Laktose", "Molke", "Molkenpulver", "Kasein", "Rahm", "Sahne", "Butter", "Milchfett", "Buttermilch"]
    },
    {
      name: "Nüsse",
      ingredients: ["Mandeln", "Haselnüsse", "Walnüsse", "Cashewkerne", "Pistazien", "Macadamianüsse", "Paranüsse", "Pekannüsse"]
    },
    {
      name: "Eier",
      ingredients: ["Ei", "Eigelb", "Eiklar", "Eipulver", "Vollei", "Lysozym (E1105)"]
    },
    {
      name: "Soja",
      ingredients: ["Soja", "Sojalecithin (E322)", "Sojaprotein", "Sojamehl"]
    },
    {
      name: "Konservierungsstoffe",
      ingredients: ["Sorbinsäure (E200)", "Kaliumsorbat (E202)", "Natriumbenzoat (E211)", "Benzoesäure (E210)", "Schwefeldioxid (E220)", "Sulfite (E221-228)", "Natriumnitrit (E250)", "Kaliumnitrat (E252)"]
    },
    {
      name: "Farbstoffe",
      ingredients: ["Tartrazin (E102)", "Cochenille (E120)", "Azorubin (E122)", "Kurkumin (E100)", "Beta-Carotin (E160a)", "Titandioxid (E171)"]
    },
    {
      name: "Geschmacksverstärker",
      ingredients: ["Mononatriumglutamat (E621)", "Dinatriuminosinat (E631)", "Dinatriumguanylat (E627)", "Kaliumglutamat (E622)"]
    },
    {
      name: "Emulgatoren/Verdickungsmittel",
      ingredients: ["Lecithin (E322)", "Mono- und Diglyceride (E471)", "Carrageen (E407)", "Guarkernmehl (E412)", "Xanthan (E415)", "Johannisbrotkernmehl (E410)"]
    },
    {
      name: "Fisch & Meeresfrüchte",
      ingredients: ["Fisch", "Fischöl", "Krustentiere", "Weichtiere", "Fischgelatine"]
    },
    {
      name: "Sonstige EU-Allergene",
      ingredients: ["Sellerie", "Senf", "Sesam", "Lupinen", "Erdnüsse"]
    },
    {
      name: "Palm-/Härtungsfette",
      ingredients: ["Palmöl", "Palmfett", "gehärtetes Pflanzenfett", "Transfette"]
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
    <fieldset className={styles.categoryListContainer}>
      <ul className={styles.categoryList}>
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
