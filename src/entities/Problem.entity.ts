import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import Model from "./Model.entity";
import { User } from "./User/User.entity";
import { Module_ } from "./Module.entity";

@Entity("tag")
export class Tag extends Model {
  @Column({ name: "name" })
  name: string;
}

@Entity("problem")
export class Problem extends Model {
  @ManyToOne((type) => User, (user) => user.problems)
  user: User;

  @Column({ name: "body" })
  body: string;

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
}

@Entity("problem2students")
export class Problem2Students extends Model {
  // TODO: problem2students
  @Column()
  destinees: string;
}

@Entity("problem2module")
export class Problem2Module extends Model {
  @ManyToOne((type) => Module_, (module_) => module_.problems)
  module: Model;
}

@Entity("problem2administration")
export class Problem2Administration extends Model {
  // TODO: problem2administration
  @Column()
  filter: string;
}
