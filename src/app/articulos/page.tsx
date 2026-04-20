'use client';

import { useState, useRef } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Share2, Eye, Heart, MessageCircle, Calendar, User, ArrowRight } from 'lucide-react';

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
    // --- ESTADOS SIMULADOS ---
    const [searchTerm, setSearchTerm] = useState('');

    const [articles, setArticles] = useState<Article[]>([
        {
            id: 1, title: 'Comprobación para ver si usa estos datos',
            description: 'Un análisis profundo sobre cómo la IA está transformando los sectores productivos en la región y las oportunidades que...',
            category: 'TECNOLOGÍA', author: 'María González', date: '15 Oct 2025',
            views: 1234, likes: 89, comments: 23, imageColor: 'bg-blue-900', url: 'https://ejemplo.com/1'
        },
        {
            id: 2, title: 'Startups de Tecnología: Casos de Éxito en la Región',
            description: 'Historias de startups que escalaron y las lecciones clave para emprendedores tech en LATAM.',
            category: 'TECNOLOGÍA', author: 'Diego Herrera', date: '08 Oct 2025',
            views: 842, likes: 47, comments: 10, imageColor: 'bg-slate-800', url: 'https://ejemplo.com/2'
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
            views: 2100, likes: 150, comments: 34, imageColor: 'bg-blue-800', url: 'https://ejemplo.com/5'
        },
        {
            id: 4, title: 'Sostenibilidad: El Desafío Ambiental del Siglo XXI',
            description: 'Exploramos las iniciativas más innovadoras en sostenibilidad que están cambiando el mundo corporativo.',
            category: 'MEDIO AMBIENTE', author: 'Ana Silva', date: '02 Oct 2025',
            views: 1540, likes: 120, comments: 45, imageColor: 'bg-green-700', url: 'https://ejemplo.com/4'
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
    { id: 1, name: 'ANEUPI', logo: '/logos/aneupi.jpeg' }, // Si no tienes imagen, deja el texto o pon un placeholder
    { id: 2, name: 'AGALE', logo: '/logos/agale.jpeg' },
    { id: 3, name: 'Gatito Plis', logo: '/logos/gatitopls.jpeg' },
    { id: 4, name: 'TVANEUPI', logo: '/logos/tvaneupi.jpeg' },
    { id: 5, name: 'Universidad LECENI', logo: '/logos/leceni.jpeg' },
    { id: 6, name: 'BANCO ANEUPI', logo: '/logos/bancoaneupi.jpeg' }
]);

    const carouselBrandsRef = useRef<HTMLDivElement>(null);

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
        const author = formData.get('author') as string; // <-- Capturamos el autor
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const url = formData.get('url') as string;

        if (selectedArticle) {
            setArticles(articles.map(a =>
                a.id === selectedArticle.id ? { ...a, title, author, category, description, url } : a
            ));
        } else {
            const nuevoArticulo: Article = {
                id: Date.now(), title, category, description, url,
                author: author || 'Super Usuario', // Usa el ingresado o por defecto
                date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
                views: 0, likes: 0, comments: 0, imageColor: 'bg-[#003952]'
            };
            setArticles([nuevoArticulo, ...articles]);
        }
        setIsModalOpen(false);
    };

    const deleteTrending = (id: number) => {
        if (confirm('¿Quitar de destacados?')) setTrending(trending.filter(t => t.id !== id));
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

            {/* 1. CABECERA: TÍTULO Y BÚSQUEDA */}
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-4">
                <h1 className="!text-[25px] !text-[#003952] font-bold">Artículos</h1>
                <p className="text-[14px] text-gray-500">Lee y comparte artículos de opinión, análisis y reportajes en profundidad</p>

                <div className="flex justify-between items-center w-full">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-32 pl-9 pr-4 py-2 bg-[#003952] text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-[14px]"
                        />
                    </div>

                    <button
                        onClick={openAddModal}
                        className="bg-[#003952] text-white px-4 py-2 rounded-lg hover:bg-[#002233] transition-colors flex items-center gap-2 text-[14px] font-medium"
                    >
                        <Plus size={18} /> Agregar artículo
                    </button>
                </div>
            </div>

            {/* 2. CUERPO PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Lado Izquierdo: Filas por Categoría */}
                <div className="lg:col-span-3 space-y-10">

                    {Object.keys(groupedArticles).length > 0 ? (
                        Object.entries(groupedArticles).map(([category, catArticles]) => (
                            <div key={category} className="relative">

                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-[18px] text-[#003952] uppercase flex items-center gap-2">
                                        <span className="w-2 h-6 bg-red-600 rounded-full block"></span>
                                        {category}
                                    </h2>

                                    <div className="flex gap-2">
                                        <button onClick={() => scrollContainer(`scroll-${category}`, 'left')} className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button onClick={() => scrollContainer(`scroll-${category}`, 'right')} className="p-1.5 border border-gray-200 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    id={`scroll-${category}`}
                                    className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {catArticles.map(article => (
                                        <div key={article.id} className="w-80 shrink-0 snap-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col group relative">

                                            <div className={`h-40 ${article.imageColor} relative flex items-center justify-center opacity-90`}>
                                                <button className="absolute top-3 right-3 bg-[#003952] bg-opacity-80 p-1.5 rounded-full text-white hover:bg-opacity-100 transition">
                                                    <Share2 size={14} />
                                                </button>
                                            </div>

                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="font-bold text-[16px] text-[#003952] mb-2 leading-snug line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-[13px] text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                                                    {article.description}
                                                </p>

                                                <div className="flex justify-between items-end mb-4 mt-auto">
                                                    <div className="flex flex-col text-[12px] text-gray-400 gap-1">
                                                        <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                                                        <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                                                    </div>

                                                    <a
                                                        href={article.url || '#'}
                                                        target={article.url ? "_blank" : "_self"}
                                                        rel="noopener noreferrer"
                                                        className="bg-[#003952] text-white px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1 hover:bg-[#002233] transition-colors"
                                                    >
                                                        Leer más <ArrowRight size={14} />
                                                    </a>
                                                </div>

                                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                                    <div className="flex items-center gap-3 text-gray-400 text-[12px]">
                                                        <span className="flex items-center gap-1"><Eye size={14} /> {article.views}</span>
                                                        <span className="flex items-center gap-1"><Heart size={14} /> {article.likes}</span>
                                                        <span className="flex items-center gap-1"><MessageCircle size={14} /> {article.comments}</span>
                                                    </div>

                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => openEditModal(article)}
                                                            className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-[#003952] hover:text-white transition-colors"
                                                            title="Editar Artículo"
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteArticle(article.id)}
                                                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors"
                                                            title="Eliminar Artículo"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center text-gray-400 text-[14px]">
                            No se encontraron artículos con "{searchTerm}"
                        </div>
                    )}
                </div>

                {/* Lado Derecho: Panel Editorial */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                        <div className="py-3 bg-[#003952] text-white text-center font-bold text-[14px]">
                            Editorial ANEUPI
                        </div>

                        <div className="p-5 space-y-5">
                            <h3 className="font-bold text-[16px] text-gray-800">¿Qué está pasando?</h3>

                            {trending.map(item => (
                                <div key={item.id} className="group relative pr-6">
                                    <p className="text-[10px] text-gray-400 mb-1">Tendencia en este momento</p>
                                    <h4 className="font-bold text-[#003952] text-[14px] leading-tight">{item.title}</h4>
                                    <p className="text-[12px] text-gray-400 mt-1">{item.views}</p>

                                    <button
                                        onClick={() => deleteTrending(item.id)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}

                            <button className="text-[#003952] text-[14px] font-medium hover:underline pt-2">
                                Show more
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. SECCIÓN INFERIOR: MARCAS CORPORATIVAS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-8 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#003952] text-white px-8 py-2 rounded-full font-bold text-[16px] shadow-md">
                        Marcas Corporativas
                    </div>
                </div>

                <button onClick={() => scrollContainer('scroll-brands', 'left')} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 shadow-sm z-10">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={() => scrollContainer('scroll-brands', 'right')} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 shadow-sm z-10">
                    <ChevronRight size={20} />
                </button>

                <div
                    id="scroll-brands"
                    ref={carouselBrandsRef}
                    className="flex gap-6 overflow-x-auto pt-6 pb-2 px-8 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {brands.map(brand => (
                        <div key={brand.id} className="relative group snap-start shrink-0">
                            <div className="w-64 h-32 border-2 border-gray-200 rounded-xl flex items-center justify-center p-2 hover:border-[#003952] transition-colors bg-white">
                                {/* Reemplazamos el texto por una imagen ajustada */}
                                <img
                                    src={brand.logo}
                                    alt={`Logo de ${brand.name}`}
                                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. MODAL PARA CREAR/EDITAR ARTÍCULO */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in duration-200">

                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h2 className="!text-[25px] !text-[#003952] font-bold">
                                {selectedArticle ? 'Editar Artículo' : 'Nuevo Artículo'}
                            </h2>
                        </div>

                        <form onSubmit={handleGuardarArticulo} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Título ocupa las 2 columnas */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">Título del Artículo</label>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={selectedArticle?.title || ''}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px]"
                                        placeholder="Escribe un título llamativo"
                                        required
                                    />
                                </div>

                                {/* Autor (Nueva adición) */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">Autor</label>
                                    <input
                                        type="text"
                                        name="author"
                                        defaultValue={selectedArticle?.author || ''}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px]"
                                        placeholder="Ej: Ana Silva"
                                        required
                                    />
                                </div>

                                {/* Categoría */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">Categoría</label>
                                    <select
                                        name="category"
                                        defaultValue={selectedArticle?.category || 'TECNOLOGÍA'}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px] bg-white uppercase"
                                    >
                                        <option value="TECNOLOGÍA">Tecnología</option>
                                        <option value="MEDIO AMBIENTE">Medio Ambiente</option>
                                        <option value="ARTE Y CULTURA">Arte y Cultura</option>
                                        <option value="ECONOMÍA">Economía</option>
                                    </select>
                                </div>

                                {/* URL ocupa las 2 columnas */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">URL de Redirección</label>
                                    <input
                                        type="url"
                                        name="url"
                                        defaultValue={selectedArticle?.url || ''}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px]"
                                        placeholder="https://aneupi.com/articulo"
                                        required
                                    />
                                </div>

                                {/* Resumen ocupa las 2 columnas */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">Resumen / Descripción</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        defaultValue={selectedArticle?.description || ''}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-[14px] resize-none"
                                        placeholder="Escribe un breve resumen de lo que trata el artículo..."
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-[14px]"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#003952] text-white rounded-lg hover:bg-[#002233] transition-colors text-[14px] font-bold flex justify-center items-center gap-2"
                                >
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