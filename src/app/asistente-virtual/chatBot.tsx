'use client';

import { useState, useRef, useEffect } from "react";
import { Send, Bot, MessageCircle, X, Play, FileText, Camera } from "lucide-react";
import ChatMessage from "./chatMessage";

// --- INTERFACES ---
interface Intent {
  id: number;
  label: string;
  name: string;
  keywords: string;
  active: boolean;
  response?: string;
}

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  contentType?: 'reproductor_tv' | 'formulario_entrevista' | 'formulario_noticia';
}

interface ChatBotProps {
  intencionesData: Intent[];
  botName?: string;
}

// --- SUB-COMPONENTES VISUALES (WIDGETS) ---

const WidgetReproductorTV = () => (
  <div className="ml-10 mt-2 overflow-hidden rounded-xl border-2 border-[#003952] bg-black shadow-lg animate-in zoom-in duration-300">
    <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
      <img 
        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        alt="Streaming Background"
      />
      <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded animate-pulse">EN VIVO</div>
      <div className="flex flex-col items-center z-10 text-center p-4">
        <Play size={32} className="text-white mb-2 fill-white opacity-90" />
        <span className="text-white text-[10px] font-bold tracking-widest uppercase">TV ANEUPI STREAMING</span>
      </div>
    </div>
    <div className="bg-[#1A1A1A] p-2 flex justify-between items-center border-t border-white/10">
      <span className="text-[10px] text-gray-400 font-mono">SEÑAL HD 1080p</span>
      <div className="flex gap-2">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
      </div>
    </div>
    <button className="w-full bg-[#003952] text-white py-2 text-[11px] font-bold hover:bg-[#00283d] transition-colors">
      Haz clic para ver el en vivo
    </button>
  </div>
);

