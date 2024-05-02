import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import Model from "../Model.entity";
import { User } from "../User/User.entity";
import { Problem } from "./Problem.entity";

@Entity("discussionentry")
export class DiscussionEntry extends Model {
  @ManyToOne((type) => User, (user) => user.discussionEntries, {
    nullable: false,
  })
  user: User;

  @ManyToOne((type) => Problem, (prob) => prob.discussionEntries)
  problem: Problem;

  @OneToMany((type) => CommentDiscussionEntry, (cde) => cde.discussionEntry)
  comments: CommentDiscussionEntry[];

  @Column({ name: "body" })
  body: string;
}

@Entity("commentdiscussionentry")
export class CommentDiscussionEntry extends Model {
  @ManyToOne((type) => User, (user) => user.commentsDiscussionEntries, {
    nullable: false,
  })
  user: User;

  @ManyToOne((type) => DiscussionEntry, (de) => de.comments, {
    nullable: false,
  })
  discussionEntry: DiscussionEntry;

  @Column({ name: "body" })
  body: string;

  // TODO: likes for CommentDiscussionEntry
}
