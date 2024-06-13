import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const DinamicDataTableWithFilter = (params) => {
  const {
    columnsData,
    data,
    expandableRowsValue,
    expandableRowsComponent,
    title,
    filterParam,
  } = params;

  const [filteredData, setFilteredData] = useState(data);
  const [filterField, setFilterField] = useState("");

  useEffect(() => {
    if (data && data.length !== 0) {
      setFilteredData(
        data.filter((e) =>
          e[filterParam]?.toLowerCase().includes(filterField.toLowerCase())
        )
      );
    }
  }, [data, filteredData, filterField, filterParam]);

  return (
    <Stack
      sx={{
        margin: "15px",
        padding: "15px",
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: "5px",
        borderWidth: "1px",
      }}
      alignItems="center"
      spacing={2}
    >
      <TextField
        type="text"
        size="small"
        label="Buscar"
        onChange={(e) => setFilterField(e.target.value)}
        value={filterField}
      />
      <DataTable
        data={filteredData}
        columns={columnsData}
        title={title}
        fixedHeader
        pagination
        expandableRows={expandableRowsValue || false}
        expandableRowsComponent={expandableRowsComponent}
      />
    </Stack>
  );
};

export default DinamicDataTableWithFilter;
