// src/postulante/entities/postulante.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postulante } from './postulante.entity';
import { CreatePostulanteDto } from '../dto/create-postulante.dto';

@Injectable()
export class PostulanteService {
  constructor(
    @InjectRepository(Postulante)
    private readonly postulanteRepository: Repository<Postulante>,
  ) {}

  // Listar todos los postulantes (GET /api/postulantes)
  async findAll(): Promise<Postulante[]> {
    return await this.postulanteRepository.find();
  }

  // Buscar un postulante por ID (GET /api/postulantes/:id)
  async findOne(id: number): Promise<Postulante> {
    const postulante = await this.postulanteRepository.findOne({ where: { idPostulante: id } });
    if (!postulante) {
      throw new NotFoundException(`Postulante con ID ${id} no encontrado`);
    }
    return postulante;
  }

  // Crear un nuevo postulante (POST /api/postulantes)
  async create(createPostulanteDto: CreatePostulanteDto): Promise<Postulante> {
    const nuevoPostulante = this.postulanteRepository.create(createPostulanteDto);
    return await this.postulanteRepository.save(nuevoPostulante);
  }

  // Actualizar un postulante (PUT /api/postulantes/:id)
  async update(id: number, updateDto: CreatePostulanteDto): Promise<Postulante> {
    const postulante = await this.findOne(id);
    Object.assign(postulante, updateDto);
    return await this.postulanteRepository.save(postulante);
  }
}