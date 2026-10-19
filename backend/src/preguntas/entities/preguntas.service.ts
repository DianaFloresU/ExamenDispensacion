// src/preguntas/entities/preguntas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { CreatePreguntasDto } from '../dto/create-preguntas.dto';

@Injectable()
export class PreguntasService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
  ) {}

  async findAll(): Promise<Pregunta[]> {
    return await this.preguntaRepository.find({
      relations: { materia: true },
    });
  }

  async findOne(idMateria: number, nroPregunta: number): Promise<Pregunta> {
    const pregunta = await this.preguntaRepository.findOne({
      where: { idMateria, nroPregunta },
      relations: { materia: true },
    });
    if (!pregunta) {
      throw new NotFoundException(`Pregunta ${nroPregunta} para la materia ${idMateria} no encontrada`);
    }
    return pregunta;
  }

  async findByMateria(idMateria: number): Promise<Pregunta[]> {
    return await this.preguntaRepository.find({
      where: { idMateria },
      relations: { materia: true },
    });
  }

  async create(createDto: CreatePreguntasDto): Promise<Pregunta> {
    const nuevaPregunta = this.preguntaRepository.create(createDto);
    return await this.preguntaRepository.save(nuevaPregunta);
  }

  async update(idMateria: number, nroPregunta: number, updateDto: CreatePreguntasDto): Promise<Pregunta> {
    const pregunta = await this.findOne(idMateria, nroPregunta);
    Object.assign(pregunta, updateDto);
    return await this.preguntaRepository.save(pregunta);
  }

  async remove(idMateria: number, nroPregunta: number): Promise<void> {
    const pregunta = await this.findOne(idMateria, nroPregunta);
    await this.preguntaRepository.remove(pregunta);
  }
}