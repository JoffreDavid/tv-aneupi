'use client';

import React, { useState, useMemo } from 'react';
import { FileText, Search, Clock, User, CheckCircle, AlertCircle, Eye, Download } from 'lucide-react';

interface FormRecord {
  id: number;
  tipo: 'Noticia' | 'Entrevista';
  usuario: string;
  contenido: string;
  fecha: string;
  hora: string;
  estado: 'Pendiente' | 'Revisado';
}

interface UnresolvedFormProps {
  data: FormRecord[];
  onMarkAsRead: (id: number) => void;
}

export default function UnresolvedForm({ data, onMarkAsRead }: UnresolvedFormProps) {
  const [filterType, setFilterType] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // LÓGICA DE FILTRADO
  const filteredForms = useMemo(() => {
    return data.filter((form) => {
      const matchesType = filterType === 'Todos' || form.tipo === filterType;
      const matchesSearch = form.usuario.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            form.contenido.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [data, filterType, searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* SECCIÓN DE FILTROS RÁPIDOS */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Buscar por usuario o contenido</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Ej: Juan Pérez..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#003952]" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tipo de Formulario</label>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none cursor-pointer text-gray-600 font-medium"
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Noticia">Noticias / Denuncias</option>
            <option value="Entrevista">Solicitud de Entrevista</option>
          </select>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#003952] text-white rounded-xl text-xs font-bold hover:bg-[#00283d] transition-all shadow-md active:scale-95">
          <Download size={14} /> Exportar CSV
        </button>
      </section>

      {/* TABLA DE FORMULARIOS */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr className="text-[11px] font-black uppercase text-gray-400 tracking-widest">
                <th className="p-4">Recepción</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Remitente</th>
                <th className="p-4">Detalles del mensaje</th>
                <th className="p-4 text-center">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredForms.length > 0 ? filteredForms.map((form) => (
                <tr key={form.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-300" />
                      <div>
                        <p className="text-[13px] font-bold text-gray-700">{form.fecha}</p>
                        <p className="text-[10px] text-gray-400">{form.hora}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                      form.tipo === 'Noticia' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                      {form.tipo}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[#003952]">
                        <User size={14} />
                      </div>
                      <span className="text-[13px] font-bold text-[#003952]">{form.usuario}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] text-gray-500 line-clamp-1 max-w-[250px] italic">
                      "{form.contenido}"
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col items-center">
                      {form.estado === 'Pendiente' ? (
                        <AlertCircle size={18} className="text-red-500 animate-pulse" />
                      ) : (
                        <CheckCircle size={18} className="text-green-500" />
                      )}
                      <span className="text-[8px] font-black uppercase text-gray-400 mt-1">{form.estado}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#003952] hover:bg-gray-100 rounded-lg transition-all" title="Ver detalles">
                        <Eye size={18} />
                      </button>
                      {form.estado === 'Pendiente' && (
                        <button 
                          onClick={() => onMarkAsRead(form.id)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="Marcar como revisado"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-20 text-center text-gray-400 italic text-sm">
                    No se encontraron formularios con los criterios de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}