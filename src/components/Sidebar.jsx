import { Link } from "react-router-dom";
import { Flame, Eye } from "lucide-react";

export const Sidebar = ({ liveStreams = [], isLoading }) => {
  const topStreams = [...liveStreams]
    .sort((a, b) => b.espectadores - a.espectadores)
    .slice(0, 5);

  return (
    <aside className="w-64 h-full bg-gray-800 text-white p-4 overflow-y-auto hidden lg:block">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Flame className="w-6 h-6 text-cyan-400" />
        Para ti
      </h2>

      {isLoading && <p className="text-sm text-purple-400 mt-2">Cargando...</p>}

      <nav className="space-y-1">
        {topStreams.map((stream) => {
          const streamSlug = stream.canal
            ? stream.canal.toLowerCase().replace(/\s/g, "-")
            : "canal-desconocido";
          const isLive = stream.enVivo !== false;

          return (
            <Link
              key={stream.id || stream.canal}
              to={`/stream/${streamSlug}`}
              className="flex items-center justify-between p-1.5 rounded hover:bg-gray-700 transition duration-150"
            >
              <div className="flex items-center overflow-hidden">
                <div className="w-6 h-6 rounded-full mr-2 shrink-0 overflow-hidden">
                  <img
                    src={stream.avatarUrl}
                    alt={`Avatar de ${stream.canal}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="leading-tight truncate">
                  <p className="text-white text-sm font-medium truncate">
                    {stream.canal}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {stream.categoria}
                  </p>
                </div>
              </div>

              {isLive && (
                <div className="flex items-center space-x-1 shrink-0 ml-2">
                  <Eye className="w-3 h-3 text-red-500" />
                  <span className="text-red-500 text-xs font-semibold">
                    {stream.espectadores?.toLocaleString() || "0"}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
