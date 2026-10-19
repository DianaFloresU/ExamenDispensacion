// src/inscripciones/inscripciones.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from '../entities/inscripciones.entity';
import { CreateInscripcionesDto } from '../dto/create-inscripciones.dto';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,
  ) {}

  async findAll(): Promise<Inscripcion[]> {
    return await this.inscripcionRepository.find({
      relations: {
        postulante: true,
        convocatoria: true,
      },
    });
  }

  async findOne(id: number): Promise<Inscripcion> {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { idInscripcion: id },
      relations: {
        postulante: true,
        convocatoria: true,
      },
    });
    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);
    }
    return inscripcion;
  }

  async create(createDto: CreateInscripcionesDto): Promise<Inscripcion> {
    const nuevaInscripcion = this.inscripcionRepository.create(createDto);
    return await this.inscripcionRepository.save(nuevaInscripcion);
  }

  async update(id: number, updateDto: CreateInscripcionesDto): Promise<Inscripcion> {
    const inscripcion = await this.findOne(id);
    Object.assign(inscripcion, updateDto);
    return await this.inscripcionRepository.save(inscripcion);
  }
}