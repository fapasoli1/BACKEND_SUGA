import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resultado } from './entities/resultado.entity';
import { Repository } from 'typeorm';
import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Programa } from 'src/programa/entities/programa.entity';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(Resultado)
    private resultadoRepository: Repository<Resultado>,
    @InjectRepository(Competencia)
    private readonly competenciaRepository: Repository<Competencia>,
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
  ) {}

  async create(createResultadoDto: CreateResultadoDto, competenciaId: number, programaId) {
    
    const programa = await this.programaRepository.findOne({ where: { id: programaId } });
    if (!programa) {
      throw new NotFoundException('Programa no encontrado');
    }
  
    const competencia = await this.competenciaRepository.findOne({ where: { id: competenciaId } });

    if (!competencia) {
      throw new Error('Competencia not found');
    }


    const resul = this.resultadoRepository.create({
      ...createResultadoDto,
      competencia,
      programa
       // Asocia el resultado a la competencia
    });

    return await this.resultadoRepository.save(resul);
  }

  async findresultadoprocomp(idPrograma: number, idCompetencia: number): Promise<Resultado[]> {
    const programa = await this.programaRepository.findOne({ where: { id: idPrograma } });
    if (!programa) {
      throw new NotFoundException('Programa no encontrado');
    }

    const competencia = await this.competenciaRepository.findOne({ where: { id: idCompetencia } });
    if (!competencia) {
      throw new NotFoundException('Competencia no encontrada');
    }

    return await this.resultadoRepository.find({
      where: {    programa : { id : idPrograma },
        competencia: { id : idCompetencia },
      },
    });
  }

  findAll() {
    return `This action returns all resultados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resultado`;
  }

  async update(id: number, updateResultadoDto: UpdateResultadoDto) {
    const resultado = await this.resultadoRepository.findOne({ where: { id: id } });
    if (!resultado) {
      throw new NotFoundException('Resultado no encontrado');
    }

    // Actualiza los campos según el DTO
    Object.assign(resultado, updateResultadoDto);
    
    return await this.resultadoRepository.save(resultado);

  }

  async remove(id: number) {
    const resultado = await this.resultadoRepository.findOne({ where: { id: id } });
    if (!resultado) {
      throw new NotFoundException('Resultado no encontrado');
    }

    await this.resultadoRepository.delete(id);
  }
}
