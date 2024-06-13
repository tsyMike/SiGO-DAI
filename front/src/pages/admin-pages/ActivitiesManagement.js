import axios from "../../api/axiosConfig";
import { useEffect, useState } from "react";

import { Button, Grid, Modal, Typography } from "@mui/material";
import DinamicDataTableWithFilter from "../../components/DinamicDataTableWithFilter";

import { adminGetActivitiesColumnsFormat } from "../../utils/columns.js";
import { ActivityManagement } from "../../components/expandableRowsComponents.js";
import { AddActivity } from "../../components/admin-components/activities-management/AddActivity.js";

export const ActivitiesManagement = () => {
  const [activities, setActivities] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/audit-activities");
        let activitiesTemp = [];
        for (const activity of response.data) {
          const { activity_type } = activity;
          const activityTypeResponse = await axios.get(
            "/activity-types/" + activity_type
          );
          const { name } = activityTypeResponse.data;
          activitiesTemp = [
            ...activitiesTemp,
            { ...activity, activity_type_name: name },
          ];
        }
        setActivities(activitiesTemp);
      } catch (error) {
        console.error("Error fetching auditors:", error);
      }
    };
    fetchActivities();
  }, [activities]);
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        sx={{ overflow: "auto" }}
      >
        <AddActivity />
      </Modal>
      <Grid item xs={1}></Grid>
      <Grid item xs={7}>
        <Typography variant="h4">
          Gestión de actividades de auditoría
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => setOpenModal(true)}
          size="small"
          variant="contained"
          color="success"
        >
          Agregar actividad
        </Button>
      </Grid>
      <Grid item xs={12}>
        <DinamicDataTableWithFilter
          data={activities}
          columnsData={adminGetActivitiesColumnsFormat}
          expandableRowsComponent={ActivityManagement}
          expandableRowsValue={true}
          title="Actividades registradas"
          filterParam="activity_name"
        />
      </Grid>
    </>
  );
};
