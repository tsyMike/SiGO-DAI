import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "../../../api/axiosConfig";
import { useState } from "react";

export const AssingObservations = ({ idReport }) => {
  const [formData, setFormData] = useState({
    idReport: idReport,
    numeral: "",
    description: "",
    criterion: "",
    condittion: "",
    cause: "",
    effect: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/observations", formData);
      setFormData({
        idReport: idReport,
        numeral: "",
        description: "",
        criterion: "",
        condittion: "",
        cause: "",
        effect: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack alignItems="center" container spacing={2} sx={{ margin: "15px" }}>
        <Typography variant="h6">Asignar observación</Typography>
        <TextField
          label="Numeral"
          name="numeral"
          value={formData.numeral}
          onChange={handleChange}
          fullWidth
          size="small"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          size="small"
          required
        />
        <TextField
          label="Criterio"
          name="criterion"
          value={formData.criterion}
          onChange={handleChange}
          fullWidth
          size="small"
          required
        />
        <TextField
          label="Condición"
          name="condittion"
          value={formData.condittion}
          onChange={handleChange}
          fullWidth
          size="small"
          required
        />
        <TextField
          label="Causa"
          name="cause"
          value={formData.cause}
          onChange={handleChange}
          fullWidth
          size="small"
          required
        />
        <TextField
          label="Efecto"
          name="effect"
          value={formData.effect}
          onChange={handleChange}
          fullWidth
          size="small"
          required
        />
        <Button
          type="submit"
          variant="contained"
          size="small"
          color="secondary"
        >
          Añadir observación
        </Button>
      </Stack>
    </form>
  );
};
