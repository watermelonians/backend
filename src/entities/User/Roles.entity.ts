import { Column, Entity, ManyToMany } from "typeorm";
import Model from "../Model.entity";
import { User } from "./User.entity";

export enum studentRolesEnumType {
  Delegate = "Delegate",
  SectionDeleguate = "Section Delguate",
  ClubOffice = "Club Office",
  AdminBoard = "Administration Board",
}


@Entity("role")
export class Role extends Model {
  @Column({
    unique: true,
    name: "rolename",
    type: "character varying",
  })
  roleName: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];
}


