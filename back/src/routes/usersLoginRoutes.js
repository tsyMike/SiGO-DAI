import express from "express";
import { UsersLoginController } from "../controllers/usersLoginController.js";

export const createUserLoginRouter = ({ usersLoginModel }) => {
  const usersLoginRouter = express.Router();
  const usersLoginController = new UsersLoginController({ usersLoginModel });
  usersLoginRouter.post("/login", usersLoginController.login);
  return usersLoginRouter;
};
