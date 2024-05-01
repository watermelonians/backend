import { object, array, string, z } from "zod";
import { Attachment } from "../entities/Problem/Problem.entity";

export const addProblemShemas = object({
  body: object({
    title: string(),
    description: string(),
    tags: array(string()).optional(),
    attachments: array(
      object({
        attachmentTitle: string(),
        attachmentBody: string(),
      })
    ).optional(),
  }),
});

export type addProblemType = z.infer<typeof addProblemShemas>["body"];

export type attachmentType = z.infer<
  typeof addProblemShemas
>["body"]["attachments"];
