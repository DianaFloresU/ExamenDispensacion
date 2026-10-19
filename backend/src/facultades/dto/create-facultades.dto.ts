// src/facultades/dto/create-facultades.dto.ts
import { IsInt, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFacultadesDto {
  @IsInt()
  @IsNotEmpty()
  idFacultad: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;
}