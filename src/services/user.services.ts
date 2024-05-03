import { User } from "../entities/User/User.entity";
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/data-source";
import { Student } from "../entities/User/Student.entity";

const userRepository = AppDataSource.getRepository(User);
const studentRepository = AppDataSource.getRepository(Student);

export const createUser = async (input: Partial<User>) => {
  console.log("create user input::\n", input);
  const user = AppDataSource.manager.create(User, input);

  return (await AppDataSource.manager.save(user)) as User;
};

export const findUserByUid = async ({ uid }: { uid: string }) => {
  try {
    return await userRepository.findOneBy({ uid });
  } catch (error: any) {
    throw new AppError(404, `No User found with uid ${uid}`);
  }
};

export const findUser = async (query: Object) => {
  try {
    return await userRepository.findOneBy(query);
  } catch (error: any) {
    throw new AppError(404, "No User found");
  }
};

export const findAllUsers = async () => {
  try {
    return await userRepository.find();
  } catch (error: any) {
    // console.log(error);
    throw new AppError(500, "Unknown error retrieving all users");
  }
};

export const findAllStudentUsers = async () => {
  try {
    return await userRepository.find({
      relations: {
        student: true,
      },
    });
  } catch (error: any) {
    // console.log(error);
    throw new AppError(500, "Unknown error retrieving all users");
  }
};

export const findAllTeacherUsers = async () => {
  try {
    return await userRepository.find({
      relations: {
        teacher: true,
      },
    });
  } catch (error: any) {
    // console.log(error);
    throw new AppError(500, "Unknown error retrieving all users");
  }
};

export const findAllAdministrationUsers = async () => {
  try {
    return await userRepository.find({
      relations: {
        administration: true,
      },
    });
  } catch (error: any) {
    // console.log(error);
    throw new AppError(500, "Unknown error retrieving all users");
  }
};

export const createStudentUser = async ({
  uid,
  promo,
  section,
  group,
}: {
  uid: string;
  promo: string;
  section: string;
  group: string;
}) => {
  let user: User | null;
  try {
    user = await findUserByUid({ uid });
  } catch (error: any) {
    throw error;
  }

  const student = new Student();

  student.promo = promo;
  student.section = section;
  student.group = group;
  student.user = user ?? new User();

  return await studentRepository.save(student);
};
// (...)
