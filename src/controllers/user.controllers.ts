import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User/User.entity";
import {
  createStudentUser,
  findAllAdministrationUsers,
  findAllStudentUsers,
  findAllTeacherUsers,
  findAllUsers,
} from "../services/user.services";
import { createStudentUserType } from "../schemas/user.schemas";

export const tempHandler = async (req: Request, res: Response) => {
  let uid = res.locals.uid;
  let picture = res.locals.photoURL;
  let displayName = res.locals.displayName;
  let email = res.locals.email;
  let phoneNumber = res.locals.phoneNumber;
  return res.status(200).json({
    message: "you are: " + displayName,
    email: email,
    picture: picture,
    uid: uid,
    phone_number: phoneNumber,
  });
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();

    res.status(200).json({
      message: "successfully retrieved all users",
      body: users,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
};
/**
 * User instance is created by middleware regardless
 *
 * these are controllers for making the user making the request
 * a Student, Teacher, or Administration.
 *
 * It IS definitely hideous, but it is temporary
 */

export const createStudentUserController = async (
  req: Request,
  res: Response
) => {
  const uid = res.locals.uid;
  const { promo, section, group }: createStudentUserType = req.body;

  try {
    const student = await createStudentUser({ uid, promo, section, group });

    res.status(200).json({
      mesasge: `Created Student with id ${student.id}`,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
};

export const getAllStudentUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await findAllStudentUsers();

    res.status(200).json({
      message: "successfully retrieved all users",
      body: users,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
};

//TODO: createTeacherUserController
export const createTeacherUserController = async (
  req: Request,
  res: Response
) => {
  const uid = res.locals.uid;
  const { promo, section, group }: createStudentUserType = req.body;

  try {
    const student = await createStudentUser({ uid, promo, section, group });

    res.status(200).json({
      mesasge: `Created Student with id ${student.id}`,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
};

export const getAllTeacherUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await findAllTeacherUsers();

    res.status(200).json({
      message: "successfully retrieved all users",
      body: users,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
};

// TODO: createAdministrationUserController
export const createAdministrationUserController = async (
  req: Request,
  res: Response
) => {
  const uid = res.locals.uid;
  const { promo, section, group }: createStudentUserType = req.body;

  try {
    const student = await createStudentUser({ uid, promo, section, group });

    res.status(200).json({
      mesasge: `Created Student with id ${student.id}`,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
};

export const getAllAdministrationUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await findAllAdministrationUsers();

    res.status(200).json({
      message: "successfully retrieved all users",
      body: users,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
};
