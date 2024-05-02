import { Router } from "express";
import {
  addUserIfNotFound,
  decodeToken,
} from "../middleware/authentication.middleware";
import {
  addCommentDicussionEntryController,
  addDiscussionEntryController,
  addProblemController,
  getMyProblemsController,
} from "../controllers/problem.controllers";
import { validate } from "../middleware/validateZod";
import {
  addCommentDicussionEntrySchema,
  addDiscussionEntrySchema,
  addProblemShemas as addProblemShema,
} from "../schemas/problem.schemas";

const router = Router();

router.get(
  "/getMyProblems",
  decodeToken,
  addUserIfNotFound,
  getMyProblemsController
);

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

router.post(
  "/addCommentDicussionEntry",
  decodeToken,
  addUserIfNotFound,
  validate(addCommentDicussionEntrySchema),
  addCommentDicussionEntryController
);

export default router;
