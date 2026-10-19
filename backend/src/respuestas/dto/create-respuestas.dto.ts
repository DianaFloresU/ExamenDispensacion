// src/respuestas/dto/create-respuestas.dto.ts
import { IsInt, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRespuestasDto {
  @IsInt()
  @IsNotEmpty()
  idInscripcion: number;

  @IsInt()
  @IsNotEmpty()
  idMateria: number;

  @IsInt()
  @IsNotEmpty()
  idPregunta: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  opcion: string;
}