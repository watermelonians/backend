import { Column, Entity } from "typeorm";
import { User } from "./User.entity";

@Entity("student")
export class Student extends User {
  @Column({ name: "promo" })
  promo: string;

  @Column({ name: "section" })
  section: string;

  @Column({ name: "group" })
  group: string;
}
