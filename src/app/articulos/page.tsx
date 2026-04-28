'use client';

import { useState, useRef } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Share2, Eye, Heart, MessageCircle, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
// IMPORTANTE: Asegúrate de tener el archivo ArticuloCompleto.tsx en la misma carpeta [cite: 208]
import ArticuloCompleto from './articuloCompleto'; 

// --- INTERFACES ---
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

interface Brand {
    id: number;
    name: string;
    logo: string;
}

export default function ArticulosAdminPage() {
    // --- ESTADOS ---
    const [searchTerm, setSearchTerm] = useState('');
    
    // NUEVO: Estado para controlar la visualización del artículo completo 
    const [displayedArticle, setDisplayedArticle] = useState<Article | null>(null); 
    
    const [articles, setArticles] = useState<Article[]>([
        {
            id: 1, title: 'Comprobación para ver si usa estos datos',
            description: 'Un análisis profundo sobre cómo la IA está transformando los sectores productivos en la región y las oportunidades que...',
            category: 'TECNOLOGÍA', author: 'María González', date: '15 Oct 2025',
            views: 1234, likes: 89, comments: 23, imageColor: 'bg-blue-900', url: 'https://ejemplo.com/1',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop'
        },
        {
            id: 2, title: 'Startups de Tecnología: Casos de Éxito en la Región',
            description: 'Historias de startups que escalaron y las lecciones clave para emprendedores tech en LATAM.',
            category: 'TECNOLOGÍA', author: 'Diego Herrera', date: '08 Oct 2025',
            views: 842, likes: 47, comments: 10, imageColor: 'bg-slate-800', url: 'https://ejemplo.com/2',
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop'
        },
        {
            id: 3, title: 'Ciberseguridad para PYMES: Buenas prácticas',
            description: 'Guía práctica para que pequeñas empresas protejan sus datos sin grandes inversiones.',
            category: 'TECNOLOGÍA', author: 'Clara Ruiz', date: '05 Oct 2025',
            views: 621, likes: 32, comments: 8, imageColor: 'bg-indigo-900', url: 'https://ejemplo.com/3'
        },
        {
            id: 5, title: 'El futuro del desarrollo Web con Next.js',
            description: 'Explorando las nuevas características de React y cómo mejoran el rendimiento de las aplicaciones empresariales.',
            category: 'TECNOLOGÍA', author: 'Joffre', date: '12 Oct 2025',
            views: 2100, likes: 150, comments: 34, imageColor: 'bg-blue-800', url: 'https://ejemplo.com/5',
            imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop'
        },
        {
            id: 4, title: 'Sostenibilidad: El Desafío Ambiental del Siglo XXI',
            description: 'Exploramos las iniciativas más innovadoras en sostenibilidad que están cambiando el mundo corporativo.',
            category: 'MEDIO AMBIENTE', author: 'Ana Silva', date: '02 Oct 2025',
            views: 1540, likes: 120, comments: 45, imageColor: 'bg-green-700', url: 'https://ejemplo.com/4',
            imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=500&auto=format&fit=crop'
        },
        {
            id: 6, title: 'Inflación y su impacto en las startups',
            description: 'Cómo las nuevas empresas están adaptando sus modelos de negocio para sobrevivir a las fluctuaciones económicas.',
            category: 'ECONOMÍA', author: 'Carlos Pérez', date: '01 Oct 2025',
            views: 950, likes: 65, comments: 12, imageColor: 'bg-amber-700', url: 'https://ejemplo.com/6'
        },
    ]);

    const [trending, setTrending] = useState<Trending[]>([
        { id: 1, title: 'III Congreso Internacional', views: '115 usuarios' },
        { id: 2, title: 'Foro de Innovación y Emprendimiento', views: '980 usuarios' },
        { id: 3, title: 'Encuentro de Educación Digital', views: '3,459 usuarios' },
    ]);

    const [brands, setBrands] = useState<Brand[]>([
        { id: 1, name: 'ANEUPI', logo: '/logos/aneupi.jpeg' }, 
        { id: 2, name: 'AGALE', logo: '/logos/agale.jpeg' },
        { id: 3, name: 'Gatito Plis', logo: '/logos/gatitopls.jpeg' },
        { id: 4, name: 'TVANEUPI', logo: '/logos/tvaneupi.jpeg' },
        { id: 5, name: 'Universidad LECENI', logo: '/logos/leceni.jpeg' },
        { id: 6, name: 'BANCO ANEUPI', logo: '/logos/bancoaneupi.jpeg' }
    ]);

    // --- ESTADOS DEL MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    // --- LÓGICA DE BÚSQUEDA Y AGRUPACIÓN ---
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedArticles = filteredArticles.reduce((acc, article) => {
        if (!acc[article.category]) {
            acc[article.category] = [];
        }
        acc[article.category].push(article);
        return acc;
    }, {} as Record<string, Article[]>);

    // --- FUNCIONES DE ADMINISTRADOR ---
    const deleteArticle = (id: number) => {
        if (confirm('¿Eliminar este artículo permanentemente?')) setArticles(articles.filter(a => a.id !== id));
    };

    const openAddModal = () => {
        setSelectedArticle(null);
        setIsModalOpen(true);
    };

    const openEditModal = (article: Article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleGuardarArticulo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const author = formData.get('author') as string; 
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const url = formData.get('url') as string;
        const imageUrl = formData.get('imageUrl') as string;

        if (selectedArticle) {
            setArticles(articles.map(a =>
                a.id === selectedArticle.id ? { ...a, title, author, category, description, url, imageUrl } : a
            ));
        } else {
            const nuevoArticulo: Article = {
                id: Date.now(), title, category, description, url, imageUrl,
                author: author || 'Super Usuario', 
                date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
                views: 0, likes: 0, comments: 0, imageColor: 'bg-[#003952]'
            };
            setArticles([nuevoArticulo, ...articles]);
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
        <div className="space-y-10 relative">
            <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />

            {/* RENDERIZADO CONDICIONAL: Artículo Completo o Lista de Categorías [cite: 293] */}
            {displayedArticle ? (
                <ArticuloCompleto 
                    articulo={displayedArticle} 
                    onBack={() => setDisplayedArticle(null)} // Función para regresar al listado [cite: 293, 294]
                />
            ) : (
                <>
                    {/* 1. CABECERA DE LA PÁGINA */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-5">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-4">
                                <div className="w-2.5 h-10 md:h-12 bg-gradient-to-b from-[#003952] to-blue-500 rounded-full shadow-sm"></div>
                                <div className="flex items-center gap-3">
                                    <BookOpen size={34} className="text-[#003952]" strokeWidth={2.5} />
                                    <h1 className="text-[42px] md:text-[50px] font-black text-[#003952] tracking-tighter leading-none">Artículos</h1>
                                </div>
                            </div>
                            <p className="text-[15px] text-gray-500 mt-2 ml-[26px]">Lee y gestiona artículos de opinión, análisis y reportajes.</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text" placeholder="Buscar artículo..." value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px] transition-shadow shadow-sm"
                                />
                            </div>
                            <button onClick={openAddModal} className="w-full sm:w-auto bg-[#003952] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002233] transition-colors whitespace-nowrap">
                                <Plus size={18} /> Agregar artículo
                            </button>
                        </div>
                    </div>

                    {/* 2. CUERPO PRINCIPAL (LISTADO POR CATEGORÍAS) */}
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
                                                    <p className="text-[13px] text-gray-500 mb-4 line-clamp-3 leading-relaxed">{article.description}</p>
                                                    
                                                    <div className="flex justify-between items-end mb-4 mt-auto">
                                                        <div className="flex flex-col text-[12px] text-gray-400 gap-1">
                                                            <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                                                            <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                                                        </div>
                                                        {/* MODIFICACIÓN: Acción para activar la vista completa del artículo [cite: 325] */}
                                                        <button 
                                                            onClick={() => setDisplayedArticle(article)} 
                                                            className="bg-[#003952] text-white px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1 hover:bg-[#002233] transition-colors"
                                                        >
                                                            Leer más <ArrowRight size={14} />
                                                        </button>
                                                    </div>

                                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-gray-400 text-[12px]">
                                                        <div className="flex items-center gap-3">
                                                            <span className="flex items-center gap-1"><Eye size={14} /> {article.views}</span>
                                                            <span className="flex items-center gap-1"><Heart size={14} /> {article.likes}</span>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <button onClick={() => openEditModal(article)} className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-[#003952] hover:text-white transition-colors"><Edit size={14} /></button>
                                                            <button onClick={() => deleteArticle(article.id)} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={14} /></button>
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
                                <div className="py-3 bg-[#003952] text-white text-center font-bold text-[14px]">Editorial ANEUPI</div>
                                <div className="p-5 space-y-5">
                                    <h3 className="font-bold text-[16px] text-gray-800">¿Qué está pasando?</h3>
                                    {trending.map(item => (
                                        <div key={item.id} className="group relative pr-6">
                                            <p className="text-[10px] text-gray-400 mb-1">Tendencia</p>
                                            <h4 className="font-bold text-[#003952] text-[14px] leading-tight">{item.title}</h4>
                                            <p className="text-[12px] text-gray-400 mt-1">{item.views}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* MODAL PARA CREAR/EDITAR (Mantenido igual) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden p-6 space-y-4">
                        <h2 className="text-[25px] text-[#003952] font-bold">{selectedArticle ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
                        <form onSubmit={handleGuardarArticulo} className="space-y-4">
                            <input name="title" defaultValue={selectedArticle?.title} className="w-full p-2 border rounded" placeholder="Título" required />
                            <textarea name="description" defaultValue={selectedArticle?.description} className="w-full p-2 border rounded" placeholder="Contenido" rows={3} required />
                            <div className="flex gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-2 border rounded">Cancelar</button>
                                <button type="submit" className="flex-1 p-2 bg-[#003952] text-white rounded font-bold">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}