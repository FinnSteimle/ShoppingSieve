import type { Category } from "../types/types"

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

  return (
    <>
      <h2>FilterSelection</h2>
      <></>
    </>

  )
}
