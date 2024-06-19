import { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import { Button, Grid } from "@mui/material";
import { AssignRecomendations } from "./AssignRecommendations";

export const AllObservationsAssigned = ({ idReport }) => {
  const [assignedObservations, setAssignedObservations] = useState([]);
  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const observationsResponse = await axios.get(
          "/observations/report/" + idReport
        );
        setAssignedObservations(observationsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchObservations();
  }, [idReport, assignedObservations]);
  return (
    <>
      <Grid container sx={{ margin: "15px" }}>
        {assignedObservations.length !== 0 ? (
          <>
            {assignedObservations.map((e, index) => {
              return (
                <Grid
                  key={index + "-grid-container"}
                  item
                  container
                  spacing={2}
                  sx={{
                    marginY: "15px",
                    borderBottomStyle: "dashed",
                    borderTopStyle: "dashed",
                    borderTopWidth: ".1px",
                    borderBottomWidth: ".1px",
                  }}
                >
                  <Grid key={index + "-num-" + e.numeral} item xs={2}>
                    {e.numeral}
                  </Grid>
                  <Grid
                    key={index + "-num-detailed-" + e.numeral}
                    item
                    container
                    xs={10}
                  >
                    <Grid key={index + "-desc-" + e.description} item xs={12}>
                      <strong>Observación: </strong>
                      {e.description}
                    </Grid>
                    <Grid
                      key={index + "-condition-" + e.condittion}
                      item
                      xs={6}
                    >
                      <strong>Condición: </strong>
                      {e.condittion}
                    </Grid>
                    <Grid key={index + "-criterion-" + e.criterion} item xs={6}>
                      <strong>Criterio:</strong>
                      {e.criterion}
                    </Grid>
                    <Grid key={index + "-cause-" + e.cause} item xs={6}>
                      <strong>Causa: </strong>
                      {e.cause}
                    </Grid>
                    <Grid key={index + "-effect-" + e.effect} item xs={6}>
                      <strong>Efecto: </strong>
                      {e.effect}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={async () => {
                        try {
                          await axios.delete(
                            "/observations/" + e.id_observation
                          );
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      variant="contained"
                      size="small"
                      color="error"
                      fullWidth
                    >
                      Quitar observación
                    </Button>
                    <AssignRecomendations idObservation={e.id_observation} />
                  </Grid>
                </Grid>
              );
            })}
          </>
        ) : (
          <>Sin registros</>
        )}
      </Grid>
    </>
  );
};
