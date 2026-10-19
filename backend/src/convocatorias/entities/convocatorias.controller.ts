// src/convocatorias/entities/convocatorias.controller.ts
import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { ConvocatoriasService } from './convocatorias.service';
import { CreateConvocatoriasDto } from '../dto/create-convocatorias.dto';

@Controller('api/convocatorias')
export class ConvocatoriasController {
  constructor(private readonly convocatoriasService: ConvocatoriasService) {}

  @Get()
  findAll() {
    return this.convocatoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.convocatoriasService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateConvocatoriasDto) {
    return this.convocatoriasService.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateConvocatoriasDto,
  ) {
    return this.convocatoriasService.update(id, updateDto);
  }
}