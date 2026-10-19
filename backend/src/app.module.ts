// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importa tus módulos creados:
import { MateriasModule } from './materias/entities/materias.module';
import { InscripcionesModule } from './inscripciones/entities/inscripciones.module';
import { ConvocatoriasModule } from './convocatorias/entities/convocatorias.module';
import { CarrerasModule } from './carreras/entities/carreras.module';
import { FacultadesModule } from './facultades/entities/facultades.module';
import { PreguntasModule } from './preguntas/entities/preguntas.module';
import { OpcionesModule } from './opciones/entities/opciones.module';
import { RespuestasModule } from './respuestas/entities/respuestas.module';
import { PostulanteModule } from './postulante/entities/postulante.module';
// (Importa también los demás módulos que tengas como carreras, facultades, inscripciones, etc.)

@Module({
  imports: [
    // 1. Cargar el módulo de configuración globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Configurar TypeORM usando ConfigService para leer el .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    // 3. Registrar tus módulos aquí para que habiliten sus rutas:
    MateriasModule,
    InscripcionesModule,
    ConvocatoriasModule,
    CarrerasModule,
    FacultadesModule,
    PreguntasModule,
    OpcionesModule,
    RespuestasModule,
    PostulanteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}