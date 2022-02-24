import { Column, Entity, Index } from "typeorm";

@Index("machine_attribute_pkey", ["attributeId", "machineId"], { unique: true })
@Entity("machine_attribute", { schema: "public" })
export class MachineAttribute {
  @Column("integer", { primary: true, name: "machine_id" })
  machineId: number;

  @Column("integer", { primary: true, name: "attribute_id" })
  attributeId: number;
}
