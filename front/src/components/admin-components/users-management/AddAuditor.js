import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "../../../api/axiosConfig";

export const AddAuditor = () => {
  const [auditor, setAuditor] = useState({
    name: "",
    lastName: "",
    profession: "",
    publicYearsXP: "",
    privateYearsXP: "",
    incorporationDate: "",
    anualRemuneration: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuditor({
      ...auditor,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auditors", auditor);
      setAuditor({
        name: "",
        lastName: "",
        profession: "",
        publicYearsXP: "",
        privateYearsXP: "",
        incorporationDate: "",
        anualRemuneration: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const textFieldProps = {
    required: true,
    fullWidth: true,
    size: "small",
  };
  return (
    <Container
      sx={{
        borderRadius: "15px",
        width: "75vw",
        marginX: "auto",
        marginY: "5%",
        bgcolor: "white",
        padding: "15px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography id="modal-title" variant="h6">
              Registrar un auditor
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Apellido"
              name="lastName"
              value={auditor.lastName}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Nombre"
              name="name"
              value={auditor.name}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Profesión"
              name="profession"
              value={auditor.profession}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h8">Experiencia</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Área pública"
              name="publicYearsXP"
              type="number"
              value={auditor.publicYearsXP}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Área privada"
              name="privateYearsXP"
              type="number"
              value={auditor.privateYearsXP}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Fecha de incorporación"
              name="incorporationDate"
              type="date"
              value={auditor.incorporationDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Remuneración anual"
              name="anualRemuneration"
              type="number"
              value={auditor.anualRemuneration}
              onChange={handleChange}
              {...textFieldProps}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="secondary">
              Registrar auditor
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
