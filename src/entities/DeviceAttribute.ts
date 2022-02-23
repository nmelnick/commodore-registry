import { Column, Entity, Index } from "typeorm";

@Index("device_attribute_pkey", ["attributeId", "deviceId"], { unique: true })
@Entity("device_attribute", { schema: "public" })
export class DeviceAttribute {
  @Column("integer", { primary: true, name: "device_id" })
  deviceId: number;

  @Column("integer", { primary: true, name: "attribute_id" })
  attributeId: number;

  @Column("character varying", {
    name: "attribute_value",
    nullable: true,
    length: 250,
  })
  attributeValue: string | null;

  @Column("timestamp with time zone", { name: "date_created", nullable: true })
  dateCreated: Date | null;
}
