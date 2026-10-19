// src/preguntas/entities/pregunta.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Materia } from '../../materias/entities/materias.entity';

@Entity('pregunta')
export class Pregunta {
  @PrimaryColumn({ name: 'id_materia', type: 'int' })
  idMateria: number;

  @PrimaryColumn({ name: 'nro_pregunta', type: 'int' })
  nroPregunta: number;

  @Column({ type: 'text' })
  enunciado: string;

  @Column({ name: 'opcion_correcta', type: 'varchar', length: 10, nullable: true })
  opcionCorrecta: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  puntaje: number;

  // Relación con Materia
  @ManyToOne(() => Materia, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_materia' })
  materia: Materia;
}