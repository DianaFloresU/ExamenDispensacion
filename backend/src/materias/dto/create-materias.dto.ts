// src/materias/dto/create-materias.dto.ts
import { IsInt, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMateriasDto {
  @IsInt()
  @IsNotEmpty()
  idMateria: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;
}