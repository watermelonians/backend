import { User } from "../entities/User/User.entity";
import { AppDataSource } from "../utils/data-source";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: Partial<User>) => {
  console.log("create user input::\n", input);
  const user = AppDataSource.manager.create(User, input);

  return (await AppDataSource.manager.save(user)) as User;
};

export const findUserByUid = async ({ uid }: { uid: string }) => {
  return await userRepository.findOneBy({ uid });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

// (...)
