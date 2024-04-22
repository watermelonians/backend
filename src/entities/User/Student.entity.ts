import { Column, Entity } from "typeorm";
import Model from "../Model.entity";
import { User } from "./User.entity";

@Entity()
export class Student extends User {
  @Column({ name: "promo" })
  promo: string;

  @Column({ name: "section" })
  section: string;

  @Column({ name: "group" })
  group: string;
}
