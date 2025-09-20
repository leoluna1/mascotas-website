# 🐕 Mascotas Store - Centro Veterinario Profesional

## 📋 Descripción
Centro veterinario profesional especializado en servicios de peluquería, grooming, consultas veterinarias y productos premium. Sucursales en Ibarra, Tulcán y Otavalo.

## 🚀 Despliegue en GitHub Pages

### Opción 1: GitHub Pages Automático
1. Sube tu código a GitHub
2. Ve a **Settings** → **Pages**
3. Selecciona **Source**: Deploy from a branch
4. Elige **Branch**: main
5. Guarda los cambios
6. Tu sitio estará disponible en: `https://tuusuario.github.io/mascotas`

### Opción 2: GitHub Pages con Actions
1. Crea el archivo `.github/workflows/deploy.yml`
2. Configura el despliegue automático
3. Cada commit actualizará el sitio automáticamente

## 🛠️ Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/mascotas.git
cd mascotas

# Ejecutar servidor local
python3 -m http.server 8000

# Abrir en navegador
open http://localhost:8000
```

## 📁 Estructura del Proyecto

```
mascotas/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos principales
├── js/
│   ├── main.js            # JavaScript principal
│   └── form-security.js   # Seguridad de formularios
├── pages/
│   ├── perros.html        # Página de perros
│   ├── gatos.html         # Página de gatos
│   ├── aves.html          # Página de aves
│   ├── otros.html         # Página de otros
│   ├── peces.html         # Página de peces
│   ├── citas.html         # Sistema de citas
│   ├── galeria.html       # Galería de trabajos
│   └── productos.html     # Tienda online
└── images/               # Imágenes del sitio
```

## 🔒 Características de Seguridad

- **Content Security Policy (CSP)**
- **Headers de seguridad**
- **Validación de formularios**
- **Protección XSS**
- **Rate limiting**

## 📱 Funcionalidades

- ✅ **5 categorías de mascotas** (Perros, Gatos, Aves, Otros, Peces)
- ✅ **Sistema de citas online**
- ✅ **Galería de trabajos**
- ✅ **Tienda de productos**
- ✅ **Integración WhatsApp**
- ✅ **Diseño responsive**
- ✅ **Seguridad web**

## 🎨 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsive
- **JavaScript ES6** - Interactividad
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografías

## 📞 Contacto

- **Teléfono**: 0999929069
- **Horario**: Lun-Vie 8AM-7PM
- **Emergencias**: 24/7
- **WhatsApp**: [Enviar mensaje](https://wa.me/593999929069)

## 📍 Sucursales

- **Ibarra**: Dirección principal
- **Tulcán**: Sucursal norte
- **Otavalo**: Sucursal sur

---

**© 2024 Mascotas Store. Todos los derechos reservados.**
