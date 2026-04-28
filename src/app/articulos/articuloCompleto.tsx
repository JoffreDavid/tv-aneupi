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

    // --- FUNCIONES ADMINISTRATIVAS ---
    const eliminarComentario = (id: number) => {
        if (confirm("¿Seguro que deseas eliminar este comentario?")) {
            setComentarios(comentarios.filter(c => c.id !== id));
        }
    };

    const toggleFijar = (id: number) => {
        setComentarios(comentarios.map(c => 
            c.id === id ? { ...c, fijado: !c.fijado } : { ...c, fijado: false } // Solo uno puede estar fijado
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

    // Ordenar: Primero los fijados
    const comentariosOrdenados = [...comentarios].sort((a, b) => (a.fijado === b.fijado ? 0 : a.fijado ? -1 : 1));

    return (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header y Botón Volver */}
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <button onClick={onBack} className="flex items-center gap-2 text-[#003952] font-bold hover:bg-white px-4 py-2 rounded-xl transition-all shadow-sm">
                    <ChevronLeft size={20} /> Volver al Panel
                </button>
                <div className="flex items-center gap-2 text-[10px] font-black text-[#003952] uppercase bg-white px-3 py-1 rounded-lg border border-gray-200">
                    <CheckCircle size={14} className="text-green-500" /> Modo Administrador Activo
                </div>
            </div>

            <article className="max-w-4xl mx-auto p-8 md:p-12">
                <span className="bg-[#003952] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{articulo.category}</span>
                <h1 className="text-4xl md:text-5xl font-black text-[#003952] mt-4 mb-6 leading-tight">{articulo.title}</h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-10 border-b pb-6 border-gray-100">
                    <span className="flex items-center gap-2"><User size={16} /> {articulo.author}</span>
                    <span className="flex items-center gap-2"><Calendar size={16} /> {articulo.date}</span>
                    <span className="flex items-center gap-2"><BookOpen size={16} /> {articulo.views} Vistas</span>
                </div>

                {/* Contenido del Artículo */}
                <div className="text-gray-700 text-lg leading-relaxed mb-16">
                    <p className="font-medium text-gray-500 italic mb-8 border-l-4 border-[#003952] pl-4">{articulo.description}</p>
                    <p>Contenido completo del artículo cargado satisfactoriamente desde la base de datos de administración.</p>
                </div>

                {/* GESTIÓN DE COMENTARIOS */}
                <section className="mt-16 pt-10 border-t border-gray-100">
                    <h3 className="text-2xl font-bold text-[#003952] mb-8 flex items-center gap-3">
                        <MessageCircle /> Moderación de Comentarios ({comentarios.length})
                    </h3>

                    {/* Input */}
                    <div className="bg-white p-4 rounded-2xl mb-10 border-2 border-gray-100 shadow-sm focus-within:border-[#003952] transition-all">
                        <textarea 
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            placeholder="Responder como Administrador..."
                            className="w-full p-2 outline-none text-sm resize-none"
                            rows={2}
                        />
                        <div className="flex justify-end pt-2">
                            <button onClick={agregarComentario} className="bg-[#003952] text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:brightness-110">
                                <Send size={14} /> Responder
                            </button>
                        </div>
                    </div>

                    {/* Lista de Comentarios con Herramientas de Admin */}
                    <div className="space-y-4">
                        {comentariosOrdenados.map(c => (
                            <div key={c.id} className={`group relative p-6 rounded-2xl border transition-all ${c.fijado ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-gray-100'} ${c.oculto ? 'opacity-50 grayscale' : ''}`}>
                                
                                {c.fijado && <div className="absolute -top-2 left-6 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><Pin size={10} fill="white" /> FIJADO</div>}

                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex gap-3">
                                        <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-white ${c.destacado ? 'bg-amber-400 animate-pulse' : 'bg-gray-300'}`}>
                                            {c.destacado ? <Star size={16} fill="white" /> : c.autor[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                                                {c.autor} 
                                                {c.destacado && <span className="text-[9px] bg-amber-100 text-amber-600 px-1.5 rounded-md">DESTACADO</span>}
                                            </h4>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase">{c.fecha}</span>
                                        </div>
                                    </div>

                                    {/* BOTONERA DE ADMINISTRACIÓN */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => toggleFijar(c.id)} className={`p-2 rounded-lg transition-colors ${c.fijado ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:bg-gray-100'}`} title="Fijar al inicio"><Pin size={16} /></button>
                                        <button onClick={() => toggleDestacar(c.id)} className={`p-2 rounded-lg transition-colors ${c.destacado ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:bg-gray-100'}`} title="Destacar comentario"><Star size={16} /></button>
                                        <button onClick={() => toggleOcultar(c.id)} className={`p-2 rounded-lg transition-colors ${c.oculto ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-100'}`} title="Ocultar a usuarios">{c.oculto ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                                        <button onClick={() => eliminarComentario(c.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar permanentemente"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed pl-[52px]">{c.texto}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </article>
        </div>
    );
}