import { Request, Response } from "express";
import {
  addCommentDicussionEntryType,
  addDiscussionEntryType,
  addProblemType,
} from "../schemas/problem.schemas";
import {
  createCommentDiscussionEntry,
  createDiscussionEntry,
  createProblem,
  findProblemsbyUid,
} from "../services/problem.services";
import AppError from "../utils/appError";

export const addProblemController = async (req: Request, res: Response) => {
  const { title, description, tags, attachments }: addProblemType = req.body;
  console.log(`attachments: ${attachments}`);

  const uid = res.locals.uid;
  //TODO refactor using trycatch
  const problem = await createProblem({
    uid: uid,
    title,
    description,
    tags,
    attachments,
  });
  res
    .status(200)
    .json({ ok: "ok", message: `created problem with id ${problem?.id} ` });
};

export const addDiscussionEntryController = async (
  req: Request,
  res: Response
) => {
  const { problemId, body }: addDiscussionEntryType = req.body;
  const uid = res.locals.uid;
  try {
    const discussionEntry = await createDiscussionEntry({
      uid,
      problemId,
      body,
    });
    res.json({
      message: `created DiscussionEntry with id ${discussionEntry.id}`,
    });
  } catch (error: any) {
    // console.log(error);
    if (error instanceof AppError) {
      res.status(error.status).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Unknown error creating DiscussionEntry",
      });
    }
  }
};

export const getMyProblemsController = async (req: Request, res: Response) => {
  const uid = res.locals.uid;
  try {
    const problems = await findProblemsbyUid({ uid });
    res.status(200).json({
      message: "success",
      body: problems,
    });
  } catch (error: any) {
    console.log("There was an error retrieving problems", error);
    res.status(500).json({
      message: "There was an error retrieving problems",
    });
  }
};

export const addCommentDicussionEntryController = async (
  req: Request,
  res: Response
) => {
  const { discussionEntryId, body }: addCommentDicussionEntryType = req.body;
  const uid = res.locals.uid;
  try {
    const cde = await createCommentDiscussionEntry({
      uid,
      discussionEntryId,
      body,
    });

    res.status(200).json({
      message: `successfully created CommentDiscussionEntry with id ${cde.id}`,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.status).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "There was an error creating CommentDiscussionEntry",
      });
    }
  }
};
