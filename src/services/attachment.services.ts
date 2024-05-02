import { Attachment } from "../entities/Problem/Problem.entity";
import { User } from "../entities/User/User.entity";
import { attachmentType as attachmentsType } from "../schemas/problem.schemas";
import { AppDataSource } from "../utils/data-source";
import { findProblemById } from "./problem.services";
import { findUserByUid } from "./user.services";

export const createAttachmentsFromList = async (
  uid: string,
  attachments: attachmentsType
) => {
  if (!attachments) return;
  let atts: Attachment[] = [];

  const attachmentPromises = attachments.map(async (entry) => {
    const attachment = new Attachment();
    attachment.title = entry.attachmentTitle;
    attachment.body = entry.attachmentBody;

    attachment.user = (await findUserByUid({ uid })) ?? new User();

    const savedAttachement = (await AppDataSource.manager.save(
      attachment
    )) as Attachment;
    atts.push(savedAttachement);
  });

  // TEST
  await Promise.all(attachmentPromises);
  
  return atts;
};
