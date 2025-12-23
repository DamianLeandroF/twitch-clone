import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import Chat from "../components/Chat";
import { Eye, Users, Gamepad2 } from "lucide-react";

const PaginaStream = ({ allStreams }) => {
  const { streamSlug } = useParams();
  const currentStream = allStreams.find(
    (s) => s.canal.toLowerCase().replace(/\s/g, "-") === streamSlug
  );
  if (!currentStream) {
    return <div>Stream no encontrado</div>;
  }
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4 p-4 h-full overflow-hidden">
      <div className="w-full overflow-y-auto">
        <VideoPlayer streamSlug={streamSlug} streamData={currentStream} />

        <div className="mt-4 text-white p-2">
          <div className="flex items-start space-x-3 border-b border-gray-700 pb-4 mb-4">
            <div className="w-12 h- 12 rounded-full shrink-0 overflow-hidden">
              <img
                src={currentStream.avatarUrl}
                alt={`Avatar de ${currentStream.canal}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold ">{currentStream.titulo}</h1>
              <p className="text-cyan-400 font-semibold">
                {currentStream.canal}
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <Gamepad2 className="w-4 h-4" />
                  {currentStream.categoria}
                </span>
                <span className="text-gray-600">|</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {currentStream.espectadores?.toLocaleString() ||
                    currentStream.espectadores}{" "}
                  espectadores
                </span>
              </p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            ¡Gracias por ver el directo! Suscríbete para no perderte las
            partidas de {currentStream.categoria}.
          </p>
        </div>
      </div>
      <Chat />
    </div>
  );
};

export default PaginaStream;
