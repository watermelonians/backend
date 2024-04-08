import { Response, Router } from "express";
import { todoController } from "../controllers/todo.controller";
import decodeToken from "../middleware/authentication.middleware";

const router = Router();

router.use(decodeToken);

router.get("/todo", todoController);

export default router;
