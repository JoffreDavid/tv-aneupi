'use client';

import React from 'react';
import { Search, Trash2 } from 'lucide-react';

interface IntentsTabProps {
  onEdit: (item: any) => void;
}

export default function IntentsTab({ onEdit }: IntentsTabProps) {
  const intenciones = [
    { id: 1, label: 'Transmisión en vivo', name: 'en_vivo', keywords: 'en vivo, vivo, live, transmision, directo, streaming, ahora', priority: 2, responses: 1, response: 'Estamos en vivo ahora mismo...' },
    { id: 2, label: 'Solicita tu entrevista', name: 'entrevista', keywords: 'entrevista, solicitar entrevista, unirme, unirse, proyecto, formulario, postular, agendar,...', priority: 2, responses: 1 },
    { id: 3, label: 'Publica tu artículo', name: 'publicar_articulo', keywords: 'articulo, artículo, publicar articulo, opinion, conocimiento, escribir, blog, colaborar', priority: 2, responses: 1 },
    { id: 4, label: 'Publica tu noticia / denuncia', name: 'publicar_noticia', keywords: 'publicar noticia, denuncia, denunciar, mi noticia, compartir noticia, enviar noticia,...', priority: 2, responses: 1 },
    { id: 5, label: '11', name: '11', keywords: 'cual, años', priority: 1, responses: 1 },
  ];

  return (
    <div className="space-y-6 relative">
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Filtrar por Name</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Ej: horarios" className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003952]" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Filtrar por Label</label>
          <input type="text" placeholder="Ej: Horarios de atención" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003952]" />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Estado</label>
          <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer">
            <option>Todos</option>
            <option>Activa</option>
            <option>Inactiva</option>
          </select>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Listado de intenciones</h2>
          <button className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 shadow-sm">Recargar</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[12px] text-gray-400 border-b border-gray-50 uppercase">
                <th className="pb-4 font-semibold px-2">Intención</th>
                <th className="pb-4 font-semibold px-2">Keywords</th>
                <th className="pb-4 font-semibold text-center">Priority</th>
                <th className="pb-4 font-semibold text-center">Estado</th>
                <th className="pb-4 font-semibold text-center">Respuestas</th>
                <th className="pb-4 text-right font-semibold px-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {intenciones.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-5 px-2">
                    <div className="font-bold text-[#003952] text-[14px] leading-tight">{item.label}</div>
                    <div className="text-[11px] text-gray-400 font-medium">{item.name}</div>
                  </td>
                  <td className="py-5 px-2">
                    <p className="text-[11px] text-gray-500 leading-relaxed max-w-[300px] line-clamp-2">{item.keywords}</p>
                  </td>
                  <td className="py-5 text-center text-sm font-medium text-gray-700">{item.priority}</td>
                  <td className="py-5 text-center">
                    <span className="bg-[#dcfce7] text-[#166534] text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#bbf7d0]">Activa</span>
                  </td>
                  <td className="py-5 text-center text-sm font-medium text-gray-700">{item.responses}</td>
                  <td className="py-5 px-2">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(item)} className="px-4 py-1.5 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 shadow-sm">Editar</button>
                      <button className="px-3 py-1.5 bg-[#ef4444] text-white rounded-lg text-[13px] font-bold hover:bg-red-600 shadow-md flex items-center gap-1.5"><Trash2 size={14} /> Desactivar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="fixed bottom-10 right-10 bg-white border border-gray-100 shadow-2xl rounded-xl p-4 flex flex-col min-w-[200px] z-50 animate-in slide-in-from-right duration-300">
        <p className="text-sm font-bold text-gray-800">Intención actualizada</p>
        <p className="text-[12px] text-gray-500">Los cambios se guardaron...</p>
      </div>
    </div>
  );
}