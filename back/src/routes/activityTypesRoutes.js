import express from "express";
import {ActivityTypesController} from "../controllers/activityTypesController.js";

export const createActivityTypesRouter = ({ activityTypesModel }) => {
    const activityTypesRouter = express.Router();

    const activityTypesController = new ActivityTypesController({
      activityTypesModel,
    });

    activityTypesRouter.get(
      "/activity-types",
      activityTypesController.getAllActivityTypes
    );
    activityTypesRouter.get(
      "/activity-types/:id",
      activityTypesController.getActivityTypeById
    );

    return activityTypesRouter;
};
