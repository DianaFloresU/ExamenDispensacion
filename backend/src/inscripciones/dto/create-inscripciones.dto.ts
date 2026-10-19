// src/inscripciones/dto/create-inscripciones.dto.ts
import { IsInt, IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateInscripcionesDto {
  @IsInt()
  @IsNotEmpty()
  idInscripcion: number;

  @IsString()
  @IsNotEmpty()
  fechaInscripcion: string;

  @IsNumber()
  @IsOptional()
  montoPagado?: number;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  estadoInscripcion?: string;

  @IsInt()
  @IsNotEmpty()
  idPostulante: number;

  @IsInt()
  @IsNotEmpty()
  idConvocatoria: number;
}