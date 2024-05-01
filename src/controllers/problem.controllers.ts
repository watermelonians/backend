import { Request, Response } from "express";
import { addProblemType } from "../schemas/problem.schemas";
import { createProblem } from "../services/problem.services";
import { messaging } from "firebase-admin";

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
