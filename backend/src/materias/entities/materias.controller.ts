// src/materias/entities/materias.controller.ts
import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { CreateMateriasDto } from '../dto/create-materias.dto';

@Controller('api/materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Get()
  findAll() {
    return this.materiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materiasService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateMateriasDto) {
    return this.materiasService.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateMateriasDto,
  ) {
    return this.materiasService.update(id, updateDto);
  }
}