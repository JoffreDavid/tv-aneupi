export default function DashboardHome() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      {/* Toma automáticamente 25px y el color #003952 por ser un <h1> */}
      <h1>Bienvenido al Panel de Control</h1>
      
      {/* Toma automáticamente 14px por ser un <p> */}
      <p className="mt-4">
        Hola Super Usuario. Desde aquí puedes gestionar todo el contenido de la plataforma ANEUPI. 
        Selecciona una opción en el menú lateral izquierdo para comenzar.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="!text-blue-800">Artículos Activos</h3>
          <p className="!text-3xl font-bold !text-blue-600 mt-2">24</p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg border border-red-100">
          <h3 className="!text-red-800">Canales en Vivo</h3>
          <p className="!text-3xl font-bold !text-red-600 mt-2">3</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h3 className="!text-green-800">Visitas Hoy</h3>
          <p className="!text-3xl font-bold !text-green-600 mt-2">+1,200</p>
        </div>
      </div>
    </div>
  );
}