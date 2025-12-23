import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import MainContent from "./components/MainContent";
import PaginaStream from "./pages/PaginaStream";
import { feedStreams as fallbackStreams } from "./data/feedStreams";
import AuthHandler from "./pages/AuthHandler";

// 1. Componente de Layout del Cuerpo (Sidebar + Contenido Variable)
const AppLayout = ({ children, liveStreams, isLoading }) => (
  <div className="flex overflow-hidden h-full">
    <Sidebar liveStreams={liveStreams} isLoading={isLoading} />
    {children} {/* Aquí se renderiza MainContent o PaginaStream */}
  </div>
);

function App() {
  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para los datos de streams
  const [liveStreams, setLiveStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch de streams desde el backend
  useEffect(() => {
    const fetchTwitchStreams = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
        const response = await fetch(`${apiUrl}/api/twitch/streams`);

        if (!response.ok) {
          throw new Error("Fallo al obtener streams.");
        }

        const data = await response.json();
        console.log("Streams recibidos del backend:", data);
        setLiveStreams(data);
      } catch (err) {
        console.error("Error al cargar streams:", err.message);
        setLiveStreams(fallbackStreams); // Usar datos de prueba como fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchTwitchStreams();
  }, []);

  const handleSearch = (term) => setSearchTerm(term);
  const streamsToRender =
    liveStreams.length > 0 ? liveStreams : fallbackStreams;

  return (
    // Estructura de Grid Principal (Vertical: Header + Cuerpo)
    <div className="grid grid-rows-[auto_1fr] h-screen bg-gray-900">
      {/* El Header recibe las funciones de búsqueda */}
      <Header onSearchChange={handleSearch} currentSearch={searchTerm} />

      {/* 2. <Routes> gestiona el contenido del 1fr restante */}
      <Routes>
        {/* RUTA 1: HOME (Feed de Streams) */}
        {/* Renderiza el AppLayout, que a su vez renderiza MainContent */}
        <Route
          path="/"
          element={
            <AppLayout liveStreams={liveStreams} isLoading={isLoading}>
              <MainContent
                liveStreams={liveStreams}
                searchTerm={searchTerm}
                isLoading={isLoading}
              />
            </AppLayout>
          }
        />

        {/* RUTA 2: STREAM EN VIVO (Ruta dinámica) */}
        {/* Esto coincide con la ruta generada por <Link to={`/stream/${streamSlug}`}/> */}
        <Route
          path="/stream/:streamSlug"
          element={
            <AppLayout liveStreams={streamsToRender} isLoading={isLoading}>
              {/* PaginaStream ahora recibe la lista completa, o puedes optimizar */}
              <PaginaStream
                allStreams={streamsToRender} // Pasamos la lista completa
              />
            </AppLayout>
          }
        />
        {/* 💡 RUTA DE MANEJO DE AUTENTICACIÓN */}
        <Route path="/auth/twitch" element={<AuthHandler />} />
      </Routes>
    </div>
  );
}

export default App;
