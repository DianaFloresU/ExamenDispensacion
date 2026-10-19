// src/opciones/dto/create-opciones.dto.ts
import { IsInt, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateOpcionesDto {
  @IsInt()
  @IsNotEmpty()
  idMateria: number;

  @IsInt()
  @IsNotEmpty()
  nroPregunta: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  idOpcion: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}