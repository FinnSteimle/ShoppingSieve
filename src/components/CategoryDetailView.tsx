interface CategoryDetailViewProps {
  ingredients: string[];
}

export function CategoryDetailView({ingredients}: CategoryDetailViewProps) {
  return (
    <fieldset>
      <ul>
        {ingredients.map(ing => {
          return (
            <li key={ing}>
              <input type="checkbox" id={ing} name={ing} />
              <label htmlFor={ing}>{ing}</label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
