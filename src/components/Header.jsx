import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Search, Bell, User, LogOut, Tv } from "lucide-react";

const CLIENT_ID = "zc52bx407yd1b07r8pilibmtq76n19";
const REDIRECT_URI = `${window.location.origin}/auth/twitch`;
const SCOPES = "user:read:email openid";
const TWITCH_AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&response_type=code&scope=${SCOPES}`;

const Header = ({ onSearchChange, currentSearch }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchInput = (e) => {
    if (onSearchChange) onSearchChange(e.target.value);
  };

  return (
    <header className="flex justify-between items-center bg-[#18181b] text-white border-b border-black sticky top-0 z-50 p-2 shadow-md">
      {/* SECCIÓN IZQUIERDA: LOGO */}
      <Link to="/" className="shrink-0">
        <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
          <Tv className="w-7 h-7" />
          <span className="text-2xl font-extrabold tracking-tighter">
            Stream+
          </span>
        </div>
      </Link>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            className="w-full bg-[#323234] border border-transparent focus:border-cyan-500 focus:bg-black p-1.5 pl-10 pr-4 rounded-md text-sm transition-all outline-none"
            placeholder="Buscar"
            value={currentSearch || ""}
            onChange={handleSearchInput}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {isLoggedIn && user ? (
          <>
            <button
              className="p-2 hover:bg-gray-800 rounded-md transition relative group"
              title="Notificaciones"
            >
              <Bell className="w-5 h-5 text-gray-200" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#18181b]"></span>
            </button>

            <div className="relative" ref={menuRef}>
              <button
                className={`flex items-center rounded-full transition-all border-2 ${
                  isMenuOpen ? "border-cyan-500" : "border-transparent"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img
                  src={user?.profile_image_url}
                  alt={user?.display_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#1f1f23] border border-[#303032] rounded-md shadow-2xl py-1 z-[100] animate-in fade-in zoom-in duration-150">
                  <div className="flex items-center p-3 border-b border-[#303032] space-x-3">
                    <img
                      src={user?.profile_image_url}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-bold truncate">
                        {user?.display_name || user?.name}
                      </span>
                      <span className="text-xs text-cyan-400 font-semibold flex items-center">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full mr-1"></span>
                        Turbo
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-[#35353b] transition-colors flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Canal
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#35353b] transition-colors font-semibold text-red-400 border-t border-[#303032] flex items-center gap-2"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <a href={TWITCH_AUTH_URL} rel="noopener noreferrer">
            <button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold px-3 py-1.5 rounded text-sm transition">
              Iniciar Sesión
            </button>
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
