import { Column, Entity } from "typeorm";
import Model from "./Model.entity";

@Entity("tag")
export class Tag extends Model {
  @Column({ name: "name" })
  name: string;
}
