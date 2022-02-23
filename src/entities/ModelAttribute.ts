import { Column, Entity, Index } from "typeorm";

@Index("model_attribute_pkey", ["attributeId", "modelId"], { unique: true })
@Entity("model_attribute", { schema: "public" })
export class ModelAttribute {
  @Column("integer", { primary: true, name: "model_id" })
  modelId: number;

  @Column("integer", { primary: true, name: "attribute_id" })
  attributeId: number;
}
