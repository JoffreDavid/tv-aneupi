'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Save, CheckCircle, Shield, Users, UserPlus, UserCog, KeyRound, Trash2, Edit } from 'lucide-react';

// --- INTERFACES ---
interface TeamMember {
  id: string;
  nombre: string;
  email: string;
  rol: 'Super Admin' | 'Editor' | 'Moderador';
}

export default function ConfiguracionPage() {
  // --- ESTADO DE NAVEGACIÓN (TABS) ---
  const [activeTab, setActiveTab] = useState<'perfil' | 'roles'>('perfil');

  // ==========================================
  // TAB 1: ESTADOS Y LÓGICA DEL PERFIL
  // ==========================================
  const [nombre, setNombre] = useState('tvaneupi'); 
  const [email, setEmail] = useState('admin@aneupi.com');
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const handleGuardarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeExito('Perfil actualizado correctamente.');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  const handleCambiarPassword = async (e: React.FormEvent) => {
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

  // ==========================================
  // TAB 2: ESTADOS Y LÓGICA DE ROLES Y USUARIOS
  // ==========================================
  const [team, setTeam] = useState<TeamMember[]>([
    { id: '1', nombre: 'Admin Principal', email: 'admin@aneupi.com', rol: 'Super Admin' },
    { id: '2', nombre: 'Juan Pérez', email: 'juan.perez@aneupi.com', rol: 'Editor' },
    { id: '3', nombre: 'María López', email: 'maria.moderadora@aneupi.com', rol: 'Moderador' },
  ]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  
  const openCreateModal = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const openEditModal = (user: TeamMember) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleGuardarUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formNombre = formData.get('nombre') as string;
    const formEmail = formData.get('email') as string;
    const formRol = formData.get('rol') as TeamMember['rol'];
    
    if (selectedUser) {
      setTeam(team.map(u => 
        u.id === selectedUser.id ? { ...u, nombre: formNombre, email: formEmail, rol: formRol } : u
      ));
      setMensajeExito(`Los datos de ${formNombre} han sido actualizados.`);
    } else {
      const nuevoUsuario: TeamMember = {
        id: Date.now().toString(),
        nombre: formNombre,
        email: formEmail,
        rol: formRol
      };
      setTeam([...team, nuevoUsuario]);
      setMensajeExito(`El usuario ${formNombre} ha sido creado.`);
    }
    setIsUserModalOpen(false); 
    setTimeout(() => setMensajeExito(''), 4000);
  };

  const handleCambiarRolInline = (userId: string, nuevoRol: TeamMember['rol']) => {
    if (confirm(`¿Estás seguro de cambiar el rol a ${nuevoRol}?`)) {
      setTeam(team.map(miembro => miembro.id === userId ? { ...miembro, rol: nuevoRol } : miembro));
      setMensajeExito('Permisos actualizados correctamente.');
      setTimeout(() => setMensajeExito(''), 3000);
    }
  };

  const handleEliminarUsuario = (userId: string, nombre: string) => {
    if (confirm(`¿Estás seguro de ELIMINAR permanentemente a ${nombre}?`)) {
      setTeam(team.filter(miembro => miembro.id !== userId));
      setMensajeExito(`El usuario ${nombre} ha sido eliminado del sistema.`);
      setTimeout(() => setMensajeExito(''), 3000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 relative px-4 md:px-0">
      
      {/* CABECERA RESPONSIVA */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <Shield className="text-[#003952] shrink-0" size={28} md-size={32} strokeWidth={2.5} />
          <h1 className="text-2xl md:text-[40px] font-black text-[#003952] tracking-tighter leading-tight md:leading-none">
            Configuración
          </h1>
        </div>
        <p className="text-sm md:text-[15px] text-gray-500 mt-2">
          Gestiona tu información personal, seguridad y los accesos de tu equipo.
        </p>
      </div>

      {/* ALERTA FLOTANTE DE ÉXITO */}
      {mensajeExito && (
        <div className="fixed top-20 right-4 left-4 md:left-auto md:w-auto z-[150] bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg">
          <CheckCircle size={20} />
          <p className="font-medium text-sm">{mensajeExito}</p>
        </div>
      )}

      {/* NAVEGACIÓN DE PESTAÑAS (SCROLLABLE EN MÓVIL) */}
      <div className="flex border-b border-gray-200 gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab('perfil')}
          className={`pb-3 font-bold text-sm md:text-[15px] transition-colors border-b-2 whitespace-nowrap ${activeTab === 'perfil' ? 'border-[#003952] text-[#003952]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          <span className="flex items-center gap-2"><UserCog size={18}/> Mi Perfil y Seguridad</span>
        </button>
        <button 
          onClick={() => setActiveTab('roles')}
          className={`pb-3 font-bold text-sm md:text-[15px] transition-colors border-b-2 whitespace-nowrap ${activeTab === 'roles' ? 'border-[#003952] text-[#003952]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          <span className="flex items-center gap-2"><Users size={18}/> Equipo y Roles</span>
        </button>
      </div>

      <div className="pt-2">
        {/* =========================================
            VISTA 1: PERFIL Y SEGURIDAD 
            ========================================= */}
        {activeTab === 'perfil' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Información Personal */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-[#003952] rounded-lg">
                  <User size={24} />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[#003952]">Datos del Perfil</h2>
              </div>
              <form onSubmit={handleGuardarPerfil} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm">Nombre de Usuario</label>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003952] outline-none text-sm" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm">Correo (No modificable)</label>
                  <input type="email" value={email} disabled className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed text-sm" />
                </div>
                <button type="submit" className="w-full flex justify-center items-center gap-2 bg-[#003952] hover:bg-[#002233] text-white py-3 rounded-lg transition-colors font-bold text-sm">
                  <Save size={18} /> Guardar Cambios
                </button>
              </form>
            </div>

            {/* Seguridad y Contraseña */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                  <Lock size={24} />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[#003952]">Seguridad</h2>
              </div>
              <form onSubmit={handleCambiarPassword} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm">Contraseña Actual</label>
                  <input type="password" value={passwordActual} onChange={(e) => setPasswordActual(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm">Nueva Contraseña</label>
                  <input type="password" value={nuevaPassword} onChange={(e) => setNuevaPassword(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm" required minLength={8} />
                </div>
                <button type="submit" className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg transition-colors font-bold text-sm">
                  <Lock size={18} /> Actualizar Contraseña
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================
            VISTA 2: GESTIÓN DE ROLES (TABLA RESPONSIVA)
            ========================================= */}
        {activeTab === 'roles' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-5 md:p-6 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg md:text-[20px] font-bold text-[#003952]">Usuarios del Sistema</h2>
                <p className="text-xs md:text-[13px] text-gray-500 mt-1">Asigna roles a los miembros de tu equipo.</p>
              </div>
              <button onClick={openCreateModal} className="w-full sm:w-auto bg-[#003952] text-white px-4 py-2.5 rounded-lg hover:bg-[#002233] transition-colors flex items-center justify-center gap-2 text-sm font-bold shadow-sm">
                <UserPlus size={18} /> Agregar
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-white border-b border-gray-200 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="p-4 font-medium">Nombre de Usuario</th>
                    <th className="p-4 font-medium">Correo Electrónico</th>
                    <th className="p-4 font-medium">Rol / Permisos</th>
                    <th className="p-4 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {team.map((miembro) => (
                    <tr key={miembro.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#003952] font-bold text-[12px] uppercase">
                            {miembro.nombre.charAt(0)}
                          </div>
                          <span className="font-bold text-[#003952] text-sm">{miembro.nombre}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{miembro.email}</td>
                      <td className="p-4">
                        {miembro.id === '1' ? (
                          <span className="bg-red-50 text-red-700 px-3 py-1 rounded text-[11px] font-bold border border-red-100">
                            {miembro.rol}
                          </span>
                        ) : (
                          <select
                            value={miembro.rol}
                            onChange={(e) => handleCambiarRolInline(miembro.id, e.target.value as TeamMember['rol'])}
                            className="bg-white border border-gray-300 text-gray-700 text-xs rounded-lg px-2 py-1.5 outline-none"
                          >
                            <option value="Super Admin">Super Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Moderador">Moderador</option>
                          </select>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        {miembro.id !== '1' && (
                          <div className="flex justify-end gap-2">
                            <button onClick={() => openEditModal(miembro)} className="p-2 text-gray-400 hover:text-[#003952] transition-colors"><Edit size={18} /></button>
                            <button onClick={() => handleEliminarUsuario(miembro.id, miembro.nombre)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* =========================================
          MODAL UNIFICADO (RESPONSIVO)
          ========================================= */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-y-auto max-h-[90vh] animate-in fade-in duration-200">
            
            <div className="p-5 md:p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg md:text-[22px] font-bold text-[#003952] flex items-center gap-2">
                {selectedUser ? <UserCog size={24} /> : <UserPlus size={24} />}
                {selectedUser ? 'Editar Integrante' : 'Nuevo Integrante'}
              </h2>
            </div>

            <form onSubmit={handleGuardarUsuario} className="p-5 md:p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Nombre Completo</label>
                <input type="text" name="nombre" defaultValue={selectedUser?.nombre || ''} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm" required />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Correo Corporativo</label>
                <input type="email" name="email" defaultValue={selectedUser?.email || ''} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Contraseña</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" name="password" className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none" required={!selectedUser} minLength={8} placeholder="••••••••" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">Rol</label>
                  <select name="rol" defaultValue={selectedUser?.rol || 'Editor'} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none">
                    <option value="Editor">Editor</option>
                    <option value="Moderador">Moderador</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsUserModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium order-last sm:order-first">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-[#003952] text-white rounded-lg text-sm font-bold">
                  {selectedUser ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}