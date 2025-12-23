import StreamCards from "./StreamCards";
import { TrendingUp } from "lucide-react";

const MainContent = ({ liveStreams = [], searchTerm, isLoading }) => {
  const filteredStreams = (liveStreams || []).filter((stream) => {
    const lowerCaseSearch = searchTerm ? searchTerm.toLowerCase() : "";
    if (!lowerCaseSearch) return true;

    return (
      (stream.canal && stream.canal.toLowerCase().includes(lowerCaseSearch)) ||
      (stream.titulo &&
        stream.titulo.toLowerCase().includes(lowerCaseSearch)) ||
      (stream.categoria &&
        stream.categoria.toLowerCase().includes(lowerCaseSearch))
    );
  });

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
        <TrendingUp className="w-8 h-8 text-cyan-400" />
        Canales en vivo que creemos que te gustarán
      </h1>

      {isLoading && (
        <p className="text-cyan-400 text-lg">Cargando datos de Twitch...</p>
      )}

      {!isLoading && filteredStreams.length === 0 && (
        <p className="text-gray-400">
          No se encontraron streams que coincidan con "{searchTerm}". Revisa que
          tu backend esté corriendo en el puerto 3001.
        </p>
      )}

      {/* Grid responsive de tarjetas de streams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStreams.map((stream) => (
          <StreamCards
            key={stream.id}
            canal={stream.canal}
            titulo={stream.titulo}
            categoria={stream.categoria}
            imagen={stream.imagen}
            espectadores={stream.espectadores}
            avatarUrl={stream.avatarUrl}
            enVivo={stream.enVivo}
          />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
