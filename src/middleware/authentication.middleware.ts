import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

const fb_admin = require("../../config/firebase-config");

const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] ?? "";

  const decodeValue = await getAuth()
    .verifyIdToken(token)
    .then((decodeValue) => {
      res.locals.uid = decodeValue.uid
      res.locals.picture = decodeValue.picture
      next();
    })
    .catch((e) => {
      console.log(e);
      return res.status(403).json({ message: "UNAUTHORIZED" });
    });
};
export default decodeToken;
