// src/convocatorias/convocatorias.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConvocatoriasController } from './convocatorias.controller';
import { ConvocatoriasService } from './convocatorias.service';
import { Convocatoria } from './convocatorias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Convocatoria])],
  controllers: [ConvocatoriasController],
  providers: [ConvocatoriasService],
  exports: [ConvocatoriasService],
})
export class ConvocatoriasModule {}