import { Request, Response } from "express";
import {
  addDiscussionEntryType,
  addProblemType,
} from "../schemas/problem.schemas";
import {
  createDiscussionEntry,
  createProblem,
  getProblemsbyUid,
} from "../services/problem.services";

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
    console.log(error);
    res.status(500).json({
      message: "The was an error creating DiscussionEntry",
    });
  }
};

export const getMyProblemsController = async (req: Request, res: Response) => {
  const uid = res.locals.uid;
  try {
    const problems = await getProblemsbyUid({ uid });
    res.status(200).json({
      message: "success",
      body: problems,
    });
  } catch (error: any) {
    console.log("There was an error retrieving problems", error.message);
    res.status(500).json({
      message: "There was an error retrieving problems",
    });
  }
};
