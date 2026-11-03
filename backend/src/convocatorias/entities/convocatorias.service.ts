// src/convocatorias/convocatorias.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Convocatoria } from '../entities/convocatorias.entity';
import { CreateConvocatoriasDto } from '../dto/create-convocatorias.dto';

@Injectable()
export class ConvocatoriasService {
  constructor(
    @InjectRepository(Convocatoria)
    private readonly convocatoriaRepository: Repository<Convocatoria>,
    private readonly entityManager: EntityManager,
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

  /**
   * Réplica en JSON de la estructura jerárquica del Cursor PL/pgSQL
   */
  async obtenerEstructuraGeneral() {
    try {
      const convocatorias = await this.entityManager.query(
        `SELECT c.id_convocatoria, c.gestion, c.modalidad, ca.id_carrera, ca.nombre AS carrera
         FROM convocatoria c
         JOIN carrera ca ON c.id_carrera = ca.id_carrera
         ORDER BY ca.nombre`,
      );

      const resultado = [];

      for (const conv of convocatorias) {
        const materias = await this.entityManager.query(
          `SELECT m.id_materia, m.nombre AS descripcion
           FROM contiene co
           JOIN materia m ON co.id_materia = m.id_materia
           WHERE co.id_carrera = $1`,
          [conv.id_carrera],
        );

        const materiasEstructura = [];

        for (const mat of materias) {
          const preguntas = await this.entityManager.query(
            `SELECT p.nro_pregunta, p.enunciado, p.opcion_correcta
             FROM pregunta p
             WHERE p.id_materia = $1`,
            [mat.id_materia],
          );

          const preguntasEstructura = [];

          for (const preg of preguntas) {
            const opciones = await this.entityManager.query(
              `SELECT o.id_opcion, o.descripcion
               FROM opcion o
               WHERE o.id_materia = $1 AND o.nro_pregunta = $2`,
              [mat.id_materia, preg.nro_pregunta],
            );

            preguntasEstructura.push({
              nro_pregunta: preg.nro_pregunta,
              enunciado: preg.enunciado,
              opcion_correcta: preg.opcion_correcta,
              opciones: opciones,
            });
          }

          materiasEstructura.push({
            id_materia: mat.id_materia,
            materia: mat.descripcion,
            preguntas: preguntasEstructura,
          });
        }

        resultado.push({
          id_convocatoria: conv.id_convocatoria,
          gestion: conv.gestion,
          modalidad: conv.modalidad,
          carrera: conv.carrera,
          materias: materiasEstructura,
        });
      }

      return resultado;
    } catch (error: any) {
      throw new InternalServerErrorException(`Error al construir la estructura: ${error.message}`);
    }
  }

}