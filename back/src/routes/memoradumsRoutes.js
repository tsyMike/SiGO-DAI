import express from "express";
import { MemoradumsController } from "../controllers/memoradumsController.js";

export const createMemoradumRouter = ({ memoradumsModel }) => {
  const memorandumsRouter = express.Router();

  const memorandumsController = new MemoradumsController({ memoradumsModel });

  memorandumsRouter.get("/memorandums", memorandumsController.getAllMemorandums);
  memorandumsRouter.get(
    "/memorandums/:id",
    memorandumsController.getMemoradumById
  );
  memorandumsRouter.post("/memorandums", memorandumsController.createMemoradum);
  memorandumsRouter.put(
    "memorandums/:id",
    memorandumsController.updateMemorandum
  );
  memorandumsRouter.delete(
    "memorandums/:id",
    memorandumsController.deleteMemorandum
  );
  return memorandumsRouter;
};
