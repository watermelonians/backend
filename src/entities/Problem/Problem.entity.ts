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
import { DiscussionEntry } from "./ProblemDiscussion";
import { Tag } from "../Tag";

@Entity("problem")
export class Problem extends Model {
  @ManyToOne((type) => User, (user) => user.problems, { nullable: false })
  user: User;

  @Column({ name: "title" })
  title: string;

  @Column({ name: "description" })
  description: string;

  // TODO: implement attachments table
  @Column({
    name: "attachments",
    type: "text",
    default: [],
    array: true,
    nullable: true,
  })
  attachments: string[];

  @ManyToMany((type) => Tag, { nullable: true })
  @JoinTable()
  tags: Tag[];

  @Column({ name: "isAnonymous", default: false })
  isAnonymous: boolean;

  // TODO: implement Discussion mechanics
  @OneToMany((type) => DiscussionEntry, (de) => de.problem, {
    nullable: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  discussionEntries: DiscussionEntry[];

  // TODO: implement likes mechanics

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
