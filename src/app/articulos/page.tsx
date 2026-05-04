'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Share2, Eye, Heart, MessageCircle, Calendar, User, ArrowRight, BookOpen, Check, RotateCcw, X } from 'lucide-react';
// IMPORTANTE: Asegúrate de tener el archivo ArticuloCompleto.tsx en la misma carpeta
import ArticuloCompleto from './articuloCompleto'; 

// ==========================================
// 1. INTERFACES Y DEFINICIÓN DE TIPOS
// ==========================================
interface Article {
    id: number;
    title: string;
    description: string;
    category: string;
    author: string;
    date: string;
    views: number;
    likes: number;
    comments: number;
    imageColor: string;
    url: string;
    imageUrl?: string;
}

interface Trending {
    id: number;
    title: string;
    views: string;
}

export default function ArticulosAdminPage() {
    // ==========================================
    // 2. ESTADOS DE NAVEGACIÓN Y UI
    // ==========================================
    const [activeTab, setActiveTab] = useState<'publicado' | 'papelera'>('publicado');
    const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

    // ==========================================
    // 3. ESTADOS PARA MENSAJES (TOAST)
    // ==========================================
    const [notificacion, setNotificacion] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (notificacion) {
            setShowToast(true);
            const timer = setTimeout(() => {
                setShowToast(false);
                setNotificacion(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notificacion]);

    // ==========================================
    // 4. ESTADOS DE DATOS (ARTÍCULOS Y TENDENCIAS)
    // ==========================================
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedArticle, setDisplayedArticle] = useState<Article | null>(null); 
    const [showAllTrending, setShowAllTrending] = useState(false);
    const [isTrendingModalOpen, setIsTrendingModalOpen] = useState(false);
    const [selectedTrending, setSelectedTrending] = useState<Trending | null>(null);

    const [articles, setArticles] = useState<Article[]>([
        {
            id: 1, title: 'IA en América Latina',
            description: 'Un análisis profundo sobre cómo la IA está transformando los sectores productivos...',
            category: 'TECNOLOGÍA', author: 'María González', date: '15 Oct 2025',
            views: 1234, likes: 89, comments: 23, imageColor: 'bg-blue-900', url: 'https://ejemplo.com/1',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop'
        },
        {
            id: 4, title: 'Sostenibilidad Ambiental',
            description: 'Exploramos las iniciativas más innovadoras en sostenibilidad...',
            category: 'MEDIO AMBIENTE', author: 'Ana Silva', date: '02 Oct 2025',
            views: 1540, likes: 120, comments: 45, imageColor: 'bg-green-700', url: 'https://ejemplo.com/4',
            imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=500&auto=format&fit=crop'
        }
    ]);

    const [papelera, setPapelera] = useState<Article[]>([]);

    const [trending, setTrending] = useState<Trending[]>([
        { id: 1, title: 'III Congreso Internacional', views: '115 usuarios' },
        { id: 2, title: 'Foro de Innovación', views: '980 usuarios' },
        { id: 3, title: 'Encuentro de Educación Digital', views: '3,459 usuarios' },
    ]);

    // ==========================================
    // 5. FUNCIONES DE GESTIÓN DE ARTÍCULOS
    // ==========================================
    const handleMoverAPapelera = (article: Article) => {
        if (confirm('¿Mover este artículo a la papelera?')) {
            setArticles(articles.filter(a => a.id !== article.id));
            setPapelera([article, ...papelera]);
            setNotificacion("Movido a la papelera correctamente");
        }
    };

    const restaurarArticulo = (article: Article) => {
        setPapelera(papelera.filter(a => a.id !== article.id));
        setArticles([article, ...articles]);
        setPreviewArticle(null);
        setNotificacion("Artículo restaurado correctamente");
    };

    const eliminarDefinitivamente = (id: number) => {
        if (confirm('¿Eliminar permanentemente? Esta acción no se puede deshacer.')) {
            setPapelera(papelera.filter(a => a.id !== id));
            setPreviewArticle(null);
            setNotificacion("Se eliminó definitivamente");
        }
    };

    // ==========================================
    // 6. FUNCIONES DE GESTIÓN DE TENDENCIAS
    // ==========================================
    const openTrendingModal = (item: Trending | null = null) => {
        setSelectedTrending(item);
        setIsTrendingModalOpen(true);
    };

    const handleGuardarTrending = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('trendingTitle') as string;
        const views = formData.get('trendingViews') as string;

        if (selectedTrending) {
            setTrending(trending.map(t => t.id === selectedTrending.id ? { ...t, title, views } : t));
            setNotificacion("Se editó correctamente");
        } else {
            const nuevo = { id: Date.now(), title, views };
            setTrending([...trending, nuevo]);
            setNotificacion("Se guardó correctamente");
        }
        setIsTrendingModalOpen(false);
    };

    const deleteTrending = (id: number) => {
        if (confirm('¿Eliminar esta tendencia del panel editorial?')) {
            setTrending(trending.filter(t => t.id !== id));
            setNotificacion("Se eliminó correctamente");
        }
    };

    // ==========================================
    // 7. LÓGICA DE BÚSQUEDA Y AGRUPACIÓN
    // ==========================================
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedArticles = filteredArticles.reduce((acc, article) => {
        if (!acc[article.category]) acc[article.category] = [];
        acc[article.category].push(article);
        return acc;
    }, {} as Record<string, Article[]>);

    const filteredPapelera = papelera.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ==========================================
    // 8. MODALES Y PERSISTENCIA DE ARTÍCULOS
    // ==========================================
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const handleGuardarArticulo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const articleData = {
            title: formData.get('title') as string,
            author: formData.get('author') as string,
            category: formData.get('category') as string,
            imageUrl: formData.get('imageUrl') as string,
            url: formData.get('url') as string, 
            description: formData.get('description') as string,
        };

        if (selectedArticle) {
            setArticles(articles.map(a => a.id === selectedArticle.id ? { ...a, ...articleData } : a));
            setNotificacion("Se editó correctamente");
        } else {
            const nuevo = { 
                ...articleData, 
                id: Date.now(), 
                date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }), 
                views: 0, likes: 0, comments: 0, imageColor: 'bg-slate-700' 
            };
            setArticles([nuevo, ...articles]);
            setNotificacion("Se guardó correctamente");
        }
        setIsModalOpen(false);
    };

    const scrollContainer = (id: string, direction: 'left' | 'right') => {
        const container = document.getElementById(id);
        if (container) container.scrollBy({ left: direction === 'left' ? -350 : 350, behavior: 'smooth' });
    };

    return (
        <div className="space-y-10 relative">
            <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />

            {/* ==========================================
                9. COMPONENTE DE NOTIFICACIÓN (TOAST)
                ========================================== */}
            {showToast && (
                <div className="fixed bottom-10 right-10 bg-white border border-gray-100 shadow-2xl rounded-xl p-4 flex flex-col min-w-[250px] z-[200] animate-in slide-in-from-right duration-300">
                    <p className="text-sm font-bold text-gray-800">Operación exitosa</p>
                    <p className="text-[12px] text-gray-500">{notificacion}</p>
                </div>
            )}

            {displayedArticle ? (
                <ArticuloCompleto articulo={displayedArticle} onBack={() => setDisplayedArticle(null)} />
            ) : (
                <>
                    {/* ==========================================
                        10. CABECERA Y BUSCADOR
                        ========================================== */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-5">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-4">
                                <div className="w-2.5 h-10 md:h-12 bg-gradient-to-b from-[#003952] to-blue-500 rounded-full shadow-sm"></div>
                                <div className="flex items-center gap-3">
                                    <BookOpen size={34} className="text-[#003952]" strokeWidth={2.5} />
                                    <h1 className="text-[42px] md:text-[50px] font-black text-[#003952] tracking-tighter leading-none">Artículos</h1>
                                </div>
                            </div>
                            <p className="text-[15px] text-gray-500 mt-2 ml-[26px]">Lee y gestiona artículos de opinión y reportajes.</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" placeholder="Buscar artículo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none text-[14px] transition-shadow shadow-sm" />
                            </div>
                            <button onClick={() => { setSelectedArticle(null); setIsModalOpen(true); }} className="w-full sm:w-auto bg-[#003952] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002233] transition-colors whitespace-nowrap">
                                <Plus size={18} /> Agregar artículo
                            </button>
                        </div>
                    </div>

                    {/* ==========================================
                        11. PESTAÑAS (PUBLICADOS / PAPELERA)
                        ========================================== */}
                    <div className="flex gap-8 border-b border-gray-100">
                        <button onClick={() => setActiveTab('publicado')} className={`pb-4 px-2 text-sm font-bold transition-all ${activeTab === 'publicado' ? 'border-b-2 border-[#003952] text-[#003952]' : 'text-gray-400 hover:text-gray-600'}`}>Publicados</button>
                        <button onClick={() => setActiveTab('papelera')} className={`pb-4 px-2 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'papelera' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}>Papelera <span className="bg-gray-100 px-2 py-0.5 rounded-full text-[10px]">{papelera.length}</span></button>
                    </div>

                    {activeTab === 'publicado' ? (
                        /* ==========================================
                           12. VISTA DE CONTENIDO PUBLICADO
                           ========================================== */
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-3 space-y-10">
                                {Object.entries(groupedArticles).map(([category, catArticles]) => (
                                    <div key={category} className="relative">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="font-bold text-[18px] text-[#003952] uppercase flex items-center gap-2">
                                                <span className="w-2 h-6 bg-red-600 rounded-full block"></span>{category}
                                            </h2>
                                            <div className="flex gap-2">
                                                <button onClick={() => scrollContainer(`scroll-${category}`, 'left')} className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"><ChevronLeft size={18} /></button>
                                                <button onClick={() => scrollContainer(`scroll-${category}`, 'right')} className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"><ChevronRight size={18} /></button>
                                            </div>
                                        </div>

                                        <div id={`scroll-${category}`} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                                            {catArticles.map(article => (
                                                <div key={article.id} className="w-60 shrink-0 snap-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col group relative">
                                                    <div className={`h-20 ${article.imageColor} relative flex items-center justify-center opacity-90 overflow-hidden`}>
                                                        {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover z-0" />}
                                                        <div className="absolute inset-0 bg-black/10 z-0"></div>
                                                    </div>
                                                    <div className="p-4 flex-1 flex flex-col">
                                                        <h3 className="font-bold text-[16px] text-[#003952] mb-2 leading-snug line-clamp-2">{article.title}</h3>
                                                        <p className="text-[13px] text-gray-500 mb-4 line-clamp-3 leading-relaxed italic">{article.description}</p>
                                                        <div className="flex justify-between items-end mb-4 mt-auto">
                                                            <div className="flex flex-col text-[12px] text-gray-400 gap-1">
                                                                <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                                                                <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                                                            </div>
                                                            <button onClick={() => setDisplayedArticle(article)} className="bg-[#003952] text-white px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1 hover:bg-[#002233] transition-colors">
                                                                Leer más <ArrowRight size={14} />
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-gray-400 text-[12px]">
                                                            <div className="flex items-center gap-3">
                                                                <span className="flex items-center gap-1"><Eye size={14} /> {article.views}</span>
                                                                <span className="flex items-center gap-1"><Heart size={14} /> {article.likes}</span>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <button onClick={() => { setSelectedArticle(article); setIsModalOpen(true); }} className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-[#003952] hover:text-white transition-colors"><Edit size={14} /></button>
                                                                <button onClick={() => handleMoverAPapelera(article)} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={14} /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* PANEL DERECHO EDITORIAL */}
                            <div className="lg:col-span-1 space-y-4">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                                    <div className="py-3 bg-[#003952] text-white text-center font-bold text-[14px] flex items-center justify-center gap-2">
                                        Editorial ANEUPI
                                        <button onClick={() => openTrendingModal()} className="hover:scale-110 transition-transform"><Plus size={16} /></button>
                                    </div>
                                    <div className="p-5 space-y-5">
                                        <h3 className="font-bold text-[16px] text-gray-800">¿Qué está pasando?</h3>
                                        <div className="space-y-5">
                                            {(showAllTrending ? trending : trending.slice(0, 2)).map(item => (
                                                <div key={item.id} className="group relative pr-10 animate-in fade-in duration-300">
                                                    <p className="text-[10px] text-gray-400 mb-1 font-medium">Tendencia en este momento</p>
                                                    <h4 className="font-bold text-[#003952] text-[14px] leading-tight">{item.title}</h4>
                                                    <p className="text-[12px] text-gray-400 mt-1">{item.views}</p>
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openTrendingModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={12} /></button>
                                                        <button onClick={() => deleteTrending(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={12} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {trending.length > 2 && (
                                            <button onClick={() => setShowAllTrending(!showAllTrending)} className="text-[#003952] text-[13px] font-bold hover:underline pt-2 w-full text-left flex items-center justify-between group">
                                                <span>{showAllTrending ? "Mostrar menos" : "Mostrar más"}</span>
                                                <ChevronRight size={14} className={`transition-transform duration-300 ${showAllTrending ? 'rotate-90' : ''}`} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ==========================================
                           13. VISTA DE PAPELERA (CONTENIDO ELIMINADO)
                           ========================================== */
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
                            <div className="max-w-4xl mx-auto space-y-4">
                                <div className="text-center pb-8">
                                    <h3 className="text-xl font-bold text-[#003952]">Artículos Eliminados</h3>
                                    <p className="text-gray-500 text-sm">Vista previa antes de restaurar o eliminar definitivamente.</p>
                                </div>
                                {filteredPapelera.length === 0 ? (
                                    <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
                                        <Trash2 size={40} className="mx-auto text-gray-200 mb-4" />
                                        <p className="text-gray-400 font-medium">La papelera está vacía</p>
                                    </div>
                                ) : (
                                    filteredPapelera.map(item => (
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
                                                <button onClick={() => setPreviewArticle(item)} className="p-2.5 text-gray-400 hover:text-[#003952] hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all shadow-sm" title="Previsualizar"><Eye size={18} /></button>
                                                <button onClick={() => restaurarArticulo(item)} className="flex-1 sm:flex-none px-4 py-2 bg-[#003952] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#002a3a] transition-all"><RotateCcw size={14} /> Restaurar</button>
                                                <button onClick={() => eliminarDefinitivamente(item.id)} className="flex-1 sm:flex-none px-4 py-2 bg-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-200 transition-all">Borrar definitivo</button>
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
                14. MODAL VISTA PREVIA (MODAL PAPELERA)
                ========================================== */}
            {previewArticle && (
                <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="relative h-64 bg-gray-200">
                            {previewArticle.imageUrl && <img src={previewArticle.imageUrl} className="w-full h-full object-cover" />}
                            <button onClick={() => setPreviewArticle(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all"><X size={20}/></button>
                            <div className="absolute bottom-4 left-6"><span className="bg-[#003952] text-white text-[10px] font-black px-3 py-1.5 uppercase rounded shadow-lg">{previewArticle.category}</span></div>
                        </div>
                        <div className="p-8">
                            <h2 className="text-2xl font-black text-[#003952] mb-4 leading-tight">{previewArticle.title}</h2>
                            <p className="text-gray-500 text-[15px] leading-relaxed italic mb-8 line-clamp-4">{previewArticle.description}</p>
                            <div className="flex gap-4 pt-6 border-t border-gray-100">
                                <button onClick={() => restaurarArticulo(previewArticle)} className="flex-1 py-3 bg-[#003952] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-[#002a3a]"><RotateCcw size={18} /> Restaurar ahora</button>
                                <button onClick={() => eliminarDefinitivamente(previewArticle.id)} className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors">Eliminar para siempre</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ==========================================
                15. MODAL GESTIÓN DE TENDENCIAS
                ========================================== */}
            {isTrendingModalOpen && (
                <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 bg-white">
                            <h2 className="text-xl font-bold text-[#003952]">{selectedTrending ? 'Editar Tendencia' : 'Nueva Tendencia'}</h2>
                        </div>
                        <form onSubmit={handleGuardarTrending} className="p-6 space-y-4">
                            <input name="trendingTitle" type="text" defaultValue={selectedTrending?.title || ''} placeholder="Título de la Tendencia" className="w-full px-4 py-2 border rounded-lg outline-none" required />
                            <input name="trendingViews" type="text" defaultValue={selectedTrending?.views || ''} placeholder="Ej: 1,200 usuarios" className="w-full px-4 py-2 border rounded-lg outline-none" required />
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsTrendingModalOpen(false)} className="flex-1 py-2 px-4 border text-gray-600 rounded-xl font-semibold hover:bg-gray-50">Cancelar</button>
                                <button type="submit" className="flex-1 py-2 px-4 bg-[#003952] text-white rounded-xl font-bold">{selectedTrending ? 'Actualizar' : 'Publicar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ==========================================
                16. MODAL GESTIÓN DE ARTÍCULOS
                ========================================== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 bg-white">
                            <h2 className="text-2xl font-bold text-[#003952]">{selectedArticle ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
                        </div>
                        <form onSubmit={handleGuardarArticulo} className="p-6 space-y-4">
                            <input name="title" type="text" defaultValue={selectedArticle?.title || ''} placeholder="Título del Artículo" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#003952]/20 focus:border-[#003952]" required 
                                onChange={(e) => {
                                    if (!selectedArticle) {
                                        const slug = e.target.value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
                                        const urlInput = document.getElementsByName('url')[0] as HTMLInputElement;
                                        if (urlInput) urlInput.value = `https://aneupi.com/${slug}`;
                                    }
                                }}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="author" type="text" defaultValue={selectedArticle?.author} placeholder="Autor" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" required />
                                <select name="category" defaultValue={selectedArticle?.category || 'TECNOLOGÍA'} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white">
                                    <option value="TECNOLOGÍA">TECNOLOGÍA</option>
                                    <option value="MEDIO AMBIENTE">MEDIO AMBIENTE</option>
                                    <option value="ECONOMÍA">ECONOMÍA</option>
                                </select>
                            </div>
                            <input name="imageUrl" type="url" defaultValue={selectedArticle?.imageUrl} placeholder="URL de la Imagen (Opcional)" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" />
                            <input name="url" type="url" defaultValue={selectedArticle?.url} placeholder="URL de Redirección" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none" required />
                            <textarea name="description" rows={3} defaultValue={selectedArticle?.description} placeholder="Resumen / Descripción" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none resize-none" required />
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-semibold">Cancelar</button>
                                <button type="submit" className="flex-1 py-3 px-4 bg-[#003952] text-white rounded-xl font-bold">
                                    {selectedArticle ? 'Guardar Cambios' : 'Publicar Artículo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}