import { resolveObjectURL } from "buffer";
import { Request, Response, Router } from "express";
import { createTag, getTagsFromList } from "../services/tag.services";
import { findUserByUid } from "../services/user.services";
import { Role } from "../entities/User/Roles.entity";
import { assignRoleToUser, createRole } from "../services/role.services";
import { AppDataSource } from "../utils/data-source";
import { Content, Photo } from "../entities/Test/Content.entity";

const router = Router();

router.post("/getTagsFromList", async (req: Request, res: Response) => {
  const { tags } = req.body;

  let tagss = await getTagsFromList(tags);

  console.log("tagss", tagss);

  res.status(200).json({ tags: tagss });
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
    // error is an instance of AppError
    res.status(error.status).json({
      message: error.message,
    });
  }
});

router.post("/createRole", async (req: Request, res: Response) => {
  const { roleName } = req.body;
  // const uid = res.locals.uid;

  try {
    const role = (await createRole({ roleName })) ?? new Role();

    res.status(200).json({
      message: `Created Role ${role.roleName}} `,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
});

router.post("/assignRoleToUser", async (req: Request, res: Response) => {
  const { uid, roleName } = req.body;

  try {
    await assignRoleToUser({ uid, roleName });
    const user = await findUserByUid({ uid });

    res.status(200).json({
      message: "success",
      body: user,
    });
  } catch (error: any) {
    res.status(error.status).json({
      message: error.message,
    });
  }
});

const contentRepo = AppDataSource.getRepository(Content);
const photoRepo = AppDataSource.getRepository(Photo);

router.get("/createContent", async (req: Request, res: Response) => {
  const content = new Content();
  content.description = "DESC";
  content.title = "Here is a title";

  await contentRepo.save(content);

  res.json({ body: content });
});

router.get("/createPhoto", async (req: Request, res: Response) => {
  const photo = new Photo();
  photo.description = "cover photo";
  photo.title = "OMG it is working";
  photo.size = "1920*1080px";

  await photoRepo.save(photo);

  res.json({ body: photo });
});

router.get("/photos", async (req: Request, res: Response) => {
  const photos = await photoRepo.find();

  res.json({ body: photos });
});

router.get("/content", async (req: Request, res: Response) => {
  const contents = await contentRepo.find();

  res.json({ body: contents });
});

router.get("/photoFromContent", async (req: Request, res: Response) => {
  const c = await contentRepo.findOneBy({ id: 1 });

  const photoLike = { ...c, size: "1024x768" }; // Attempt to add Photo properties
  const photo = photoRepo.merge(new Photo(), photoLike);
  const contents = await contentRepo.find();

  await photoRepo.save(photo);
  await contentRepo.delete({
    id: c?.id ?? 0,
  });

  res.json({ body: photo });
});

export default router;
