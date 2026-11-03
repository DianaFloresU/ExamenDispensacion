// src/inscripciones/inscripciones.service.ts
import { Injectable,NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Inscripcion } from '../entities/inscripciones.entity';
import { CreateInscripcionesDto } from '../dto/create-inscripciones.dto';


@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,
    private readonly entityManager: EntityManager,
  ) {}

  // Obtener el boletín académico llamando a las funciones de la BD
 
  /**
   * Genera el boletín completo del postulante utilizando p_boletin, f_nota_final y f_ranking
   */
  async obtenerBoletin(idInscripcion: number) {
    try {
      // 1. Obtener datos del postulante y carrera
      const datosPostulante = await this.entityManager.query(
        `SELECT p.paterno || ' ' || COALESCE(p.materno, '') || ' ' || p.nombres AS nombre_completo,
                ca.nombre AS carrera, f.nombre AS facultad, c.id_carrera
         FROM inscripcion i
         JOIN postulante p ON i.id_postulante = p.id_postulante
         JOIN convocatoria c ON i.id_convocatoria = c.id_convocatoria
         JOIN carrera ca ON c.id_carrera = ca.id_carrera
         JOIN facultad f ON ca.id_facultad = f.id_facultad
         WHERE i.id_inscripcion = $1`,
        [idInscripcion],
      );

      if (!datosPostulante || datosPostulante.length === 0) {
        throw new NotFoundException(`La inscripción con ID ${idInscripcion} no existe.`);
      }

      const info = datosPostulante[0];

      // 2. Obtener desglose de materias y sus puntajes calculados por f_puntaje_materia
      const materias = await this.entityManager.query(
        `SELECT m.id_materia, m.nombre,
                f_puntaje_materia($1, m.id_materia) AS puntaje
         FROM contiene co
         JOIN materia m ON co.id_materia = m.id_materia
         WHERE co.id_carrera = $2`,
        [idInscripcion, info.id_carrera],
      );

      // 3. Obtener Nota Final y Ranking usando f_nota_final y f_ranking
      const resumen = await this.entityManager.query(
        `SELECT f_nota_final($1) AS nota_final, f_ranking($1) AS ranking`,
        [idInscripcion],
      );

      const notaFinal = parseFloat(resumen[0]?.nota_final || 0);
      const ranking = parseInt(resumen[0]?.ranking || 1, 10);
      const condicion = notaFinal >= 51 ? 'APROBADO' : 'REPROBADO';

      return {
        id_inscripcion: idInscripcion,
        postulante: info.nombre_completo,
        carrera: info.carrera,
        facultad: info.facultad,
        materias: materias.map((m: any) => ({
          materia: m.nombre,
          puntaje: parseFloat(m.puntaje),
        })),
        nota_final: notaFinal,
        condicion: condicion,
        ranking: ranking,
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al generar boletín: ${error.message}`);
    }
  }

  /**
   * Genera el Ranking Oficial de una convocatoria utilizando f_nota_final y f_ranking
   */
  async obtenerRankingConvocatoria(idConvocatoria: number) {
    try {
      const convocatoria = await this.entityManager.query(
        `SELECT c.gestion, c.modalidad, ca.nombre AS carrera
         FROM convocatoria c
         JOIN carrera ca ON c.id_carrera = ca.id_carrera
         WHERE c.id_convocatoria = $1`,
        [idConvocatoria],
      );

      if (!convocatoria || convocatoria.length === 0) {
        throw new NotFoundException(`La convocatoria con ID ${idConvocatoria} no existe.`);
      }

      const listado = await this.entityManager.query(
        `SELECT i.id_inscripcion, p.id_postulante,
                p.paterno || ' ' || COALESCE(p.materno, '') || ' ' || p.nombres AS nombre_completo,
                f_nota_final(i.id_inscripcion) AS nota_calc,
                f_ranking(i.id_inscripcion) AS puesto
         FROM inscripcion i
         JOIN postulante p ON i.id_postulante = p.id_postulante
         WHERE i.id_convocatoria = $1
         ORDER BY nota_calc DESC, p.paterno ASC`,
        [idConvocatoria],
      );

      return {
        convocatoria: convocatoria[0],
        ranking: listado.map((item: any) => {
          const nota = parseFloat(item.nota_calc);
          return {
            puesto: parseInt(item.puesto, 10),
            id_inscripcion: item.id_inscripcion,
            estudiante: item.nombre_completo,
            nota_final: nota,
            condicion: nota >= 51 ? 'APROBADO' : 'REPROBADO',
          };
        }),
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al obtener ranking: ${error.message}`);
    }
  }


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