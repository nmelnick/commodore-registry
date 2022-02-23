import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("owner_pkey", ["ownerId"], { unique: true })
@Entity("owner", { schema: "public" })
export class Owner {
  @PrimaryGeneratedColumn({ type: "integer", name: "owner_id" })
  ownerId: number;

  @Column("character varying", { name: "name", nullable: true, length: 250 })
  name: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 250 })
  email: string | null;

  @Column("character varying", {
    name: "location",
    nullable: true,
    length: 250,
  })
  location: string | null;

  @Column("character varying", { name: "salt", nullable: true, length: 16 })
  salt: string | null;

  @Column("character varying", { name: "pwhash", nullable: true, length: 70 })
  pwhash: string | null;

  @Column("timestamp with time zone", { name: "date_created", nullable: true })
  dateCreated: Date | null;

  @Column("timestamp with time zone", { name: "date_modified", nullable: true })
  dateModified: Date | null;
}
