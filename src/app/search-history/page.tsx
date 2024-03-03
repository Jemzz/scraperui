"use client";
import React from "react";
import FilterSearchHistory from "./Filter";
import SearchHistoryDetails from "./SearchHistory";

function SearchHistory() {
  return (
    <div>
      <FilterSearchHistory />
      <SearchHistoryDetails />
    </div>
  );
}

export default SearchHistory;
