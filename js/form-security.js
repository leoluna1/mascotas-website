// =====================================================
// VALIDACIÓN Y SEGURIDAD DE FORMULARIOS
// =====================================================

class FormSecurity {
    constructor() {
        this.rateLimitMap = new Map();
        this.maxAttempts = 5;
        this.timeWindow = 15 * 60 * 1000; // 15 minutos
    }

    // Validar formulario completo
    validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea, select');
        let isValid = true;
        const errors = [];

        inputs.forEach(input => {
            const validation = this.validateField(input);
            if (!validation.isValid) {
                isValid = false;
                errors.push({
                    field: input.name || input.id,
                    message: validation.message
                });
                this.showFieldError(input, validation.message);
            } else {
                this.clearFieldError(input);
            }
        });

        return { isValid, errors };
    }

    // Validar campo individual
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name || field.id;

        // Validaciones básicas
        if (field.hasAttribute('required') && !value) {
            return { isValid: false, message: 'Este campo es obligatorio' };
        }

        // Validaciones por tipo
        switch (type) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    return { isValid: false, message: 'Email inválido' };
                }
                break;
            case 'tel':
                if (value && !this.isValidPhone(value)) {
                    return { isValid: false, message: 'Teléfono inválido' };
                }
                break;
            case 'text':
                if (value && !this.isValidText(value, name)) {
                    return { isValid: false, message: 'Texto inválido' };
                }
                break;
        }

        // Validación de longitud
        if (value.length > this.getMaxLength(field)) {
            return { isValid: false, message: `Máximo ${this.getMaxLength(field)} caracteres` };
        }

        return { isValid: true };
    }

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length <= 254;
    }

    // Validar teléfono
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
        return phoneRegex.test(phone);
    }

    // Validar texto
    isValidText(text, fieldName) {
        // Prevenir scripts maliciosos
        if (/<script|javascript:|on\w+\s*=/i.test(text)) {
            return false;
        }

        // Validaciones específicas por campo
        if (fieldName.includes('name') || fieldName.includes('nombre')) {
            return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(text);
        }

        return text.length >= 2 && text.length <= 1000;
    }

    // Obtener longitud máxima
    getMaxLength(field) {
        return field.maxLength || (field.type === 'email' ? 254 : 1000);
    }

    // Mostrar error en campo
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 5px;
            display: block;
        `;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#e74c3c';
    }

    // Limpiar error de campo
    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    // Rate limiting
    checkRateLimit(identifier) {
        const now = Date.now();
        const attempts = this.rateLimitMap.get(identifier) || [];
        
        // Limpiar intentos antiguos
        const recentAttempts = attempts.filter(time => now - time < this.timeWindow);
        
        if (recentAttempts.length >= this.maxAttempts) {
            return { allowed: false, message: 'Demasiados intentos. Intenta más tarde.' };
        }
        
        recentAttempts.push(now);
        this.rateLimitMap.set(identifier, recentAttempts);
        
        return { allowed: true };
    }

    // Sanitizar datos del formulario
    sanitizeFormData(formData) {
        const sanitized = {};
        
        for (const [key, value] of formData.entries()) {
            if (typeof value === 'string') {
                sanitized[key] = SecurityUtils.escapeHTML(value.trim());
            } else {
                sanitized[key] = value;
            }
        }
        
        return sanitized;
    }

    // Validar y enviar formulario
    async submitForm(formElement, submitCallback) {
        const identifier = this.getFormIdentifier(formElement);
        
        // Verificar rate limiting
        const rateLimitCheck = this.checkRateLimit(identifier);
        if (!rateLimitCheck.allowed) {
            this.showNotification(rateLimitCheck.message, 'error');
            return false;
        }

        // Validar formulario
        const validation = this.validateForm(formElement);
        if (!validation.isValid) {
            this.showNotification('Por favor corrige los errores en el formulario', 'error');
            return false;
        }

        // Sanitizar datos
        const formData = new FormData(formElement);
        const sanitizedData = this.sanitizeFormData(formData);

        try {
            await submitCallback(sanitizedData);
            return true;
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            this.showNotification('Error al enviar el formulario', 'error');
            return false;
        }
    }

    // Obtener identificador único del formulario
    getFormIdentifier(formElement) {
        return formElement.id || formElement.className || 'default';
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Inicializar seguridad de formularios
const formSecurity = new FormSecurity();

// Aplicar validación en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                formSecurity.validateField(this);
            });
        });

        // Prevenir envío si hay errores
        form.addEventListener('submit', function(e) {
            const validation = formSecurity.validateForm(this);
            if (!validation.isValid) {
                e.preventDefault();
                formSecurity.showNotification('Por favor corrige los errores antes de enviar', 'error');
            }
        });
    });
});
