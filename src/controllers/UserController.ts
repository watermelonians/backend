import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User/User.entity";

export const tempHandler = async (req: Request, res: Response) => {
  let uid = res.locals.uid;
  let picture = res.locals.picture;
  let name = res.locals.display_name;
  let email = res.locals.email;
  let phone_number = res.locals.phone_number;
  return res.json({
    message: "you are: " + name,
    email: email,
    picture: picture,
    uid: uid,
    phone_number: phone_number,
  });
};
