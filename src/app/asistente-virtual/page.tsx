'use client';

import React, { useState } from 'react';
import { ShieldCheck, Plus, Bot } from 'lucide-react';

// Importación de componentes modulares con nombres corregidos
import IntentsModal from './intetsmodal'; // Asegúrate que el archivo se llame intetsmodal.tsx
import UnresolvedTab from './unresolvedTab'; // Coincide con tu minúscula
import IntentsTab from './intentsTab'; // Coincide con tu minúscula

export default function AsistenteVirtualAdmin() {
  const [activeTab, setActiveTab] = useState('intents');
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  // Función unificada para abrir el modal
  const handleOpenModal = (mode: 'create' | 'edit', data: any = null) => {
    setModalMode(mode);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 font-sans text-gray-700">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="bg-[#003952] text-white p-5 rounded-xl shadow-lg flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-2 rounded-full"><ShieldCheck size={24} /></div>
            <div>
              <h1 className="text-xl font-bold">Panel de administración del bot</h1>
              <p className="text-xs text-blue-100/70">Gestiona intenciones y respuestas.</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal('create')} 
            className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all"
          >
            <Plus size={16} /> Nueva intención
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <main className="space-y-6">
            <div className="flex gap-6 border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('intents')} 
                className={`pb-2 text-sm font-semibold transition-all ${activeTab === 'intents' ? 'border-b-2 border-[#003952] text-[#003952]' : 'text-gray-400'}`}
              >
                Intenciones
              </button>
              <button 
                onClick={() => setActiveTab('unresolved')} 
                className={`pb-2 text-sm font-semibold transition-all ${activeTab === 'unresolved' ? 'border-b-2 border-[#003952] text-[#003952]' : 'text-gray-400'}`}
              >
                No resueltas
              </button>
            </div>

            {/* CONTENIDO DINÁMICO CONEXIÓN */}
            {activeTab === 'intents' ? (
              <IntentsTab onEdit={(item) => handleOpenModal('edit', item)} />
            ) : (
              <UnresolvedTab onCreateIntent={(msg) => handleOpenModal('create', { label: '', name: '', keywords: [msg] })} />
            )}
          </main>

          <aside className="space-y-6">
            <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-[#003952]"><Bot size={16} /><h3 className="text-sm font-bold">Guía rápida</h3></div>
              <div className="text-[11px] text-gray-500 space-y-3 leading-relaxed">
                <p>Usa <b>Editar</b> para reemplazar respuestas completas cuando envíes responses.</p>
                <p>Con <b>Desactivar</b> se hace soft delete: active pasa a false.</p>
                <p>Desde <b>No resueltas</b> puedes crear intenciones con keyword sugerida.</p>
              </div>
            </section>
            
            <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="h-24 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-[10px] text-gray-400 gap-2 font-medium">
                <Plus size={20} className="opacity-20" />
                Imagen panel intenciones
              </div>
              <div className="h-24 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-[10px] text-gray-400 gap-2 font-medium">
                <Plus size={20} className="opacity-20" />
                Imagen panel no resueltas
              </div>
            </section>
          </aside>
        </div>
      </div>

      <IntentsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={modalMode}
        data={selectedData}
      />
    </div>
  );
}