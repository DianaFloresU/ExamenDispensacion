// src/carreras/entities/carreras.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Facultad } from '../../facultades/entities/facultades.entity';
import { Materia } from '../../materias/entities/materias.entity';

@Entity('carrera')
export class Carrera {
  @PrimaryColumn({ name: 'id_carrera', type: 'int' })
  idCarrera: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'id_facultad', type: 'int' })
  idFacultad: number;

  @ManyToOne(() => Facultad, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_facultad' })
  facultad: Facultad;

  // Relación Many-to-Many con Materia a través de la tabla CONTIENE
  @ManyToMany(() => Materia, (materia) => materia.carreras, { cascade: true })
  @JoinTable({
    name: 'contiene',
    joinColumn: { name: 'id_carrera', referencedColumnName: 'idCarrera' },
    inverseJoinColumn: { name: 'id_materia', referencedColumnName: 'idMateria' },
  })
  materias: Materia[];
}