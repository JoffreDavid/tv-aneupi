'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, User, Calendar, BookOpen, MessageCircle, 
  Send, Trash2, Star, Pin, EyeOff, Eye, CheckCircle 
} from 'lucide-react';

interface ArticuloCompletoProps {
    articulo: any;
    onBack: () => void;
}

export default function ArticuloCompleto({ articulo, onBack }: ArticuloCompletoProps) {
    const [comentarios, setComentarios] = useState([
        { id: 1, autor: "Lector Entusiasta", texto: "¡Excelente análisis! Muy informativo.", fecha: "21/04/2026", fijado: false, destacado: false, oculto: false },
        { id: 2, autor: "Crítico Web", texto: "Faltan más fuentes técnicas en este reporte.", fecha: "22/04/2026", fijado: false, destacado: false, oculto: false }
    ]);
    const [nuevoComentario, setNuevoComentario] = useState("");

    // --- FUNCIONES ADMINISTRATIVAS (SE CONSERVAN) ---
    const eliminarComentario = (id: number) => {
        if (confirm("¿Seguro que deseas eliminar este comentario?")) {
            setComentarios(comentarios.filter(c => c.id !== id));
        }
    };

    const toggleFijar = (id: number) => {
        setComentarios(comentarios.map(c => 
            c.id === id ? { ...c, fijado: !c.fijado } : { ...c, fijado: false }
        ));
    };

    const toggleDestacar = (id: number) => {
        setComentarios(comentarios.map(c => c.id === id ? { ...c, destacado: !c.destacado } : c));
    };

    const toggleOcultar = (id: number) => {
        setComentarios(comentarios.map(c => c.id === id ? { ...c, oculto: !c.oculto } : c));
    };

    const agregarComentario = () => {
        if (!nuevoComentario.trim()) return;
        const comment = {
            id: Date.now(),
            autor: "Administrador",
            texto: nuevoComentario,
            fecha: new Date().toLocaleDateString(),
            fijado: false, destacado: false, oculto: false
        };
        setComentarios([comment, ...comentarios]);
        setNuevoComentario("");
    };

    const comentariosOrdenados = [...comentarios].sort((a, b) => (a.fijado === b.fijado ? 0 : a.fijado ? -1 : 1));

    return (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden animate-in fade-in duration-500 pb-20">
            {/* 1. CABECERA SUPERIOR */}
            <div className="p-6 flex justify-between items-center border-b border-gray-50 bg-white">
                <button 
                    onClick={onBack} 
                    className="flex items-center gap-2 text-[#003952] font-bold bg-white border border-gray-100 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all shadow-sm text-sm"
                >
                    <ChevronLeft size={18} /> Volver al Panel
                </button>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#003952] uppercase bg-white px-3 py-1.5 rounded-full border border-green-100 shadow-sm">
                    <CheckCircle size={14} className="text-green-500" /> Modo Administrador Activo
                </div>
            </div>

            <article className="max-w-5xl mx-auto p-10 md:p-16">
                {/* 2. ETIQUETA DE CATEGORÍA */}
                <div className="mb-6">
                    <span className="bg-[#003952] text-white px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider">
                        {articulo.category}
                    </span>
                </div>

                {/* 3. TÍTULO */}
                <h1 className="text-5xl md:text-6xl font-black text-[#003952] mb-8 leading-[1.1] tracking-tight">
                    {articulo.title}
                </h1>

                {/* 4. METADATOS EN ESCALA DE GRISES */}
                <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8">
                    <span className="flex items-center gap-2 font-medium"><User size={18} className="text-gray-300" /> {articulo.author}</span>
                    <span className="flex items-center gap-2 font-medium"><Calendar size={18} className="text-gray-300" /> {articulo.date}</span>
                    <span className="flex items-center gap-2 font-medium"><BookOpen size={18} className="text-gray-300" /> {articulo.views} Vistas</span>
                </div>

                {/* 5. IMAGEN PRINCIPAL DEL ARTÍCULO [NUEVO] */}
                {articulo.imageUrl && (
                    <div className="mb-12 rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-100">
                        <img 
                            src={articulo.imageUrl} 
                            alt={articulo.title} 
                            className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>
                )}

                {/* 6. CUERPO DEL ARTÍCULO */}
                <div className="text-gray-700 text-[17px] leading-[1.8] space-y-8">
                    <div className="border-l-[5px] border-[#003952] pl-6 py-1 my-10 bg-gray-50/50 rounded-r-xl">
                        <p className="text-gray-500 italic text-lg font-medium">
                            {articulo.description}
                        </p>
                    </div>
                    
                    <div className="font-normal prose prose-slate max-w-none">
                        {/* Aquí puedes usar el contenido largo del artículo */}
                        <p>
                            Contenido completo del artículo cargado satisfactoriamente desde la base de datos de administración. 
                            Este espacio renderiza dinámicamente el texto largo almacenado para el análisis profundo.
                        </p>
                        <p>
                            Puedes reemplazar este texto con <strong>{articulo.content || 'el campo de contenido de tu base de datos'}</strong> 
                            para mostrar la noticia completa.
                        </p>
                    </div>
                </div>

                {/* 6-5. MODERACIÓN DE COMENTARIOS (SE CONSERVA) */}
                <section className="mt-24 pt-12 border-t border-gray-100">
                    <h3 className="text-2xl font-black text-[#003952] mb-10 flex items-center gap-3">
                        <MessageCircle size={28} /> Moderación de Comentarios ({comentarios.length})
                    </h3>

                    {/* Caja de Respuesta Admin */}
                    <div className="bg-white p-6 rounded-3xl mb-12 border border-gray-100 shadow-sm ring-1 ring-gray-50">
                        <textarea 
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            placeholder="Responder como Administrador..."
                            className="w-full p-2 outline-none text-sm resize-none bg-transparent placeholder:text-gray-300"
                            rows={3}
                        />
                        <div className="flex justify-end pt-4 border-t border-gray-50">
                            <button onClick={agregarComentario} className="bg-[#003952] text-white px-8 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-[#002a3a] transition-all shadow-md active:scale-95">
                                <Send size={14} /> Responder
                            </button>
                        </div>
                    </div>

                    {/* Lista de Comentarios Administrables */}
                    <div className="space-y-6">
                        {comentariosOrdenados.map(c => (
                            <div key={c.id} className={`group relative p-8 rounded-3xl border transition-all ${c.fijado ? 'bg-blue-50/30 border-blue-100' : 'bg-white border-gray-50'} ${c.oculto ? 'opacity-40 grayscale' : ''} hover:shadow-md`}>
                                
                                {c.fijado && <div className="absolute -top-3 left-10 bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"><Pin size={10} fill="white" /> FIJADO</div>}

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center font-black text-white shadow-sm ${c.destacado ? 'bg-amber-400' : 'bg-[#f1f5f9] !text-gray-400'}`}>
                                            {c.destacado ? <Star size={20} fill="white" /> : c.autor[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base text-gray-800 flex items-center gap-2">
                                                {c.autor} 
                                                {c.destacado && <span className="text-[9px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-black">DESTACADO</span>}
                                            </h4>
                                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">{c.fecha}</span>
                                        </div>
                                    </div>

                                    {/* Controles de Admin (Visibles al pasar el mouse) */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <button onClick={() => toggleFijar(c.id)} className={`p-2.5 rounded-xl transition-all ${c.fijado ? 'text-blue-600 bg-blue-50' : 'text-gray-300 hover:bg-gray-50'}`}><Pin size={18} /></button>
                                        <button onClick={() => toggleDestacar(c.id)} className={`p-2.5 rounded-xl transition-all ${c.destacado ? 'text-amber-500 bg-amber-50' : 'text-gray-300 hover:bg-gray-50'}`}><Star size={18} /></button>
                                        <button onClick={() => toggleOcultar(c.id)} className={`p-2.5 rounded-xl transition-all ${c.oculto ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:bg-gray-50'}`}>{c.oculto ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                                        <button onClick={() => eliminarComentario(c.id)} className="p-2.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                                <p className="text-[15px] text-gray-600 leading-relaxed pl-[64px] font-medium">{c.texto}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </article>
        </div>
    );
}