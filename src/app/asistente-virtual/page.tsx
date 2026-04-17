'use client';

import { useState } from 'react';
import { 
  MessageSquarePlus, 
  History, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Power, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from 'lucide-react';

// --- INTERFACES ---
interface BotResponse {
  id: number;
  question: string;
  keywords: string[];
  isActive: boolean;
  lastModified: string;
}

export default function ChatBotConfigPage() {
  // --- ESTADOS ---
  const [responses, setResponses] = useState<BotResponse[]>([
    { 
      id: 1, 
      question: "¿Quieres ganar dinero?", 
      keywords: ["dinero", "ganar", "ingresos"], 
      isActive: true, 
      lastModified: "2026-04-15 10:30" 
    },
    { 
      id: 2, 
      question: "¿Cómo contacto a soporte?", 
      keywords: ["soporte", "ayuda", "ticket"], 
      isActive: false, 
      lastModified: "2026-04-16 14:20" 
    },
  ]);

  const [isEditing, setIsEditing] = useState<number | null>(null);

  // --- FUNCIONES DE ACCIÓN ---
  const handleToggleStatus = (id: number) => {
    setResponses(responses.map(res => 
      res.id === id ? { ...res, isActive: !res.isActive } : res
    ));
  };

  const deleteResponse = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta configuración de respuesta?')) {
      setResponses(responses.filter(res => res.id !== id));
    }
  };

  const handleAddResponse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    const keywordsStr = formData.get('keywords') as string;
    
    const newRes: BotResponse = {
      id: Date.now(),
      question,
      keywords: keywordsStr.split(',').map(k => k.trim()),
      isActive: true,
      lastModified: new Date().toLocaleString()
    };

    setResponses([newRes, ...responses]);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* TÍTULO */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <MessageSquarePlus className="text-[#003952]" size={30} />
        <h1>Configuración de Chatbot Inteligente</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* BLOQUE 1: FORMULARIO DE AGREGAR (Izquierda) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-[#003952] text-white">
              <h2 className="!text-lg !text-white flex items-center gap-2">
                <Plus size={20} /> Nueva Respuesta
              </h2>
            </div>
            <form onSubmit={handleAddResponse} className="p-5 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-[14px]">Pregunta del Usuario</label>
                <textarea
                  name="question"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px] resize-none"
                  placeholder="¿Qué preguntará el usuario?"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-[14px]">Palabras Clave (Separadas por comas)</label>
                <input
                  name="keywords"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px]"
                  placeholder="ej: dinero, pago, costo"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#003952] text-white py-3 rounded-lg font-bold hover:bg-[#002233] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Save size={18} /> Guardar Configuración
              </button>
            </form>
          </div>

          {/* Tips de Ayuda */}
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
            <AlertCircle className="text-blue-600 shrink-0" size={20} />
            <p className="text-[13px] text-blue-800">
              <strong>Tip:</strong> El bot activará esta respuesta cuando detecte al menos una de las palabras clave en el mensaje del usuario.
            </p>
          </div>
        </div>

        {/* BLOQUE 2: HISTORIAL Y GESTIÓN (Derecha) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="!text-lg flex items-center gap-2 text-gray-700">
                <History size={20} className="text-[#003952]" /> Historial de Respuestas
              </h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {responses.length} Entradas
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[13px] font-bold text-gray-500 uppercase">Pregunta / Activación</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-gray-500 uppercase text-center">Estado</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-gray-500 uppercase text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {responses.map((res) => (
                    <tr key={res.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800 text-[15px] mb-1">{res.question}</p>
                        <div className="flex flex-wrap gap-1">
                          {res.keywords.map((kw, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                              {kw}
                            </span>
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2">Modificado: {res.lastModified}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleToggleStatus(res.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold transition-all ${
                            res.isActive 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-600 border border-red-100'
                          }`}
                        >
                          <Power size={12} />
                          {res.isActive ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button 
                            className="p-2 text-gray-400 hover:text-[#003952] hover:bg-gray-100 rounded-lg transition-all"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => deleteResponse(res.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {responses.length === 0 && (
                <div className="p-20 text-center text-gray-400">
                  <MessageSquarePlus size={40} className="mx-auto mb-4 opacity-20" />
                  <p>No hay respuestas configuradas aún.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}