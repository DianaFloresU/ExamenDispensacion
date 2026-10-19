// src/carreras/entities/carreras.module.ts (o en la raíz de carreras)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrerasController } from './carreras.controller';
import { CarrerasService } from './carreras.service';
import { Carrera } from './carreras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera])],
  controllers: [CarrerasController],
  providers: [CarrerasService],
  exports: [CarrerasService],
})
export class CarrerasModule {}