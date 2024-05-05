import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import Model from "../Model.entity";
import { User } from "../User/User.entity";
import { Module_ } from "../Module.entity";
import { DiscussionEntry } from "./ProblemDiscussion.entity";
import { Tag } from "../Tag.entity";

@Entity("problem")
export class Problem extends Model {
  @ManyToOne((type) => User, (user) => user.problems, { nullable: false })
  user: User;

  @Column({ name: "title" })
  title: string;

  @Column({ name: "description" })
  description: string;

  @OneToMany((type) => Attachment, (attachment) => attachment.problem, {
    nullable: true,
  })
  attachments: Attachment[];

  @ManyToMany((type) => Tag, (tag) => tag.problems, { nullable: true })
  @JoinTable()
  tags: Tag[];

  @Column({ name: "isAnonymous", default: false })
  isAnonymous: boolean;

  @OneToMany((type) => DiscussionEntry, (de) => de.problem, {
    nullable: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  discussionEntries: DiscussionEntry[];

  @ManyToMany((type) => User)
  @JoinTable()
  likedUsers: User[];

  // TODO: cluster
}

@Entity("problem2students")
export class Problem2Students extends Problem {
  // TODO: problem2students
  @Column()
  destinees: string;
}

@Entity("problem2module")
export class Problem2Module extends Problem {
  @ManyToOne((type) => Module_, (module_) => module_.problems)
  module: Model;
}

@Entity("problem2administration")
export class Problem2Administration extends Problem {
  // TODO: problem2administration
  @Column()
  filter: string;
}

@Entity("attachment")
export class Attachment extends Model {
  @Column({ name: "title" })
  title: string;

  @Column({ name: "body" })
  body: string;

  @ManyToOne((type) => User, (user) => user.attachments)
  user: User;

  @ManyToOne((type) => Problem, (prob) => prob.attachments, {
    nullable: true /**sorry */,
  })
  problem: Problem;

  // type? as in image or doc or...
}
