const Filter = ({
  searchValue,
  onSearchChange,
  onClearSearchClick,
  // onSubmitClick,
  // submitType,
  onShowAllClick,
  showAll,
}) => {
  return (
    <div className="company-search-container">
      <div className="company-search-form">
        <input
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Hulu or Boston"
        />
        {/* <button onClick={onSubmitClick} type="submit">
          Search
        </button> */}
        <button onClick={onClearSearchClick}>Clear Filter</button>
        <button onClick={onShowAllClick}>
          Show {showAll ? "Priority Companies" : "All Companies"}
        </button>
      </div>
    </div>
  );
};

export default Filter;
