// src/opciones/entities/opciones.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opcion } from './opcion.entity';
import { CreateOpcionesDto } from '../dto/create-opciones.dto';

@Injectable()
export class OpcionesService {
  constructor(
    @InjectRepository(Opcion)
    private readonly opcionRepository: Repository<Opcion>,
  ) {}

  async findAll(): Promise<Opcion[]> {
    return await this.opcionRepository.find({
      relations: { pregunta: true },
    });
  }

  async findOne(idMateria: number, nroPregunta: number, idOpcion: string): Promise<Opcion> {
    const opcion = await this.opcionRepository.findOne({
      where: { idMateria, nroPregunta, idOpcion },
      relations: { pregunta: true },
    });
    if (!opcion) {
      throw new NotFoundException(`Opción ${idOpcion} para la pregunta ${nroPregunta} (materia ${idMateria}) no encontrada`);
    }
    return opcion;
  }

  async findByPregunta(idMateria: number, nroPregunta: number): Promise<Opcion[]> {
    return await this.opcionRepository.find({
      where: { idMateria, nroPregunta },
      relations: { pregunta: true },
    });
  }

  async create(createDto: CreateOpcionesDto): Promise<Opcion> {
    const nuevaOpcion = this.opcionRepository.create(createDto);
    return await this.opcionRepository.save(nuevaOpcion);
  }

  async update(idMateria: number, nroPregunta: number, idOpcion: string, updateDto: CreateOpcionesDto): Promise<Opcion> {
    const opcion = await this.findOne(idMateria, nroPregunta, idOpcion);
    Object.assign(opcion, updateDto);
    return await this.opcionRepository.save(opcion);
  }

  async remove(idMateria: number, nroPregunta: number, idOpcion: string): Promise<void> {
    const opcion = await this.findOne(idMateria, nroPregunta, idOpcion);
    await this.opcionRepository.remove(opcion);
  }
}