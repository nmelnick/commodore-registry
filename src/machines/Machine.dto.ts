import { Attribute } from "../devices/Attribute.dto";

export class Machine {
  id: number;
  name: string;
  attributes?: Attribute[];
}
