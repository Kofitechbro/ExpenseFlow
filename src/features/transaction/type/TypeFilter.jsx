function TypeFilter({ type, onTypeChange }) {
  return (
    <select value={type} onChange={onTypeChange}>
      <option value="" disabled>
        Type
      </option>
      <option value="Income">Income</option>
      <option value="Expense">Expense</option>
    </select>
  );
}

export default TypeFilter;
