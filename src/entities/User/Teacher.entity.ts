import { Column, Entity, OneToOne } from "typeorm";
import { User } from "./User.entity";
import Model from "../Model.entity";

@Entity("teacher")
export class Teacher extends Model {
  @Column({ name: "schoolJoinDate" })
  schoolJoinDate: Date;

  @OneToOne((type) => User, (user) => user.teacher)
  user: User;
}
