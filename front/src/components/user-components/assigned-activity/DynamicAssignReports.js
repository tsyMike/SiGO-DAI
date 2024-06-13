import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import axios from "../../../api/axiosConfig";

const DynamicAssignReports = ({ idActivity }) => {
  const [forms, setForms] = useState([
    {
      idActivity: idActivity,
      idReportType: 1,
      description: "",
      title: "",
      issueDate: "",
      link: "",
      correlative: "",
      auditable: false,
    },
  ]);
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    const fetchAssignedReports = async () => {
      const activityResponse = await axios.get(
        "/audit-activities/" + idActivity
      );
      const { finished } = activityResponse.data;
      if (finished === 0) {
        setIsFinished(false);
      }
      if (finished === 1) {
        setIsFinished(true);
      }
    };
    fetchAssignedReports();
  });

  const handleChange = (index, e) => {
    const { name, value, checked, type } = e.target;
    const newForms = [...forms];
    newForms[index][name] = type === "checkbox" ? checked : value;
    setForms(newForms);
  };

  const handleAddForm = () => {
    setForms([
      ...forms,
      {
        idActivity: idActivity,
        idReportType: 1,
        description: "",
        title: "",
        issueDate: "",
        link: "",
        correlative: "",
        auditable: false,
      },
    ]);
  };

  const handleRemoveForm = (index) => {
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(forms);
      for (let index = 0; index < forms.length; index++) {
        const report = forms[index];
        await axios.post("/reports", { report });
      }
      setForms([
        {
          idActivity: idActivity,
          idReportType: 1,
          description: "",
          title: "",
          issueDate: "",
          link: "",
          correlative: "",
          auditable: false,
        },
      ]);
    } catch (error) {
      console.error("Failed to submit forms:", error);
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
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Asignar informes
      </Typography>
      <form onSubmit={handleSubmit}>
        {forms.map((form, index) => (
          <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <FormControl size="small" fullWidth required>
                <InputLabel id="report-type-label">Tipo de informe</InputLabel>
                <Select
                  id="report-type"
                  labelId="report-type-label"
                  label="Tipo de informe"
                  name="idReportType"
                  value={form.idReportType}
                  onChange={(e) => {
                    handleChange(index, e);
                  }}
                  size="small"
                >
                  <MenuItem value={1}>Informe de control interno</MenuItem>
                  <MenuItem value={2}>Informe de seguimiento</MenuItem>
                  <MenuItem value={3}>Informe de relevamiento</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Descripción del informe"
                name="description"
                value={form.description}
                onChange={(e) => handleChange(index, e)}
                required
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Título del informe"
                name="title"
                value={form.title}
                onChange={(e) => handleChange(index, e)}
                required
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Fecha de emisión"
                name="issueDate"
                type="date"
                value={form.issueDate}
                onChange={(e) => handleChange(index, e)}
                required
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: todayDate,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Link"
                name="link"
                value={form.link}
                onChange={(e) => handleChange(index, e)}
                required
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Correlativo"
                name="correlative"
                value={form.correlative}
                onChange={(e) => handleChange(index, e)}
                required
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.auditable}
                    onChange={(e) => handleChange(index, e)}
                    name="auditable"
                  />
                }
                label="Auditable"
              />
            </Grid>
            <Grid item xs={6}>
              {index > 0 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveForm(index)}
                >
                  Quitar
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
        <Grid container>
          <Grid item xs={3}>
            <Tooltip
              title={
                isFinished
                  ? "No puede añadir informes habiendo ya terminado la actividad"
                  : ""
              }
            >
              <Button
                disabled={isFinished}
                variant="contained"
                color="primary"
                onClick={handleAddForm}
              >
                Añadir informe
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Tooltip
              title={
                isFinished
                  ? "No puede añadir informes habiendo ya terminado la actividad"
                  : ""
              }
            >
              <Button
                disabled={isFinished}
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ marginLeft: 2 }}
              >
                Asignar informes
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Button
              disabled={isFinished}
              variant="contained"
              color="success"
              sx={{ marginLeft: 2 }}
            >
              Finalizar actividad
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default DynamicAssignReports;
