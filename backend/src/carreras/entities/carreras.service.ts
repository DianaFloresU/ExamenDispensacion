// src/carreras/entities/carreras.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './carreras.entity';
import { CreateCarrerasDto } from '../dto/create-carreras.dto';

@Injectable()
export class CarrerasService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  // Listar todas las carreras (GET /api/carreras)
  async findAll(): Promise<Carrera[]> {
    return await this.carreraRepository.find({
      relations: { facultad: true, materias: true } // Incluir relaciones con facultad y materias
    });
  }

  // Buscar una carrera por ID (GET /api/carreras/:id)
  async findOne(id: number): Promise<Carrera> {
    const carrera = await this.carreraRepository.findOne({
      where: { idCarrera: id },
      relations: { facultad: true, materias: true } // Incluir relaciones con facultad y materias
    });
    if (!carrera) {
      throw new NotFoundException(`Carrera con ID ${id} no encontrada`);
    }
    return carrera;
  }

  // Buscar carreras por ID de Facultad
  async findByFacultad(idFacultad: number): Promise<Carrera[]> {
    return await this.carreraRepository.find({
      where: { idFacultad },
    });
  }

  // Crear una nueva carrera (POST /api/carreras)
  async create(createCarrerasDto: CreateCarrerasDto): Promise<Carrera> {
    const nuevaCarrera = this.carreraRepository.create(createCarrerasDto);
    return await this.carreraRepository.save(nuevaCarrera);
  }

  // Actualizar una carrera (PUT /api/carreras/:id)
  async update(id: number, updateDto: CreateCarrerasDto): Promise<Carrera> {
    const carrera = await this.findOne(id);
    Object.assign(carrera, updateDto);
    return await this.carreraRepository.save(carrera);
  }
}