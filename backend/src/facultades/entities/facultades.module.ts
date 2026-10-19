// src/facultades/entities/facultades.module.ts (o en la raíz del módulo facultades)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultadesController } from './facultades.controller';
import { FacultadesService } from './facultades.service';
import { Facultad } from './facultades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facultad])],
  controllers: [FacultadesController],
  providers: [FacultadesService],
  exports: [FacultadesService],
})
export class FacultadesModule {}