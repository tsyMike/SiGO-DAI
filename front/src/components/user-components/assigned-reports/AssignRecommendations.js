import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";

export const AssignRecomendations = ({ idObservation }) => {
  const [auditedUnits, setAuditedUnits] = useState([]);
  const [assignedRecommendations, setAssignedRecommendations] = useState([]);
  const [recommendationForm, setRecommendationForm] = useState({
    idObservation: idObservation,
    numeral: "",
    description: "",
    auditedUnits: [],
  });
  useEffect(() => {
    const fetchAuditedUnits = async () => {
      try {
        const auditedUnitsResponse = await axios.get("/audited-units");
        setAuditedUnits(auditedUnitsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAssignedRecoms = async () => {
      try {
        const assignedRecoms = await axios.get(
          "/recommendations/observation/" + idObservation
        );
        setAssignedRecommendations(assignedRecoms.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuditedUnits();
    fetchAssignedRecoms();
  }, [assignedRecommendations, idObservation]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecommendationForm({
      ...recommendationForm,
      [name]: value,
    });
  };
  const handleChangeOfAssignedAuditedUnits = (e) => {
    const {
      target: { value },
    } = e;
    setRecommendationForm({
      ...recommendationForm,
      auditedUnits: typeof value === "string" ? value.split(",") : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/recommendations", recommendationForm);
      setRecommendationForm({
        idObservation: idObservation,
        numeral: "",
        description: "",
        auditedUnits: [],
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <p>
      <strong>Asignar recomendaciones</strong>
      <p />
      <Stack alignItems="center" spacing={2}>
        <TextField
          label="N° Recomendación"
          name="numeral"
          fullWidth
          size="small"
          required
          value={recommendationForm.numeral}
          onChange={handleChange}
        />
        <TextField
          label="Descripción"
          multiline
          name="description"
          fullWidth
          size="small"
          required
          value={recommendationForm.description}
          onChange={handleChange}
        />
        <FormControl fullWidth required>
          <InputLabel id="demo-multiple-chip-label">
            Asignar recomendación a...
          </InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={recommendationForm.auditedUnits}
            onChange={handleChangeOfAssignedAuditedUnits}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Asignar recomendación a..."
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={auditedUnits.find((e) => e.id_user === value).name}
                  />
                ))}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {auditedUnits.map((e) => (
              <MenuItem key={e.id_user} value={e.id_user}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          size="small"
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Añadir recomendación
        </Button>
        <strong>Recomendaciones</strong>
        {assignedRecommendations.length !== 0 ? (
          assignedRecommendations.map((e) => {
            return (
              <Grid alignItems="center" container>
                <Grid item xs={2}>
                  <strong>{e.numeral}</strong>
                </Grid>
                <Grid item xs={8} container>
                  <Grid item xs={12}>
                    <strong>Descripción</strong>
                  </Grid>
                  <Grid item xs={12}>
                    {e.description}
                  </Grid>
                  <Grid item xs={12}>
                    <strong>Unidades asignadas</strong>
                  </Grid>
                  <Grid item xs={12}>
                    {e.audited_units.map((f) => (
                      <li>
                        {auditedUnits.find((g) => g.id_user === f.id_unit).name}
                      </li>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={async () => {
                      try {
                        await axios.delete(
                          "/recommendations/" + e.id_recommendation
                        );
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <p>Sin registros</p>
        )}
      </Stack>
    </p>
  );
};
