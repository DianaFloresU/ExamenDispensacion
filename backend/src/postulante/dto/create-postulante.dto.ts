// src/postulante/dto/create-postulante.dto.ts
import { IsInt, IsString, IsNotEmpty, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class CreatePostulanteDto {
  @IsInt()
  @IsNotEmpty()
  idPostulante: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  ciPasaporte: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  tipoPostulante?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  paterno?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  materno?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(150)
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  telefono?: string;
}