'use client';

import { useState } from 'react';
import { User, Lock, Save, CheckCircle } from 'lucide-react';

export default function ConfiguracionPage() {
  // Estados para el perfil
  const [nombre, setNombre] = useState('tvaneupi'); // Nombre por defecto
  const [email, setEmail] = useState('admin@aneupi.com');
  
  // Estados para la contraseña
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  // Estado para notificaciones visuales
  const [mensajeExito, setMensajeExito] = useState('');

  // Simulación de guardado de perfil
  const handleGuardarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeExito('Perfil actualizado correctamente.');
    setTimeout(() => setMensajeExito(''), 3000); // Ocultar mensaje después de 3s
  };

  // Simulación de cambio de contraseña
  const handleCambiarPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaPassword !== confirmarPassword) {
      alert('Las contraseñas nuevas no coinciden.');
      return;
    }
    setMensajeExito('Contraseña actualizada de forma segura.');
    setPasswordActual('');
    setNuevaPassword('');
    setConfirmarPassword('');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Encabezado */}
      <div className="border-b border-gray-200 pb-4">
        <h1>Configuración de la Cuenta</h1>
        <p className="text-gray-500 mt-1">Gestiona tu información personal y la seguridad de tu acceso como Super Usuario.</p>
      </div>

      {/* Alerta de Éxito Flotante */}
      {mensajeExito && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 animate-pulse">
          <CheckCircle size={20} />
          <p className="font-medium">{mensajeExito}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* BLOQUE 1: Información Personal */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-[#003952] rounded-lg">
              <User size={24} />
            </div>
            <h2 className="!text-xl">Datos del Perfil</h2>
          </div>

          <form onSubmit={handleGuardarPerfil} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Nombre de Usuario</label>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003952] focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Correo Electrónico (No modificable)</label>
              <input 
                type="email" 
                value={email}
                disabled
                className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
              />
            </div>

            <button 
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-[#003952] hover:bg-[#002233] text-white py-2.5 rounded-lg transition-colors font-medium"
            >
              <Save size={18} /> Guardar Cambios
            </button>
          </form>
        </div>

        {/* BLOQUE 2: Seguridad y Contraseña */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <Lock size={24} />
            </div>
            <h2 className="!text-xl">Seguridad</h2>
          </div>

          <form onSubmit={handleCambiarPassword} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Contraseña Actual</label>
              <input 
                type="password" 
                value={passwordActual}
                onChange={(e) => setPasswordActual(e.target.value)}
                placeholder="Ingresa tu contraseña actual"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Nueva Contraseña</label>
              <input 
                type="password" 
                value={nuevaPassword}
                onChange={(e) => setNuevaPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Confirmar Nueva Contraseña</label>
              <input 
                type="password" 
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                placeholder="Repite la nueva contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg transition-colors font-medium"
            >
              <Lock size={18} /> Actualizar Contraseña
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}