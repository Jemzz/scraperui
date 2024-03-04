"use client";
import React, { useEffect, useState } from "react";
import SearchHistoryDetails from "./SearchHistory";
import { Col, Row } from "react-bootstrap";
import Constants from "../constants";

function SearchHistory() {
  const [searchHistory, setSearchHistory] =
    useState<BaseResponse<SearchHistory[]>>();
  const [engines, setSearchEngines] = useState<BaseResponse<SearchEngines[]>>();
  const [searchEngineId, setSelectedFilterSearchEngineId] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    getSearchHistory();
    getSearchEnginesData();
  }, []);

  return (
    <div>
      <form action={filter}>
        <Row className="mt-4 mb-4">
          <Col xs lg="3">
            <select
              className="form-select"
              value={searchEngineId}
              onChange={handleSelectedEngine}
            >
              <option>Select Engine</option>
              {engines !== undefined
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
            <button className="btn btn-success" type="submit">
              Filter
            </button>
          </Col>
        </Row>
      </form>
      {searchHistory != null ? (
        <SearchHistoryDetails history={searchHistory.data} />
      ) : null}
    </div>
  );

  function filter() {
    getSearchHistory();
  }

  function handleSelectedEngine(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setSelectedFilterSearchEngineId(e.target.value);
  }

  async function getSearchHistory() {
    const res = await fetch(
      `${Constants.BaseAddress}/searchHistory?searchText=${filterText}&searchId=${searchEngineId}`
    );

    const data = await res.json();
    console.log(data);
    setSearchHistory(data);
  }

  async function getSearchEnginesData() {
    const response = await fetch(`${Constants.BaseAddress}/searchengines`);
    const data = await response.json();
    console.log(data);
    setSearchEngines(data);
  }
}

export default SearchHistory;
