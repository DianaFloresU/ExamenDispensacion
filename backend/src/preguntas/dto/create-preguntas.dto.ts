// src/preguntas/dto/create-preguntas.dto.ts
import { IsInt, IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreatePreguntasDto {
  @IsInt()
  @IsNotEmpty()
  idMateria: number;

  @IsInt()
  @IsNotEmpty()
  nroPregunta: number;

  @IsString()
  @IsNotEmpty()
  enunciado: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  opcionCorrecta?: string;

  @IsNumber()
  @IsOptional()
  puntaje?: number;
}