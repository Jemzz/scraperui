import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Scraper() {
  interface SearchEngines {
    id: string;
    searchEngineName: string;
  }

  const [engines, setSearchEngines] = useState<BaseResponse<SearchEngines[]>>();
  const [searchEngine, setSelectedSearchEngine] = useState("Google");
  const [searchEngineId, setSelectedSearchEngineId] = useState("");
  const [searchEnginetext, setSelectedSearchText] = useState("");
  const [ranking, setRankings] = useState<BaseResponse<SearchRanking>>();
  const engineRef = React.useRef("");

  useEffect(() => {
    getSearchEnginesData();
  }, []);

  function handleSelectedEngine(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(searchEngine);
    setSelectedSearchEngine(e.target.selectedOptions[0].innerText);
    setSelectedSearchEngineId(e.target.selectedOptions[0].value);
  }

  return (
    <div className="mt-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="3">
            <select
              className="form-select"
              value={searchEngineId}
              onChange={handleSelectedEngine}
            >
              {engines !== undefined
                ? engines.data.map((x) => (
                    <option value={x.id}>{x.searchEngineName}</option>
                  ))
                : null}
            </select>
          </Col>
          <Col xs lg="4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search keywords"
                value={searchEnginetext}
                aria-describedby="basic-addon2"
                onChange={(e) => setSelectedSearchText(e.target.value)}
              />
              <span className="input-group-text" id="basic-addon2">
                {searchEngine}
              </span>
            </div>
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
      </Container>

      {ranking != null ? (
        <Row className="justify-content-md-center mt-4">
          <Col xs lg="10">
            <div className="p-3 mb-2 bg-success text-white">
              <div className="p-3 bg-warning text-dark">
                <h2>
                  The search for {ranking.data.searchText} on{" "}
                  {engineRef.current} showed of the first 100 records{" "}
                  <span>www.infotrack.co.uk</span> ranked at{" "}
                  {ranking.data.rankings.join(",")} position(s)
                </h2>
              </div>
            </div>
          </Col>
        </Row>
      ) : null}
    </div>
  );

  async function getSearchEnginesData() {
    const response = await fetch("https://localhost:7252/searchengines");
    const data = await response.json();
    console.log(data);
    setSearchEngines(data);
  }

  async function processSearchData() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchId: searchEngineId,
        searchText: searchEnginetext,
        pageSize: 100,
      }),
    };
    fetch("https://localhost:7252/rankings", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        engineRef.current = searchEngine;
        setRankings(data);
      });
  }
}

export default Scraper;
