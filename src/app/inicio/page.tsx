'use client';

import { useState, useEffect } from 'react';
import { 
  Edit, Trash2, Plus, ChevronLeft, ChevronRight, Eye, Heart, 
  ArrowRight, Search, MessageCircle, X, ChevronDown, ChevronUp, Check, RotateCcw, Power
} from 'lucide-react';
import NoticiaCompleta from './noticiaCompleta'; 

// ==========================================
// 1. INTERFACES Y TIPOS
// ==========================================
interface NewsItem {
  id: number;
  category: string;
  title: string;
  description?: string;
  date: string;
  color?: string; 
  imageColor?: string; 
  views?: number;
  likes?: number;
  comments?: number;
  url?: string;
  imageUrl?: string; 
  originalSection?: string; // Propiedad para rastrear el origen al restaurar
}

interface SidebarItem {
  id: number;
  title: string;
  desc: string;
}

export default function InicioAdminPage() {
  // ==========================================
  // 2. ESTADOS DE UI Y NAVEGACIÓN
  // ==========================================
  const [activeTab, setActiveTab] = useState<'publicado' | 'temporadas' | 'papelera'>('publicado');
  const [previewItem, setPreviewItem] = useState<NewsItem | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ==========================================
  // 3. ESTADOS DE DATOS (NOTICIAS)
  // ==========================================
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedNews, setDisplayedNews] = useState<NewsItem | null>(null);

  const [featuredNewsList, setFeaturedNewsList] = useState<NewsItem[]>([
    { 
      id: 1, category: 'DEPORTES', title: 'Deporte: victoria histórica en el torneo', 
      description: 'El equipo nacional consigue una victoria histórica en la final.', date: '11 Oct 2025', 
      imageColor: 'bg-green-800', views: 1200, likes: 450, comments: 24,
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop'
    },
  ]);

  const [masNoticias, setMasNoticias] = useState<NewsItem[]>([
    { id: 101, title: 'Dirigentes indígenas y el Gobierno llegan a un acuerdo histórico', description: 'Tras varias semanas de diálogo, se establecieron nuevas normativas de mutuo acuerdo.', category: 'ECUADOR', date: '16 Oct 2025', views: 850, likes: 320, comments: 15, color: 'bg-slate-700', imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=500&auto=format&fit=crop' },
  ]);

  const [otrasNoticias, setOtrasNoticias] = useState<NewsItem[]>([
    { id: 201, title: 'Mercados asiáticos cierran al alza...', description: 'Las principales bolsas reaccionaron positivamente a las políticas fiscales.', category: 'INTERNACIONAL', date: '16 Oct 2025', views: 920, likes: 450, comments: 8, color: 'bg-emerald-800', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=500&auto=format&fit=crop' },
  ]);

  const [papelera, setPapelera] = useState<NewsItem[]>([]);

  const [temporadas, setTemporadas] = useState<NewsItem[]>([
    { id: 501, title: '¡Feliz Navidad!', description: 'ANEUPI les desea unas felices fiestas a toda nuestra comunidad universitaria.', category: 'EVENTOS', date: 'Diciembre', imageUrl: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=500&auto=format&fit=crop' },
    { id: 502, title: 'Inicio de Período Académico 2026', description: 'Todo lo que necesitas saber para tu matriculación en este nuevo ciclo.', category: 'ACADÉMICO', date: 'Matriculación', imageUrl: 'https://images.unsplash.com/photo-1523050853021-ea961f8ef04d?q=80&w=500&auto=format&fit=crop' }
  ]);

  // ==========================================
  // 4. ESTADOS DE SIDEBAR (QUÉ ESTÁ PASANDO)
  // ==========================================
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([
    { id: 1, title: '¡Consigue trabajo!', desc: 'Explora oportunidades relevantes ahora.' },
    { id: 2, title: 'Conferencia', desc: 'Congreso Internacional ANEUPI.' },
    { id: 3, title: 'Cursos', desc: 'Aprende Inglés o Francés con Nosotros.' },
    { id: 4, title: 'Inversión', desc: 'Conviértete en accionista.' },
  ]);
  const [isSidebarModalOpen, setIsSidebarModalOpen] = useState(false);
  const [editingSidebar, setEditingSidebar] = useState<SidebarItem | null>(null);
  const [showAllSidebar, setShowAllSidebar] = useState(false);

  // Estados de Modales de Noticias
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<{news: NewsItem, section: string} | null>(null);

  // ==========================================
  // 5. FUNCIONES SIDEBAR
  // ==========================================
  const handleSaveSidebar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;

    if (editingSidebar) {
      setSidebarItems(sidebarItems.map(item => item.id === editingSidebar.id ? { ...item, title, desc } : item));
      triggerToast("Se editó correctamente");
    } else {
      setSidebarItems([{ id: Date.now(), title, desc }, ...sidebarItems]);
      triggerToast("Se guardó correctamente");
    }
    setIsSidebarModalOpen(false);
    setEditingSidebar(null);
  };

  const deleteSidebarItem = (id: number) => {
    if (confirm('¿Eliminar este aviso?')) {
      setSidebarItems(sidebarItems.filter(item => item.id !== id));
      triggerToast("Se eliminó correctamente");
    }
  };

  // ==========================================
  // 6. FUNCIONES GESTIÓN DE NOTICIAS
  // ==========================================
  const openEditModal = (news: NewsItem, section: string) => {
    setEditingData({ news, section });
    setIsModalOpen(true);
  };

  const handleDeleteNews = (news: NewsItem, section: string) => {
    if (!confirm('¿Mover esta noticia a la papelera?')) return;
    const itemConOrigen = { ...news, originalSection: section };

    if (section === 'featured') setFeaturedNewsList(prev => prev.filter(n => n.id !== news.id));
    if (section === 'mas') setMasNoticias(prev => prev.filter(n => n.id !== news.id));
    if (section === 'otras') setOtrasNoticias(prev => prev.filter(n => n.id !== news.id));
    if (section === 'temporadas') setTemporadas(prev => prev.filter(n => n.id !== news.id));

    setPapelera(prev => [itemConOrigen, ...prev]);
    triggerToast("Movido a la papelera correctamente");
  };

  const restaurarNoticia = (news: NewsItem) => {
    setPapelera(prev => prev.filter(n => n.id !== news.id));
    if (news.originalSection === 'featured') setFeaturedNewsList(prev => [news, ...prev]);
    else if (news.originalSection === 'otras') setOtrasNoticias(prev => [news, ...prev]);
    else if (news.originalSection === 'temporadas') setTemporadas(prev => [news, ...prev]);
    else setMasNoticias(prev => [news, ...prev]);
    setPreviewItem(null);
    triggerToast("Noticia restaurada correctamente");
  };

  const eliminarPermanente = (id: number) => {
    if (!confirm('¿Eliminar definitivamente? Esta acción no se puede deshacer.')) return;
    setPapelera(prev => prev.filter(n => n.id !== id));
    setPreviewItem(null);
    triggerToast("Se eliminó definitivamente");
  };

  const publicarDesdeTemporada = (news: NewsItem) => {
    const noticiaPublicada = { ...news, id: Date.now(), date: new Date().toLocaleDateString('es-ES'), originalSection: 'mas' };
    setMasNoticias(prev => [noticiaPublicada, ...prev]);
    triggerToast("Noticia de temporada activada y publicada");
  };

  const handleSaveNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const section = formData.get('section') as string;
    const payload = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      url: formData.get('url') as string,
      imageUrl: formData.get('imageUrl') as string,
      description: formData.get('description') as string,
    };

    const newItem: NewsItem = {
      id: editingData ? editingData.news.id : Date.now(),
      ...payload,
      date: editingData?.news.date || new Date().toLocaleDateString('es-ES'),
      views: editingData?.news.views || 0,
      likes: editingData?.news.likes || 0,
      comments: editingData?.news.comments || 0
    };

    if (editingData) {
      if (editingData.section === 'featured') setFeaturedNewsList(prev => prev.filter(n => n.id !== editingData.news.id));
      if (editingData.section === 'mas') setMasNoticias(prev => prev.filter(n => n.id !== editingData.news.id));
      if (editingData.section === 'otras') setOtrasNoticias(prev => prev.filter(n => n.id !== editingData.news.id));
      if (editingData.section === 'temporadas') setTemporadas(prev => prev.filter(n => n.id !== editingData.news.id));
    }

    if (section === 'featured') setFeaturedNewsList(prev => [newItem, ...prev]);
    else if (section === 'otras') setOtrasNoticias(prev => [newItem, ...prev]);
    else if (section === 'temporadas') setTemporadas(prev => [newItem, ...prev]);
    else setMasNoticias(prev => [newItem, ...prev]);

    triggerToast(editingData ? "Se editó correctamente" : "Se guardó correctamente");
    setIsModalOpen(false);
  };

  // ==========================================
  // 7. LÓGICA DE BÚSQUEDA Y FILTRADO
  // ==========================================
  const matchSearch = (news: NewsItem) => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    news.category.toLowerCase().includes(searchTerm.toLowerCase());

  const displayFeaturedList = featuredNewsList.filter(matchSearch);
  const displayMasNoticias = masNoticias.filter(matchSearch);
  const displayOtrasNoticias = otrasNoticias.filter(matchSearch);
  const displayTemporadas = temporadas.filter(matchSearch);
  const displayPapelera = papelera.filter(matchSearch);

  const featuredNews = displayFeaturedList[0];

  return (
    <div className="space-y-10 relative">
      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />

      {/* ==========================================
          8. RENDERIZADO DE NOTIFICACIÓN (TOAST)
          ========================================== */}
      {showToast && (
        <div className="fixed bottom-10 right-10 bg-white border border-gray-100 shadow-2xl rounded-xl p-4 flex flex-col min-w-[250px] z-[200] animate-in slide-in-from-right duration-300">
          <p className="text-sm font-bold text-gray-800">Operación exitosa</p>
          <p className="text-[12px] text-gray-500">{toastMessage}</p>
        </div>
      )}

      {displayedNews ? (
        <NoticiaCompleta noticia={displayedNews} onBack={() => setDisplayedNews(null)} />
      ) : (
        <>
          {/* ==========================================
              9. CABECERA Y BUSCADOR
              ========================================== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-5">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <div className="w-2.5 h-10 md:h-12 bg-gradient-to-b from-[#003952] to-blue-500 rounded-full shadow-sm"></div>
                <h1 className="text-[42px] md:text-[50px] font-black text-[#003952] tracking-tighter leading-none">Inicio</h1>
              </div>
              <p className="text-[15px] text-gray-500 mt-2 ml-[26px]">Gestiona la portada principal y el contenido destacado que ven tus usuarios.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Buscar noticia..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none text-[14px] shadow-sm" />
              </div>
              <button onClick={() => { setEditingData(null); setIsModalOpen(true); }} className="w-full sm:w-auto bg-[#003952] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002233] transition-colors whitespace-nowrap">
                <Plus size={18} /> Crear Noticia
              </button>
            </div>
          </div>

          {/* ==========================================
              10. TABS DE NAVEGACIÓN
              ========================================== */}
          <div className="flex gap-8 border-b border-gray-100">
            <button onClick={() => setActiveTab('publicado')} className={`pb-4 px-2 text-sm font-bold transition-all ${activeTab === 'publicado' ? 'border-b-2 border-[#003952] text-[#003952]' : 'text-gray-400'}`}>Publicados</button>
            <button onClick={() => setActiveTab('temporadas')} className={`pb-4 px-2 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'temporadas' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}>Temporadas <span className="bg-blue-50 px-2 py-0.5 rounded-full text-[10px] text-blue-600">{temporadas.length}</span></button>
            <button onClick={() => setActiveTab('papelera')} className={`pb-4 px-2 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'papelera' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-400'}`}>Papelera <span className="bg-red-50 px-2 py-0.5 rounded-full text-[10px] text-red-600">{papelera.length}</span></button>
          </div>

          {activeTab === 'publicado' ? (
            <>
              {/* ==========================================
                  11. GRID DE NOTICIAS PUBLICADAS
                  ========================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {displayFeaturedList.length > 0 && featuredNews ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative group h-full">
                      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button onClick={() => openEditModal(featuredNews, 'featured')} className="bg-white/90 text-[#003952] p-2 rounded-lg shadow-lg"><Edit size={16} /></button>
                        <button onClick={() => handleDeleteNews(featuredNews, 'featured')} className="bg-red-600/90 text-white p-2 rounded-lg shadow-lg"><Trash2 size={16} /></button>
                      </div>
                      <div className={`h-[340px] bg-slate-800 relative flex items-center justify-center overflow-hidden`}>
                        {featuredNews.imageUrl && <img src={featuredNews.imageUrl} alt={featuredNews.title} className="absolute inset-0 w-full h-full object-cover z-0" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0"></div>
                        <span className="absolute top-5 left-5 bg-red-600 text-white text-[11px] font-bold px-3 py-1.5 uppercase rounded shadow-sm tracking-wider z-10">{featuredNews.category}</span>
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <h2 className="text-[26px] font-bold text-[#003952] mb-3 leading-tight">{featuredNews.title}</h2>
                        <p className="text-gray-600 mb-6 text-[15px] leading-relaxed line-clamp-2 italic">{featuredNews.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-[13px] font-medium text-gray-400">{featuredNews.date}</span>
                          <button onClick={() => setDisplayedNews(featuredNews)} className="bg-[#003952] text-white px-6 py-2.5 rounded-full text-[14px] font-bold shadow-sm flex items-center gap-2">
                            Leer más <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* ==========================================
                    12. SIDEBAR (QUÉ ESTÁ PASANDO)
                    ========================================== */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-[18px] text-[#003952]">Qué está pasando</h3>
                      <button onClick={() => { setEditingSidebar(null); setIsSidebarModalOpen(true); }} className="text-[#003952] hover:bg-blue-50 p-1.5 border-2 border-[#003952] rounded-xl transition-colors">
                        <Plus size={18} strokeWidth={3} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {(showAllSidebar ? sidebarItems : sidebarItems.slice(0, 3)).map(item => (
                        <div key={item.id} className="flex justify-between items-center group p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0">
                          <div className="pr-4">
                            <h4 className="font-bold text-[14px] text-gray-900 leading-tight mb-1">{item.title}</h4>
                            <p className="text-[13px] text-gray-500">{item.desc}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button onClick={() => { setEditingSidebar(item); setIsSidebarModalOpen(true); }} className="p-1.5 text-gray-400 border border-gray-200 rounded-lg hover:text-[#003952] hover:bg-white shadow-sm transition-all"><Edit size={14} /></button>
                            <button onClick={() => deleteSidebarItem(item.id)} className="p-1.5 text-gray-400 border border-gray-200 rounded-lg hover:text-red-600 hover:bg-white shadow-sm transition-all"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}

                      {/* Lógica Mostrar Más/Menos Restaurada */}
                      {sidebarItems.length > 3 && (
                        <button 
                          onClick={() => setShowAllSidebar(!showAllSidebar)}
                          className="w-full text-center text-[#003952] text-[13px] font-bold py-2 mt-2 hover:underline flex items-center justify-center gap-2"
                        >
                          {showAllSidebar ? <>Mostrar menos <ChevronUp size={14}/></> : <>Mostrar más <ChevronDown size={14}/></>}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ==========================================
                  13. SECCIÓN MÁS NOTICIAS
                  ========================================== */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mt-8">
                <h3 className="font-bold text-[22px] text-[#003952] px-4 pt-4 mb-6">Más Noticias</h3>
                <div id="scroll-mas-noticias" className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide px-4">
                  {displayMasNoticias.map(noticia => (
                    <div key={noticia.id} className="w-80 shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col group">
                      <div className="h-40 bg-slate-200 relative overflow-hidden">
                        {noticia.imageUrl && <img src={noticia.imageUrl} alt={noticia.title} className="absolute inset-0 w-full h-full object-cover z-0" />}
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase rounded-sm z-10">{noticia.category}</span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-[16px] mb-2 line-clamp-2 text-[#003952]">{noticia.title}</h3>
                        <p className="text-[13px] text-gray-500 mb-4 line-clamp-2 italic leading-relaxed">{noticia.description}</p>
                        <div className="flex justify-between items-center mt-auto mb-4">
                          <p className="text-[12px] text-gray-400">{noticia.date}</p>
                          <button onClick={() => setDisplayedNews(noticia)} className="bg-[#003952] text-white px-4 py-1.5 rounded-full text-[12px] font-bold">Leer más</button>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-gray-400 text-[12px]">
                          <div className="flex gap-4 font-medium">
                            <span className="flex gap-1.5 items-center"><Eye size={14}/> {noticia.views || 0}</span>
                            <span className="flex gap-1.5 items-center"><Heart size={14}/> {noticia.likes || 0}</span>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => openEditModal(noticia, 'mas')} className="p-1.5 text-gray-400 border border-gray-200 rounded hover:text-[#003952] transition-colors"><Edit size={16}/></button>
                            <button onClick={() => handleDeleteNews(noticia, 'mas')} className="p-1.5 text-gray-400 border border-gray-200 rounded hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==========================================
                  14. SECCIÓN INTERNACIONALES
                  ========================================== */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mt-8">
                <h3 className="font-bold text-[22px] text-[#003952] px-4 pt-4 mb-6">Noticias Internacionales</h3>
                <div id="scroll-otras-noticias" className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide px-4">
                  {displayOtrasNoticias.map(noticia => (
                    <div key={noticia.id} className="w-80 shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col group">
                      <div className="h-40 bg-slate-200 relative overflow-hidden">
                        {noticia.imageUrl && <img src={noticia.imageUrl} alt={noticia.title} className="absolute inset-0 w-full h-full object-cover z-0" />}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-[16px] mb-2 line-clamp-2 text-[#003952]">{noticia.title}</h3>
                        <p className="text-[13px] text-gray-500 mb-4 line-clamp-2 italic leading-relaxed">{noticia.description}</p>
                        <div className="flex justify-between items-center mt-auto mb-4">
                          <p className="text-xs text-gray-400">{noticia.date}</p>
                          <button onClick={() => setDisplayedNews(noticia)} className="bg-[#003952] text-white px-4 py-1.5 rounded-full text-xs font-bold">Leer más</button>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-gray-400 text-xs">
                          <div className="flex gap-4 font-medium">
                            <span className="flex gap-1.5 items-center"><Eye size={14}/> {noticia.views || 0}</span>
                            <span className="flex gap-1.5 items-center"><Heart size={14}/> {noticia.likes || 0}</span>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => openEditModal(noticia, 'otras')} className="p-1 text-gray-400 border rounded hover:text-[#003952] transition-colors"><Edit size={16}/></button>
                            <button onClick={() => handleDeleteNews(noticia, 'otras')} className="p-1 text-gray-400 border rounded hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : activeTab === 'temporadas' ? (
            /* ==========================================
                15. VISTA DE TEMPORADAS
                ========================================== */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayTemporadas.length === 0 ? (
                  <div className="col-span-full text-center py-20">
                    <Power size={40} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">No hay noticias temporales guardadas</p>
                  </div>
                ) : (
                  displayTemporadas.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden flex flex-col group hover:bg-white hover:shadow-xl transition-all duration-300">
                      <div className="h-48 relative">
                        {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <span className="absolute bottom-4 left-6 bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 uppercase rounded shadow-lg">{item.date}</span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h4 className="font-black text-[#003952] text-xl mb-3 leading-tight">{item.title}</h4>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-6 italic">{item.description}</p>
                        <div className="flex gap-3 mt-auto">
                          <button onClick={() => publicarDesdeTemporada(item)} className="flex-1 bg-[#003952] text-white py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#002a3a] transition-all">
                            <Power size={14} /> Activar Noticia
                          </button>
                          <button onClick={() => openEditModal(item, 'temporadas')} className="p-3 bg-white border border-gray-200 text-gray-400 rounded-2xl hover:text-[#003952] hover:border-[#003952] transition-all">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDeleteNews(item, 'temporadas')} className="p-3 bg-white border border-gray-200 text-red-400 rounded-2xl hover:text-red-600 hover:border-red-600 transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* ==========================================
                16. VISTA DE PAPELERA
                ========================================== */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="text-center pb-8">
                  <h3 className="text-xl font-bold text-[#003952]">Contenido en Papelera</h3>
                  <p className="text-gray-500 text-sm">Previsualiza antes de restaurar o eliminar definitivamente.</p>
                </div>
                {displayPapelera.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
                    <Trash2 size={40} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">La papelera está vacía</p>
                  </div>
                ) : (
                  displayPapelera.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center p-5 bg-gray-50 rounded-2xl border border-gray-100 gap-4 group hover:bg-white hover:shadow-md transition-all">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                          {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#003952] text-sm line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{item.category} • {item.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button onClick={() => setPreviewItem(item)} className="p-2.5 text-gray-400 hover:text-[#003952] hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all shadow-sm"><Eye size={18} /></button>
                        <button onClick={() => restaurarNoticia(item)} className="flex-1 sm:flex-none px-4 py-2 bg-[#003952] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#002a3a] transition-all"><RotateCcw size={14} /> Restaurar</button>
                        <button onClick={() => eliminarPermanente(item.id)} className="flex-1 sm:flex-none px-4 py-2 bg-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-200 transition-all">Borrar</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ==========================================
          17. MODAL VISTA PREVIA (VISTAZO RÁPIDO)
          ========================================== */}
      {previewItem && (
        <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8">
              <h2 className="text-2xl font-black text-[#003952] mb-4 leading-tight">{previewItem.title}</h2>
              <p className="text-gray-500 text-[15px] leading-relaxed italic mb-8">{previewItem.description}</p>
              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button onClick={() => restaurarNoticia(previewItem)} className="flex-1 py-3 bg-[#003952] text-white rounded-xl font-bold">Restaurar ahora</button>
                <button onClick={() => setPreviewItem(null)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          18. MODAL SIDEBAR (CREAR/EDITAR)
          ========================================== */}
      {isSidebarModalOpen && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl text-[#003952] font-bold">{editingSidebar ? 'Editar Aviso' : 'Nuevo Aviso Sidebar'}</h2>
              <button onClick={() => setIsSidebarModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveSidebar} className="p-6 space-y-4">
              <input type="text" name="title" defaultValue={editingSidebar?.title || ''} className="w-full px-4 py-2 border rounded-xl outline-none" placeholder="Título..." required />
              <textarea name="desc" rows={2} defaultValue={editingSidebar?.desc || ''} className="w-full px-4 py-2 border rounded-xl outline-none resize-none" placeholder="Descripción..." required />
              <div className="flex gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsSidebarModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[#003952] text-white rounded-xl font-bold">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          19. MODAL NOTICIAS (CREAR/EDITAR)
          ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in duration-200">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="!text-[22px] !text-[#003952] font-bold">{editingData ? 'Editar Noticia' : 'Crear Nueva Noticia'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveNews} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">Título</label>
                  <input type="text" name="title" defaultValue={editingData?.news.title || ''} placeholder="Ej: Nueva Innovación..." className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-1">Categoría</label>
                  <input type="text" name="category" defaultValue={editingData?.news.category || ''} placeholder="Ej: TECNOLOGÍA" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none uppercase" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-1">¿Cómo desea guardar?</label>
                  <select name="section" defaultValue={editingData?.section || 'mas'} className="w-full px-4 py-2 border border-[#003952] rounded-lg bg-white font-bold text-[#003952]">
                    <option value="mas">Publicar Ahora: Más Noticias</option>
                    <option value="otras">Publicar Ahora: Internacionales</option>
                    <option value="temporadas">Guardar como: Temporal (Biblioteca de Temporadas)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">URL Imagen</label>
                  <input type="url" name="imageUrl" defaultValue={editingData?.news.imageUrl || ''} placeholder="https://..." className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">URL Enlace</label>
                  <input type="url" name="url" defaultValue={editingData?.news.url || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">Resumen / Descripción</label>
                  <textarea name="description" rows={3} defaultValue={editingData?.news.description || ''} placeholder="Descripción breve..." className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none resize-none"></textarea>
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-xl font-medium transition-colors hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[#003952] text-white rounded-xl font-bold transition-colors hover:bg-[#002233]">Finalizar Operación</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}