import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Owner as OwnerEntity } from "../entities/Owner";
import { Owner } from "./Owner.dto";

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnerEntity)
    private ownerRepository: Repository<OwnerEntity>
  ) {}

  async getAllOwners(): Promise<Owner[]> {
    return (await this.ownerRepository.find({})).map((o) => ({
      id: o.ownerId,
      name: o.name,
      location: o.location,
    }));
  }
}
