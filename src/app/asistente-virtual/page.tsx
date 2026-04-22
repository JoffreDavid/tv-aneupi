'use client';

import React, { useState } from 'react';
import { ShieldCheck, Plus, Bot } from 'lucide-react';

// Importación de componentes modulares
import IntentsModal from './intetsmodal';
import UnresolvedTab from './unresolvedTab';
import IntentsTab from './intentsTab';
import ChatBot from './chatBot';

export default function AsistenteVirtualAdmin() {
  const [activeTab, setActiveTab] = useState('intents');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedData, setSelectedData] = useState<any>(null);
  
  // Estado para la notificación (Toast)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Los cambios se guardaron correctamente.');

  // --- ESTADO CENTRALIZADO DE INTENCIONES ---
  const [intenciones, setIntenciones] = useState([
    { id: 1, label: 'Transmisión en vivo', name: 'en_vivo', keywords: 'en vivo, vivo, live, transmision, directo, streaming, ahora', priority: 2, responses: 1, response: 'Estamos en vivo ahora mismo. No te pierdas nuestra transmisión en tiempo real. 🔴 [Haz clic aquí para ver en vivo]', active: true },
    { id: 2, label: 'Solicita tu entrevista', name: 'entrevista', keywords: 'entrevista, solicitar entrevista, unirme, unirse, proyecto, formulario, postular, agendar,...', priority: 2, responses: 1, response: 'Claro, puedes agendar tu entrevista aquí.', active: true },
    { id: 3, label: 'Publica tu artículo', name: 'publicar_articulo', keywords: 'articulo, artículo, publicar articulo, opinion, conocimiento, escribir, blog, colaborar', priority: 2, responses: 1, response: 'Para publicar tu artículo, envíanos un correo a redaccion@aneupi.com', active: true },
    { id: 4, label: 'Publica tu noticia / denuncia', name: 'publicar_noticia', keywords: 'publicar noticia, denuncia, denunciar, mi noticia, compartir noticia, enviar noticia,...', priority: 2, responses: 1, response: 'Tu denuncia es importante. Adjunta las pruebas en el siguiente formulario.', active: true },
    { id: 5, label: '11', name: '11', keywords: 'cual, años', priority: 1, responses: 1, response: 'El bot tiene 1 año de funcionamiento.', active: true },
  ]);

  // Función para abrir el modal (Creación o Edición)
  const handleOpenModal = (mode: 'create' | 'edit', data: any = null) => {
    setModalMode(mode);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  // Función para guardar cambios desde el modal
  const handleSave = (newData: any) => {
    if (modalMode === 'edit') {
      setIntenciones(prev => prev.map(item => item.id === newData.id ? newData : item));
      setToastMessage('Intención actualizada correctamente.');
    } else {
      const nuevoId = intenciones.length > 0 ? Math.max(...intenciones.map(i => i.id)) + 1 : 1;
      setIntenciones(prev => [...prev, { ...newData, id: nuevoId, responses: newData.response ? 1 : 0 }]);
      setToastMessage('Nueva intención creada con éxito.');
    }
    
    setIsModalOpen(false);
    triggerToast();
  };

  // Función para Activar / Desactivar directamente en la tabla
  const handleToggleStatus = (id: number) => {
    setIntenciones(prev => prev.map(item => {
      if (item.id === id) {
        const nuevoEstado = !item.active;
        setToastMessage(nuevoEstado ? 'Intención activada.' : 'Intención desactivada.');
        return { ...item, active: nuevoEstado };
      }
      return item;
    }));
    triggerToast();
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 font-sans text-gray-700 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER CON TÍTULO CORREGIDO */}
        <header className="bg-[#003952] text-white p-5 rounded-xl shadow-lg flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="bg-white/10 p-2 rounded-full shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="truncate">
              <p className="text-xl md:text-2xl font-bold block">Panel de administración del bot</p>
              <p className="text-xs text-blue-100/70 truncate">Gestiona intenciones y respuestas de manera eficiente.</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal('create')} 
            className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all font-semibold shrink-0"
          >
            <Plus size={16} /> Nueva intención
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <main className="space-y-6">
            {/* SELECTOR DE PESTAÑAS */}
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

            {/* CONTENIDO DINÁMICO */}
            {activeTab === 'intents' ? (
              <IntentsTab 
                data={intenciones} 
                onEdit={(item) => handleOpenModal('edit', item)} 
                onToggleStatus={handleToggleStatus}
              />
            ) : (
              <UnresolvedTab 
                onCreateIntent={(msg) => handleOpenModal('create', { label: '', name: '', keywords: msg, active: true })} 
              />
            )}
          </main>

          {/* BARRA LATERAL (ASIDE) */}
          <aside className="space-y-6">
            <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-[#003952]">
                <Bot size={16} />
                <h3 className="text-sm font-bold">Guía rápida</h3>
              </div>
              <div className="text-[11px] text-gray-500 space-y-3 leading-relaxed">
                <p>Usa <span className="font-bold">Editar</span> para modificar palabras clave o respuestas existentes.</p>
                <p>Con <span className="font-bold">Desactivar</span> el bot ignorará esta intención sin borrarla.</p>
                <p>Desde <span className="font-bold">No resueltas</span> puedes crear intenciones con keyword sugerida.</p>
              </div>
            </section>
            
            <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#003952]">Espacios para imágenes</h3>
              <div className="h-28 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-[10px] text-gray-400 gap-2 font-medium bg-gray-50/50">
                <Plus size={20} className="opacity-20" />
                Imagen panel intenciones
              </div>
              <div className="h-28 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-[10px] text-gray-400 gap-2 font-medium bg-gray-50/50">
                <Plus size={20} className="opacity-20" />
                Imagen panel no resueltas
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* CHATBOT INTERACTIVO (Recibe la data en tiempo real) */}
      <ChatBot intencionesData={intenciones} />

      {/* MODAL GLOBAL */}
      <IntentsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        mode={modalMode}
        data={selectedData}
      />

      {/* NOTIFICACIÓN TOAST (Esquina inferior derecha) */}
      {showToast && (
        <div className="fixed bottom-10 right-10 bg-white border border-gray-100 shadow-2xl rounded-xl p-4 flex flex-col min-w-[250px] z-[200] animate-in slide-in-from-right duration-300">
          <p className="text-sm font-bold text-gray-800">Operación exitosa</p>
          <p className="text-[12px] text-gray-500">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}