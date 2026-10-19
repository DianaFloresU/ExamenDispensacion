// src/opciones/entities/opciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionesController } from './opciones.controller';
import { OpcionesService } from './opciones.service';
import { Opcion } from './opcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opcion])],
  controllers: [OpcionesController],
  providers: [OpcionesService],
  exports: [OpcionesService],
})
export class OpcionesModule {}