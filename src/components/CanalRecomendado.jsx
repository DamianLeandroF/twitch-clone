const CanalRecomendado = ({
  nombre,
  juego,
  espectadores,
  enVivo,
  avatarUrl,
}) => {
  // 💡 La nueva prop 'avatarUrl' se recibe aquí

  const getAvatarLetter = (name) => name[0].toUpperCase();

  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded transition duration-150 cursor-pointer">
      <div className="flex items-center space-x-2 truncate">
        {/* 💡 REEMPLAZO/ADICIÓN DEL AVATAR */}
        {avatarUrl ? (
          // Opción 1: Muestra la Imagen de Perfil
          <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
            <img
              src={avatarUrl}
              alt={`Avatar de ${nombre}`}
              // Clases para asegurar que la imagen cubra el div
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          // Opción 2: Fallback (Muestra la Inicial si la URL no está presente o falla)
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-600 text-white font-bold flex-shrink-0">
            {getAvatarLetter(nombre)}
          </div>
        )}

        <div className="truncate">
          <h2 className="font-semibold text-sm truncate text-white">
            {nombre}
          </h2>
          <p className="text-xs text-gray-400 truncate">{juego}</p>
        </div>
      </div>
      <div className="flex items-center space-x-1 shrink-0">
        {enVivo && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
        <p className="text-xs text-gray-400">
          {new Intl.NumberFormat().format(espectadores)}
        </p>
      </div>
    </div>
  );
};

export default CanalRecomendado;
