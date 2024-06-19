import express from "express";
import { MemoradumsController } from "../controllers/memoradumsController.js";

export const createMemoradumRouter = ({ memorandumsModel }) => {
  const memorandumsRouter = express.Router();

  const memorandumsController = new MemoradumsController({ memorandumsModel });

  memorandumsRouter.get(
    "/memorandums",
    memorandumsController.getAllMemorandums
  );
  memorandumsRouter.get(
    "/memorandums/id/:id",
    memorandumsController.getMemoradumById
  );
  memorandumsRouter.get(
    "/memorandums/activity/:id_activity",
    memorandumsController.getMemoradumByActivity
  );
  memorandumsRouter.get(
    "/memorandums/auditor/:id",
    memorandumsController.getMemorandumsByAuditor
  );
  memorandumsRouter.post("/memorandums", memorandumsController.createMemoradum);
  memorandumsRouter.put(
    "/memorandums/:id",
    memorandumsController.updateMemorandum
  );
  memorandumsRouter.delete(
    "/memorandums/:id",
    memorandumsController.deleteMemorandum
  );
  return memorandumsRouter;
};
