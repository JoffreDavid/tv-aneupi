import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
// 1. Importamos "Bot" de lucide-react
import { LayoutDashboard, Newspaper, Tv, LogOut, Settings, Bot, Hammer } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin ANEUPI",
  description: "Panel de control para Super Usuario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex h-screen overflow-hidden">

        {/* SIDEBAR LATERAL */}
        <aside className="w-64 bg-primary text-white flex flex-col justify-between hidden md:flex">
          <div>
            <div className="p-6 border-b border-white/10">
              <h1 className="text-white tracking-wider font-bold">
                TV ANEUPI <span className="font-light text-gray-300">| ADMIN</span>
              </h1>
            </div>

            <nav className="p-4 space-y-2">
              <Link href="/inicio" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <LayoutDashboard size={20} />
                <span>Inicio</span>
              </Link>

              <Link href="/articulos" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <Newspaper size={20} />
                <span>Artículos</span>
              </Link>

              <Link href="/tv-vivo" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <Tv size={20} />
                <span>TV en Vivo</span>
              </Link>

              {/* 2. Sección Asistente Virtual con el icono <Bot /> */}
              <Link href="/asistente-virtual" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <Bot size={20} />
                <span>Asistente Virtual</span>
              </Link>

              {/* 2. En desarrollo */}
              <Link href="/asistente-virtual" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <Hammer size={20} />
                <span>En desarrollo</span>
              </Link>

              <Link href="/configuracion" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                <Settings size={20} />
                <span>Configuración</span>
              </Link>
            </nav>
          </div>

          <div className="p-4 border-t border-white/10">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-white/10 hover:text-red-400 transition-colors">
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* ÁREA DE TRABAJO */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}