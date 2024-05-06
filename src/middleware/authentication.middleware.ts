import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { createUser, findUserByUid } from "../services/user.services";
import AppError from "../utils/appError";
require("../../config/firebase-config");

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] ?? "";
  // console.log("recieved request with token: ", token);
  const decodeValue = getAuth()
    .verifyIdToken(token)
    .then((decodeValue) => {
      res.locals.uid = decodeValue.uid;
      res.locals.photoURL = decodeValue.picture;
      res.locals.phoneNumber = decodeValue.phone_number ?? "";
      res.locals.displayName = decodeValue.name;
      res.locals.email = decodeValue.email;
      next();
    })
    .catch((e) => {
      console.log(e);
      return res.status(403).json({ message: "UNAUTHORIZED" });
    });
};

export const addUserIfNotFound = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if user is in table User, else create new User
  const uid = res.locals.uid;
  try {
    const user = await findUserByUid({ uid });
    console.log(
      `addUserIfNotFound found User ${user.displayName} with uid ${user.uid}`
    );

    // res.locals.user =  user // Hmmmmmmmm
    next();
  } catch (error: any) {
    if (error instanceof AppError) {
      console.log(`addUserIfNotFound found No User with uid ${uid}`);

      const createdUser = await createUser({
        uid: uid,
        displayName: res.locals.displayName,
        email: res.locals.email,
        photoURL: res.locals.photoURL,
      });

      console.log(
        `addUserIfNotFound created user ${createdUser.displayName} with uid ${createdUser.uid}`
      );

      // res.locals.user = createdUser; 
      next();
    } else {
      res.status(500).json({
        message: "Unknown Middleware Error",
      });
    }
  }
};
