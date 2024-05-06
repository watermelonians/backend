import { Request, Response } from "express";
import { likeDiscussionEntryType } from "../schemas/discussionEntry.schemas";
import {
  likeDiscussionEntry,
  unLikeDiscussionEntry,
} from "../services/discussionEntry.services";

// TODO Mouh
export const likeProblem = async (req: Request, res: Response) => {};

// TODO Mouh
export const unLikeProblem = async (req: Request, res: Response) => {};

export const likeDiscussionEntryController = async (
  req: Request,
  res: Response
) => {
  const uid = res.locals.uid;
  const { discussionEntryId }: likeDiscussionEntryType = req.body;

  try {
    await likeDiscussionEntry({ uid, discussionEntryId });
    // FIXME send Json Respons or only status?
    res.status(200).json({
      messge: "Successfully liked DiscussionEntry",
    });
  } catch (error: any) {
    res.status(error.status ?? 500).json({
      message: error.message ?? "Unknown Error Liking DiscussionEntry",
    });
  }
};

export const unLikeDiscussionEntryController = async (
  req: Request,
  res: Response
) => {
  const uid = res.locals.uid;
  const { discussionEntryId }: likeDiscussionEntryType = req.body;

  try {
    await unLikeDiscussionEntry({ uid, discussionEntryId });
    // FIXME send Json Respons or only status 204?
    res.status(200).json({
      messge: "Successfully unliked DiscussionEntry",
    });
  } catch (error: any) {
    res.status(error.status ?? 500).json({
      message: error.message ?? "Unknown Error Liking DiscussionEntry",
    });
  }
};

// TODO Mouh
export const likeCommentDiscussionEntryController = async (
  req: Request,
  res: Response
) => {};

// TODO Mouh
export const unLikeCommentDiscussionEntryController = async (
  req: Request,
  res: Response
) => {};
