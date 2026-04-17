'use client';

import React from 'react';
import { X, Plus, Save } from 'lucide-react';

interface IntentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: any;
}

export default function IntentsModal({ isOpen, onClose, mode, data }: IntentsModalProps) {
  if (!isOpen) return null;

  // Si estamos en modo edición y no hay keywords, ponemos unas de ejemplo como en tu captura
  const keywords = data?.keywords 
    ? (Array.isArray(data.keywords) ? data.keywords : data.keywords.split(', ')) 
    : ['keyword'];

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Cabecera del Modal */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-bold text-[#003952]">
              {mode === 'create' ? 'Crear intención' : 'Editar intención'}
            </h2>
            <p className="text-[12px] text-gray-400 mt-1">
              Configura name, label, prioridad, keywords y respuestas respetando las validaciones del backend.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Fila 1: Name y Label */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                defaultValue={data?.name || ''} 
                placeholder="solo letras, números y _"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003952]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Label</label>
              <input 
                type="text" 
                defaultValue={data?.label || ''} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003952]"
              />
            </div>
          </div>

          {/* Fila 2: Priority y Switch */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Priority</label>
              <input 
                type="number" 
                defaultValue={data?.priority || 0} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003952]"
              />
            </div>
            <div className="flex items-center gap-3 pt-4">
              <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${data?.active !== false ? 'bg-[#003952]' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${data?.active !== false ? 'right-1' : 'left-1'}`}></div>
              </div>
              <span className="text-sm font-medium text-gray-700">Intención activa</span>
            </div>
          </div>

          {/* Sección Keywords */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#003952]">Keywords (1-30)</h3>
              <button className="flex items-center gap-1 text-[11px] font-bold text-gray-600 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">
                <Plus size={14} /> Agregar
              </button>
            </div>
            <div className="space-y-2">
              {keywords.map((kw: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <input 
                    type="text" 
                    defaultValue={kw} 
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none"
                  />
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-500 hover:bg-gray-50">
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sección Respuestas */}
          <div className="space-y-3 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#003952]">Respuestas (0-10)</h3>
              <button className="flex items-center gap-1 text-[11px] font-bold text-gray-600 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">
                <Plus size={14} /> Agregar
              </button>
            </div>
            <div className="space-y-2">
              <textarea 
                rows={3}
                defaultValue={data?.response || ''}
                placeholder="Escribe la respuesta aquí..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#003952] resize-none"
              />
              <div className="flex justify-end">
                <button className="text-[11px] font-bold text-gray-500 hover:text-gray-700">
                  Quitar respuesta
                </button>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed italic">
              Si guardas en edición con responses vacías, el backend elimina todas las respuestas de la intención.<br/>
              Para mantener botón de redirección sin HTML usa formato: [Ir al formulario](/formulario-entrevista)
            </p>
          </div>
        </div>

        {/* Footer del Modal */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            className="px-8 py-2 bg-[#003952] text-white rounded-lg text-sm font-bold hover:bg-[#00283d] transition-colors flex items-center gap-2 shadow-md"
          >
            {mode === 'create' ? 'Crear' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}