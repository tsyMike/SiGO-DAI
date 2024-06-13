import express from "express";
import { AssignedMemosController } from "../controllers/assignedMemosController.js";
export const createAssignedMemosRouter = ({ assignedMemosModel }) => {
  const assignedMemosRouter = express.Router();
  const assignedMemosController = new AssignedMemosController({ assignedMemosModel });
  assignedMemosRouter.get(
    "/assigned-memos",
    assignedMemosController.getAllAssignedMemos
  );
  assignedMemosRouter.get(
    "/assigned-memos/auditor/:id",
    assignedMemosController.getAssignedMemosByAuditor
  );
  assignedMemosRouter.get(
    "/assigned-memos/memo/:id",
    assignedMemosController.getAssignedMemosByMemo
  );
 assignedMemosRouter.post(
   "/assigned-memos/",
   assignedMemosController.createAssignedMemo
 );
 assignedMemosRouter.delete(
   "/assigned-memos/",
   assignedMemosController.deleteAssignedMemo
 );
 return assignedMemosRouter;
};
