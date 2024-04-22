import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
require("../../config/firebase-config");
// const fb_ad

const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] ?? "";
  console.log("recieved request with token: ", token);
  const decodeValue = getAuth()
    .verifyIdToken(token)
    .then((decodeValue) => {
      res.locals.uid = decodeValue.uid;
      res.locals.picture = decodeValue.picture;
      res.locals.phone_number = decodeValue.phone_number ?? "";
      res.locals.display_name = decodeValue.name ?? "NO NAME FOUND";
      res.locals.email = decodeValue.email ?? "NO EMAIL HUH"
      next();
    })
    .catch((e) => {
      console.log(e);
      return res.status(403).json({ message: "UNAUTHORIZED" });
    });
};
export default decodeToken;
