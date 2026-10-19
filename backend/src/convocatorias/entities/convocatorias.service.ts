// src/convocatorias/convocatorias.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Convocatoria } from '../entities/convocatorias.entity';
import { CreateConvocatoriasDto } from '../dto/create-convocatorias.dto';

@Injectable()
export class ConvocatoriasService {
  constructor(
    @InjectRepository(Convocatoria)
    private readonly convocatoriaRepository: Repository<Convocatoria>,
  ) {}

  async findAll(): Promise<Convocatoria[]> {
    return await this.convocatoriaRepository.find({
      relations: { carrera: true },
    });
  }

  async findOne(id: number): Promise<Convocatoria> {
    const convocatoria = await this.convocatoriaRepository.findOne({
      where: { idConvocatoria: id },
      relations: { carrera: true },
    });
    if (!convocatoria) {
      throw new NotFoundException(`Convocatoria con ID ${id} no encontrada`);
    }
    return convocatoria;
  }

  async create(createDto: CreateConvocatoriasDto): Promise<Convocatoria> {
    const nuevaConvocatoria = this.convocatoriaRepository.create(createDto);
    return await this.convocatoriaRepository.save(nuevaConvocatoria);
  }

  async update(id: number, updateDto: CreateConvocatoriasDto): Promise<Convocatoria> {
    const convocatoria = await this.findOne(id);
    Object.assign(convocatoria, updateDto);
    return await this.convocatoriaRepository.save(convocatoria);
  }
}