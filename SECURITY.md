# 🔒 Guía de Seguridad - Mascotas Store

## Medidas de Seguridad Implementadas

### 1. Headers de Seguridad
- **X-Frame-Options**: Previene clickjacking
- **X-Content-Type-Options**: Previene MIME sniffing
- **X-XSS-Protection**: Protección contra XSS
- **Referrer-Policy**: Control de información de referrer
- **Permissions-Policy**: Restricción de permisos del navegador
- **Strict-Transport-Security**: Fuerza HTTPS

### 2. Content Security Policy (CSP)
```html
default-src 'self';
script-src 'self' 'unsafe-inline' https://wa.me;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
img-src 'self' data: https: blob:;
connect-src 'self' https://wa.me;
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self' https://wa.me tel:;
upgrade-insecure-requests;
```

### 3. Validación y Sanitización
- **Escape HTML**: Previene inyección XSS
- **Validación de formularios**: En tiempo real y al enviar
- **Rate Limiting**: Previene ataques de fuerza bruta
- **Sanitización de inputs**: Limpieza de datos de usuario

### 4. Protección de Archivos
- Archivos sensibles protegidos (.htaccess, .env, .git)
- Prevención de hotlinking de imágenes
- Límites de tamaño de archivo
- Timeouts de conexión

### 5. Configuración del Servidor

#### Apache (.htaccess)
- Headers de seguridad automáticos
- Redirección HTTPS forzada
- Protección de archivos sensibles
- Compresión segura

#### Nginx (nginx-security.conf)
- Configuración de seguridad completa
- Headers de seguridad
- Protección contra hotlinking
- Compresión y caché seguros

## Implementación

### 1. Para Apache
```bash
# Copiar .htaccess al directorio raíz del servidor
cp .htaccess /var/www/html/
```

### 2. Para Nginx
```bash
# Incluir configuración en el servidor
include /path/to/nginx-security.conf;
```

### 3. Verificación de Seguridad
```bash
# Verificar headers de seguridad
curl -I https://tudominio.com

# Verificar SSL
openssl s_client -connect tudominio.com:443
```

## Monitoreo de Seguridad

### 1. Logs a Revisar
- Intentos de acceso a archivos protegidos
- Múltiples intentos de envío de formularios
- Errores 403 y 404 frecuentes
- Patrones de tráfico anómalos

### 2. Alertas Recomendadas
- Más de 10 intentos fallidos en 15 minutos
- Acceso a archivos .env o .git
- Intentos de inyección SQL o XSS
- Tráfico desde IPs sospechosas

## Mejores Prácticas

### 1. Mantenimiento
- Actualizar dependencias regularmente
- Revisar logs de seguridad semanalmente
- Hacer backups seguros
- Monitorear métricas de rendimiento

### 2. Desarrollo
- Nunca exponer información sensible en el código
- Usar HTTPS en producción
- Validar todas las entradas del usuario
- Implementar logging de seguridad

### 3. Despliegue
- Usar certificados SSL válidos
- Configurar firewall apropiadamente
- Mantener el servidor actualizado
- Implementar backup automático

## Herramientas de Seguridad

### 1. Análisis de Vulnerabilidades
- OWASP ZAP
- Burp Suite
- Nessus
- Qualys

### 2. Monitoreo
- Google Search Console
- Cloudflare Security
- Sucuri
- Wordfence (si usas WordPress)

## Contacto de Seguridad

Para reportar vulnerabilidades de seguridad:
- Email: security@mascotasstore.com
- Respuesta: 24-48 horas
- Proceso: Coordinación responsable

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0
**Estado**: Activo
