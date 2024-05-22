import express from "express";
import { AuditActivitiesController } from "../controllers/auditActivitiesController.js";

export const createAuditActivityRouter = ({ auditActivitiesModel }) => {
  const auditActivitiesRouter = express.Router();

  const auditActivitiesController = new AuditActivitiesController({
    auditActivitiesModel,
  });

  auditActivitiesRouter.get("/audit-activities", auditActivitiesController.getAllActivities);
  auditActivitiesRouter.get(
    "/audit-activities/:id",
    auditActivitiesController.getActivityById
  );
  auditActivitiesRouter.post("/audit-activities", auditActivitiesController.createActivity);
  auditActivitiesRouter.put("/audit-activities/:id", auditActivitiesController.updateActivity);
  auditActivitiesRouter.delete(
    "/audit-activities/:id",
    auditActivitiesController.deleteActivity
  );

  return auditActivitiesRouter;
};
