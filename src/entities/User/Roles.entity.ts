import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import Model from "../Model.entity";
import { User } from "./User.entity";

export enum studentRolesEnumType {
  Delegate = "Delegate",
  SectionDeleguate = "Section Delguate",
  ClubOffice = "Club Office",
  AdminBoard = "Administration Board",
}

@Entity("role")
export class Role extends BaseEntity {
  @PrimaryColumn({
    unique: true,
    name: "rolename",
    type: "character varying",
  })
  roleName: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];
}
