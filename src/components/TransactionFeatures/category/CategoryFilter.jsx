function CategoryFilter({ category, onCategoryChange }) {
  return (
    <select value={category} onChange={onCategoryChange}>
      <option value="" disabled>
        Select a Category
      </option>
      <option value="Health">Health</option>
      <option value="Food & Drinks">Food & Drinks</option>
      <option value="Transportation">Transportation</option>
      <option value="Shopping">Shopping</option>
      <option value="Bills & Utilities">Bills & Utilities</option>
      <option value="Salary">Salary</option>
      <option value="Gift">Gift</option>
      <option value="Freelance">Freelance</option>
    </select>
  );
}

export default CategoryFilter;
