// src/materias/entities/materias.entity.ts
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Carrera } from '../../carreras/entities/carreras.entity';

@Entity('materia')
export class Materia {
  @PrimaryColumn({ name: 'id_materia', type: 'int' })
  idMateria: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  // Relación inversa con Carrera
  @ManyToMany(() => Carrera, (carrera) => carrera.materias)
  carreras: Carrera[];
}