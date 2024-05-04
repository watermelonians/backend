import { resolveObjectURL } from "buffer";
import { Request, Response, Router } from "express";
import { createTag, getTagsFromList } from "../services/tag.services";
import { findUserByUid } from "../services/user.services";
import { Role } from "../entities/User/Roles.entity";
import { assignRoleToUser, createRole } from "../services/role.services";

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

// router.all("/problemId", (req: Request, res: Response) => {
//   const problem = new Problem();

//   res.status(200).json({ so: problem.id ?? "shame" });
// });

router.post("/createRole", async (req: Request, res: Response) => {
  const { roleName } = req.body;
  // const uid = res.locals.uid;

  try {
    const role = (await createRole({ roleName })) ?? new Role();

    res.status(200).json({
      message: `Created Role ${role.roleName} with id ${role.id} `,
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

export default router;
