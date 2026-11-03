'use client';

import { useState } from 'react';
import { getBoletin, getRankingConvocatoria } from '../lib/api';
import type { Boletin, ConvocatoriaRanking } from '../lib/types';
import { ErrorMessage } from '../components/ErrorMessage';

const Icons = {
  AcademicCap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  ChartBar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  Trophy: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  GitFork: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3"/>
      <circle cx="6" cy="6" r="3"/>
      <circle cx="18" cy="6" r="3"/>
      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/>
      <path d="M12 12v3"/>
    </svg>
  ),
  Zap: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'funciones' | 'procedimientos' | 'cursores' | 'triggers'>('funciones');

  // Estados para Funciones (Boletín)
  const [idInscripcion, setIdInscripcion] = useState<number | string>(1);
  const [boletin, setBoletin] = useState<Boletin | null>(null);
  const [loadingFunc, setLoadingFunc] = useState<boolean>(false);
  const [errorFunc, setErrorFunc] = useState<string | null>(null);

  // Estados para Procedimientos (Ranking)
  const [idConvocatoria, setIdConvocatoria] = useState<number | string>(1);
  const [rankingData, setRankingData] = useState<ConvocatoriaRanking | null>(null);
  const [loadingProc, setLoadingProc] = useState<boolean>(false);
  const [errorProc, setErrorProc] = useState<string | null>(null);

  // Estados para Cursores (Estructura general)
  const [estructura, setEstructura] = useState<any[]>([]);
  const [loadingCurs, setLoadingCurs] = useState<boolean>(false);
  const [errorCurs, setErrorCurs] = useState<string | null>(null);

  // Estados para Triggers (Creación de Preguntas)
  const [formData, setFormData] = useState<{
    id_materia: number | string;
    nro_pregunta: number | string;
    enunciado: string;
    opcion_correcta: string;
    puntaje: number | string;
  }>({
    id_materia: 69,
    nro_pregunta: 101,
    enunciado: '¿Cuál es la función principal de una base de datos?',
    opcion_correcta: 'B',
    puntaje: 25,
  });
  const [triggerResult, setTriggerResult] = useState<string | null>(null);
  const [loadingTrig, setLoadingTrig] = useState<boolean>(false);
  const [errorTrig, setErrorTrig] = useState<string | null>(null);

  // Consultas API
  const consultarBoletin = () => {
    const id = Number(idInscripcion);
    if (!id || isNaN(id)) {
      setErrorFunc('Por favor, ingrese un ID de inscripción válido.');
      return;
    }

    setLoadingFunc(true);
    setErrorFunc(null);
    getBoletin(id)
      .then(setBoletin)
      .catch((e: Error) => setErrorFunc(e.message))
      .finally(() => setLoadingFunc(false));
  };

  const consultarRanking = () => {
    const id = Number(idConvocatoria);
    if (!id || isNaN(id)) {
      setErrorProc('Por favor, ingrese un ID de convocatoria válido.');
      return;
    }

    setLoadingProc(true);
    setErrorProc(null);
    getRankingConvocatoria(id)
      .then(setRankingData)
      .catch((e: Error) => setErrorProc(e.message))
      .finally(() => setLoadingProc(false));
  };

  const consultarEstructura = () => {
    setLoadingCurs(true);
    setErrorCurs(null);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/convocatorias/estructura-general`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al recuperar la estructura de convocatorias');
        return res.json();
      })
      .then(setEstructura)
      .catch((e: Error) => setErrorCurs(e.message))
      .finally(() => setLoadingCurs(false));
  };

  const enviarPregunta = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingTrig(true);
    setErrorTrig(null);
    setTriggerResult(null);

    const payload = {
      ...formData,
      id_materia: Number(formData.id_materia),
      nro_pregunta: Number(formData.nro_pregunta),
      puntaje: Number(formData.puntaje),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/preguntas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error en la validación del sistema');
      }
      setTriggerResult('Registro procesado y validado correctamente.');
    } catch (err: any) {
      setErrorTrig(err.message);
    } finally {
      setLoadingTrig(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Segoe UI, Tahoma, sans-serif', color: '#0f172a' }}>
      
      {/* Barra Lateral (Sidebar) */}
      <aside style={{ width: '260px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icons.AcademicCap />
          <span>UMSA Panel</span>
        </div>
        <nav style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => setActiveTab('funciones')} style={navBtnStyle(activeTab === 'funciones')}>
            <Icons.ChartBar />
            <span> Funciones</span>
          </button>
          <button onClick={() => setActiveTab('procedimientos')} style={navBtnStyle(activeTab === 'procedimientos')}>
            <Icons.Trophy />
            <span> Procedimientos </span>
          </button>
          <button onClick={() => setActiveTab('cursores')} style={navBtnStyle(activeTab === 'cursores')}>
            <Icons.GitFork />
            <span> Cursores </span>
          </button>
          <button onClick={() => setActiveTab('triggers')} style={navBtnStyle(activeTab === 'triggers')}>
            <Icons.Zap />
            <span> Triggers</span>
          </button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
        
        {/* Header Superior */}
        <header style={{ height: '60px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px' }}>
          <h2 style={{ fontSize: '18px', color: '#0f172a', margin: 0, fontWeight: '600' }}>Sistema de Exámenes de Dispensación</h2>
          <div style={{ fontSize: '14px', color: '#475569' }}>Bienvenido al panel de administración</div>
        </header>

        {/* Cuerpo de las Pestañas */}
        <div style={{ padding: '30px' }}>
          
          {/* PESTAÑA 1: FUNCIONES */}
          {activeTab === 'funciones' && (
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Módulo de Funciones: Cálculo de Boletín Académico</h3>
              <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 20px 0' }}>Calcula y presenta el boletín de notas detallado, la nota final y la condición de aprobación del postulante mediante la búsqueda de su ID de inscripción.</p>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                  type="number"
                  value={idInscripcion}
                  onChange={(e) => setIdInscripcion(e.target.value === '' ? '' : Number(e.target.value))}
                  onKeyDown={(e) => { if (e.key === 'Enter') consultarBoletin(); }}
                  placeholder="ID de Inscripción"
                  style={inputStyle}
                />
                <button onClick={consultarBoletin} disabled={loadingFunc} style={primaryBtnStyle}>
                  {loadingFunc ? 'Consultando...' : 'Generar Boletín'}
                </button>
              </div>

              {errorFunc && <ErrorMessage message={errorFunc} />}

              {boletin && (
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '20px', color: '#0f172a' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '16px' }}>Postulante: {boletin.postulante}</h4>
                  <p style={{ margin: '6px 0', color: '#334155' }}><strong>Carrera:</strong> {boletin.carrera} ({boletin.facultad})</p>
                  <p style={{ margin: '6px 0', color: '#334155' }}><strong>Nota Final:</strong> {boletin.nota_final} pts</p>
                  <p style={{ margin: '6px 0', color: '#334155' }}>
                    <strong>Condición:</strong>{' '}
                    <span style={{ color: boletin.condicion === 'APROBADO' ? '#15803d' : '#b91c1c', fontWeight: 'bold' }}>
                      {boletin.condicion}
                    </span>
                  </p>
                  <p style={{ margin: '6px 0', color: '#334155' }}><strong>Puesto en Ranking:</strong> #{boletin.ranking}</p>
                  
                  <h5 style={{ marginTop: '15px', marginBottom: '8px', color: '#0f172a', fontSize: '14px' }}>Desglose de Materias:</h5>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {boletin.materias.map((m, i) => (
                      <li key={i} style={{ margin: '4px 0', color: '#334155' }}>
                        {m.materia}: <strong style={{ color: '#0f172a' }}>{m.puntaje} / 100</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* PESTAÑA 2: PROCEDIMIENTOS */}
          {activeTab === 'procedimientos' && (
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Módulo de Procedimientos: Ranking Oficial de Convocatoria</h3>
              <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 20px 0' }}>Muestra el listado oficial ordenado por mérito y puntaje de los postulantes de una convocatoria.</p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                  type="number"
                  value={idConvocatoria}
                  onChange={(e) => setIdConvocatoria(e.target.value === '' ? '' : Number(e.target.value))}
                  onKeyDown={(e) => { if (e.key === 'Enter') consultarRanking(); }}
                  placeholder="ID de Convocatoria"
                  style={inputStyle}
                />
                <button onClick={consultarRanking} disabled={loadingProc} style={primaryBtnStyle}>
                  {loadingProc ? 'Procesando...' : 'Ver Ranking'}
                </button>
              </div>

              {errorProc && <ErrorMessage message={errorProc} />}

              {rankingData && (
                <div>
                  <div style={{ backgroundColor: '#f0fdf4', padding: '15px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #bbf7d0', color: '#166534' }}>
                    <p style={{ margin: '4px 0' }}><strong>Carrera:</strong> {rankingData.convocatoria.carrera}</p>
                    <p style={{ margin: '4px 0' }}><strong>Gestión:</strong> {rankingData.convocatoria.gestion} | <strong>Modalidad:</strong> {rankingData.convocatoria.modalidad}</p>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#e2e8f0', textAlign: 'left' }}>
                        <th style={thTdStyle}>Puesto</th>
                        <th style={thTdStyle}>Estudiante</th>
                        <th style={thTdStyle}>Nota Final</th>
                        <th style={thTdStyle}>Condición</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankingData.ranking.map((item) => (
                        <tr key={item.id_inscripcion} style={{ borderBottom: '1px solid #cbd5e1' }}>
                          <td style={thTdStyle}><strong>#{item.puesto}</strong></td>
                          <td style={thTdStyle}>{item.estudiante}</td>
                          <td style={thTdStyle}>{item.nota_final} pts</td>
                          <td style={{ ...thTdStyle, color: item.condicion === 'APROBADO' ? '#15803d' : '#b91c1c', fontWeight: 'bold' }}>
                            {item.condicion}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PESTAÑA 3: CURSORES */}
          {activeTab === 'cursores' && (
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Módulo de Cursores: Estructura Jerárquica General</h3>
              <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 20px 0' }}>Muestra la estructura completa de convocatorias, carreras, materias y preguntas utilizando cursores.</p>

              <button onClick={consultarEstructura} disabled={loadingCurs} style={{ ...primaryBtnStyle, marginBottom: '20px' }}>
                {loadingCurs ? 'Cargando...' : 'Cargar Estructura General'}
              </button>

              {errorCurs && <ErrorMessage message={errorCurs} />}

              {estructura.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {estructura.map((conv, idx) => (
                    <div key={idx} style={{ border: '1px solid #cbd5e1', borderRadius: '6px', padding: '15px', backgroundColor: '#ffffff', color: '#0f172a' }}>
                      <h4 style={{ color: '#0f172a', margin: '0 0 10px 0' }}>Convocatoria ID: {conv.id_convocatoria} - {conv.carrera} ({conv.gestion})</h4>
                      {conv.materias?.map((mat: any, mIdx: number) => (
                        <div key={mIdx} style={{ marginLeft: '20px', marginTop: '10px', borderLeft: '3px solid #2563eb', paddingLeft: '10px' }}>
                          <strong style={{ color: '#1e40af' }}>Materia: {mat.materia}</strong>
                          <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                            {mat.preguntas?.map((preg: any, pIdx: number) => (
                              <li key={pIdx} style={{ fontSize: '14px', color: '#334155' }}>
                                {preg.enunciado} (Correcta: <strong style={{ color: '#0f172a' }}>{preg.opcion_correcta}</strong>)
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PESTAÑA 4: TRIGGERS */}
          {activeTab === 'triggers' && (
            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Módulo de Triggers: Validación de Integridad</h3>
              <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 20px 0' }}>Valida la integridad y las reglas de negocio en tiempo real al registrar nuevas preguntas.</p>

              <form onSubmit={enviarPregunta} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', color: '#0f172a', fontWeight: '600' }}>ID Materia:</label>
                  <input
                    type="number"
                    value={formData.id_materia}
                    onChange={(e) => setFormData({ ...formData, id_materia: e.target.value === '' ? '' : Number(e.target.value) })}
                    placeholder="Ej. 69 (o 9999 para probar restricción)"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', color: '#0f172a', fontWeight: '600' }}>Nro Pregunta:</label>
                  <input
                    type="number"
                    value={formData.nro_pregunta}
                    onChange={(e) => setFormData({ ...formData, nro_pregunta: e.target.value === '' ? '' : Number(e.target.value) })}
                    placeholder="Ej. 101"
                    style={inputStyle}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', color: '#0f172a', fontWeight: '600' }}>Enunciado:</label>
                  <input
                    type="text"
                    value={formData.enunciado}
                    onChange={(e) => setFormData({ ...formData, enunciado: e.target.value })}
                    placeholder="Ingrese el texto de la pregunta"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', color: '#0f172a', fontWeight: '600' }}>Opción Correcta:</label>
                  <input
                    type="text"
                    value={formData.opcion_correcta}
                    onChange={(e) => setFormData({ ...formData, opcion_correcta: e.target.value })}
                    placeholder="Ej. A, B, C o D"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', color: '#0f172a', fontWeight: '600' }}>Puntaje:</label>
                  <input
                    type="number"
                    value={formData.puntaje}
                    onChange={(e) => setFormData({ ...formData, puntaje: e.target.value === '' ? '' : Number(e.target.value) })}
                    placeholder="Ej. 25"
                    style={inputStyle}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <button type="submit" disabled={loadingTrig} style={{ ...primaryBtnStyle, width: '100%' }}>
                    {loadingTrig ? 'Procesando...' : 'Registrar Pregunta'}
                  </button>
                </div>
              </form>

              {errorTrig && (
                <div style={{ marginTop: '20px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '15px', borderRadius: '6px', color: '#991b1b' }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Restricción de Base de Datos Detectada:</strong>
                  <span style={{ fontSize: '14px' }}>{errorTrig}</span>
                </div>
              )}

              {triggerResult && (
                <div style={{ marginTop: '20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '15px', borderRadius: '6px', color: '#166534' }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Operación Exitosa:</strong>
                  <span style={{ fontSize: '14px' }}>{triggerResult}</span>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// Estilos de alto contraste
const navBtnStyle = (active: boolean) => ({
  width: '100%',
  padding: '12px 15px',
  textAlign: 'left' as const,
  backgroundColor: active ? '#2563eb' : 'transparent',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: active ? 'bold' : 'normal',
  fontSize: '14px',
});

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  border: '1px solid #cbd5e1',
};

const inputStyle = {
  padding: '10px 14px',
  fontSize: '14px',
  border: '1px solid #94a3b8',
  borderRadius: '6px',
  width: '100%',
  color: '#0f172a',
  backgroundColor: '#ffffff',
  outline: 'none',
};

const primaryBtnStyle = {
  padding: '10px 20px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600' as const,
  fontSize: '14px',
};

const thTdStyle = {
  padding: '12px',
  borderBottom: '1px solid #cbd5e1',
  textAlign: 'left' as const,
  color: '#0f172a',
  fontSize: '14px',
};