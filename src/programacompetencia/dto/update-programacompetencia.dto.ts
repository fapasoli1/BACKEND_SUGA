import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramacompetenciaDto } from './create-programacompetencia.dto';

export class UpdateProgramacompetenciaDto extends PartialType(CreateProgramacompetenciaDto) {}
