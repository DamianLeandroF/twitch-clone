import { Link } from "react-router-dom";
import { Eye, Radio } from "lucide-react";

const StreamCards = ({
  canal,
  titulo,
  categoria,
  imagen,
  espectadores,
  avatarUrl,
}) => {
  const streamSlug = canal.toLowerCase().replace(/\s/g, "-");
  return (
    <Link
      to={`/stream/${streamSlug}`}
      className="block group hover:scale-[1.02] transition duration-300"
    >
      <div className="block group hover:scale-[1.02] transition duration-300">
        <div>
          <div className="relative overflow-hidden rounded-lg mb-2">
            <img
              src={imagen}
              alt={titulo}
              className="w-full h-auto aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" />
              EN VIVO
            </div>
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {new Intl.NumberFormat().format(espectadores)} espectadores
            </div>
          </div>

          <div className="flex gap-2">
            {avatarUrl ? (
              <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden border-2 border-gray-700">
                <img
                  src={avatarUrl}
                  alt={`Avatar de ${canal}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                {canal[0].toUpperCase()}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-400 transition-colors">
                {titulo}
              </h3>
              <p className="text-gray-400 text-xs mt-1">{canal}</p>
              <p className="text-gray-500 text-xs">{categoria}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StreamCards;
