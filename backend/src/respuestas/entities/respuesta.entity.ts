// src/respuestas/entities/respuesta.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Inscripcion } from '../../inscripciones/entities/inscripciones.entity';
import { Pregunta } from '../../preguntas/entities/pregunta.entity';

@Entity('respuesta')
export class Respuesta {
  @PrimaryColumn({ name: 'id_inscripcion', type: 'int' })
  idInscripcion: number;

  @PrimaryColumn({ name: 'id_materia', type: 'int' })
  idMateria: number;

  @PrimaryColumn({ name: 'id_pregunta', type: 'int' })
  idPregunta: number;

  @Column({ type: 'varchar', length: 10 })
  opcion: string;

  // Relación con Inscripción
  @ManyToOne(() => Inscripcion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_inscripcion' })
  inscripcion: Inscripcion;

  // Relación con Pregunta (clave compuesta de 2 campos: id_materia y nro_pregunta)
  @ManyToOne(() => Pregunta, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'id_materia', referencedColumnName: 'idMateria' },
    { name: 'id_pregunta', referencedColumnName: 'nroPregunta' },
  ])
  pregunta: Pregunta;
}