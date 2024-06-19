import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import RegisterMemorandum from "./admin-components/activities-management/RegisterMemorandum";
import { ModifiyActivity } from "./admin-components/activities-management/ModifyActivity";
import axios from "../api/axiosConfig";
import MemorandumCard from "./user-components/assigned-activity/MemorandumCard";
import DynamicAssignReports from "./user-components/assigned-activity/DynamicAssignReports";
import { AllReportsAssigned } from "./user-components/assigned-activity/AllReportsAssigned";
import { AllObservationsAssigned } from "./user-components/assigned-reports/AllObservationsAssigned";
import { AssingObservations } from "./user-components/assigned-reports/AssingObservations";
import { Pie } from "react-chartjs-2";
import { AddAuditor } from "./admin-components/users-management/AddAuditor";
import { defaultPieDatasetConfig } from "../utils/env";
import { formattedDate } from "../utils/formatDate";

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
  const { id_user, last_name, is_active } = data;
  const [memosAmount, setMemosAmount] = useState({
    restMemos: 0,
    assignedMemos: 0,
  });
  const [auditorInfo, setAuditorInfo] = useState({});
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
    const fetchAuditorInfo = async () => {
      try {
        const response = await axios.get("/auditors/" + id_user);
        setAuditorInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalMemos();
    fetchAuditorInfo();
  }, [id_user, auditorInfo, memosAmount]);

  return is_active === 1 ? (
    <>
      <p />
      <Grid spacing={2} container>
        <Grid container item xs={4}>
          <Grid item xs={12}>
            <strong>Información del auditor</strong>
          </Grid>
          <Grid item xs={12}>
            <strong>Profesión</strong>
          </Grid>
          <Grid item xs={12}>
            {auditorInfo.profession}
          </Grid>
          <Grid item xs={12}>
            <strong>Experiencia (años)</strong>
          </Grid>
          <Grid item xs={6}>
            Sector público
          </Grid>
          <Grid item xs={6}>
            Sector privado
          </Grid>
          <Grid item xs={6}>
            {auditorInfo.public_years_xp + " año(s)"}
          </Grid>
          <Grid item xs={6}>
            {auditorInfo.private_years_xp + " año(s)"}
          </Grid>
          <Grid item xs={12}>
            <strong>Fecha de Incorporación</strong>
          </Grid>
          <Grid item xs={12}>
            {formattedDate(auditorInfo.incorporation_date)}
          </Grid>
          <Grid item xs={12}>
            <strong>Remuneración anual</strong>
            <Grid item xs={12}>
              {auditorInfo.anual_remuneration}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <strong>Memorandums asignados</strong>
          <Pie
            data={{
              labels: ["Asignados", "Restantes"],
              datasets: [
                {
                  label: "Memorandums asignados",
                  data: [memosAmount.assignedMemos, memosAmount.restMemos],
                  ...defaultPieDatasetConfig,
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>Actividades asignadas</strong>
          <Pie
            data={{
              labels: ["Red", "Blue", "Yellow"],
              datasets: [
                {
                  label: "My First Dataset",
                  data: [300, 50, 100],
                  ...defaultPieDatasetConfig,
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </>
  ) : (
    <Container>
      <AddAuditor daiCharge={last_name} idUser={id_user} />
    </Container>
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
