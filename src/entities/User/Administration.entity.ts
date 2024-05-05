import { Column, Entity, OneToOne } from "typeorm";
import { User } from "./User.entity";
import Model from "../Model.entity";

@Entity("administration")
export class Administration extends Model {
  @Column({ name: "schoolJoinDate" })
  schoolJoinDate: Date;

  // @Column({ name: "roles" })
  // roles: String;

  @Column({ name: "isTeacher" })
  isTeacher: boolean;

  @OneToOne((type) => User, (user) => user.administration)
  user: User;
}
