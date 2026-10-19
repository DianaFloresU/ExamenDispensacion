// src/postulante/entities/postulante.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('postulante') // Nombre exacto de la tabla en tu base de datos
export class Postulante {
  @PrimaryColumn({ name: 'id_postulante', type: 'int' })
  idPostulante: number;

  @Column({ name: 'ci_pasaporte', type: 'varchar', length: 20, unique: true })
  ciPasaporte: string;

  @Column({ name: 'tipo_postulante', type: 'varchar', length: 50, nullable: true })
  tipoPostulante: string;

  @Column({ type: 'varchar', length: 100 })
  nombres: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  paterno: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  materno: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;
}