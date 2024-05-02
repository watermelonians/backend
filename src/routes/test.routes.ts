import { resolveObjectURL } from "buffer";
import { Request, Response, Router } from "express";
import { createTag, getTagsFromList } from "../services/tag.services";
import { messaging } from "firebase-admin";
import AppError from "../utils/appError";
import { Problem } from "../entities/Problem/Problem.entity";

const router = Router();

router.post("/getTagsFromList", async (req: Request, res: Response) => {
  const { tags } = req.body;

  let tagss = await getTagsFromList(tags);

  console.log("tagss", tagss);

  res.json({ tags: tagss });
});

router.post("/createTag", async (req: Request, res: Response) => {
  const { tagName } = req.body;

  console.log(`tagName: ${tagName}`);
  try {
    const tag = await createTag({ name: tagName });
    res.status(200).json({
      message: `created tag "${tag.name}"`,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      if (error.status == 400) {
        res.status(error.status).json({
          message: error.message,
        });
      } else {
        res.status(error.status).json({
          message: "unknown error, (likely typeorm)",
        });
      }
    } else {
      res.status(500).json({
        message: "Unknown error",
      });
    }
  }
});

router.all("/problemId", (req: Request, res: Response) => {
  const problem = new Problem();

  res.status(200).json({ so: problem.id ?? "shame" });
});

export default router;
