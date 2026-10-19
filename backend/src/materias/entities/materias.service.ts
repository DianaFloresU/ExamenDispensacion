// src/materias/entities/materias.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './materias.entity';
import { CreateMateriasDto } from '../dto/create-materias.dto';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async findAll(): Promise<Materia[]> {
    return await this.materiaRepository.find();
  }

  async findOne(id: number): Promise<Materia> {
    const materia = await this.materiaRepository.findOne({
      where: { idMateria: id },
    });
    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }
    return materia;
  }

  async create(createDto: CreateMateriasDto): Promise<Materia> {
    const nuevaMateria = this.materiaRepository.create(createDto);
    return await this.materiaRepository.save(nuevaMateria);
  }

  async update(id: number, updateDto: CreateMateriasDto): Promise<Materia> {
    const materia = await this.findOne(id);
    Object.assign(materia, updateDto);
    return await this.materiaRepository.save(materia);
  }
}