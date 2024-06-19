import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import { daiChart } from "../../../utils/env";

export const AddAuditor = ({ idUser, daiCharge }) => {
  const [activeAuditors, setActiveAuditors] = useState([]);
  useEffect(() => {
    const fetchActiveAuditors = async () => {
      try {
        const response = await axios.get("/active-auditors");
        const { data } = response;
        setActiveAuditors(daiChart.filter((e) => !data.includes(e)));
      } catch (error) {
        console.error(error);
      }
    };
    fetchActiveAuditors();
  }, [activeAuditors]);
  const [auditor, setAuditor] = useState({
    idUser: idUser,
    name: "",
    lastName: daiCharge,
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
      await axios.put("/auditors/assign/" + idUser, auditor);
      setAuditor({
        idUser: idUser,
        name: "",
        lastName: daiCharge,
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
  return (
    <form onSubmit={handleSubmit}>
      <Grid sx={{ paddingY: "15px" }} container spacing={2}>
        <Grid item xs={4}>
          Registrar a <strong>{daiCharge}</strong>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Nombre Completo"
            name="name"
            value={auditor.name}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Profesión"
            name="profession"
            value={auditor.profession}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <strong>Experiencia</strong>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Área pública"
            name="publicYearsXP"
            type="number"
            value={auditor.publicYearsXP}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Área privada"
            name="privateYearsXP"
            type="number"
            value={auditor.privateYearsXP}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Fecha de incorporación"
            name="incorporationDate"
            type="date"
            value={auditor.incorporationDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required={true}
            fullWidth={true}
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Remuneración anual"
            name="anualRemuneration"
            type="number"
            value={auditor.anualRemuneration}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="secondary">
            Registrar {daiCharge}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
