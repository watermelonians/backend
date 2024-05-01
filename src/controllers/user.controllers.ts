import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User/User.entity";

export const tempHandler = async (req: Request, res: Response) => {
  let uid = res.locals.uid;
  let picture = res.locals.photoURL;
  let displayName = res.locals.displayName;
  let email = res.locals.email;
  let phoneNumber = res.locals.phoneNumber;
  return res.json({
    message: "you are: " + displayName,
    email: email,
    picture: picture,
    uid: uid,
    phone_number: phoneNumber,
  });
};
