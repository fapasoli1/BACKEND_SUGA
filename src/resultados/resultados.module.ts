import { Module } from '@nestjs/common';
import { ResultadosService } from './resultados.service';
import { ResultadosController } from './resultados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resultado } from './entities/resultado.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Programa } from 'src/programa/entities/programa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resultado, Competencia, Programa])],
  controllers: [ResultadosController],
  providers: [ResultadosService],
})
export class ResultadosModule {}
