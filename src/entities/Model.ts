import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("model_pkey", ["modelId"], { unique: true })
@Index("model_name", ["name"], {})
@Entity("model", { schema: "public" })
export class Model {
  @PrimaryGeneratedColumn({ type: "integer", name: "model_id" })
  modelId: number;

  @Column("integer", { name: "machine_id", nullable: true })
  machineId: number | null;

  @Column("character varying", { name: "name", nullable: true, length: 250 })
  name: string | null;

  @Column("timestamp with time zone", { name: "date_created", nullable: true })
  dateCreated: Date | null;

  @Column("timestamp with time zone", { name: "date_modified", nullable: true })
  dateModified: Date | null;
}
