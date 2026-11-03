export interface MateriaPuntaje {
  materia: string;
  puntaje: number;
}

export interface Boletin {
  id_inscripcion: number;
  postulante: string;
  carrera: string;
  facultad: string;
  materias: MateriaPuntaje[];
  nota_final: number;
  condicion: 'APROBADO' | 'REPROBADO';
  ranking: number;
}

export interface RankingEstudiante {
  puesto: number;
  id_inscripcion: number;
  estudiante: string;
  nota_final: number;
  condicion: 'APROBADO' | 'REPROBADO';
}

export interface ConvocatoriaRanking {
  convocatoria: {
    carrera: string;
    gestion: string;
    modalidad: string;
  };
  ranking: RankingEstudiante[];
}