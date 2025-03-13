import { PartialType } from '@nestjs/mapped-types';
import { CreateAccesscontrolDto } from './create-accesscontrol.dto';

export class UpdateAccesscontrolDto extends PartialType(
  CreateAccesscontrolDto,
) {}
