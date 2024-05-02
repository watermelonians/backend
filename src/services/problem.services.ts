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
import { DiscussionEntry } from "../entities/Problem/ProblemDiscussion.entity";
import { strict } from "assert";

const problemRepository = AppDataSource.getRepository(Problem);
const attachmentRepository = AppDataSource.getRepository(Attachment);

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
  return await problemRepository.findOneBy({ id });
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
  const de = new DiscussionEntry();

  de.body = body;
  de.user = (await findUserByUid({ uid })) ?? new User();
  de.problem = (await findProblemById({ id: problemId })) ?? new Problem();

  return (await AppDataSource.manager.save(de)) as DiscussionEntry;
};

export const getProblemsbyUid = async ({ uid }: { uid: string }) => {
  return await problemRepository.find({
    where: {
      user: { uid: uid },
    },
    relations: {
      tags: true,
      discussionEntries: true,
      attachments: true,
    },
  });
};
