import { object, string, z } from "zod";

export const likeProblemSchema = object({
  body: object({
    problemId: string(),
  }),
});

export type likeProblemType = z.infer<typeof likeProblemSchema>["body"];

export const likeDiscussionEntrySchema = object({
  body: object({
    discussionEntryId: string(),
  }),
});

export type likeDiscussionEntryType = z.infer<
  typeof likeDiscussionEntrySchema
>["body"];

export const likeCommentDiscussionEntrySchema = object({
  body: object({
    // short for CommetnDiscussionEntry
    cdeId: string(),
  }),
});

export type likeCommentDiscussionEntryType = z.infer<
  typeof likeCommentDiscussionEntrySchema
>["body"];
