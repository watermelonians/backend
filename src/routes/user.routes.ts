import { Router } from "express";
import decodeToken from "../middleware/authentication.middleware";
import { tempHandler } from "../controllers/UserController";


const router = Router()
// router.use(decodeToken)
router.get("/temp", decodeToken, tempHandler)
router.post("/temp", decodeToken, tempHandler)

export default router;