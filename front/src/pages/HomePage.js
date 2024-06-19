import { Bar, Line, Pie } from "react-chartjs-2";
import { Grid, Paper, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { defaultPieDatasetConfig } from "../utils/env";
const HomePage = () => {
  const { user } = useAuth();
  const { type } = user;

  const barData = {
    labels: ["Auditor 1", "Auditor 2", "Auditor 3", "Auditor 4", "Auditor 5"],
    datasets: [
      {
        label: "dataset1",
        data: [12, 8, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    datasets: [
      {
        label: "Nro. de recomendaciones",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ["Sin asignar", "En proceso", "Finalizadas"],
    datasets: [
      {
        label: "# of Votes",
        data: [3, 7, 3],
        ...defaultPieDatasetConfig,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {type} Dashboard
      </Typography>
      <Grid alignItems="center" container spacing={3}>
        <Grid item md={7} container spacing={3}>
          <Grid item xs={12} md={12}>
            <Paper>
              <Typography variant="h6" component="h2" gutterBottom>
                Seguimiento al cumplimiento de recomendaciones
              </Typography>
              <Line data={lineData} />
            </Paper>
          </Grid>
          <Grid item xs={4} md={12}>
            <Paper>
              <Typography variant="h6" component="h2" gutterBottom>
                Actividades asignadas
              </Typography>
              <Bar data={barData} options={options} />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper>
            <Typography variant="h6" component="h2" gutterBottom>
              Actividades de auditoría en curso
            </Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default HomePage;
