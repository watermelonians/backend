import {
  Entity,
  Column,
  Index,
  OneToMany,
  PrimaryColumn,
  OneToOne,
} from "typeorm";
import Model from "../Model.entity";
import { Problem } from "../Problem/Problem.entity";
import {
  CommentDiscussionEntry,
  DiscussionEntry,
} from "../Problem/ProblemDiscussion";

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
    nullable: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  problems: Problem[];

  @OneToMany((type) => DiscussionEntry, (de) => de.user, {
    nullable: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  discussionEntries: DiscussionEntry[];

  @OneToMany((type) => CommentDiscussionEntry, (cde) => cde.user, {
    nullable: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  commentsDiscussionEntries: CommentDiscussionEntry[];

  // TODO: User roles

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

  // @Column({ name: "roles" })
  // roles: String;

  @Column({ name: "isTeacher" })
  isTeacher: boolean;
}
