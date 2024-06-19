import axios from "../../../api/axiosConfig";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { updatedFormattedDate } from "../../../utils/formatDate";

export const AddActivity = () => {
  const [auditedUnits, setAuditedUnits] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [auditableReportsReferences, setAuditableReportReferences] = useState(
    []
  );

  const [formData, setFormData] = useState({
    objective: "",
    riskDescription: "",
    activityName: "",
    estimatedTime: "",
    scope: "",
    startingDate: "",
    endingDate: "",
    activityType: "",
    programmed: "",
    unitReference: "",
    reportReference: "",
  });

  const textFieldProps = {
    size: "small",
    fullWidth: true,
  };

  useEffect(() => {
    if (formData.startingDate && formData.endingDate) {
      const startDate = new Date(formData.startingDate);
      const endDate = new Date(formData.endingDate);
      const timeDiff = endDate - startDate;
      const dayDiff = timeDiff / (1000 * 3600 * 24);
      setFormData({
        ...formData,
        estimatedTime: dayDiff >= 0 ? dayDiff : "",
      });
    }
    const fetchActivityTypes = async () => {
      try {
        const response = await axios.get("/activity-types");
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
    const fetchAuditableReports = async () => {
      try {
        const response = await axios.get("/reports/auditable");
        setAuditableReportReferences(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuditableReports();
    fetchAuditedUnits();
    fetchActivityTypes();
  }, [formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/audit-activities", formData);
      setFormData({
        objective: "",
        riskDescription: "",
        activityName: "",
        estimatedTime: "",
        scope: "",
        startingDate: "",
        endingDate: "",
        activityType: "",
        programmed: "",
        unitReference: "",
        reportReference: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const todayDate = getTodayDate();
  return (
    <Container
      sx={{
        borderRadius: "15px",
        width: "45vw",
        marginX: "auto",
        marginY: "5%",
        bgcolor: "white",
        padding: "15px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <strong> Registrar una actividad</strong>
        <p />
        <Grid alignItems="center" container spacing={2}>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <strong>Actividad programada: </strong>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth required {...textFieldProps}>
                <InputLabel id="programmed-label">
                  Actividad programada
                </InputLabel>
                <Select
                  fullWidth
                  labelId="programmed-label"
                  label="Actividad programada"
                  name="programmed"
                  value={formData.programmed}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Si</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid xs={12} container item>
            <Grid xs={4} item>
              <strong>Tipo de actividad</strong>
            </Grid>
            <Grid xs={8} item>
              <FormControl fullWidth required {...textFieldProps}>
                <InputLabel id="activity-type-label">
                  Tipo de actividad
                </InputLabel>
                <Select
                  fullWidth
                  labelId="activity-type-label"
                  label="Tipo de actividad"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                >
                  {activityTypes.map((e) => (
                    <MenuItem
                      key={e.id_activity_type}
                      value={e.id_activity_type}
                    >
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <strong>Informe de referencia: </strong>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth {...textFieldProps}>
                <InputLabel id="report-reference-label">
                  Reporte de referencia
                </InputLabel>
                <Select
                  fullWidth
                  id="reportReference"
                  labelId="report-reference-label"
                  label="Informe de referencia"
                  name="reportReference"
                  value={formData.reportReference}
                  onChange={handleChange}
                >
                  {auditableReportsReferences.map((e) => (
                    <MenuItem key={e.id_report} value={e.id_report}>
                      {e.correlative}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid xs={12} container item>
            <Grid item xs={4}>
              <strong>Área o unidad auditada</strong>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth required {...textFieldProps}>
                <InputLabel id="auditedUnit-label">
                  Unidad auditada:{" "}
                </InputLabel>
                <Select
                  fullWidth
                  id="auditedUnit"
                  labelId="auditedUnit-label"
                  label="Unidad auditada"
                  name="unitReference"
                  value={formData.unitReference}
                  onChange={handleChange}
                >
                  {auditedUnits.map((e) => (
                    <MenuItem key={e.id_user} value={e.id_user}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid xs={12} container item>
            <Grid item xs={4}>
              <strong>Nombre de la actividad: </strong>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                label="Nombre de la actividad"
                name="activityName"
                value={formData.activityName}
                onChange={handleChange}
                {...textFieldProps}
              />
            </Grid>
          </Grid>
          <Grid xs={12} container item>
            <Grid item xs={4}>
              <strong>Objetivo: </strong>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                label="Objetivo"
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                multiline
                {...textFieldProps}
              />
            </Grid>
          </Grid>
          <Grid xs={12} container item>
            <Grid item xs={4}>
              <strong>Alcance: </strong>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                label="Alcance"
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                multiline
                {...textFieldProps}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <strong>Riesgos</strong> <p />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                label="Riesgos"
                name="riskDescription"
                value={formData.riskDescription}
                onChange={handleChange}
                multiline
                {...textFieldProps}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={4}>
              <strong>Fecha de inicio/finalización</strong>
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                label="Starting Date"
                name="startingDate"
                type="date"
                value={formData.startingDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: todayDate,
                }}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                label="Ending Date"
                name="endingDate"
                type="date"
                value={formData.endingDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min:
                    formData.startingDate !== ""
                      ? updatedFormattedDate(formData.startingDate)
                      : todayDate,
                }}
                {...textFieldProps}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                required
                label="Tiempo estimado"
                name="estimatedTime"
                value={formData.estimatedTime + " dia(s)"}
                disabled
                {...textFieldProps}
              />
            </Grid>
          </Grid>
          <Grid alignSelf="center" item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Registrar actividad
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
