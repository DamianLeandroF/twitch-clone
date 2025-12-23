# 🚀 Guía de Despliegue - Twitch Clone

Esta guía te ayudará a desplegar tu aplicación Twitch Clone en producción.

## 📋 Tabla de Contenidos

1. [Preparación](#preparación)
2. [Despliegue del Backend](#despliegue-del-backend)
3. [Despliegue del Frontend](#despliegue-del-frontend)
4. [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
5. [Opciones de Hosting](#opciones-de-hosting)

---

## 🔧 Preparación

### 1. Verificar que todo funcione localmente

```bash
# En el directorio del backend
cd twitch-backend
npm install
node server.js

# En el directorio del frontend (otra terminal)
cd twitch-clone
npm install
npm run dev
```

### 2. Crear archivos de configuración

Asegúrate de tener los siguientes archivos:

**Frontend (`twitch-clone/.env`):**

```env
VITE_API_URL=http://localhost:3001
```

**Backend (`twitch-backend/.env`):**

```env
TWITCH_CLIENT_ID=tu_client_id
TWITCH_CLIENT_SECRET=tu_client_secret
PORT=3001
```

---

## 🌐 Despliegue del Backend

### Opción 1: Render.com (Recomendado - GRATIS)

#### Paso 1: Preparar el Backend

1. Crea un archivo `package.json` en `twitch-backend` si no existe:

```json
{
  "name": "twitch-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2"
  }
}
```

2. Asegúrate de que `server.js` use el puerto de la variable de entorno:

```javascript
const PORT = process.env.PORT || 3001;
```

#### Paso 2: Subir a GitHub

```bash
cd twitch-backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/twitch-backend.git
git push -u origin main
```

#### Paso 3: Desplegar en Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura:

   - **Name**: `twitch-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

5. Agrega las variables de entorno:

   - `TWITCH_CLIENT_ID`: tu client ID
   - `TWITCH_CLIENT_SECRET`: tu client secret
   - `PORT`: 3001 (opcional, Render lo asigna automáticamente)

6. Click en "Create Web Service"

7. **Copia la URL** que te da Render (ej: `https://twitch-backend-xxxx.onrender.com`)

### Opción 2: Railway.app (GRATIS con límites)

1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno
4. Despliega automáticamente

### Opción 3: Vercel (Solo para APIs serverless)

No recomendado para este proyecto ya que usa Express tradicional.

---

## 🎨 Despliegue del Frontend

### Opción 1: Vercel (Recomendado - GRATIS)

#### Paso 1: Actualizar variables de entorno

Crea `twitch-clone/.env.production`:

```env
VITE_API_URL=https://tu-backend-url.onrender.com
```

#### Paso 2: Subir a GitHub

```bash
cd twitch-clone
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/twitch-clone.git
git push -u origin main
```

#### Paso 3: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Click en "Add New..." → "Project"
3. Importa tu repositorio de GitHub
4. Configura:

   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Agrega las variables de entorno:

   - **Name**: `VITE_API_URL`
   - **Value**: `https://tu-backend-url.onrender.com`

6. Click en "Deploy"

7. **Copia la URL** de tu aplicación (ej: `https://twitch-clone.vercel.app`)

### Opción 2: Netlify (GRATIS)

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist` después de hacer `npm run build`
3. O conecta tu repositorio de GitHub
4. Configura las variables de entorno en Settings → Environment variables

### Opción 3: GitHub Pages (GRATIS pero requiere configuración adicional)

Requiere configuración de rutas para React Router.

---

## 🔐 Configuración de Variables de Entorno

### Frontend (Vite)

Las variables deben empezar con `VITE_`:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

### Backend (Node.js)

```env
TWITCH_CLIENT_ID=tu_client_id_aqui
TWITCH_CLIENT_SECRET=tu_client_secret_aqui
PORT=3001
NODE_ENV=production
```

---

## 📝 Checklist de Despliegue

### Backend

- [ ] Código subido a GitHub
- [ ] Variables de entorno configuradas en Render
- [ ] Servicio desplegado y funcionando
- [ ] URL del backend copiada

### Frontend

- [ ] Variable `VITE_API_URL` actualizada con la URL del backend
- [ ] Código subido a GitHub
- [ ] Variables de entorno configuradas en Vercel
- [ ] Aplicación desplegada
- [ ] Probado en producción

### Configuración de Twitch

- [ ] Redirect URI actualizado en Twitch Developer Console
  - Agregar: `https://tu-app.vercel.app/auth/twitch`
- [ ] CORS configurado en el backend para permitir tu dominio de frontend

---

## 🔄 Actualizar el Backend para CORS en Producción

Actualiza `server.js` para permitir tu dominio de frontend:

```javascript
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://tu-app.vercel.app", // Agrega tu dominio de Vercel
  ],
  credentials: true,
};

app.use(cors(corsOptions));
```

---

## 🎯 Actualizar Twitch Developer Console

1. Ve a [dev.twitch.tv/console](https://dev.twitch.tv/console)
2. Selecciona tu aplicación
3. En "OAuth Redirect URLs", agrega:
   - `https://tu-app.vercel.app/auth/twitch`
4. Guarda los cambios

---

## 🐛 Solución de Problemas

### Error de CORS

- Verifica que el backend tenga configurado CORS correctamente
- Asegúrate de que la URL del frontend esté en la lista de orígenes permitidos

### Variables de entorno no funcionan

- En Vite, las variables deben empezar con `VITE_`
- Reinicia el servidor después de cambiar `.env`
- En producción, configura las variables en el panel de tu hosting

### Error 404 en rutas

- Configura redirects en Vercel/Netlify para React Router
- Vercel: crea `vercel.json` con rewrites
- Netlify: crea `_redirects` en la carpeta `public`

---

## 📊 Monitoreo

### Logs del Backend (Render)

1. Ve a tu servicio en Render
2. Click en "Logs" para ver los logs en tiempo real

### Logs del Frontend (Vercel)

1. Ve a tu proyecto en Vercel
2. Click en "Deployments" → selecciona un deployment → "View Function Logs"

---

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando en:

- **Frontend**: `https://tu-app.vercel.app`
- **Backend**: `https://tu-backend.onrender.com`

### Próximos Pasos

- Configura un dominio personalizado
- Agrega analytics (Google Analytics, Vercel Analytics)
- Configura CI/CD para despliegues automáticos
- Implementa monitoreo de errores (Sentry)

---

## 💡 Consejos Adicionales

1. **Render Free Tier**: El servicio se "duerme" después de 15 minutos de inactividad. La primera petición puede tardar 30-60 segundos.

2. **Vercel**: Despliega automáticamente cada vez que haces push a GitHub.

3. **Variables de Entorno**: Nunca subas archivos `.env` a GitHub. Usa `.env.example` como plantilla.

4. **Dominios**: Tanto Vercel como Render permiten dominios personalizados gratis.

---

¿Necesitas ayuda? Revisa la documentación oficial:

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
