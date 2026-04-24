'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface IntentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  mode: 'create' | 'edit';
  data?: any;
}

export default function IntentsModal({ isOpen, onClose, onSave, mode, data }: IntentsModalProps) {
  // Definimos los valores iniciales por defecto
  const initialFormState = {
    name: '',
    label: '',
    priority: 2, // Valor por defecto para prioridad
    active: true,
    keywords: '',
    response: ''
  };

  const [formData, setFormData] = useState<any>(initialFormState);

  // Sincronizar estado cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (data) {
        // Combinamos el estado inicial con la data recibida para evitar 'undefined'
        setFormData({
          ...initialFormState,
          ...data,
          // Aseguramos que los campos específicos tengan contenido aunque vengan vacíos
          name: data.name || '',
          label: data.label || '',
          keywords: data.keywords || '',
          response: data.response || '',
          priority: data.priority ?? 2
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleLocalSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-[#003952]">{mode === 'create' ? 'Crear' : 'Editar'} intención</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#003952]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Label</label>
              <input 
                type="text" 
                value={formData.label} 
                onChange={(e) => setFormData({...formData, label: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#003952]"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex-1 space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Priority</label>
              <input 
                type="number" 
                value={formData.priority} 
                onChange={(e) => setFormData({...formData, priority: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#003952]"
              />
            </div>
            <div className="flex items-center gap-3 pt-4">
              <button 
                onClick={() => setFormData({...formData, active: !formData.active})}
                className={`w-12 h-6 rounded-full relative transition-colors ${formData.active ? 'bg-[#003952]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.active ? 'right-1' : 'left-1'}`}></div>
              </button>
              <span className="text-sm font-medium">Intención activa</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Keywords (Separadas por coma)</label>
            <input 
              type="text" 
              value={formData.keywords} 
              onChange={(e) => setFormData({...formData, keywords: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#003952]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Respuesta del Bot</label>
            <textarea 
              rows={3}
              value={formData.response}
              onChange={(e) => setFormData({...formData, response: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none resize-none focus:border-[#003952]"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button onClick={onClose} className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600">Cancelar</button>
          <button 
            onClick={handleLocalSave}
            className="px-8 py-2 bg-[#003952] text-white rounded-lg text-sm font-bold hover:bg-[#00283d] shadow-md transition-all active:scale-95"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}