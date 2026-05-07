'use client';

import { useState } from 'react';
import { Play, Square, Trash2, Edit, Radio, Users, MessageSquareX, Plus, ExternalLink, Search, ChevronLeft, ChevronRight, Pin, Send, MonitorPlay, Ban } from 'lucide-react';

// --- INTERFACES PARA TYPESCRIPT ---
interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
  isModerator?: boolean;
}

interface Channel {
  id: number;
  title: string;
  category: string;
  viewers: number;
  isLive: boolean;
  image: string;
  url: string; 
}

export default function TvVivoAdminPage() {
  // --- ESTADOS SIMULADOS ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);

  // Estados de Canales
  const [channels, setChannels] = useState<Channel[]>([
    { id: 1, title: 'ANEUPI Noticias 24/7', category: 'Noticias', viewers: 2500, isLive: true, image: 'bg-blue-900', url: 'https://youtube.com' },
    { id: 2, title: 'Deportes en Vivo', category: 'Deportes', viewers: 1800, isLive: true, image: 'bg-green-900', url: '' },
    { id: 3, title: 'Cultura y Entretenimiento', category: 'Cultura', viewers: 950, isLive: false, image: 'bg-purple-900', url: '' },
    { id: 4, title: 'Cine Independiente', category: 'Entretenimiento', viewers: 420, isLive: true, image: 'bg-indigo-900', url: '' },
  ]);

  // Canal Activo en la Transmisión Principal
  const [activeChannelId, setActiveChannelId] = useState<number | null>(1); 

  // Estados para el Chat
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: 'ANEUPI Noticias', text: 'Última hora: Nuevas medidas implementadas.', time: 'Hace 2 min', isModerator: true },
    { id: 2, user: 'Maria López', text: 'Excelente cobertura de las noticias', time: 'Hace 8 min' },
    { id: 3, user: 'Carlos Pérez', text: 'Muy informativo el segmento.', time: 'Hace 10 min' },
    { id: 4, user: 'Usuario Troll', text: 'Este canal es una pérdida de tiempo xd', time: 'Hace 11 min' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [pinnedCommentId, setPinnedCommentId] = useState<number | null>(1);

  // --- ESTADOS DEL MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  // --- LÓGICA DE BÚSQUEDA Y CANAL ACTIVO ---
  const filteredChannels = channels.filter(channel => 
    channel.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    channel.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeChannel = channels.find(c => c.id === activeChannelId);

  // --- FUNCIONES DE ACCIÓN ---
  const toggleStream = () => setIsStreaming(!isStreaming);

  const deleteComment = (id: number) => {
    if (confirm('¿Eliminar este comentario del chat público?')) {
      setComments(comments.filter(c => c.id !== id));
      if (pinnedCommentId === id) setPinnedCommentId(null);
    }
  };

  const banUser = (username: string) => {
    if (confirm(`¿Estás seguro de BLOQUEAR a ${username}? Se eliminarán todos sus mensajes y no podrá volver a escribir.`)) {
      setComments(prevComments => prevComments.filter(c => c.user !== username));
      alert(`El usuario ${username} ha sido bloqueado.`);
    }
  };

  const togglePinComment = (id: number) => {
    setPinnedCommentId(prevId => prevId === id ? null : id);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentToAdd: Comment = {
      id: Date.now(),
      user: 'Admin ANEUPI',
      text: newComment,
      time: 'Justo ahora',
      isModerator: true
    };

    setComments([commentToAdd, ...comments]);
    setNewComment('');
  };

  // --- FUNCIONES DE GESTIÓN DE CANALES ---
  const deleteChannel = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este canal permanentemente?')) {
      const remainingChannels = channels.filter(c => c.id !== id);
      setChannels(remainingChannels);
      if (activeChannelId === id) {
        setActiveChannelId(remainingChannels.length > 0 ? remainingChannels[0].id : null);
      }
    }
  };

  const openAddModal = () => {
    setSelectedChannel(null);
    setIsModalOpen(true);
  };

  const openEditModal = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsModalOpen(true);
  };

  const handleGuardarCanal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const url = formData.get('url') as string;

    if (selectedChannel) {
      setChannels(channels.map(c =>
        c.id === selectedChannel.id ? { ...c, title, category, url } : c
      ));
    } else {
      const nuevoCanal: Channel = {
        id: Date.now(),
        title,
        category,
        url,
        viewers: 0,
        isLive: false,
        image: 'bg-slate-700'
      };
      setChannels([...channels, nuevoCanal]);
    }
    setIsModalOpen(false);
  };

  const scrollContainer = (id: string, direction: 'left' | 'right') => {
    const container = document.getElementById(id);
    if (container) {
      const scrollAmount = 350;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 relative px-4 md:px-0">
      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />
      
      {/* 1. CABECERA DE LA PÁGINA (RESPONSIVA) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-gray-200 pb-5">
        <div className="flex flex-col w-full lg:w-auto">
          <div className="flex items-center gap-4">
            <div className="w-2 h-8 md:w-2.5 md:h-12 bg-gradient-to-b from-[#003952] to-blue-500 rounded-full shadow-sm"></div>
            <div className="flex items-center gap-3">
              <Radio size={28} className="text-[#003952] md:w-8 md:h-8" strokeWidth={2.5} />
              <h1 className="text-3xl md:text-[50px] font-black text-[#003952] tracking-tighter leading-none">
                TV en Vivo
              </h1>
            </div>
          </div>
          <p className="text-sm md:text-[15px] text-gray-500 mt-2 ml-6 md:ml-[36px]">
            Controla la transmisión principal, modera el chat y gestiona los canales.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar canal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px] transition-shadow shadow-sm"
            />
          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto bg-[#003952] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002233] transition-colors whitespace-nowrap"
          >
            <Plus size={18} /> Agregar Canal
          </button>
        </div>
      </div>

      {/* BLOQUE 1: SALA DE CONTROL Y MODERACIÓN (RESPONSIVO) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Transmisión Principal Dinámica */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50">
            <div>
               <h2 className="text-base md:text-[18px] font-bold text-[#003952]">Transmisión Principal</h2>
               <p className="text-[12px] md:text-[13px] text-gray-500 font-medium mt-0.5">
                 {activeChannel ? `Emite: ${activeChannel.title}` : 'Sin canal seleccionado'}
               </p>
            </div>
            
            <div className="flex items-center gap-2 text-[11px] md:text-[12px] font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
              <Users size={14} /> {activeChannel ? activeChannel.viewers : 0} Espectadores
            </div>
          </div>

          <div className={`flex-1 flex flex-col items-center justify-center transition-colors min-h-[250px] md:min-h-[400px] ${isStreaming && activeChannel ? activeChannel.image : 'bg-black'}`}>
            {isStreaming && activeChannel ? (
              <div className="text-center text-white bg-black/40 p-4 md:p-8 rounded-2xl backdrop-blur-sm mx-4">
                <Radio size={40} className="mx-auto mb-4 animate-pulse text-red-500 md:w-12 md:h-12" />
                <p className="text-lg md:text-2xl text-white font-bold mb-1 uppercase">SEÑAL EN VIVO ACTIVA</p>
                <p className="text-xs md:text-sm text-gray-300 uppercase tracking-widest">{activeChannel.category}</p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Square size={40} className="mx-auto mb-4 md:w-12 md:h-12" />
                <p className="text-base md:text-xl font-bold">{!activeChannel ? 'SELECCIONA UN CANAL' : 'TRANSMISIÓN PAUSADA'}</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-white flex gap-4">
            <button
              onClick={toggleStream}
              disabled={!activeChannel}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-white transition-colors text-[13px] md:text-[14px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${isStreaming ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isStreaming ? <><Square size={18} /> DETENER</> : <><Play size={18} /> INICIAR</>}
            </button>
          </div>
        </div>

        {/* Panel de Moderación (Chat) - Altura fija responsiva */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[450px] md:h-[550px] lg:h-full">
          <div className="p-4 border-b border-gray-100 bg-[#003952] text-white rounded-t-xl">
            <h2 className="text-sm md:text-[16px] font-bold !text-white flex items-center gap-2">
              <MessageSquareX size={18} /> Comentarios
            </h2>
          </div>

          {pinnedCommentId && comments.find(c => c.id === pinnedCommentId) && (
            <div className="p-3 bg-blue-50 border-b border-blue-100 relative">
              <div className="flex items-center gap-1 text-[#003952] text-[10px] md:text-[11px] font-bold mb-1 uppercase tracking-wider">
                <Pin size={12} fill="currentColor" /> Mensaje Fijado
              </div>
              <p className="text-[12px] md:text-[13px] text-gray-800 pr-8">
                <span className="font-bold mr-1">{comments.find(c => c.id === pinnedCommentId)?.user}:</span>
                {comments.find(c => c.id === pinnedCommentId)?.text}
              </p>
              <button 
                onClick={() => setPinnedCommentId(null)} 
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}

          <div className="p-3 md:p-4 flex-1 overflow-y-auto space-y-3 scrollbar-hide">
            {comments.map(comment => (
              <div key={comment.id} className={`group relative p-3 rounded-lg border transition-colors ${comment.isModerator ? 'bg-blue-50/50 border-blue-100' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-bold text-[11px] md:text-[12px] flex items-center gap-1 ${comment.isModerator ? 'text-[#003952]' : 'text-gray-700'}`}>
                    {comment.user} {comment.isModerator && <span className="bg-[#003952] text-white text-[8px] md:text-[9px] px-1.5 py-0.5 rounded uppercase">Admin</span>}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-gray-400">{comment.time}</span>
                </div>
                <p className="text-[12px] md:text-[13px] text-gray-600 pr-12 md:pr-16 leading-relaxed">{comment.text}</p>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm p-1 rounded-lg">
                  {!comment.isModerator && (
                    <button onClick={() => banUser(comment.user)} className="p-1.5 text-orange-500 rounded hover:bg-orange-500 hover:text-white border border-orange-100 md:border-transparent">
                      <Ban size={13} />
                    </button>
                  )}
                  <button onClick={() => togglePinComment(comment.id)} className={`p-1.5 rounded border border-gray-100 md:border-transparent ${pinnedCommentId === comment.id ? 'bg-[#003952] text-white' : 'text-gray-400 hover:text-[#003952]'}`}>
                    <Pin size={13} />
                  </button>
                  <button onClick={() => deleteComment(comment.id)} className="p-1.5 text-red-400 rounded border border-gray-100 md:border-transparent hover:bg-red-50">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-100 bg-white rounded-b-xl">
            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#003952]"
              />
              <button 
                type="submit" 
                disabled={!newComment.trim()}
                className="bg-[#003952] text-white px-3 py-2 rounded-lg flex items-center justify-center disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* BLOQUE 2: GESTIÓN DE CANALES (SCROLL ADAPTADO) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl md:text-[22px] font-bold text-[#003952]">Catálogo de Canales</h2>
        </div>

        {filteredChannels.length > 0 ? (
          <div className="relative group">
            <button onClick={() => scrollContainer('scroll-canales', 'left')} className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white border border-gray-200 rounded-full text-[#003952] shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:block">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scrollContainer('scroll-canales', 'right')} className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white border border-gray-200 rounded-full text-[#003952] shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:block">
              <ChevronRight size={24} />
            </button>

            <div id="scroll-canales" className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide pt-2 px-1">
              {filteredChannels.map(channel => (
                <div key={channel.id} className={`w-[260px] md:w-80 shrink-0 snap-start bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all duration-300 ${activeChannelId === channel.id ? 'border-[#003952] ring-2 ring-[#003952]/20' : 'border-gray-200 hover:-translate-y-1'}`}>

                  <div
                    onClick={() => channel.url && window.open(channel.url, '_blank')}
                    className={`h-28 md:h-32 ${channel.image} relative flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer`}
                  >
                    {channel.isLive && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider">EN VIVO</span>
                    )}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white">
                      <Play size={20} className="ml-1" />
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-sm md:text-[16px] text-[#003952] mb-1 truncate" title={channel.title}>{channel.title}</h3>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="inline-block bg-gray-100 text-gray-600 text-[10px] md:text-[11px] font-medium px-2 py-1 rounded capitalize">
                        {channel.category}
                      </span>
                      <span className="text-[11px] md:text-[12px] text-gray-400 flex items-center gap-1"><Users size={12}/> {channel.viewers}</span>
                    </div>

                    <button
                      onClick={() => setActiveChannelId(channel.id)}
                      className={`w-full py-2 flex items-center justify-center gap-2 rounded text-[12px] md:text-[13px] font-bold mb-3 transition-all ${activeChannelId === channel.id ? 'bg-[#003952] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                    >
                      <MonitorPlay size={16} />
                      <span className="truncate">{activeChannelId === channel.id ? 'Emitiendo' : 'Emitir'}</span>
                    </button>

                    <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                      <button onClick={() => openEditModal(channel)} className="flex-1 py-2 bg-gray-50 hover:bg-[#003952] hover:text-white text-gray-600 rounded text-[12px] font-medium flex justify-center items-center gap-1 transition-colors">
                        <Edit size={13} /> Editar
                      </button>
                      <button onClick={() => deleteChannel(channel.id)} className="flex-1 py-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded text-[12px] font-medium flex justify-center items-center gap-1 transition-colors">
                        <Trash2 size={13} /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
           <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-sm">No se encontraron canales</p>
          </div>
        )}
      </div>

      {/* MODAL DE GESTIÓN (OPTIMIZADO PARA MÓVIL) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-y-auto max-h-[90vh] animate-in fade-in duration-200">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg md:text-[22px] !text-[#003952] font-bold">
                {selectedChannel ? 'Editar Canal' : 'Agregar Canal'}
              </h2>
            </div>

            <form onSubmit={handleGuardarCanal} className="p-5 md:p-6 space-y-4 md:space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-[13px] md:text-[14px]">Nombre</label>
                <input type="text" name="title" defaultValue={selectedChannel?.title || ''} className="w-full px-4 py-2 border rounded-lg outline-none text-sm" placeholder="Ej: ANEUPI Deportes" required />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Categoría</label>
                <select name="category" defaultValue={selectedChannel?.category || 'Noticias'} className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
                  <option value="Noticias">Noticias</option>
                  <option value="Deportes">Deportes</option>
                  <option value="Cultura">Cultura</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">URL Stream</label>
                <input type="url" name="url" defaultValue={selectedChannel?.url || ''} className="w-full px-4 py-2 border rounded-lg outline-none text-sm" placeholder="https://..." />
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm">
                  Cerrar
                </button>
                <button type="submit" className="flex-1 py-2 bg-[#003952] text-white rounded-lg text-sm font-bold">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}