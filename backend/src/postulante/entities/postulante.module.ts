import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostulanteController } from './postulante.controller';
import { PostulanteService } from './postulante.service';
import { Postulante } from './postulante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Postulante])],
  controllers: [PostulanteController],
  providers: [PostulanteService],
})
export class PostulanteModule {}