// src/inscripciones/entities/inscripciones.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Postulante } from '../../postulante/entities/postulante.entity';
import { Convocatoria } from '../../convocatorias/entities/convocatorias.entity';

@Entity('inscripcion')
export class Inscripcion {
  @PrimaryColumn({ name: 'id_inscripcion', type: 'int' })
  idInscripcion: number;

  @Column({ name: 'fecha_inscripcion', type: 'date' })
  fechaInscripcion: string;

  @Column({ name: 'monto_pagado', type: 'numeric', precision: 10, scale: 2, nullable: true })
  montoPagado: number;

  @Column({ name: 'estado_inscripcion', type: 'varchar', length: 50, nullable: true })
  estadoInscripcion: string;

  @Column({ name: 'id_postulante', type: 'int' })
  idPostulante: number;

  @Column({ name: 'id_convocatoria', type: 'int' })
  idConvocatoria: number;

  // Relaciones
  @ManyToOne(() => Postulante, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_postulante' })
  postulante: Postulante;

  @ManyToOne(() => Convocatoria, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_convocatoria' })
  convocatoria: Convocatoria;
}