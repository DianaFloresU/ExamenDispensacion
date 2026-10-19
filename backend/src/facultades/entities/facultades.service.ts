// src/facultades/entities/facultades.service.ts (o la ruta donde lo tengas)
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facultad } from './facultades.entity';
import { CreateFacultadesDto } from '../dto/create-facultades.dto';

@Injectable()
export class FacultadesService {
  constructor(
    @InjectRepository(Facultad)
    private readonly facultadRepository: Repository<Facultad>,
  ) {}

  async findAll(): Promise<Facultad[]> {
    return await this.facultadRepository.find();
  }

  async findOne(id: number): Promise<Facultad> {
    const facultad = await this.facultadRepository.findOne({ where: { idFacultad: id } });
    if (!facultad) {
      throw new NotFoundException(`Facultad con ID ${id} no encontrada`);
    }
    return facultad;
  }

  async create(createFacultadesDto: CreateFacultadesDto): Promise<Facultad> {
    const nuevaFacultad = this.facultadRepository.create(createFacultadesDto);
    return await this.facultadRepository.save(nuevaFacultad);
  }

  async update(id: number, updateDto: CreateFacultadesDto): Promise<Facultad> {
    const facultad = await this.findOne(id);
    Object.assign(facultad, updateDto);
    return await this.facultadRepository.save(facultad);
  }
}