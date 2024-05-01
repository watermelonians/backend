import { Column, Entity, OneToMany } from "typeorm";
import Model from "./Model.entity";
import { Problem2Module } from "./Problem/Problem.entity";

@Entity("module_")
export class Module_ extends Model {
  @OneToMany((type) => Problem2Module, (prob) => prob.module)
  problems: Problem2Module[];

  @Column({ name: "name" })
  name: string;

  // TODO: teacher? year?
}
