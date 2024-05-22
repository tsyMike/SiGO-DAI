import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";

import { Box, TextField } from "@mui/material";

const DataTableWithFilter = ({ title, activities, columns, expandableRowsComponent }) => {
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [filterField, setFilterField] = useState("");
  useEffect(() => {
    if (activities) {
      setFilteredActivities(
        activities.filter((e) =>
          e.activity_name
            .toLowerCase()
            .includes(filterField.toLowerCase() || "")
        )
      );
    }
    
  }, [filterField, activities]);
  return (
    <Box>
      <TextField
        type="Text"
        value={filterField}
        onChange={(e) => setFilterField(e.target.value)}
        size="small"
        label="Buscar"
      />
      <DataTable
        data={filteredActivities}
        columns={columns}
        title={title}
        fixedHeader
        pagination
        expandableRows
        expandableRowsComponent={expandableRowsComponent}
      />
    </Box>
  );
};

export default DataTableWithFilter;
