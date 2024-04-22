import { Entity, Column, Index, OneToMany, PrimaryColumn } from "typeorm";
import Model from "../Model.entity";
import { Problem } from "../Problem.entity";

@Entity()
export class User extends Model {
  // @Index("uid_index")
  @Column({ name: "uid", unique: true })
  uid: string;

  @Column({ name: "fname" })
  fName: string;

  @Column({ name: "lname" })
  lName: string;

  // @Index("email_index")
  @Column({ name: "email" })
  email: string;

  @Column({ name: "picture", default: "" })
  picture: string;

  @OneToMany((type) => Problem, (prob) => prob.user, {
    onDelete: "CASCADE",
    cascade: true,
  })
  problems: Problem[];
}

@Entity()
export class Teacher extends User {
  @Column({ name: "schoolJoinDate" })
  schoolJoinDate: Date;
}

@Entity()
export class Administration extends User {
  @Column({ name: "schoolJoinDate" })
  schoolJoinDate: Date;

  @Column({ name: "roles" })
  roles: String;

  @Column({ name: "isTeacher" })
  isTeacher: boolean;
}
