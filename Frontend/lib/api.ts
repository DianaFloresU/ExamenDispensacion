import type { Boletin, ConvocatoriaRanking } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getBoletin(idInscripcion: number): Promise<Boletin> {
  const res = await fetch(`${API_BASE_URL}/inscripciones/${idInscripcion}/boletin`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al obtener el boletín');
  }
  return res.json();
}

export async function getRankingConvocatoria(idConvocatoria: number): Promise<ConvocatoriaRanking> {
  const res = await fetch(`${API_BASE_URL}/inscripciones/convocatoria/${idConvocatoria}/ranking`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al obtener el ranking');
  }
  return res.json();
}