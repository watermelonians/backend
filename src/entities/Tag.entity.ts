import { Column, Entity, ManyToMany } from "typeorm";
import Model from "./Model.entity";
import { Problem } from "./Problem/Problem.entity";

@Entity("tag")
export class Tag extends Model {
  @Column({ name: "name", unique: true })
  name: string;

  @ManyToMany((type) => Problem, (prob) => prob.tags, { nullable: true })
  problems: Problem[];
}
