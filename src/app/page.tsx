'use client';

import { Users, Radio, FileText, Activity, Bot, Newspaper, Eye, TrendingUp } from 'lucide-react';

export default function DashboardHome() {
  // --- DATOS DEL BACKEND ---
  
  // 1. [Backend] KPIs Generales: 
  // Endpoint sugerido: GET /api/admin/dashboard/stats
  // Debe devolver los totales actuales de la plataforma.
  const stats = {
    espectadoresTvEnVivo: 0,
    visitantesPaginaTv: 0, // Total acumulado del día/mes en la página
    noticiasPublicadas: 0,
    articulosPublicados: 0,
    usuariosEquipo: 0,
    consultasAsistente: 0
  };

  // 2. [Backend] Datos del Gráfico:
  // Endpoint sugerido: GET /api/admin/dashboard/trafico
  // El backend debe agrupar las visitas de los últimos 7 días. 
  // El 'porcentaje' se calcula en base al día con más visitas (ese será el 100%).
  const traficoSemanal = [
    { dia: 'Lun', visitas: 4200, porcentaje: 42 },
    { dia: 'Mar', visitas: 5100, porcentaje: 51 },
    { dia: 'Mié', visitas: 4800, porcentaje: 48 },
    { dia: 'Jue', visitas: 8900, porcentaje: 89 },
    { dia: 'Vie', visitas: 7500, porcentaje: 75 },
    { dia: 'Sáb', visitas: 9500, porcentaje: 95 },
    { dia: 'Dom', visitas: 10000, porcentaje: 100 }, 
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. CABECERA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-[32px] md:text-[40px] font-black text-[#003952] tracking-tighter leading-none mb-2">
            Bienvenido al panel de control
          </h1>
          <p className="text-gray-500 text-[15px]">
            Estadísticas, métricas y rendimiento global de la plataforma TV ANEUPI.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-[#003952] px-4 py-2 rounded-lg border border-blue-100 font-medium text-[14px] shadow-sm">
          <Activity size={18} className="animate-pulse text-blue-600" />
          Sistema Operativo
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS (KPIs) - En 3 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Métrica TV En Vivo */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <Radio size={24} />
            </div>
            <span className="bg-red-100 text-red-700 text-[11px] font-bold px-2 py-1 rounded-full animate-pulse tracking-wide">EN VIVO AHORA</span>
          </div>
          <div>
            <h3 className="text-gray-500 text-[14px] font-medium">Espectadores Concurrentes</h3>
            <p className="text-[32px] font-black text-[#003952] leading-none mt-1">{stats.espectadoresTvEnVivo.toLocaleString()}</p>
          </div>
        </div>

        {/* Métrica Visitantes Página TV */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Eye size={24} />
            </div>
            <span className="text-[12px] font-bold text-emerald-600 flex items-center gap-1">+12% <TrendingUp size={14}/></span>
          </div>
          <div>
            <h3 className="text-gray-500 text-[14px] font-medium">Visitantes el día de hoy</h3>
            <p className="text-[32px] font-black text-[#003952] leading-none mt-1">{stats.visitantesPaginaTv.toLocaleString()}</p>
          </div>
        </div>

        {/* Métrica Noticias */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Newspaper size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-[14px] font-medium">Noticias Activas</h3>
            <p className="text-[32px] font-black text-[#003952] leading-none mt-1">{stats.noticiasPublicadas}</p>
          </div>
        </div>

        {/* Métrica Artículos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <FileText size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-[14px] font-medium">Artículos Activos</h3>
            <p className="text-[32px] font-black text-[#003952] leading-none mt-1">{stats.articulosPublicados}</p>
          </div>
        </div>

        {/* Métrica Asistente */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Bot size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-[14px] font-medium">Consultas Asistente Virtual</h3>
            <p className="text-[32px] font-black text-[#003952] leading-none mt-1">{stats.consultasAsistente.toLocaleString()}</p>
          </div>
        </div>

        {/* Métrica Equipo */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100 text-gray-700 rounded-xl">
              <Users size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-[14px] font-medium">Miembros del Equipo</h3>
            <p className="text-[32px] font-black text-[#003952] leading-none mt-1">{stats.usuariosEquipo}</p>
          </div>
        </div>

      </div>

      {/* 3. SECCIÓN DE GRÁFICOS */}
      <div className="w-full">
        
        {/* Gráfico de Tráfico (Construido con CSS) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col w-full">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-[18px] font-bold text-[#003952]">Tráfico de la Plataforma</h2>
              <p className="text-[13px] text-gray-500 mt-1">Visitantes únicos de los últimos 7 días</p>
            </div>
            <div className="text-right">
              <p className="text-[24px] font-black text-emerald-600 leading-none">50,000</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Total Semanal</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-4">
            <div className="h-64 flex items-end justify-between gap-4 md:gap-8">
              {traficoSemanal.map((dia, index) => (
                <div key={index} className="w-full h-full bg-slate-50 flex flex-col justify-end rounded-t-md group relative">
                  {/* Tooltip Hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#003952] text-white text-[12px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-md">
                    {dia.visitas.toLocaleString()} visitas
                  </div>
                  {/* Barra de Progreso */}
                  <div 
                    className="w-full bg-blue-400 rounded-t-md group-hover:bg-[#003952] transition-colors duration-300"
                    style={{ height: `${dia.porcentaje}%` }}
                  ></div>
                </div>
              ))}
            </div>
            {/* Etiquetas del eje X */}
            <div className="flex justify-between mt-3 text-[14px] font-bold text-gray-400 border-t border-gray-100 pt-4 px-2">
              {traficoSemanal.map(dia => <span key={dia.dia}>{dia.dia}</span>)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}