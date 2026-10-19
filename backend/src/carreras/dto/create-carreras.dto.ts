// src/carreras/dto/create-carreras.dto.ts
import { IsInt, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCarrerasDto {
  @IsInt()
  @IsNotEmpty()
  idCarrera: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsInt()
  @IsNotEmpty()
  idFacultad: number;
}