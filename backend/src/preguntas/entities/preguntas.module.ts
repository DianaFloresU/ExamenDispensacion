// src/preguntas/entities/preguntas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntasController } from './preguntas.controller';
import { PreguntasService } from './preguntas.service';
import { Pregunta } from './pregunta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta])],
  controllers: [PreguntasController],
  providers: [PreguntasService],
  exports: [PreguntasService],
})
export class PreguntasModule {}