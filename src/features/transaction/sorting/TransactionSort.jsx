function TransactionSort({ sortBy, onSortByChange }) {
  return (
    <select value={sortBy} onChange={onSortByChange}>
      <option value="" disabled>
        Sort By
      </option>
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="highestAmount">Highest Amount</option>
      <option value="lowestAmount">Lowest Amount</option>
    </select>
  );
}

export default TransactionSort;
