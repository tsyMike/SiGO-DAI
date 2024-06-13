import express from "express";
import { ObservationsController } from "../controllers/observationsController.js";
 export const createObseravtionsRouter = ({ observationsModel }) => {
    const observationsRouter = express.Router()
    const observationsController = new ObservationsController( {
        observationsModel
    })
    observationsRouter.get(
      "/observations",
      observationsController.getAllObservations
    );
    observationsRouter.get(
      "/observations/id/:id",
      observationsController.getObservationById
    );
    observationsRouter.get(
      "/observations/report/:id",
      observationsController.getObservationsByReport
    );
    observationsRouter.post(
      "/observations",
      observationsController.createObservation
    );
    observationsRouter.delete(
      "/observations/:id",
      observationsController.deleteObservation
    );
    return observationsRouter;
 };
