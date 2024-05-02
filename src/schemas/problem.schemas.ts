import { object, array, string, z, set } from "zod";

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

export const addDiscussionEntrySchema = object({
  body: object({
    problemId: string(),
    body: string(),
  }),
});

export type addDiscussionEntryType = z.infer<
  typeof addDiscussionEntrySchema
>["body"];

export const addCommentDicussionEntrySchema = object({
  body: object({
    discussionEntryId: string(),
    body: string(),
  }),
});

export type addCommentDicussionEntryType = z.infer<
  typeof addCommentDicussionEntrySchema
>["body"];
