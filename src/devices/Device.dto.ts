import { Model } from "../machines/Model.dto";
import { Owner } from "../owners/Owner.dto";
import { Attribute } from "./Attribute.dto";

export class Device {
  id: number;
  model: Model;
  owner: Owner;
  prefix?: string;
  serialNumber: string;
  description: string;
  attributes?: Attribute[];
}
