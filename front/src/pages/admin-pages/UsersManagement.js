import { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import DinamicDataTableWithFilter from "../../components/DinamicDataTableWithFilter";
import { Grid, Typography } from "@mui/material";
import { AuditorManagement } from "../../components/expandableRowsComponents";
import { adminGetAuditorsColumnsFormat } from "../../utils/columns";
import { defaultPieDatasetConfig } from "../../utils/env";
import { Pie } from "react-chartjs-2";

export const UsersManagement = () => {
  const [auditors, setAuditors] = useState([]);
  const [chartsData, setChartsData] = useState({
    totalAuditors: auditors.length,
    activeAuditors: 0,
  });
  useEffect(() => {
    const fetchAuditors = async () => {
      try {
        const response = await axios.get("/auditors");
        setAuditors(response.data);
      } catch (error) {
        console.error("Error fetching auditors:", error);
      }
    };
    fetchAuditors();
    setChartsData((prev) => {
      return {
        ...prev,
        totalAuditors: auditors.length,
        activeAuditors: auditors.filter((e) => e.is_active === 1).length,
      };
    });
  }, [auditors]);
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Gestión de auditores</Typography>
      </Grid>
      <Grid container item xs={3} spacing={2}>
        <Grid item xs={12}>
          <strong>Usuarios utilizados</strong>
          <div>Total: {chartsData.totalAuditors}</div>
          <Pie
            data={{
              labels: ["Activos", "Inactivos"],
              datasets: [
                {
                  label: "Usuarios",
                  data: [
                    chartsData.activeAuditors,
                    chartsData.totalAuditors - chartsData.activeAuditors,
                  ],
                  ...defaultPieDatasetConfig,
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={12}>
          Dash 2
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <DinamicDataTableWithFilter
          data={auditors}
          columnsData={adminGetAuditorsColumnsFormat}
          expandableRowsComponent={AuditorManagement}
          expandableRowsValue={true}
          title="Auditores activos"
          filterParam="name"
        />
      </Grid>
    </>
  );
};
