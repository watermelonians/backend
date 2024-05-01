import { Router } from "express";
import {
  addUserIfNotFound,
  decodeToken,
} from "../middleware/authentication.middleware";
import { addProblemController } from "../controllers/problem.controllers";
import { validate } from "../middleware/validateZod";
import { addProblemShemas as addProblemShema } from "../schemas/problem.schemas";

const router = Router();

router.post(
  "/addProblem",
  decodeToken,
  addUserIfNotFound,
  validate(addProblemShema),
  addProblemController
);

export default router;
