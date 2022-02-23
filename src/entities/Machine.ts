import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("machine_pkey", ["machineId"], { unique: true })
@Index("machine_name", ["name"], {})
@Entity("machine", { schema: "public" })
export class Machine {
  @PrimaryGeneratedColumn({ type: "integer", name: "machine_id" })
  machineId: number;

  @Column("character varying", { name: "name", nullable: true, length: 250 })
  name: string | null;

  @Column("timestamp with time zone", { name: "date_created", nullable: true })
  dateCreated: Date | null;

  @Column("timestamp with time zone", { name: "date_modified", nullable: true })
  dateModified: Date | null;
}
