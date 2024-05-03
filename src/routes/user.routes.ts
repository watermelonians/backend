import { Router } from "express";
import {
  addUserIfNotFound,
  decodeToken,
} from "../middleware/authentication.middleware";
import {
  createAdministrationUserController,
  createStudentUserController,
  createTeacherUserController,
  getAllAdministrationUsersController,
  getAllStudentUsersController,
  getAllTeacherUsersController,
  getAllUsersController,
  tempHandler,
} from "../controllers/user.controllers";
import { validate } from "../middleware/validateZod";
import {
  createStudentUserSchema,
  createTeacherUserSchema,
} from "../schemas/user.schemas";

const router = Router();

router.get("/temp", decodeToken, tempHandler);
router.post("/temp", decodeToken, tempHandler);

router.get(
  "/getAllUsers",
  decodeToken,
  addUserIfNotFound,
  getAllUsersController
);

router.get(
  "/getAllStudentUsers",
  decodeToken,
  addUserIfNotFound,
  getAllStudentUsersController
);

router.get(
  "/getAllTeacherUsers",
  decodeToken,
  addUserIfNotFound,
  getAllTeacherUsersController
);

router.get(
  "/getAllAdministrationUsers",
  decodeToken,
  addUserIfNotFound,
  getAllAdministrationUsersController
);

// temporary
router.post(
  "/createStudentUser",
  decodeToken,
  addUserIfNotFound,
  validate(createStudentUserSchema),
  createStudentUserController
);

router.post(
  "/createTeacherUser",
  decodeToken,
  addUserIfNotFound,
  validate(createTeacherUserSchema),
  createTeacherUserController
);

router.post(
  "/createAdministrationUser",
  decodeToken,
  addUserIfNotFound,
  validate(createStudentUserSchema),
  createAdministrationUserController
);
export default router;
