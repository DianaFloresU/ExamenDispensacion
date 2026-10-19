// src/facultades/entities/facultades.controller.ts
import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { FacultadesService } from './facultades.service';
import { CreateFacultadesDto } from '../dto/create-facultades.dto';

@Controller('api/facultades')
export class FacultadesController {
  constructor(private readonly facultadesService: FacultadesService) {}

  @Get()
  findAll() {
    return this.facultadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facultadesService.findOne(id);
  }

  @Post()
  create(@Body() createFacultadesDto: CreateFacultadesDto) {
    return this.facultadesService.create(createFacultadesDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacultadesDto: CreateFacultadesDto,
  ) {
    return this.facultadesService.update(id, updateFacultadesDto);
  }
}