import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
} from "typeorm";
import Model from "../Model.entity";
import { Attachment, Problem } from "../Problem/Problem.entity";
import {
  CommentDiscussionEntry,
  DiscussionEntry,
} from "../Problem/ProblemDiscussion.entity";
import { Student } from "./Student.entity";
import { Teacher } from "./Teacher.entity";
import { Administration } from "./Administration.entity";

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

  // I'm sorry wallah
  @OneToOne((type) => Student, (stud) => stud.user, {
    nullable: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  student: Student;

  @OneToOne((type) => Teacher, (teacher) => teacher.user, {
    nullable: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  teacher: Teacher;

  @OneToOne((type) => Administration, (administration) => administration.user, {
    nullable: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  @JoinColumn()
  administration: Administration;
}
