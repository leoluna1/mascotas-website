# 🚀 Guía de Despliegue - Mascotas Store

## 📋 Pasos para Desplegar en GitHub Pages

### 1. Preparar el Repositorio

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: Mascotas Store website"

# Conectar con GitHub (reemplaza con tu repositorio)
git remote add origin https://github.com/TUUSUARIO/mascotas.git

# Subir al repositorio
git push -u origin main
```

### 2. Configurar GitHub Pages

1. **Ve a tu repositorio en GitHub**
2. **Clic en "Settings"** (Configuración)
3. **Scroll hasta "Pages"** en el menú lateral
4. **En "Source"** selecciona: **"Deploy from a branch"**
5. **En "Branch"** selecciona: **"main"**
6. **En "Folder"** selecciona: **"/ (root)"**
7. **Clic en "Save"**

### 3. Esperar el Despliegue

- GitHub tardará **2-10 minutos** en desplegar
- Verás un mensaje verde cuando esté listo
- Tu sitio estará disponible en: `https://TUUSUARIO.github.io/mascotas`

### 4. Verificar el Sitio

Una vez desplegado, puedes:
- ✅ **Compartir el enlace** con clientes
- ✅ **Acceder desde cualquier dispositivo**
- ✅ **No necesitas ejecutar python3**
- ✅ **Actualizaciones automáticas** con cada commit

## 🔄 Actualizaciones Automáticas

Cada vez que hagas cambios:

```bash
# Hacer cambios en tu código
# Luego:

git add .
git commit -m "Descripción de los cambios"
git push origin main
```

**GitHub Pages actualizará automáticamente el sitio** en 2-10 minutos.

## 🌐 URLs del Sitio

- **Página principal**: `https://TUUSUARIO.github.io/mascotas/`
- **Perros**: `https://TUUSUARIO.github.io/mascotas/pages/perros.html`
- **Gatos**: `https://TUUSUARIO.github.io/mascotas/pages/gatos.html`
- **Aves**: `https://TUUSUARIO.github.io/mascotas/pages/aves.html`
- **Otros**: `https://TUUSUARIO.github.io/mascotas/pages/otros.html`
- **Peces**: `https://TUUSUARIO.github.io/mascotas/pages/peces.html`
- **Citas**: `https://TUUSUARIO.github.io/mascotas/pages/citas.html`
- **Galería**: `https://TUUSUARIO.github.io/mascotas/pages/galeria.html`
- **Productos**: `https://TUUSUARIO.github.io/mascotas/pages/productos.html`

## 🛠️ Configuración Adicional

### Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. **Crea un archivo `CNAME`** en la raíz del proyecto
2. **Agrega tu dominio**: `tudominio.com`
3. **Configura DNS** en tu proveedor de dominio
4. **Apunta a**: `TUUSUARIO.github.io`

### Configuración HTTPS

GitHub Pages incluye **HTTPS automático** y **certificados SSL gratuitos**.

## 📱 Ventajas de GitHub Pages

- ✅ **Gratuito** para repositorios públicos
- ✅ **HTTPS automático**
- ✅ **CDN global** (carga rápida)
- ✅ **Actualizaciones automáticas**
- ✅ **Sin necesidad de servidor**
- ✅ **Fácil de compartir**
- ✅ **Profesional**

## 🚨 Solución de Problemas

### Si el sitio no carga:
1. **Verifica** que el repositorio sea público
2. **Espera** 10-15 minutos para el primer despliegue
3. **Verifica** la configuración en Settings → Pages
4. **Revisa** los logs en Actions

### Si hay errores 404:
1. **Verifica** que todos los archivos estén en el repositorio
2. **Revisa** las rutas en los enlaces
3. **Asegúrate** de que `index.html` esté en la raíz

---

**¡Tu sitio web estará disponible 24/7 sin necesidad de ejecutar comandos!** 🌐✨
