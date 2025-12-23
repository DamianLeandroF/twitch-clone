# 🔧 Solución de Problemas - API en Producción

## ❌ Problema: No se cargan los datos de la API en producción

### 🔍 Diagnóstico

Abre la consola del navegador (F12) en tu sitio de producción y busca errores.

---

## ✅ Soluciones Paso a Paso

### **Solución 1: Configurar Variable de Entorno en Render**

1. Ve a [render.com](https://render.com) → Dashboard
2. Selecciona tu servicio `twitch-backend`
3. Ve a "Environment" en el menú lateral
4. **Agrega esta variable:**

   - **Key**: `FRONTEND_URL`
   - **Value**: `https://tu-app.vercel.app` (tu URL real de Vercel)

5. Click "Save Changes"
6. Render redesplegará automáticamente

---

### **Solución 2: Verificar Variables de Entorno en Render**

Asegúrate de tener TODAS estas variables configuradas:

```
TWITCH_CLIENT_ID=tu_client_id
TWITCH_CLIENT_SECRET=tu_client_secret
FRONTEND_URL=https://tu-app.vercel.app
PORT=3001
NODE_ENV=production
```

---

### **Solución 3: Verificar Variable de Entorno en Vercel**

1. Ve a [vercel.com](https://vercel.com) → Dashboard
2. Selecciona tu proyecto `twitch-clone`
3. Ve a "Settings" → "Environment Variables"
4. **Verifica que exista:**

   - **Name**: `VITE_API_URL`
   - **Value**: `https://tu-backend.onrender.com` (tu URL real de Render)

5. Si la cambiaste, **redespliega**:
   - Ve a "Deployments"
   - Click en los 3 puntos del último deployment
   - Click "Redeploy"

---

### **Solución 4: Verificar CORS en los Logs de Render**

1. Ve a Render → tu servicio → "Logs"
2. Busca mensajes como:

   ```
   Origen bloqueado por CORS: https://tu-app.vercel.app
   ```

3. Si ves esto, la variable `FRONTEND_URL` no está configurada correctamente

---

### **Solución 5: Verificar que el Backend esté Activo**

1. Abre en tu navegador:

   ```
   https://tu-backend.onrender.com/api/twitch/streams
   ```

2. **Deberías ver:**

   - Un JSON con streams, O
   - Un error de CORS (esto es normal desde el navegador)

3. **Si ves "Service Unavailable":**
   - El backend está "dormido" (Render Free Tier)
   - Espera 30-60 segundos y recarga

---

### **Solución 6: Verificar Credenciales de Twitch**

1. Ve a Render → Environment Variables
2. Verifica que `TWITCH_CLIENT_ID` y `TWITCH_CLIENT_SECRET` sean correctos
3. Ve a [dev.twitch.tv/console](https://dev.twitch.tv/console)
4. Verifica que las credenciales coincidan

---

### **Solución 7: Actualizar Redirect URI de Twitch**

1. Ve a [dev.twitch.tv/console](https://dev.twitch.tv/console)
2. Selecciona tu aplicación
3. En "OAuth Redirect URLs", asegúrate de tener:
   ```
   http://localhost:5173/auth/twitch
   https://tu-app.vercel.app/auth/twitch
   ```

---

## 🧪 Cómo Probar

### Test 1: Backend Directo

```bash
curl https://tu-backend.onrender.com/api/twitch/streams
```

**Resultado esperado:** JSON con streams

### Test 2: Desde la Consola del Navegador

En tu sitio de producción, abre la consola (F12) y ejecuta:

```javascript
fetch("https://tu-backend.onrender.com/api/twitch/streams")
  .then((r) => r.json())
  .then((data) => console.log("Streams:", data))
  .catch((err) => console.error("Error:", err));
```

---

## 📋 Checklist de Verificación

- [ ] Variable `FRONTEND_URL` configurada en Render
- [ ] Variable `VITE_API_URL` configurada en Vercel
- [ ] Ambas URLs son HTTPS (no HTTP)
- [ ] No hay errores de CORS en los logs de Render
- [ ] Backend responde en `/api/twitch/streams`
- [ ] Credenciales de Twitch correctas
- [ ] Redirect URIs actualizados en Twitch

---

## 🔄 Comandos para Redesplegar

### Backend (después de cambios)

```bash
cd twitch-backend
git add .
git commit -m "Fix production config"
git push
```

Render redesplegará automáticamente.

### Frontend (después de cambios en variables de entorno)

1. Ve a Vercel Dashboard
2. Deployments → último deployment → "Redeploy"

---

## 💡 Errores Comunes

### Error: "Failed to fetch"

**Causa:** La URL del backend es incorrecta
**Solución:** Verifica `VITE_API_URL` en Vercel

### Error: "CORS policy"

**Causa:** `FRONTEND_URL` no está configurada en Render
**Solución:** Agrega la variable de entorno en Render

### Error: "503 Service Unavailable"

**Causa:** El backend de Render está "dormido"
**Solución:** Espera 30-60 segundos, es normal en Free Tier

### Error: "401 Unauthorized"

**Causa:** Credenciales de Twitch incorrectas
**Solución:** Verifica las variables en Render

---

## 📞 ¿Aún no funciona?

1. **Revisa los logs de Render:**

   - Dashboard → tu servicio → "Logs"
   - Busca errores en rojo

2. **Revisa la consola del navegador:**

   - F12 → Console
   - Busca errores en rojo

3. **Comparte el error:**
   - Copia el mensaje de error completo
   - Incluye la URL de tu backend y frontend

---

## 🎯 URLs de Referencia

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Twitch Console**: https://dev.twitch.tv/console
