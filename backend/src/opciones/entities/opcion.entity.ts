// src/opciones/entities/opcion.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pregunta } from '../../preguntas/entities/pregunta.entity';

@Entity('opcion')
export class Opcion {
  @PrimaryColumn({ name: 'id_materia', type: 'int' })
  idMateria: number;

  @PrimaryColumn({ name: 'nro_pregunta', type: 'int' })
  nroPregunta: number;

  @PrimaryColumn({ name: 'id_opcion', type: 'varchar', length: 10 })
  idOpcion: string;

  @Column({ type: 'text' })
  descripcion: string;

  // Relación con Pregunta (clave compuesta de 2 campos)
  @ManyToOne(() => Pregunta, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'id_materia', referencedColumnName: 'idMateria' },
    { name: 'nro_pregunta', referencedColumnName: 'nroPregunta' },
  ])
  pregunta: Pregunta;
}