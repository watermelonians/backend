import { ProfilingLevel } from "typeorm";
import {
  Attachment,
  Problem,
  Problem2Administration,
  Problem2Module,
  Problem2Students,
} from "../entities/Problem/Problem.entity";
import { AppDataSource } from "../utils/data-source";
import { Tag } from "../entities/Tag.entity";
import { getTagsFromList } from "./tag.services";
import { findUserByUid } from "./user.services";
import { User } from "../entities/User/User.entity";
import { attachmentType as attachmentArrayType } from "../schemas/problem.schemas";
import { createAttachmentsFromList } from "./attachment.services";

const problemRepository = AppDataSource.getRepository(Problem);

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

  // TODO: attachments
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
