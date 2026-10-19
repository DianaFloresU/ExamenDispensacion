// src/inscripciones/inscripciones.controller.ts
import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionesDto } from '../dto/create-inscripciones.dto';

@Controller('api/inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Get()
  findAll() {
    return this.inscripcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateInscripcionesDto) {
    return this.inscripcionesService.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateInscripcionesDto,
  ) {
    return this.inscripcionesService.update(id, updateDto);
  }
}