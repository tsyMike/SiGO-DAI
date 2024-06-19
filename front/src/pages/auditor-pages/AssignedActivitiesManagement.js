import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DinamicDataTableWithFilter from "../../components/DinamicDataTableWithFilter";
import { useAuth } from "../../contexts/AuthContext";
import axios from "../../api/axiosConfig";
import { auditorGetActivitiesFormat } from "../../utils/columns";
import { ActivityInfo } from "../../components/expandableRowsComponents";

export const AssignedActivitiesManagement = () => {
  const [assignedActivities, setAssignedActivities] = useState([]);
  const { user } = useAuth();
  const { id_user } = user;
  useEffect(() => {
    const fetchAssignedActivitiess = async () => {
      try {
        const assignedMemosResponse = await axios.get(
          "/memorandums/auditor/" + id_user
        );
        let assignedActivitiesTemp = []
        for (const { assigned_activity } of assignedMemosResponse.data) {
          const activityResponse = await axios.get(
            "audit-activities/" + assigned_activity
          );
          const { activity_type } = activityResponse.data;
          const activityTypeNameResponse = await axios.get(
            "/activity-types/" + activity_type
          );
          const { name } = activityTypeNameResponse.data;
          assignedActivitiesTemp = [
            ...assignedActivitiesTemp,
            { ...activityResponse.data, activity_type_name: name },
          ];
        }
        setAssignedActivities(assignedActivitiesTemp);
      } catch (error) {
        console.error("Error fetching assigned activites", error);
      }
    };
    fetchAssignedActivitiess();
  }, [id_user, assignedActivities]);
  return (
    <>
      <Grid item xs={12}>
        <DinamicDataTableWithFilter
          data={assignedActivities}
          columnsData={auditorGetActivitiesFormat}
          expandableRowsComponent={ActivityInfo}
          expandableRowsValue={true}
          title="Actividades asignadas"
          filterParam="activity_name"
        />
      </Grid>
    </>
  );
};
