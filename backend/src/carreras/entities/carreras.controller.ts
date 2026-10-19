// src/carreras/entities/carreras.controller.ts
import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CreateCarrerasDto } from '../dto/create-carreras.dto';

@Controller('api/carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carrerasService.findOne(id);
  }

  @Post()
  create(@Body() createCarrerasDto: CreateCarrerasDto) {
    return this.carrerasService.create(createCarrerasDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCarrerasDto: CreateCarrerasDto,
  ) {
    return this.carrerasService.update(id, createCarrerasDto);
  }
}