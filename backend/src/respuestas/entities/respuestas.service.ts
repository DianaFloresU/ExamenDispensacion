// src/respuestas/entities/respuestas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { CreateRespuestasDto } from '../dto/create-respuestas.dto';

@Injectable()
export class RespuestasService {
  constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) {}

  async findAll(): Promise<Respuesta[]> {
    return await this.respuestaRepository.find({
      relations: {
        inscripcion: true,
        pregunta: true,
      },
    });
  }

  async findByInscripcion(idInscripcion: number): Promise<Respuesta[]> {
    return await this.respuestaRepository.find({
      where: { idInscripcion },
      relations: {
        pregunta: true,
      },
    });
  }

  async findOne(idInscripcion: number, idMateria: number, idPregunta: number): Promise<Respuesta> {
    const respuesta = await this.respuestaRepository.findOne({
      where: { idInscripcion, idMateria, idPregunta },
      relations: {
        inscripcion: true,
        pregunta: true,
      },
    });
    if (!respuesta) {
      throw new NotFoundException(
        `Respuesta para inscripción ${idInscripcion}, materia ${idMateria} y pregunta ${idPregunta} no encontrada`,
      );
    }
    return respuesta;
  }

  async create(createDto: CreateRespuestasDto): Promise<Respuesta> {
    const nuevaRespuesta = this.respuestaRepository.create(createDto);
    return await this.respuestaRepository.save(nuevaRespuesta);
  }

  async update(
    idInscripcion: number,
    idMateria: number,
    idPregunta: number,
    updateDto: CreateRespuestasDto,
  ): Promise<Respuesta> {
    const respuesta = await this.findOne(idInscripcion, idMateria, idPregunta);
    Object.assign(respuesta, updateDto);
    return await this.respuestaRepository.save(respuesta);
  }

  async remove(idInscripcion: number, idMateria: number, idPregunta: number): Promise<void> {
    const respuesta = await this.findOne(idInscripcion, idMateria, idPregunta);
    await this.respuestaRepository.remove(respuesta);
  }
}