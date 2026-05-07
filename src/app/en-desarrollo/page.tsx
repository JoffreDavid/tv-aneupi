'use client';

import { useState } from 'react';
import { Hammer, Plus, Edit, Trash2, Clock, CheckCircle2, AlertCircle, BarChart3, Settings, AppWindow, X } from 'lucide-react';

// ==========================================
// 1. INTERFACES
// ==========================================
interface Project {
    id: number;
    title: string;
    description: string;
    status: 'Planificación' | 'En Desarrollo' | 'En Pruebas' | 'Pausado';
    progress: number;
    assignedTo: string;
    dueDate: string;
    moduleTarget: string;
}

export default function EnDesarrolloAdminPage() {
    // ==========================================
    // 2. ESTADOS DE DATOS
    // ==========================================
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: 'Nuevo Módulo de Analítica',
            description: 'Panel de estadísticas avanzadas para ver el alcance de la TV en Vivo.',
            status: 'En Desarrollo',
            progress: 65,
            assignedTo: 'Equipo Backend',
            dueDate: '30 May 2026',
            moduleTarget: 'TvVivo'
        },
        {
            id: 2,
            title: 'Integración Pasarela de Pagos',
            description: 'Conexión con Banco ANEUPI para permitir donaciones.',
            status: 'Planificación',
            progress: 15,
            assignedTo: 'Equipo Frontend',
            dueDate: '15 Jun 2026',
            moduleTarget: 'Global'
        },
        {
            id: 3,
            title: 'Mejoras en el Slider Principal',
            description: 'Transiciones 3D para las noticias principales de la portada.',
            status: 'En Pruebas',
            progress: 90,
            assignedTo: 'Equipo Frontend',
            dueDate: '10 May 2026',
            moduleTarget: 'Inicio'
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // ==========================================
    // 3. FUNCIONES DE GESTIÓN
    // ==========================================
    const deleteProject = (id: number) => {
        if (confirm('¿Estás seguro de eliminar este proyecto del tablero?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const openAddModal = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };

    const openEditModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const status = formData.get('status') as Project['status'];
        const progress = Number(formData.get('progress'));
        const assignedTo = formData.get('assignedTo') as string;
        const dueDate = formData.get('dueDate') as string;
        const moduleTarget = formData.get('moduleTarget') as string;

        if (selectedProject) {
            setProjects(projects.map(p =>
                p.id === selectedProject.id ? { ...p, title, description, status, progress, assignedTo, dueDate, moduleTarget } : p
            ));
        } else {
            const newProject: Project = {
                id: Date.now(),
                title, description, status, progress, assignedTo, dueDate, moduleTarget
            };
            setProjects([newProject, ...projects]);
        }
        setIsModalOpen(false);
    };

    // ==========================================
    // 4. HELPERS VISUALES
    // ==========================================
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Planificación': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'En Desarrollo': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'En Pruebas': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'Pausado': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress < 30) return 'bg-gray-400';
        if (progress < 70) return 'bg-blue-500';
        if (progress < 100) return 'bg-purple-500';
        return 'bg-green-500';
    };

    return (
        <div className="space-y-6 md:space-y-8 relative px-4 md:px-0 pb-10">

            {/* ==========================================
                5. CABECERA RESPONSIVA
                ========================================== */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-2xl md:text-[32px] font-black text-[#003952] tracking-tighter flex items-center gap-3">
                        <Hammer className="text-[#003952] shrink-0" size={28} />
                        Módulos en Desarrollo
                    </h1>
                    <p className="text-sm md:text-[14px] text-gray-500 mt-1">Supervisa las nuevas funcionalidades de la plataforma.</p>
                </div>

                <button
                    onClick={openAddModal}
                    className="w-full lg:w-auto bg-[#003952] text-white px-5 py-2.5 rounded-lg hover:bg-[#002233] transition-colors flex items-center justify-center gap-2 text-[14px] font-bold shadow-sm whitespace-nowrap"
                >
                    <Plus size={18} /> Nuevo Proyecto
                </button>
            </div>

            {/* ==========================================
                6. TARJETAS DE MÉTRICAS (MÓVIL: 1 COL, MD: 3 COLS)
                ========================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600 shrink-0"><Settings size={24} /></div>
                    <div>
                        <p className="text-[11px] md:text-[13px] text-gray-500 font-bold uppercase tracking-wider">Desarrollo Activo</p>
                        <p className="text-xl md:text-2xl font-black text-[#003952]">{projects.filter(p => p.status === 'En Desarrollo').length}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600 shrink-0"><AlertCircle size={24} /></div>
                    <div>
                        <p className="text-[11px] md:text-[13px] text-gray-500 font-bold uppercase tracking-wider">En Pruebas</p>
                        <p className="text-xl md:text-2xl font-black text-[#003952]">{projects.filter(p => p.status === 'En Pruebas').length}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg text-green-600 shrink-0"><CheckCircle2 size={24} /></div>
                    <div>
                        <p className="text-[11px] md:text-[13px] text-gray-500 font-bold uppercase tracking-wider">Progreso Promedio</p>
                        <p className="text-xl md:text-2xl font-black text-[#003952]">
                            {Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / (projects.length || 1))}%
                        </p>
                    </div>
                </div>
            </div>

            {/* ==========================================
                7. GRILLA DE PROYECTOS (RESPONSIVA)
                ========================================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div key={project.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col group relative">

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-wrap gap-2">
                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${getStatusColor(project.status)}`}>
                                    {project.status}
                                </span>
                                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-gray-800 text-white flex items-center gap-1 uppercase tracking-wider">
                                    <AppWindow size={10} /> {project.moduleTarget}
                                </span>
                            </div>

                            <div className="flex gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0">
                                <button onClick={() => openEditModal(project)} className="p-1.5 text-gray-400 hover:text-[#003952] hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => deleteProject(project.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-black text-lg text-[#003952] mb-2 leading-tight">{project.title}</h3>
                        <p className="text-[13px] text-gray-500 mb-6 flex-1 leading-relaxed italic">{project.description}</p>

                        {/* Barra de Progreso */}
                        <div className="mb-5">
                            <div className="flex justify-between text-[11px] mb-1.5 font-black uppercase">
                                <span className="text-gray-400 tracking-wider">Avance del Módulo</span>
                                <span className="text-[#003952]">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
                                <div
                                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(project.progress)}`}
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Footer de la Tarjeta */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-50 text-[11px] font-bold text-gray-400">
                            <span className="flex items-center gap-2">
                                <BarChart3 size={14} className="text-[#003952]" /> RESPONSABLE: {project.assignedTo}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={14} className="text-[#003952]" /> FECHA LÍMITE: {project.dueDate}
                            </span>
                        </div>

                    </div>
                ))}
            </div>

            {/* ==========================================
                8. MODAL (ADAPTATIVO CON SCROLL)
                ========================================== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in duration-200">

                        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center sticky top-0 z-10">
                            <h2 className="text-xl md:text-[22px] text-[#003952] font-black uppercase tracking-tighter">
                                {selectedProject ? 'Actualizar Desarrollo' : 'Registrar Módulo'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProject} className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Nombre del Proyecto</label>
                                    <input type="text" name="title" defaultValue={selectedProject?.title || ''} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003952]/20 outline-none text-sm font-medium" placeholder="Ej: Analítica de TV" required />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Módulo Vinculado</label>
                                    <select name="moduleTarget" defaultValue={selectedProject?.moduleTarget || 'Global'} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003952]/20 outline-none text-sm font-medium bg-white">
                                        <option value="Global">Global (Toda la Plataforma)</option>
                                        <option value="Inicio">Inicio / Portada</option>
                                        <option value="Articulos">Artículos</option>
                                        <option value="TvVivo">TV en Vivo</option>
                                        <option value="Configuracion">Configuración</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Estado</label>
                                    <select name="status" defaultValue={selectedProject?.status || 'Planificación'} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003952]/20 outline-none text-sm font-medium bg-white">
                                        <option value="Planificación">Planificación</option>
                                        <option value="En Desarrollo">En Desarrollo</option>
                                        <option value="En Pruebas">En Pruebas</option>
                                        <option value="Pausado">Pausado</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Progreso (%)</label>
                                    <input type="number" name="progress" min="0" max="100" defaultValue={selectedProject?.progress || 0} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003952]/20 outline-none text-sm font-medium" required />
                                </div>

                                <div>
                                    <label className="block text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Responsable</label>
                                    <input type="text" name="assignedTo" defaultValue={selectedProject?.assignedTo || ''} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003952]/20 outline-none text-sm font-medium" placeholder="Ej: Backend Team" required />
                                </div>

                                <div>
                                    <label className="block text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Fecha Límite</label>
                                    <input type="text" name="dueDate" defaultValue={selectedProject?.dueDate || ''} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003952]/20 outline-none text-sm font-medium" placeholder="Ej: 15 Jun 2026" required />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 font-black text-[10px] uppercase tracking-widest mb-1">Descripción</label>
                                    <textarea name="description" rows={3} defaultValue={selectedProject?.description || ''} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003952]/20 outline-none text-sm font-medium resize-none" placeholder="Detalla el desarrollo..." required></textarea>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 rounded-2xl hover:bg-gray-50 transition-colors font-bold text-sm order-last sm:order-first">
                                    Cancelar
                                </button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-[#003952] text-white rounded-2xl hover:bg-[#002233] transition-all font-bold text-sm shadow-md">
                                    {selectedProject ? 'Guardar Cambios' : 'Confirmar Registro'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}