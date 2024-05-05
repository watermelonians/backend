import { ProfilingLevel } from "typeorm";
import {
  Attachment,
  Problem,
  Problem2Administration,
  Problem2Module,
  Problem2Students,
} from "../entities/Problem/Problem.entity";
import { AppDataSource } from "../utils/data-source";
import { getTagsFromList } from "./tag.services";
import { findUserByUid } from "./user.services";
import { User } from "../entities/User/User.entity";
import {
  addDiscussionEntryType,
  attachmentType as attachmentArrayType,
} from "../schemas/problem.schemas";
import { createAttachmentsFromList } from "./attachment.services";
import {
  CommentDiscussionEntry,
  DiscussionEntry,
} from "../entities/Problem/ProblemDiscussion.entity";
import AppError from "../utils/appError";

const problemRepository = AppDataSource.getRepository(Problem);
const discussionEntryRepository = AppDataSource.getRepository(DiscussionEntry);

export const createProblem = async (input: {
  uid: string;
  title: string;
  description: string;
  tags?: string[];
  attachments?: attachmentArrayType;
}) => {
  const { uid, title, description, tags, attachments } = input;

  const problem = new Problem();
  problem.title = title;
  problem.description = description;

  problem.user = (await findUserByUid({ uid })) ?? new User();

  if (tags) {
    problem.tags = await getTagsFromList(tags);
  }
  if (attachments) {
    const createdAttachments = await createAttachmentsFromList(
      uid,
      attachments
    );
    problem.attachments = createdAttachments ?? [];
  }
  return (await AppDataSource.manager.save(problem)) as Problem;
};

export const findProblemById = async ({ id: id }: { id: string }) => {
  try {
    return await problemRepository.findOneBy({ id });
  } catch (error: any) {
    throw new AppError(404, `No Problem with id ${id} found`);
  }
};

export const findProblemsbyUid = async ({ uid }: { uid: string }) => {
  return await problemRepository.find({
    where: {
      user: { uid: uid },
    },
    relations: {
      tags: true,
      discussionEntries: {
        comments: true,
      },
      attachments: true,
    },
  });
};

export const createDiscussionEntry = async ({
  uid,
  problemId,
  body,
}: {
  uid: string;
  problemId: string;
  body: string;
}) => {
  let problem;
  try {
    problem = await findProblemById({ id: problemId });

    const de = new DiscussionEntry();

    de.body = body;
    de.user = (await findUserByUid({ uid })) ?? new User();
    de.problem = problem ?? new Problem();

    return (await AppDataSource.manager.save(de)) as DiscussionEntry;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else
      throw new AppError(
        500,
        "Unknown error at createDiscussionEntry or findUserByUid"
      );
  }
};

export const findDiscussionEntryById = async ({
  discussionEntryId,
}: {
  discussionEntryId: string;
}) => {
  try {
    return await discussionEntryRepository.findOneBy({ id: discussionEntryId });
  } catch (error: any) {
    throw new AppError(404, `No DiscussionEntry with id ${discussionEntryId} found`);
  }
};

export const createCommentDiscussionEntry = async ({
  uid,
  discussionEntryId,
  body,
}: {
  uid: string;
  discussionEntryId: string;
  body: string;
}) => {
  const de =
    (await findDiscussionEntryById({ discussionEntryId })) ??
    new DiscussionEntry();
  if (!de) {
    throw new AppError(
      404,
      `No DiscussionEntry with id ${discussionEntryId} found`
    );
  } else {
    const cde = new CommentDiscussionEntry();

    cde.body = body;
    cde.user = (await findUserByUid({ uid })) ?? new User();
    cde.discussionEntry = de;

    return (await AppDataSource.manager.save(cde)) as CommentDiscussionEntry;
  }
};
