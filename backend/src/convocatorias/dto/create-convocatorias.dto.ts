// src/convocatorias/dto/create-convocatorias.dto.ts
import { IsInt, IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateConvocatoriasDto {
  @IsInt()
  @IsNotEmpty()
  idConvocatoria: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  gestion: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  modalidad?: string;

  @IsNumber()
  @IsOptional()
  costoNac?: number;

  @IsNumber()
  @IsOptional()
  costoExt?: number;

  @IsString()
  @IsOptional()
  fechaInicioPago?: string;

  @IsString()
  @IsOptional()
  fechaFinPago?: string;

  @IsInt()
  @IsNotEmpty()
  idCarrera: number;
}