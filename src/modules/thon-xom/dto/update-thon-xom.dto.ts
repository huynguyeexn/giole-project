import { PartialType } from '@nestjs/mapped-types';
import { CreateThonXomDto } from './create-thon-xom.dto';

export class UpdateThonXomDto extends PartialType(CreateThonXomDto) {}
