// src/convocatorias/entities/convocatorias.entity.ts
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Carrera } from '../../carreras/entities/carreras.entity';

@Entity('convocatoria')
export class Convocatoria {
  @PrimaryColumn({ name: 'id_convocatoria', type: 'int' })
  idConvocatoria: number;

  @ManyToOne(() => Carrera, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_carrera' })
  carrera: Carrera;

  @Column({ type: 'varchar', length: 20 })
  gestion: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modalidad: string;

  @Column({ name: 'costo_nac', type: 'numeric', precision: 10, scale: 2, nullable: true })
  costoNac: number;

  @Column({ name: 'costo_ext', type: 'numeric', precision: 10, scale: 2, nullable: true })
  costoExt: number;

  @Column({ name: 'fecha_inicio_pago', type: 'date', nullable: true })
  fechaInicioPago: string; // O Date, según prefieras manejarlo

  @Column({ name: 'fecha_fin_pago', type: 'date', nullable: true })
  fechaFinPago: string; // O Date

  @Column({ name: 'id_carrera', type: 'int' })
  idCarrera: number;
}