// src/postulante/entities/postulante.controller.ts
import { Controller, Get, Post, Body, Param, Put, ParseIntPipe } from '@nestjs/common';
import { PostulanteService } from './postulante.service';
import { CreatePostulanteDto } from '../dto/create-postulante.dto';

@Controller('api/postulantes')
export class PostulanteController {
  constructor(private readonly postulanteService: PostulanteService) {}

  @Get()
  findAll() {
    return this.postulanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postulanteService.findOne(id);
  }

  @Post()
  create(@Body() createPostulanteDto: CreatePostulanteDto) {
    return this.postulanteService.create(createPostulanteDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostulanteDto: CreatePostulanteDto,
  ) {
    return this.postulanteService.update(id, updatePostulanteDto);
  }
}