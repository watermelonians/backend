import { Tag } from "../entities/Tag.entity";
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/data-source";

const tagRepository = AppDataSource.getRepository(Tag);

export const createTag = async (input: Partial<Tag>) => {
  try {
    const tag = AppDataSource.manager.create(Tag, input);

    return (await AppDataSource.manager.save(tag)) as Tag;
  } catch (error: any) {
    console.log("Loggin error: \n\n\n\n\n", error);
    if (error.code === "23505") {
      throw new AppError(400, `Tag ${error.detail}`);
    } else {
      throw new AppError(500, "Unknown error creating Tags");
    }
  }
};

export const findTagByName = async (tagName: string) => {
  return await tagRepository.findOneBy({ name: tagName });
};

export const getTagsFromList = async (tags: string[]): Promise<Tag[]> => {
  const tagsArray: Tag[] = [];

  // Map each tagName to a Promise returned by findTagByName
  const tagPromises = tags.map((tagName) =>
    findTagByName(tagName)
      .then((tag) => {
        if (tag) {
          tagsArray.push(tag);
        } else {
          console.log(`tag with name: ${tagName} does not exist`);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  );

  // Wait for all promises to resolve
  await Promise.all(tagPromises);
  return tagsArray;
};
