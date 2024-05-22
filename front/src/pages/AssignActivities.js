import React, { useEffect, useState } from "react";

import axios from "../api/axiosConfig";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Checkbox,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";

import DataTableWithFilter from "../components/DataTableWithFilter";
import ExpandableRowsComponent from "../components/ExpandableRowsComponent";

import { activitiesColumnsFormat } from "../utils/columns";
import { theme } from "../utils/theme";

const AssignActivities = () => {
  const [activities, setActivities] = useState([]);
  const [auditedUnits, setAuditedUnits] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  useEffect(() => {
    const fetchAuditors = async () => {
      try {
        const response = await axios.get("/audit-activities");
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching auditors:", error);
      }
    };
    const fetchActivityTypes = async () => {
      try {
        const response = await axios.get("activity-types");
        setActivityTypes(response.data);
      } catch (error) {
        console.error("Error fetching activity types:", error);
      }
    };
    const fetchAuditedUnits = async () => {
      try {
        const response = await axios.get("/audited-units");
        setAuditedUnits(response.data);
      } catch (error) {
        console.error("Error fetching auditedUnits:", error);
      }
    };
    fetchAuditors();
    fetchAuditedUnits();
    fetchActivityTypes();
  }, []);
  const [activity, setActivity] = useState({
    objective: "",
    riskDescription: "",
    activityName: "",
    estimatedTime: "",
    scope: "",
    startingDate: "",
    endingDate: "",
    activityType: "",
    programmed: false,
    unitReference: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(activity);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Actividad registrada:", activity);
    try {
      setActivity((prevActivity) => ({
        ...prevActivity,
        programmed: prevActivity.programmed ? 1 : 0,
      }));
      // console.log(activity);
      const response = await axios.post("/audit-activities", activity);
      console.log("Actividad registrada:", response.data);
      setActivity({
        objective: "",
        riskDescription: "",
        activityName: "",
        estimatedTime: "",
        scope: "",
        startingDate: "",
        endingDate: "",
        activityType: "",
        programmed: false,
        unitReference: "",
      });
      // Optionally, refresh the list of activities or do something else
      setActivities((prevActivities) => [...prevActivities, response.data]);
    } catch (error) {
      console.error("Error registering activity:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Stack spacing={1} direction="row">
          <Stack spacing={2} alignItems={"center"}>
            <Typography variant="h3">
              Registrar actividad de auditoria interna
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="activityType-label">Tipo de actividad</InputLabel>
              <Select
                id="activityType"
                labelId="activityType-label"
                label="Tipo de Actividad"
                name="activityType"
                value={activity.activityType}
                onChange={handleChange}
              >
                {activityTypes.map((e) => (
                  <MenuItem key={e.id_activity_type} value={e.id_activity_type}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Nombre de la Actividad"
              name="activityName"
              value={activity.activityName}
              onChange={handleChange}
            />
            <Typography>Fecha de inicio y finalización</Typography>
            <Stack spacing={1} direction="row">
              <TextField
                // label="Fecha de Vencimiento"
                type="date"
                name="startingDate"
                value={activity.startingDate}
                onChange={handleChange}
              />
              <TextField
                // label="Fecha de Vencimiento"
                type="date"
                name="endingDate"
                value={activity.endingDate}
                onChange={handleChange}
              />
              <TextField
                label="Tiempo estimado (dias)"
                type="number"
                name="estimatedTime"
                value={activity.estimatedTime}
                onChange={handleChange}
              />
            </Stack>
            <TextField
              label="Alcance"
              name="scope"
              value={activity.scope}
              onChange={handleChange}
            />
            <TextField
              label="Riesgos identificados"
              name="riskDescription"
              value={activity.riskDescription}
              onChange={handleChange}
            />
            <Stack direction="row" alignItems="center">
              Actividad programada
              <Checkbox
                label="Actividad programada"
                name="programmed"
                checked={activity.programmed}
                onChange={handleChange}
              />
            </Stack>
            <FormControl fullWidth>
              <InputLabel id="auditedUnit-label">Unidad auditada</InputLabel>
              <Select
                id="auditedUnit"
                labelId="auditedUnit-label"
                label="Unidad aduitada"
                name="unitReference"
                value={activity.unitReference}
                onChange={handleChange}
              >
                {auditedUnits.map((e) => (
                  <MenuItem key={e.id_user} value={e.id_user}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Typography>Subir memorandum</Typography>
            <Input required type="file" /> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Registrar Actividad
            </Button>
          </Stack>
          <Container>
            <Typography variant="h3">Actividades</Typography>
            <DataTableWithFilter
              title="Actividades"
              columns={activitiesColumnsFormat}
              activities={activities}
              expandableRowsComponent={ExpandableRowsComponent}
            />
          </Container>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default AssignActivities;
