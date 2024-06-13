import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import RegisterMemorandum from "./admin-components/activities-management/RegisterMemorandum";
import { ModifiyActivity } from "./admin-components/activities-management/ModifyActivity";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import axios from "../api/axiosConfig";
import MemorandumCard from "./user-components/assigned-activity/MemorandumCard";
import DynamicAssignReports from "./user-components/assigned-activity/DynamicAssignReports";
import { AllReportsAssigned } from "./user-components/assigned-activity/AllReportsAssigned";
import { AllObservationsAssigned } from "./user-components/assigned-reports/AllObservationsAssigned";
import { AssingObservations } from "./user-components/assigned-reports/AssingObservations";
export const ActivityManagement = ({ data }) => {
  const { id_activity } = data;
  const [page, setPage] = useState(0);
  return (
    <Stack sx={{ my: 3 }} alignItems="center" spacing={3}>
      <BottomNavigation
        showLabels
        value={page}
        onChange={(event, newValue) => {
          setPage(newValue);
        }}
      >
        <BottomNavigationAction
          label="Modificar"
          icon={<AssignmentIcon size="small" />}
        />
        <BottomNavigationAction
          label="Asignar"
          icon={<EditIcon size="small" />}
        />
      </BottomNavigation>
      <Container>
        {page === 0 ? (
          <>
            <ModifiyActivity data={data} />
          </>
        ) : page === 1 ? (
          <>
            <RegisterMemorandum id_activity={id_activity} />
          </>
        ) : (
          <></>
        )}
      </Container>
    </Stack>
  );
};
export const AuditorManagement = ({ data }) => {
  const { id_user } = data;
  const containerProps = {
    sx: { width: "25vw" },
  };
  const [memosAmount, setMemosAmount] = useState({
    restMemos: 0,
    assignedMemos: 0,
  });
  useEffect(() => {
    const fetchTotalMemos = async () => {
      try {
        const totalMemosResponse = await axios.get("/assigned-memos");
        const assignedMemosResponse = await axios.get(
          "/assigned-memos/auditor/" + id_user
        );
        const totalMemos = totalMemosResponse.data;
        const assignedMemos = assignedMemosResponse.data;
        setMemosAmount((previousMemosAmount) => {
          return {
            ...previousMemosAmount,
            restMemos: totalMemos.length - assignedMemos.length,
            assignedMemos: assignedMemos.length,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTotalMemos();
  }, [id_user, memosAmount]);
  return (
    <Stack spacing={2} direction="row">
      <Container {...containerProps}>
        <Typography variant="h6">Memorandums asignados</Typography>
        <Doughnut
          data={{
            labels: ["Asignados", "Restantes"],
            datasets: [
              {
                label: "Memorandums asignados",
                data: [memosAmount.assignedMemos, memosAmount.restMemos],
                backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)"],
                hoverOffset: 0.1,
              },
            ],
          }}
        />
      </Container>
      <Container {...containerProps}>
        <Typography variant="h6">Actividades asignadas</Typography>
        <Doughnut
          data={{
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
              {
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                hoverOffset: 0.2,
              },
            ],
          }}
        />
      </Container>
    </Stack>
  );
};
export const ActivityInfo = ({ data }) => {
  const [page, setPage] = useState(0);
  const [dataState, setDataState] = useState(data);
  useEffect(() => {
    setDataState(data);
  }, [data, dataState]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <MemorandumCard memorandum={dataState} />
      </Grid>
      <Grid item xs={8}>
        <Stack sx={{ my: 3 }} alignItems="center" spacing={3}>
          <BottomNavigation
            showLabels
            value={page}
            onChange={(event, newValue) => {
              setPage(newValue);
            }}
          >
            <BottomNavigationAction
              label="Asignar informes"
              icon={<AssignmentIcon size="small" />}
            />
            <BottomNavigationAction
              label="Ver informes adjuntados"
              icon={<EditIcon size="small" />}
            />
          </BottomNavigation>
          <Container>
            {page === 0 ? (
              <>
                <DynamicAssignReports idActivity={dataState.id_activity} />
              </>
            ) : page === 1 ? (
              <>
                <AllReportsAssigned id_activity={dataState.id_activity} />
              </>
            ) : (
              <></>
            )}
          </Container>
        </Stack>
      </Grid>
    </Grid>
  );
};
export const ReportInfo = ({ data }) => {
  const { id_report } = data;
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={4}>
            <AssingObservations idReport={id_report} />
          </Grid>
          <Grid item xs={8}>
            <AllObservationsAssigned idReport={id_report} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
