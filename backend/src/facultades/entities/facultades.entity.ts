// src/facultades/entities/facultad.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('facultad') // Nombre exacto de la tabla en tu base de datos
export class Facultad {
  @PrimaryColumn({ name: 'id_facultad', type: 'int' })
  idFacultad: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;
}