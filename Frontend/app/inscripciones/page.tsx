'use client';

import { useState } from 'react';
import { getBoletin } from '@/lib/api';
import type { Boletin } from '@/lib/types';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function InscripcionesPage() {
  const [idInscripcion, setIdInscripcion] = useState<number>(1);
  const [boletin, setBoletin] = useState<Boletin | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleConsultar() {
    setLoading(true);
    setError(null);

    getBoletin(idInscripcion)
      .then(setBoletin)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🎓 Consulta de Boletín Académico</h1>

      {error && <ErrorMessage message={error} />}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', marginTop: '20px' }}>
        <input
          type="number"
          value={idInscripcion}
          onChange={(e) => setIdInscripcion(Number(e.target.value))}
          placeholder="ID de Inscripción"
          style={{ padding: '8px', fontSize: '16px', flex: 1, color: '#000' }}
        />
        <button onClick={handleConsultar} disabled={loading} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          {loading ? 'Cargando...' : 'Buscar Boletín'}
        </button>
      </div>

      {boletin && (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#fafafa', color: '#000' }}>
          <h2>{boletin.postulante}</h2>
          <p><strong>Carrera:</strong> {boletin.carrera} ({boletin.facultad})</p>
          <p><strong>Nota Final:</strong> {boletin.nota_final} / 100</p>
          <p>
            <strong>Condición:</strong>{' '}
            <span style={{ color: boletin.condicion === 'APROBADO' ? 'green' : 'red' }}>
              {boletin.condicion}
            </span>
          </p>
          <p><strong>Puesto en Ranking:</strong> #{boletin.ranking}</p>

          <h3 style={{ marginTop: '15px' }}>Materias Evaluadas</h3>
          <ul>
            {boletin.materias.map((mat, index) => (
              <li key={index}>
                {mat.materia}: <strong>{mat.puntaje} pts</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}