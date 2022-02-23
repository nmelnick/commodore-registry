import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("device_pkey", ["deviceId"], { unique: true })
@Index("device_model_id", ["modelId"], {})
@Index("device_owner_id", ["ownerId"], {})
@Entity("device", { schema: "public" })
export class Device {
  @PrimaryGeneratedColumn({ type: "integer", name: "device_id" })
  deviceId: number;

  @Column("integer", { name: "model_id" })
  modelId: number;

  @Column("integer", { name: "owner_id" })
  ownerId: number;

  @Column("character varying", { name: "prefix", nullable: true, length: 8 })
  prefix: string | null;

  @Column("character varying", {
    name: "serial_number",
    nullable: true,
    length: 32,
  })
  serialNumber: string | null;

  @Column("character varying", { name: "source", nullable: true, length: 32 })
  source: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp with time zone", { name: "date_created", nullable: true })
  dateCreated: Date | null;

  @Column("timestamp with time zone", { name: "date_modified", nullable: true })
  dateModified: Date | null;
}
