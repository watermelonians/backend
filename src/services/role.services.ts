import { UserRecord } from "firebase-admin/auth";
import { Role } from "../entities/User/Roles.entity";
import { User } from "../entities/User/User.entity";
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/data-source";
import { findUserByUid } from "./user.services";

const roleRepository = AppDataSource.getRepository(Role);
const userRepository = AppDataSource.getRepository(User);
export const createRole = async ({ roleName }: { roleName: string }) => {
  try {
    const role = new Role();
    role.roleName = roleName;

    return await AppDataSource.manager.save(role);
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    } else if (error.code == "23505") {
      throw new AppError(400, `${error.detail}`);
    } else {
      console.log(error);
      throw new AppError(500, error.detail ?? "Unknown Error Creating Role");
    }
  }
};

export const findRoleByRoleName = async ({
  roleName,
}: {
  roleName: string;
}) => {
  try {
    const user = await roleRepository.findOneBy({ roleName });
    // console.log(`LOOOOK HERE`, user);
    if (!user) {
      console.log("can't find this user, throwing error");
      throw new AppError(404, `No Role found with roleName ${roleName} `);
    }
    return user;
  } catch (error: any) {
    console.log("caught error sadly", error.message);

    throw new AppError(
      404,
      error.detail ?? `No Role found with roleName ${roleName} `
    );
  }
};

export const assignRoleToUser = async ({
  uid,
  roleName,
}: {
  uid: string;
  roleName: string;
}) => {
  try {
    const role = (await findRoleByRoleName({ roleName })) ?? new Role();
    // console.log("\n-----------------------\nfound role: ", role);

    const user = await findUserByUid({ uid });
    // console.log("\n-----------------------\nuser: ", user);
    // TODO fix chatgpt's retarded codes
    const hasRole = user.roles
      ? user.roles.find((r) => r.id === role.id)
      : false;
    if (!hasRole) {
      user.roles.push(role); // Add the role if not already present
    }

    await userRepository.save(user);
  } catch (error: any) {
    console.log(error);
    throw new AppError(500, error.message ?? "Error?????? hmm,mm");
  }
};
