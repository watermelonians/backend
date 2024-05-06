import { Router } from "express";
import {
  addUserIfNotFound,
  decodeToken,
} from "../middleware/authentication.middleware";
import { validate } from "../middleware/validateZod";
import {
  likeCommentDiscussionEntryController,
  likeDiscussionEntryController,
  likeProblem,
  unLikeCommentDiscussionEntryController,
  unLikeDiscussionEntryController,
  unLikeProblem,
} from "../controllers/discussion.controllers";
import {
  likeCommentDiscussionEntrySchema,
  likeDiscussionEntrySchema,
  likeProblemSchema,
} from "../schemas/discussionEntry.schemas";

const router = Router();
// TODO mouh
router.post(
  "/likeProblem",
  decodeToken,
  addUserIfNotFound,
  validate(likeProblemSchema),
  likeProblem
);

// TODO mouh
router.post(
  "/likeProblem",
  decodeToken,
  addUserIfNotFound,
  validate(likeProblemSchema),
  unLikeProblem
);

router.post(
  "/likeDiscussionEntry",
  decodeToken,
  addUserIfNotFound,
  validate(likeDiscussionEntrySchema),
  likeDiscussionEntryController
);

router.post(
  "/unLikeDiscussionEntry",
  decodeToken,
  addUserIfNotFound,
  validate(likeDiscussionEntrySchema),
  unLikeDiscussionEntryController
);

// TODO mouh
router.post(
  "/likeProblem",
  decodeToken,
  addUserIfNotFound,
  validate(likeCommentDiscussionEntrySchema),
  likeCommentDiscussionEntryController
);

// TODO mouh
router.post(
  "/likeProblem",
  decodeToken,
  addUserIfNotFound,
  validate(likeCommentDiscussionEntrySchema),
  unLikeCommentDiscussionEntryController
);

export default router;
