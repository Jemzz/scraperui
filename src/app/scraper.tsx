import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Constants from "./constants";

function Scraper() {
  const [engines, setSearchEngines] = useState<BaseResponse<SearchEngines[]>>();
  const [searchEngine, setSelectedSearchEngine] = useState("Select Engine");
  const [searchEngineId, setSelectedSearchEngineId] = useState("");
  const [searchEnginetext, setSelectedSearchText] = useState("");
  const [DropDownisValid, setDropdownIsValid] = useState(true);
  const [KeywordisValid, setKeywordIsValid] = useState(true);
  const [ranking, setRankings] = useState<BaseResponse<SearchRanking>>();
  const engineRef = React.useRef("");

  useEffect(() => {
    getSearchEnginesData();
  }, []);

  return (
    <div className="mt-5">
      {/* <Container> */}
      <Row className="justify-content-md-center">
        <Col xs lg="3">
          <select
            className="form-select mb-2"
            value={searchEngineId}
            onChange={handleSelectedEngine}
          >
            <option value="">Select Engine</option>
            {engines !== undefined
              ? engines.data.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.searchEngineName}
                  </option>
                ))
              : null}
          </select>
          {!DropDownisValid ? (
            <p className="text-danger">Select Search engine</p>
          ) : null}
        </Col>
        <Col xs lg="4">
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search keywords"
              value={searchEnginetext}
              aria-describedby="basic-addon2"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="input-group-text" id="basic-addon2">
              {searchEngine}
            </span>
          </div>

          {!KeywordisValid ? (
            <p className="text-danger">Enter Keyword</p>
          ) : null}
        </Col>

        <Col xs lg="2">
          <button
            className="btn btn-success"
            onClick={() => processSearchData()}
          >
            Get rankings
          </button>
        </Col>
      </Row>
      {/* </Container> */}

      {ranking != null ? (
        <Row className="justify-content-md-center mt-4">
          <Col xs lg="10">
            <div className="p-3 mb-2 bg-success text-white">
              <div className="p-3 bg-light text-dark">
                <h2>
                  The search for{" "}
                  <span className="text-danger">
                    "{ranking.data.searchText}"
                  </span>{" "}
                  on {engineRef.current} showed of the first 100 records{" "}
                  <span className="text-danger">www.infotrack.co.uk</span>{" "}
                  ranked at {ranking.data.rankings.join(",")} position(s).
                </h2>
              </div>
            </div>
          </Col>
        </Row>
      ) : null}
    </div>
  );

  function handleSelectedEngine(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setSelectedSearchEngine(e.target.selectedOptions[0].innerText);
    setSelectedSearchEngineId(e.target.value);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    return setSelectedSearchText(e.target.value);
  }

  async function getSearchEnginesData() {
    const response = await fetch(`${Constants.BaseAddress}/searchengines`);
    const data = await response.json();
    console.log(data);
    setSearchEngines(data);
  }

  async function processSearchData() {
    console.log(searchEngineId);
    if (searchEngineId !== "") {
      setDropdownIsValid(true);
    } else {
      setDropdownIsValid(false);
      return;
    }

    if (searchEnginetext !== "") {
      setKeywordIsValid(true);
    } else {
      setKeywordIsValid(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchId: searchEngineId,
        searchText: searchEnginetext,
        pageSize: 100,
      }),
    };

    await fetch(`${Constants.BaseAddress}/rankings`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        engineRef.current = searchEngine;
        setRankings(data);
      });
  }
}

export default Scraper;
