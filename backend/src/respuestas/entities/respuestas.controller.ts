// src/respuestas/entities/respuestas.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { RespuestasService } from './respuestas.service';
import { CreateRespuestasDto } from '../dto/create-respuestas.dto';

@Controller('api/respuestas')
export class RespuestasController {
  constructor(private readonly respuestasService: RespuestasService) {}

  @Get()
  findAll() {
    return this.respuestasService.findAll();
  }

  @Get('inscripcion/:idInscripcion')
  findByInscripcion(@Param('idInscripcion', ParseIntPipe) idInscripcion: number) {
    return this.respuestasService.findByInscripcion(idInscripcion);
  }

  @Get(':idInscripcion/:idMateria/:idPregunta')
  findOne(
    @Param('idInscripcion', ParseIntPipe) idInscripcion: number,
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('idPregunta', ParseIntPipe) idPregunta: number,
  ) {
    return this.respuestasService.findOne(idInscripcion, idMateria, idPregunta);
  }

  @Post()
  create(@Body() createDto: CreateRespuestasDto) {
    return this.respuestasService.create(createDto);
  }

  @Put(':idInscripcion/:idMateria/:idPregunta')
  update(
    @Param('idInscripcion', ParseIntPipe) idInscripcion: number,
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('idPregunta', ParseIntPipe) idPregunta: number,
    @Body() updateDto: CreateRespuestasDto,
  ) {
    return this.respuestasService.update(idInscripcion, idMateria, idPregunta, updateDto);
  }

  @Delete(':idInscripcion/:idMateria/:idPregunta')
  remove(
    @Param('idInscripcion', ParseIntPipe) idInscripcion: number,
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('idPregunta', ParseIntPipe) idPregunta: number,
  ) {
    return this.respuestasService.remove(idInscripcion, idMateria, idPregunta);
  }
}