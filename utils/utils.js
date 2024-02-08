export const rules = {
    requiredString: (val) => (typeof val === 'string' && val.trim().length > 0) || 'El campo es obligatorio',
    requiredObject: (val) => (typeof val === 'object' && val !== null) || 'El campo es obligatorio',
    requiredNumber: (val) => (val !== undefined && val !== null) || 'El campo es obligatorio',
    numeric: (val) => !isNaN(val) || 'Ingresa un valor numérico',
    alpha: (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(val) || 'El campo solo debe contener letras',
    alphanumeric: (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val) || 'El campo solo debe contener letras y números',
    nonNegative: (val) => parseFloat(val) >= 0 || 'El costo debe ser mayor o igual a 0',
    maxDecimalPlaces: (val) => (val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 2) || 'El campo no debe tener más de dos decimales',
    validYear: (val) => /^\d{4}$/.test(val) || 'Debe ser un año válido (formato: YYYY)',
    validEmail: (val) => /\S+@\S+\.\S+/.test(val) || 'Formato de correo electrónico inválido',
    validPhoneNumber: (val) => /^\d{10}$/.test(val) || 'El número de teléfono debe tener 10 dígitos',
    maxLength(maxLength) {
        return (val) => (val.length <= maxLength) || `El campo no debe exceder ${maxLength} caracteres`;
    },
    pastYear: (val) => {
        const enteredYear = parseInt(val, 10);
        const currentYear = new Date().getFullYear();
        return (
            enteredYear <= currentYear ||
            'Debe ser un año anterior al año actual'
        );
    },
    requiredAutocomplete: (val) => {
        if (typeof val === 'string') {
            return val.trim().length > 0 || 'El campo es obligatorio';
        } else if (typeof val === 'object' && val !== null) {
            return val;
        } else {
            return 'El campo es obligatorio';
        }
    },
    futureDate: (val) => {
        const selectedDate = new Date(val);
        const currentDate = new Date();
        return selectedDate >= currentDate || 'La fecha de garantía no puede ser anterior a la fecha actual';
    }
};

export const showWarning = ($q, { msg, title, avatar }) => {
    $q.notify({
        message: title ? title : 'Ocurrió un error',
        caption: msg ? msg : 'Inténtalo de nuevo más tarde',
        classes: 'border-rounded alert-container',
        avatar: avatar ? avatar : '../src/assets/png/warning.png' // Utiliza la ruta relativa correcta
    });
};

export const showSuccess = ($q, { msg, title, avatar }) => {
    $q.notify({
        message: title ? title : 'Éxito al realizar la operación',
        caption: msg ? msg : 'La operación se realizó correctamente',
        classes: 'border-rounded alert-container',
        avatar: avatar ? avatar : '../src/assets/png/success.png' // Utiliza la ruta relativa correcta
    });
};

// Guardar el token en una cookie
export function saveTokenToCookie(token) {
    document.cookie = `token=${token}; path=/`;
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