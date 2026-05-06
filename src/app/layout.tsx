'use client'; // Agregado para manejar el estado del clic

import { useState } from 'react'; // Agregado para el estado
import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, Newspaper, Tv, LogOut, Settings, Bot, Hammer, Menu, X } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Estado para controlar la expansión en móvil
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <html lang="es">
      <body className="flex flex-col md:flex-row h-screen overflow-hidden">

        {/* SIDEBAR LATERAL / NAVBAR SUPERIOR */}
        <aside className="w-full md:w-64 bg-primary text-white flex flex-col shrink-0 z-50">
          <div>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h1 className="text-white tracking-wider font-bold">
                TV ANEUPI <span className="font-light text-gray-300">| ADMIN</span>
              </h1>
              
              {/* BOTÓN DE MENÚ: Solo visible en pantallas menores a 768px */}
              <button 
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="md:hidden p-1 hover:bg-white/10 rounded-md transition-colors"
              >
                {menuAbierto ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* NAVEGACIÓN: 
                - En móvil: se oculta/muestra según el estado y se apila verticalmente 
                - En escritorio: siempre visible (md:flex)
            */}
            <nav className={`${menuAbierto ? 'flex' : 'hidden'} md:flex flex-col p-4 space-y-2 bg-primary md:bg-transparent border-b border-white/5 md:border-none`}>
              <Link 
                href="/inicio" 
                onClick={() => setMenuAbierto(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <LayoutDashboard size={20} />
                <span>Inicio</span>
              </Link>

              <Link 
                href="/articulos" 
                onClick={() => setMenuAbierto(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Newspaper size={20} />
                <span>Artículos</span>
              </Link>

              <Link 
                href="/tv-vivo" 
                onClick={() => setMenuAbierto(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Tv size={20} />
                <span>TV en Vivo</span>
              </Link>

              <Link 
                href="/asistente-virtual" 
                onClick={() => setMenuAbierto(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Bot size={20} />
                <span>Asistente Virtual</span>
              </Link>

              <Link 
                href="/en-desarrollo" 
                onClick={() => setMenuAbierto(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Hammer size={20} />
                <span>En desarrollo</span>
              </Link>

              <Link 
                href="/configuracion" 
                onClick={() => setMenuAbierto(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Settings size={20} />
                <span>Configuración</span>
              </Link>

              {/* Botón Cerrar Sesión visible dentro del desplegable en móvil */}
              <button className="md:hidden flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-white/10 transition-colors pt-4 border-t border-white/10">
                <LogOut size={20} />
                <span>Cerrar Sesión</span>
              </button>
            </nav>
          </div>

          {/* CERRAR SESIÓN: Solo visible en el lateral de escritorio */}
          <div className="p-4 border-t border-white/10 hidden md:block">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-white/10 hover:text-red-400 transition-colors">
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* ÁREA DE TRABAJO */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}