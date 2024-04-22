import { Column, Entity } from "typeorm";
import Model from "../Model.entity";

export enum studentRolesEnumType {
  Delegate = "Delegate",
  SectionDeleguate = "Section Delguate",
  ClubOffice = "Club Office",
  AdminBoard = "Administration Board",
}

export class StudentRoles extends Model {
  @Column({
    name: "role",
    type: "enum",
    enum: studentRolesEnumType,
    default: null,
  })
  role: studentRolesEnumType;
}

enum teacherRolesEnumType {
  Maths = "Mathematics",
  CS = "CS",
  AI = "AI",
  LiteratureAndBusiness = "Literature & Business",
}

export class TeacherRoles extends Model {
  @Column({
    name: "role",
    type: "enum",
    enum: teacherRolesEnumType,
    default: null,
  })
  role: teacherRolesEnumType;
}

enum adminRolesEnumType {
  Director = "Director",
  Department = "Department",
  ViceDirector = "Vice Director",
  // (...)
}

export class AdminRoles extends Model {
  @Column({
    name: "role",
    type: "enum",
    enum: adminRolesEnumType,
    default: null,
  })
  role: adminRolesEnumType;
}
