# 🎮 Twitch Clone

Un clon moderno de Twitch construido con React, Vite, Tailwind CSS y la API de Twitch.

![Twitch Clone](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-cyan)

## ✨ Características

- 🔴 **Streams en vivo** - Visualiza streams en vivo de Twitch
- 🔐 **Autenticación OAuth** - Inicia sesión con tu cuenta de Twitch
- 🎨 **Diseño moderno** - Interfaz elegante con colores azul/celeste
- 📱 **Responsive** - Funciona en desktop, tablet y móvil
- 🔍 **Búsqueda** - Busca streams por canal, título o categoría
- 💬 **Chat simulado** - Chat en tiempo real (simulado)
- 👤 **Perfiles de usuario** - Avatares y información de streamers
- 🎯 **Iconos modernos** - Usando Lucide React

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Cuenta de desarrollador de Twitch

### Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/twitch-clone.git
cd twitch-clone
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3001
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔧 Backend

El backend está en un repositorio separado. Asegúrate de tenerlo corriendo:

```bash
cd ../twitch-backend
npm install
node server.js
```

El backend estará disponible en `http://localhost:3001`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🌐 Despliegue

Para desplegar tu aplicación en producción, consulta la [Guía de Despliegue](./DEPLOYMENT.md).

### Resumen Rápido

**Frontend (Vercel):**

1. Conecta tu repositorio de GitHub a Vercel
2. Configura `VITE_API_URL` con la URL de tu backend
3. Despliega automáticamente

**Backend (Render):**

1. Conecta tu repositorio de GitHub a Render
2. Configura las variables de entorno de Twitch
3. Despliega automáticamente

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Tailwind CSS 4** - Estilos
- **Lucide React** - Iconos

### Backend

- **Node.js** - Runtime
- **Express** - Framework web
- **Twitch API** - Datos de streams
- **CORS** - Seguridad

## 📁 Estructura del Proyecto

```
twitch-clone/
├── public/
│   └── _redirects          # Redirects para Netlify
├── src/
│   ├── components/         # Componentes React
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StreamCards.jsx
│   │   ├── Chat.jsx
│   │   └── ...
│   ├── context/           # Context API
│   │   └── AuthContext.jsx
│   ├── hooks/             # Custom hooks
│   │   └── useAuth.js
│   ├── pages/             # Páginas/Rutas
│   │   ├── AuthHandler.jsx
│   │   └── PaginaStream.jsx
│   ├── data/              # Datos de ejemplo
│   │   └── feedStreams.js
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── .env                   # Variables de entorno (no subir a git)
├── .env.example           # Ejemplo de variables de entorno
├── vercel.json            # Configuración de Vercel
├── DEPLOYMENT.md          # Guía de despliegue
└── package.json
```

## 🔐 Configuración de Twitch

1. Ve a [Twitch Developer Console](https://dev.twitch.tv/console)
2. Crea una nueva aplicación
3. Configura el OAuth Redirect URL:
   - Desarrollo: `http://localhost:5173/auth/twitch`
   - Producción: `https://tu-app.vercel.app/auth/twitch`
4. Copia el Client ID y Client Secret
5. Configúralos en el backend

## 🎨 Personalización

### Cambiar Colores

Los colores principales están en `src/index.css` y en los componentes usando Tailwind:

- **Primario**: `cyan-400`, `cyan-500`, `cyan-600`
- **Secundario**: `blue-600`
- **Fondo**: `gray-900`, `gray-800`

### Agregar Nuevas Características

1. Crea un nuevo componente en `src/components/`
2. Importa y usa en `App.jsx` o en las páginas
3. Actualiza las rutas en `App.jsx` si es necesario

## 🐛 Solución de Problemas

### El backend no responde

- Verifica que el backend esté corriendo en el puerto 3001
- Revisa que `VITE_API_URL` apunte a la URL correcta

### Error de CORS

- Asegúrate de que el backend tenga configurado CORS
- Verifica que tu dominio esté en la lista de orígenes permitidos

### Las rutas no funcionan en producción

- Verifica que `vercel.json` o `_redirects` estén configurados
- Asegúrate de que React Router esté correctamente configurado

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue.

## 🙏 Agradecimientos

- [Twitch](https://www.twitch.tv/) por su API
- [Lucide](https://lucide.dev/) por los iconos
- [Tailwind CSS](https://tailwindcss.com/) por el framework de estilos
- [Vite](https://vitejs.dev/) por la herramienta de build

---

Hecho con ❤️ usando React y Vite
