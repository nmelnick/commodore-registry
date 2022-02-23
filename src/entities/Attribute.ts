import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("attribute_pkey", ["attributeId"], { unique: true })
@Index("attribute_name", ["name"], {})
@Entity("attribute", { schema: "public" })
export class Attribute {
  @PrimaryGeneratedColumn({ type: "integer", name: "attribute_id" })
  attributeId: number;

  @Column("character varying", { name: "name", nullable: true, length: 64 })
  name: string | null;
}
