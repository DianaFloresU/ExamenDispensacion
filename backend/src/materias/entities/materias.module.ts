// src/materias/entities/materias.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriasController } from './materias.controller';
import { MateriasService } from './materias.service';
import { Materia } from './materias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materia])],
  controllers: [MateriasController],
  providers: [MateriasService],
  exports: [MateriasService],
})
export class MateriasModule {}