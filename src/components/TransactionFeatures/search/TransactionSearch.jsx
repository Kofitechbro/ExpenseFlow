function TransactionSearch({ search, onSearchChange }) {
  return (
    <input
      type="text"
      name="search"
      value={search}
      onChange={onSearchChange}
      placeholder="Search transaction"
    />
  );
}

export default TransactionSearch;
