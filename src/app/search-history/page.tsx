"use client";
import React, { useEffect, useState } from "react";
import SearchHistoryDetails from "./SearchHistory";
import { Col, Row } from "react-bootstrap";
import Constants from "../constants";
import useFetchData from "../effects/useFetchData";

function SearchHistory() {
  const [searchEngineId, setSelectedFilterSearchEngineId] = useState("");
  const [filterText, setFilterText] = useState("");

  const {
    data: searchHistory,
    error: searchHistoryError,
    fetchData: fetchHistory,
  } = useFetchData<BaseResponse<SearchHistory[]>>(() =>
    fetchDataFromApi(
      `${Constants.BaseAddress}/searchHistory?searchText=${filterText}&searchId=${searchEngineId}`
    )
  );

  const { data: engines } = useFetchData<BaseResponse<SearchEngines[]>>(() =>
    fetchDataFromApi(`${Constants.BaseAddress}/searchengines`)
  );

  const fetchDataFromApi = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return await response.json();
  };

  const handleSearchHistoryFetch = async () => {
    fetchHistory(); // Trigger data fetching for API 2 on button click
  };

  return (
    <div>
      {/* <form action={filter}> */}
      <Row className="mt-4 mb-4">
        <Col xs lg="3">
          <select
            className="form-select"
            value={searchEngineId}
            onChange={handleSelectedEngine}
          >
            <option value="">Select Engine</option>
            {engines !== null
              ? engines.data.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.searchEngineName}
                  </option>
                ))
              : null}
          </select>
        </Col>
        <Col xs lg="3">
          <input
            id="keyword"
            className="form-control"
            placeholder="Keyword"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Col>
        <Col xs lg="3">
          <button
            className="btn btn-success"
            onClick={handleSearchHistoryFetch}
          >
            Filter
          </button>
        </Col>
      </Row>
      {searchHistory != null ? (
        <SearchHistoryDetails history={searchHistory!.data} />
      ) : null}
      {searchHistoryError != null ? <p>{searchHistoryError.message}</p> : null}
    </div>
  );

  function handleSelectedEngine(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setSelectedFilterSearchEngineId(e.target.value);
  }
}

export default SearchHistory;
