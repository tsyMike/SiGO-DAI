import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { formattedDate } from "../../../utils/formatDate";
import axios from "../../../api/axiosConfig";

const MemorandumCard = ({ memorandum }) => {
  const {
    id_activity,
    activity_name,
    correlative,
    description,
    finished,
    title,
  } = memorandum;
  const [assignedMemo, setAssignedMemo] = useState({});
  useEffect(() => {
    const fetchAssignedMemo = async () => {
      const response = await axios.get("/memorandums/activity/" + id_activity);
      setAssignedMemo(response.data);
    };
    fetchAssignedMemo();
  }, [id_activity, assignedMemo]);
  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Memo de asignación
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" component="div">
              <strong>Nombre de actividad:</strong> {activity_name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" component="div">
              <strong>Correlativo:</strong> {correlative}
            </Typography>
            <Grid item xs={6}>
              <Typography variant="body1" component="div">
                <strong>Finalizado:</strong> {finished ? "Si" : "No"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component="div">
              <strong>Descripción:</strong> {description}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" component="div">
              <strong>Fecha de emisión:</strong>
              <p />
              {formattedDate(assignedMemo.issue_date)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" component="div">
              <strong>Link de descarga:</strong>
              <p />
              <a
                href={assignedMemo.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {assignedMemo.link}
              </a>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MemorandumCard;
