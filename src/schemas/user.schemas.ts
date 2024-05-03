import { group } from "console";
import { boolean, object, string, z } from "zod";

export const createStudentUserSchema = object({
  body: object({
    promo: string(),
    section: string(),
    group: string(),
  }),
});

export type createStudentUserType = z.infer<
  typeof createStudentUserSchema
>["body"];

// TODO: createTeacherUserSchema
export const createTeacherUserSchema = object({
  body: object({
    schoolJoinDate: string(),
  }),
});

export type createTeacherUserType = z.infer<
  typeof createTeacherUserSchema
>["body"];

// TODO: createAdministrationUserSchemas
export const createAdministrationUserSchema = object({
  body: object({
    isTeacher: boolean(),
  }),
});

export type createAdministrationUserType = z.infer<
  typeof createAdministrationUserSchema
>["body"];
