// src/preguntas/preguntas.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { CreatePreguntasDto } from '../dto/create-preguntas.dto';

@Controller('api/preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Get()
  findAll() {
    return this.preguntasService.findAll();
  }

  @Get('materia/:idMateria')
  findByMateria(@Param('idMateria', ParseIntPipe) idMateria: number) {
    return this.preguntasService.findByMateria(idMateria);
  }

  @Get(':idMateria/:nroPregunta')
  findOne(
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('nroPregunta', ParseIntPipe) nroPregunta: number,
  ) {
    return this.preguntasService.findOne(idMateria, nroPregunta);
  }

  @Post()
  create(@Body() createDto: CreatePreguntasDto) {
    return this.preguntasService.create(createDto);
  }

  @Put(':idMateria/:nroPregunta')
  update(
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('nroPregunta', ParseIntPipe) nroPregunta: number,
    @Body() updateDto: CreatePreguntasDto,
  ) {
    return this.preguntasService.update(idMateria, nroPregunta, updateDto);
  }

  @Delete(':idMateria/:nroPregunta')
  remove(
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('nroPregunta', ParseIntPipe) nroPregunta: number,
  ) {
    return this.preguntasService.remove(idMateria, nroPregunta);
  }
}