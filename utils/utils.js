const warning = new URL('../src/assets/png/warning.png', import.meta.url).href;
const success = new URL('../src/assets/png/success.png', import.meta.url).href;

export const rules = {
    // Reglas de validación para campos requeridos
    requiredString: (val) => (typeof val === 'string' && val.trim().length > 0) || 'El campo es obligatorio',
    requiredObject: (val) => (typeof val === 'object' && val !== null) || 'El campo es obligatorio',
    requiredNumber: (val) => (val !== undefined && val !== null) || 'El campo es obligatorio',

    // Reglas de validación para contenido alfabético y alfanumérico
    alpha: (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(val) || 'El campo solo debe contener letras',
    alphanumeric: (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val) || 'El campo solo debe contener letras y números',

    // Reglas de validación para números
    nonNegative: (val) => parseFloat(val) >= 0 || 'El costo debe ser mayor o igual a 0',
    maxDecimalPlaces: (val) => (val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 2) || 'El campo no debe tener más de dos decimales',

    // Reglas de validación para años
    validYear: (val) => /^\d{4}$/.test(val) || 'Debe ser un año válido (formato: YYYY)',
    validateYearNotGreaterThanCurrent: (val) => parseInt(val) <= new Date().getFullYear() || 'El año no puede ser mayor al actual',
    validateYearNotLessThan100YearsAgo: (val) => parseInt(val) >= new Date().getFullYear() - 100 || 'El año no puede ser menor a 100 años antes del actual',

    // Reglas de validación para correo electrónico y número de teléfono
    validEmail: (val) => /\S+@\S+\.\S+/.test(val) || 'Formato de correo electrónico inválido',
    validPhoneNumber: (val) => /^\d{10}$/.test(val) || 'El número de teléfono debe tener 10 dígitos',

    // Reglas de validación adicionales
    numeric: (val) => !isNaN(val) || 'Ingresa un valor numérico',
    maxLength: (maxLength) => (val) => (val !== undefined && val !== null) ? (val.length <= maxLength) || `El campo no debe exceder ${maxLength} caracteres` : true,
    adultAge: (val) => new Date(val) <= new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()) || 'Debes ser mayor de edad para continuar',
    pastYear: (val) => parseInt(val) <= new Date().getFullYear() || 'Debe ser un año anterior al año actual',
    requiredAutocomplete: (val) => (typeof val === 'string' && /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val.trim())) || (typeof val === 'object' && val !== null) || 'El campo es obligatorio',
    futureDate: (val) => new Date(val) >= new Date() || 'La fecha de garantía no puede ser anterior a la fecha actual'
};


export const showWarning = ($q, { msg, title, avatar }) => {
    $q.notify({
        message: title ? title : 'Ocurrió un error',
        caption: msg ? msg : 'Inténtalo de nuevo más tarde',
        classes: 'border-rounded alert-container',
        avatar: avatar ? avatar : warning // Utiliza la ruta relativa correcta
    });
};

export const showSuccess = ($q, { msg, title, avatar }) => {
    $q.notify({
        message: title ? title : 'Éxito al realizar la operación',
        caption: msg ? msg : 'La operación se realizó correctamente',
        classes: 'border-rounded alert-container',
        avatar: avatar ? avatar : success // Utiliza la ruta relativa correcta
    });
};

// Guardar el token en una cookie
export function saveTokenToCookie(token) {
    document.cookie = `token=${token}; path=/`;
}

// Método para borrar la cookie de token
export function deleteTokenCookie() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Obtener el token de la cookie
export function getTokenFromCookie() {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            return value;
        }
    }
    return null;
}
