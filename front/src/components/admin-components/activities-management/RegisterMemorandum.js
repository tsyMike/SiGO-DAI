import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Box,
  Chip,
  FormControl,
  Select,
  Grid,
} from "@mui/material";
import axios from "../../../api/axiosConfig";
import { updatedFormattedDate } from "../../../utils/formatDate";

const RegisterMemorandum = ({ id_activity }) => {
  const [auditors, setAuditors] = useState([]);
  const [assignedAuditors, setAssignedAuditors] = useState([]);
  const theme = useTheme();
  const [memorandum, setMemorandum] = useState({
    description: "",
    title: "",
    correlative: "",
    issueDate: "",
    link: "",
    limitDate: "",
    assignedActivity: id_activity,
  });
  const [isMemoAssigned, setIsMemoAssigned] = useState(false);
  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await axios.get(
          "/memorandums/activity/" + id_activity
        );
        setIsMemoAssigned(response.data.length !== 0);
      } catch (error) {
        console.error("Error", error);
      }
    };
    const fetchAuditors = async () => {
      try {
        const response = await axios.get("/auditors");
        setAuditors(response.data);
      } catch (error) {
        console.error("Error fetching: ", error);
      }
    };
    fetchAuditors();
    fetchMemo();
  }, [id_activity, isMemoAssigned]);
  const textFieldProps = {
    required: true,
    size: "small",
    fullWidth: true,
    disabled: isMemoAssigned,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemorandum((prevMemorandum) => ({
      ...prevMemorandum,
      [name]: value,
    }));
  };
  const handleChangeOfAssignedAuditors = (e) => {
    const {
      target: { value },
    } = e;
    setAssignedAuditors(typeof value === "string" ? value.split(",") : value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/memorandums", memorandum);
      try {
        const response = await axios.get("memorandums/activity/" + id_activity);
        const { id_memo } = response.data;
        for (let index = 0; index < assignedAuditors.length; index++) {
          const e = assignedAuditors[index];
          try {
            await axios.post("/assigned-memos", {
              idMemo: id_memo,
              ci: e,
              assignedDate: todayDate,
            });
            try {
              const response = await axios.get(
                "/audit-activities/" + id_activity
              );
              const { starting_date, ending_date } = response.data;
              await axios.put("/audit-activities/" + id_activity, {
                ...response.data,
                starting_date: updatedFormattedDate(starting_date),
                ending_date: updatedFormattedDate(ending_date),
                finished: 0,
              });
            } catch (error) {
              console.error(error);
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error("Failed to register assignedMemo");
      }
      setMemorandum({
        assignedActivity: id_activity,
        description: "",
        title: "",
        correlative: "",
        issueDate: "",
        link: "",
        limitDate: "",
      });
      setAssignedAuditors([]);
    } catch (error) {
      console.error("Failed to register memorandum:", error);
    }
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6">Asignar Memorandum</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={async () => {
                const response = await axios.get(
                  "/memorandums/activity/" + id_activity
                );
                const { id_memo } = response.data;
                await axios.delete("/memorandums/" + id_memo);
              }}
              variant="contained"
              size="small"
              disabled={!isMemoAssigned}
            >
              Restaurar memorandum
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={memorandum.description}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Título"
              name="title"
              value={memorandum.title}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Correlativo"
              name="correlative"
              value={memorandum.correlative}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Fecha de emisión"
              name="issueDate"
              type="date"
              value={memorandum.issueDate}
              onChange={handleChange}
              {...textFieldProps}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: todayDate,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Fecha límite"
              name="limitDate"
              type="date"
              value={memorandum.limitDate}
              onChange={handleChange}
              {...textFieldProps}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: todayDate,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Link"
              name="link"
              value={memorandum.link}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl {...textFieldProps}>
              <InputLabel id="demo-multiple-chip-label">
                Asignar actividad a...
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={assignedAuditors}
                onChange={handleChangeOfAssignedAuditors}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Asignar actividad a..."
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={auditors.find((e) => e.id_user === value).name}
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
                {auditors.map((e) => (
                  <MenuItem
                    key={e.id_user}
                    value={e.id_user}
                    style={getStyles(e.name, assignedAuditors, theme)}
                  >
                    {e.name + " " + e.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button
              disabled={isMemoAssigned}
              type="submit"
              variant="contained"
              color="primary"
            >
              Registrar memo
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterMemorandum;
