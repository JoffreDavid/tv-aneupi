'use client';

import { useState, useRef } from 'react';
import { Edit, Trash2, Plus, ChevronLeft, ChevronRight, Eye, Heart, Share2 } from 'lucide-react';

export default function InicioAdminPage() {
  // --- ESTADOS SIMULADOS ---
  const [featuredNews] = useState({
    category: 'DEPORTES',
    title: 'Deporte: victoria histórica en el torneo',
    description: 'El equipo nacional consigue una victoria histórica en la final.',
    date: '11 Oct 2025',
    imageColor: 'bg-green-800' // Simula la foto del estadio
  });

  const [sidebarItems] = useState([
    { id: 1, title: '¡Consigue trabajo!', desc: 'Explora oportunidades relevantes ahora.' },
    { id: 2, title: 'Conferencia', desc: 'Congreso Internacional ANEUPI.' },
    { id: 3, title: 'Cursos', desc: 'Aprende Inglés o Francés con Nosotros.' },
    { id: 4, title: 'Inversión', desc: 'Conviértete en accionista.' },
  ]);

  const [recentArticles] = useState([
    { id: 1, title: 'Ecuador acumula ocho prórrogas en renovar contratos...', category: 'ECUADOR', date: '15 Oct 2025', views: 120, likes: 45, color: 'bg-blue-900' },
    { id: 2, title: 'Ecuador recibe una propuesta de EE. UU. para eliminar...', category: 'ECONOMÍA', date: '15 Oct 2025', views: 340, likes: 88, color: 'bg-slate-800' },
    { id: 3, title: 'EE. UU.: El Gobierno Trump autorizó operaciones...', category: 'EE. UU.', date: '14 Oct 2025', views: 500, likes: 110, color: 'bg-red-900' },
    { id: 4, title: 'Reconstrucción del atentado en Guayaquil...', category: 'SEGURIDAD', date: '14 Oct 2025', views: 890, likes: 200, color: 'bg-orange-800' },
  ]);

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* CABECERA DE LA PÁGINA */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="!text-[25px] !text-[#003952] font-bold">Resumen del Sitio (Inicio)</h1>
        <p className="text-[14px] text-gray-500">Gestiona la portada principal que ven tus usuarios.</p>
      </div>

      {/* SECCIÓN SUPERIOR: HERO BANNER Y SIDEBAR */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Banner Principal Destacado (Ocupa 2 columnas) */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative group">
          {/* Botón Admin Flotante */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-[#003952] text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-[#002233]">
              <Edit size={16} /> Cambiar Noticia Principal
            </button>
          </div>

          {/* Imagen (Simulada) */}
          <div className={`h-64 ${featuredNews.imageColor} relative flex items-center justify-center`}>
            <span className="absolute top-4 left-4 bg-red-600 text-white text-[12px] font-bold px-3 py-1 uppercase rounded-sm tracking-wider">
              {featuredNews.category}
            </span>
          </div>
          
          {/* Contenido del Banner */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{featuredNews.title}</h2>
            <p className="text-gray-600 mb-6">{featuredNews.description}</p>
            
            <div className="flex justify-between items-center">
              <button className="bg-[#003952] text-white px-5 py-2 rounded-lg text-[14px] font-bold hover:bg-[#002233] transition-colors">
                Leer más →
              </button>
              <span className="text-sm text-gray-500">{featuredNews.date}</span>
            </div>
          </div>
        </div>

        {/* Sidebar: Qué está pasando (Ocupa 1 columna) */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[18px] text-gray-900">Qué está pasando</h3>
              <button className="text-[#003952] hover:bg-blue-50 p-1.5 rounded transition" title="Agregar nuevo">
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {sidebarItems.map(item => (
                <div key={item.id} className="flex justify-between items-center group border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="pr-4">
                    <h4 className="font-bold text-[14px] text-gray-800 leading-tight">{item.title}</h4>
                    <p className="text-[12px] text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  
                  {/* Botones Admin en lugar del botón "Visitar" público */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-[#003952] bg-gray-50 rounded"><Edit size={14} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* SECCIÓN INFERIOR: ÚLTIMOS ARTÍCULOS (Estilo reutilizado) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-[20px] text-gray-900">Últimos Artículos Publicados</h3>
          <div className="flex gap-2">
            <button onClick={() => scrollContainer('left')} className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scrollContainer('right')} className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carrusel Horizontal de Tarjetas */}
        <div 
          ref={carouselRef} 
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{__html: `.scrollbar-hide::-webkit-scrollbar { display: none; }`}} />
          
          {recentArticles.map(article => (
            <div key={article.id} className="w-80 shrink-0 snap-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col group relative">
              
              <div className={`h-40 ${article.color} relative flex items-center justify-center opacity-90`}>
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase rounded-sm">
                  {article.category}
                </span>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-[15px] text-gray-900 mb-2 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-[12px] text-gray-400 mb-4">{article.date}</p>
                
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                  <div className="flex gap-3 text-gray-400 text-[12px]">
                    <span className="flex gap-1 items-center"><Eye size={14}/> {article.views}</span>
                    <span className="flex gap-1 items-center"><Heart size={14}/> {article.likes}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-[#003952] hover:bg-blue-50 rounded"><Edit size={14}/></button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}