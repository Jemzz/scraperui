"use client";

import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

type HistoryProps = {
  history: SearchHistory[];
};

function SearchHistoryDetails(props: HistoryProps) {
  const columns: TableColumn<SearchHistory>[] = [
    {
      name: "Key words",
      selector: (row) => row.searchText,
      sortable: true,
      width: "200px",
    },
    {
      name: "Rankings",
      selector: (row) => row.rankings,
      sortable: true,
      width: "150px",
    },
    {
      name: "Search Engine Name",
      selector: (row) => row.searchEngineName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Url",
      selector: (row) => row.url,
      sortable: true,
    },
    {
      name: "SearchDate",
      selector: (row) => new Date(row.searchDate).toDateString(),
      sortable: true,
      width: "150px",
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        pagination
        data={props.history}
        defaultSortFieldId={1}
      />
    </div>
  );
}

export default SearchHistoryDetails;
