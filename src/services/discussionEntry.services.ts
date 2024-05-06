import { DiscussionEntry } from "../entities/Problem/ProblemDiscussion.entity";
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/data-source";
import { findUserByUid } from "./user.services";

// DiscussionEntry Respository
const deRepository = AppDataSource.getRepository(DiscussionEntry);

export const findDiscussionEntryById = async ({
  discussionEntryId,
}: {
  discussionEntryId: string;
}) => {
  const de = await deRepository.findOne({
    where: { id: discussionEntryId },
    relations: { likedUsers: true },
  });

  if (!de) {
    throw new AppError(
      404,
      `No DiscussionEntry found with id ${discussionEntryId}`
    );
  }
  return de;
};

export const likeDiscussionEntry = async ({
  uid,
  discussionEntryId,
}: {
  uid: string;
  discussionEntryId: string;
}) => {
  try {
    const user = await findUserByUid({ uid });
    const de = await findDiscussionEntryById({ discussionEntryId });

    // Check if user already liked de
    const isDEAlreadyLiked = de.likedUsers.some(
      (likedUser) => likedUser.id === user.id
    );

    if (!isDEAlreadyLiked) {
      de.likedUsers.push(user);
      console.log(`de.likedUsers after insert:`, de.likedUsers);
      return await deRepository.save(de);
    } else {
      throw new AppError(200, "Nothing to Like (Already liked)");
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const unLikeDiscussionEntry = async ({
  uid,
  discussionEntryId,
}: {
  uid: string;
  discussionEntryId: string;
}) => {
  try {
    const user = await findUserByUid({ uid });
    const de = await findDiscussionEntryById({ discussionEntryId });

    // Check if user already liked de
    const userIndex = de.likedUsers.findIndex(
      (likedUser) => likedUser.id === user.id
    );

    if (userIndex !== -1) {
      de.likedUsers.splice(userIndex, 1); // Remove user from the likedUsers array
      return await deRepository.save(de); // Save the updated comment
    } else {
      throw new AppError(200, "Nothing to Unlike");
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
