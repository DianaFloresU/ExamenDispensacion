// src/opciones/entities/opciones.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { OpcionesService } from './opciones.service';
import { CreateOpcionesDto } from '../dto/create-opciones.dto';

@Controller('api/opciones')
export class OpcionesController {
  constructor(private readonly opcionesService: OpcionesService) {}

  @Get()
  findAll() {
    return this.opcionesService.findAll();
  }

  @Get('pregunta/:idMateria/:nroPregunta')
  findByPregunta(
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('nroPregunta', ParseIntPipe) nroPregunta: number,
  ) {
    return this.opcionesService.findByPregunta(idMateria, nroPregunta);
  }

  @Get(':idMateria/:nroPregunta/:idOpcion')
  findOne(
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('nroPregunta', ParseIntPipe) nroPregunta: number,
    @Param('idOpcion') idOpcion: string,
  ) {
    return this.opcionesService.findOne(idMateria, nroPregunta, idOpcion);
  }

  @Post()
  create(@Body() createDto: CreateOpcionesDto) {
    return this.opcionesService.create(createDto);
  }

  @Put(':idMateria/:nroPregunta/:idOpcion')
  update(
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('nroPregunta', ParseIntPipe) nroPregunta: number,
    @Param('idOpcion') idOpcion: string,
    @Body() updateDto: CreateOpcionesDto,
  ) {
    return this.opcionesService.update(idMateria, nroPregunta, idOpcion, updateDto);
  }

  @Delete(':idMateria/:nroPregunta/:idOpcion')
  remove(
    @Param('idMateria', ParseIntPipe) idMateria: number,
    @Param('nroPregunta', ParseIntPipe) nroPregunta: number,
    @Param('idOpcion') idOpcion: string,
  ) {
    return this.opcionesService.remove(idMateria, nroPregunta, idOpcion);
  }
}