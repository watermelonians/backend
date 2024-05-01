import { Entity, Column, OneToMany, ManyToMany } from "typeorm";
import Model from "../Model.entity";
import { Attachment, Problem } from "../Problem/Problem.entity";
import {
  CommentDiscussionEntry,
  DiscussionEntry,
} from "../Problem/ProblemDiscussion.entity";

@Entity("user")
export class User extends Model {
  // @Index("uid_index")
  @Column({ name: "uid", unique: true })
  uid: string;

  @Column({ name: "displayname" })
  displayName: string;

  // @Index("email_index")
  @Column({ name: "email" })
  email: string;

  @Column({ name: "photourl", default: "" })
  photoURL: string;

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

  @ManyToMany((type) => Problem, (prob) => prob.likedUsers, { nullable: true })
  likedProblems: Problem[];

  @OneToMany((type) => Attachment, (att) => att.user)
  attachments: Attachment[];

  // TODO: User roles
}

@Entity("teacher")
export class Teacher extends User {
  @Column({ name: "schoolJoinDate" })
  schoolJoinDate: Date;
}

@Entity("administration")
export class Administration extends User {
  @Column({ name: "schoolJoinDate" })
  schoolJoinDate: Date;

  // @Column({ name: "roles" })
  // roles: String;

  @Column({ name: "isTeacher" })
  isTeacher: boolean;
}
