import { Injectable } from '@nestjs/common';
import { CreateAccesscontrolDto } from './dto/create-accesscontrol.dto';
import { UpdateAccesscontrolDto } from './dto/update-accesscontrol.dto';

@Injectable()
export class AccesscontrolService {
  create(createAccesscontrolDto: CreateAccesscontrolDto) {
    return 'This action adds a new accesscontrol';
  }

  findAll() {
    return `This action returns all accesscontrol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accesscontrol`;
  }

  update(id: number, updateAccesscontrolDto: UpdateAccesscontrolDto) {
    return `This action updates a #${id} accesscontrol`;
  }

  remove(id: number) {
    return `This action removes a #${id} accesscontrol`;
  }
}
