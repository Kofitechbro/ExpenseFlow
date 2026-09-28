function TransactionFilters({
  category,
  onCategoryChange,
  type,
  onTypeChange,
}) {
  return (
    <>
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
        <option value="Freelance">Freelance</option>
      </select>

      <select value={type} onChange={onTypeChange}>
        <option value="" disabled>
          Type
        </option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
    </>
  );
}

export default TransactionFilters;
