import { Router } from "express";
import {
  addUserIfNotFound,
  decodeToken,
} from "../middleware/authentication.middleware";
import {
  addDiscussionEntryController,
  addProblemController,
  getMyProblemsController,
} from "../controllers/problem.controllers";
import { validate } from "../middleware/validateZod";
import {
  addDiscussionEntrySchema,
  addProblemShemas as addProblemShema,
} from "../schemas/problem.schemas";

const router = Router();

router.post(
  "/addProblem",
  decodeToken,
  addUserIfNotFound,
  validate(addProblemShema),
  addProblemController
);

router.post(
  "/addDiscussionEntry",
  decodeToken,
  addUserIfNotFound,
  validate(addDiscussionEntrySchema),
  addDiscussionEntryController
);

router.get(
  "/getMyProblems",
  decodeToken,
  addUserIfNotFound,
  getMyProblemsController
);
export default router;
