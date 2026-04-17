'use client';

import React from 'react';

interface UnresolvedTabProps {
  onCreateIntent: (userMessage: string) => void;
}

export default function UnresolvedTab({ onCreateIntent }: UnresolvedTabProps) {
  const logs = [
    { fecha: '17/04/2026, 14:39', usuario: 'dreccion de tvaneupi', sessionId: '4e98b85d-6506-4551-8b1c-3b1fc4c69022', bot: 'Lo siento, no entendí tu pregunta. ¿Puedes intentarlo de otra forma? También puedes...' },
    { fecha: '17/04/2026, 14:39', usuario: 'direcciom de tu casa', sessionId: '4e98b85d-6506-4551-8b1c-3b1fc4c69022', bot: 'Lo siento, no entendí tu pregunta. ¿Puedes intentarlo de otra forma? También puedes...' },
    { fecha: '17/04/2026, 14:35', usuario: 'Cual es su edad', sessionId: '4e98b85d-6506-4551-8b1c-3b1fc4c69022', bot: 'Lo siento, no entendí tu pregunta. ¿Puedes intentarlo de otra forma? También puedes...' },
    { fecha: '16/04/2026, 09:42', usuario: 'whatsapp', sessionId: '4e98b85d-6506-4551-8b1c-3b1fc4c69022', bot: 'Lo siento, no entendí tu pregunta. ¿Puedes intentarlo de otra forma? También puedes...' },
    { fecha: '16/04/2026, 09:42', usuario: 'hola', sessionId: '4e98b85d-6506-4551-8b1c-3b1fc4c69022', bot: 'Lo siento, no entendí tu pregunta. ¿Puedes intentarlo de otra forma? También puedes...' },
  ];

  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-[11px] font-bold text-gray-400 uppercase mb-4 tracking-wider">Filtros de no resueltas</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input type="text" placeholder="Buscar texto" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
            <input type="text" placeholder="Session ID" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
            <input type="text" placeholder="dd/mm/aaaa" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500" />
            <input type="text" placeholder="dd/mm/aaaa" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500" />
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white"><option>20 por página</option></select>
          </div>
          <div className="flex justify-end">
            <button className="bg-[#003952] text-white px-6 py-2 rounded-lg text-[13px] font-bold shadow-md">Aplicar filtros</button>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-50 text-[12px] uppercase tracking-wider">
              <th className="pb-4 font-semibold px-2">Fecha</th>
              <th className="pb-4 font-semibold px-2">Usuario</th>
              <th className="pb-4 font-semibold px-2 text-center">Intent detectada</th>
              <th className="pb-4 font-semibold px-2 text-center">Matched</th>
              <th className="pb-4 font-semibold px-2">Bot</th>
              <th className="pb-4 text-right font-semibold px-2">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-5 px-2 text-[12px] font-bold text-gray-700">{log.fecha.split(',')[0]}<br/><span className="font-medium text-gray-500">{log.fecha.split(',')[1]}</span></td>
                <td className="py-5 px-2"><div className="text-[13px] font-bold text-gray-700">{log.usuario}</div><div className="text-[10px] text-gray-400 break-all max-w-[150px]">{log.sessionId}</div></td>
                <td className="py-5 px-2 text-center text-[12px] text-gray-600">Sin intención</td>
                <td className="py-5 px-2 text-center text-[12px] text-gray-600">No</td>
                <td className="py-5 px-2"><p className="text-[11px] text-gray-500 line-clamp-2 max-w-[280px]">{log.bot}</p></td>
                <td className="py-5 px-2 text-right">
                  <button onClick={() => onCreateIntent(log.usuario)} className="px-4 py-1.5 border border-gray-200 rounded-lg text-[12px] font-bold hover:bg-gray-100">Crear intención</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}