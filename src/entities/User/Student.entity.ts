import { Column, Entity, OneToOne } from "typeorm";
import { User } from "./User.entity";
import Model from "../Model.entity";

@Entity("student")
export class Student extends Model {
  @Column({ name: "promo" })
  promo: string;

  @Column({ name: "section" })
  section: string;

  @Column({ name: "group" })
  group: string;

  @OneToOne((type) => User, (user) => user.student, {
    nullable: false,
    onDelete: "NO ACTION",
  })
  user: User;
}
