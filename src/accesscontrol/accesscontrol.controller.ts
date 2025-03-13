import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccesscontrolService } from './accesscontrol.service';
import { CreateAccesscontrolDto } from './dto/create-accesscontrol.dto';
import { UpdateAccesscontrolDto } from './dto/update-accesscontrol.dto';

@Controller('accesscontrol')
export class AccesscontrolController {
  constructor(private readonly accesscontrolService: AccesscontrolService) {}

  @Post()
  create(@Body() createAccesscontrolDto: CreateAccesscontrolDto) {
    return this.accesscontrolService.create(createAccesscontrolDto);
  }

  @Get()
  findAll() {
    return this.accesscontrolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accesscontrolService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccesscontrolDto: UpdateAccesscontrolDto,
  ) {
    return this.accesscontrolService.update(+id, updateAccesscontrolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accesscontrolService.remove(+id);
  }
}
