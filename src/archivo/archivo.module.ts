import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { Resultado } from 'src/resultados/entities/resultado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo, Resultado])],
  controllers: [ArchivoController],
  providers: [ArchivoService],
})
export class ArchivoModule {}
