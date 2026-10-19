// src/respuestas/entities/respuestas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestasController } from './respuestas.controller';
import { RespuestasService } from './respuestas.service';
import { Respuesta } from './respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta])],
  controllers: [RespuestasController],
  providers: [RespuestasService],
  exports: [RespuestasService],
})
export class RespuestasModule {}