const WidgetFormularioEntrevista = () => (
  <div className="ml-10 mt-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-in slide-in-from-left-4">
    <div className="bg-[#003952] p-3 text-white flex items-center gap-2">
      <FileText size={14} />
      <span className="text-[11px] font-bold uppercase tracking-wide">Solicitud de Entrevista</span>
    </div>
    <div className="p-4 space-y-3 bg-gray-50/50">
      <input type="text" placeholder="Nombre Completo" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-[#003952]" />
      <input type="text" placeholder="WhatsApp / Teléfono" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-[#003952]" />
      <input type="email" placeholder="Correo Electrónico" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-[#003952]" />
      <button className="w-full bg-[#003952] text-white py-2.5 rounded-lg text-xs font-bold shadow-sm hover:brightness-110 active:scale-[0.98] transition-all">
        Enviar Datos
      </button>
    </div>
  </div>
);

const WidgetFormularioNoticia = ({ onFormSubmit }: { onFormSubmit: (msg: string) => void }) => {
  const [form, setForm] = useState({ titulo: '', ubicacion: '', descripcion: '' });
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    // Validación: verificar que ningún campo esté vacío
    if (!form.titulo.trim() || !form.ubicacion.trim() || !form.descripcion.trim()) {
      setError(true);
      return;
    }

    // Si todo está lleno, enviamos el mensaje de éxito
    setError(false);
    onFormSubmit("✅ ¡Gracias! Nuestro personal revisará tu reporte y te daremos una respuesta lo antes posible.");
  };

  return (
    <div className="ml-10 mt-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-in slide-in-from-left-4">
      <div className="bg-[#003952] p-3 text-white flex items-center gap-2">
        <Camera size={14} />
        <span className="text-[11px] font-bold uppercase tracking-wide">Publicar Noticia / Denuncia</span>
      </div>
      <div className="p-4 space-y-3 bg-gray-50/50">
        <input 
          type="text" 
          placeholder="Título o tema central" 
          value={form.titulo}
          onChange={(e) => setForm({...form, titulo: e.target.value})}
          className={`w-full p-2.5 bg-white border ${error && !form.titulo ? 'border-red-500' : 'border-gray-200'} rounded-lg text-xs outline-none focus:border-[#003952]`} 
        />
        <input 
          type="text" 
          placeholder="Ubicación de los hechos" 
          value={form.ubicacion}
          onChange={(e) => setForm({...form, ubicacion: e.target.value})}
          className={`w-full p-2.5 bg-white border ${error && !form.ubicacion ? 'border-red-500' : 'border-gray-200'} rounded-lg text-xs outline-none focus:border-[#003952]`} 
        />
        <textarea 
          placeholder="Describe lo ocurrido detalladamente..." 
          rows={3} 
          value={form.descripcion}
          onChange={(e) => setForm({...form, descripcion: e.target.value})}
          className={`w-full p-2.5 bg-white border ${error && !form.descripcion ? 'border-red-500' : 'border-gray-200'} rounded-lg text-xs outline-none focus:border-[#003952] resize-none`} 
        />
        
        {error && (
          <p className="text-[9px] text-red-500 font-bold animate-pulse">
            * Por favor, completa todos los campos antes de enviar.
          </p>
        )}

        <button 
          onClick={handleSubmit}
          className="w-full bg-[#003952] text-white py-2.5 rounded-lg text-xs font-bold shadow-sm hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enviar Reporte
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

const ChatBot = ({ intencionesData, botName = "Chat bot TV Aneupi" }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "bot", text: `¡Bienvenido a TV ANEUPI! 👋\nSoy ${botName}, tu asistente virtual. Puedes preguntarme sobre la TV en vivo o cómo publicar artículos.` },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    // 1. Añadir mensaje de usuario
    const userMsg: Message = { id: Date.now(), sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // 2. Procesar respuesta
    setTimeout(() => {
      const inputLower = text.toLowerCase();
      
      // Detectar si necesitamos inyectar widgets
      let type: Message['contentType'] = undefined;
      if (inputLower.includes("vivo") || inputLower.includes("señal") || inputLower.includes("streaming")) {
        type = "reproductor_tv";
      } else if (inputLower.includes("entrevista") || inputLower.includes("agendar")) {
        type = "formulario_entrevista";
      } else if (inputLower.includes("denuncia") || inputLower.includes("noticia") || inputLower.includes("publicar")) {
        type = "formulario_noticia";
      }

      // Buscar respuesta en intenciones data
      const match = intencionesData.find(intent => 
        intent.active && 
        intent.keywords.toLowerCase().split(',').some(k => inputLower.includes(k.trim()))
      );

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: match ? match.response || "Cargando opciones..." : "No entiendo tu consulta, pero puedes intentar con: 'Vivo', 'Entrevista' o 'Denuncia'.",
        contentType: type
      };

      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#003952" }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[100] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300 w-[350px] h-[520px]">
          {/* Header */}
          <div className="p-4 text-white flex items-center gap-3 shrink-0" style={{ backgroundColor: "#003952" }}>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
              <Bot size={22} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[15px] leading-tight truncate">{botName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                <span className="text-[10px] text-green-400 font-bold uppercase tracking-tighter">En línea ahora</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#f8fafc]">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <ChatMessage sender={msg.sender} text={msg.text} />
                
                {/* RENDERIZADO DE COMPONENTES ESPECIALES */}
                {msg.contentType === "reproductor_tv" && <WidgetReproductorTV />}
                
                {msg.contentType === "formulario_entrevista" && <WidgetFormularioEntrevista />}
                
                {msg.contentType === "formulario_noticia" && (
                  <WidgetFormularioNoticia 
                    onFormSubmit={(successMsg) => {
                      // Esta función añade el mensaje de respuesta al chat tras enviar
                      setMessages(prev => [...prev, { id: Date.now(), sender: "bot", text: successMsg }]);
                    }} 
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer / Input */}
          <div className="p-3 bg-white border-t flex gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu duda aquí..."
              className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-[13px] outline-none focus:ring-1 focus:ring-[#003952] transition-all"
            />
            <button 
              onClick={handleSend} 
              className="p-2.5 rounded-full text-white shadow-md transition-transform active:scale-90" 
              style={{ backgroundColor: "#003952" }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;