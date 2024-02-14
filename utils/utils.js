const warning = new URL('../src/assets/png/warning.png', import.meta.url).href;
const success = new URL('../src/assets/png/success.png', import.meta.url).href;

export const rules = {
    requiredString: (val) => (typeof val === 'string' && val.trim().length > 0) || 'El campo es obligatorio',
    requiredObject: (val) => (typeof val === 'object' && val !== null) || 'El campo es obligatorio',
    requiredNumber: (val) => (val !== undefined && val !== null) || 'El campo es obligatorio',
    alpha: (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(val) || 'El campo solo debe contener letras',
    alphanumeric: (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val) || 'El campo solo debe contener letras y números',
    nonNegative: (val) => parseFloat(val) >= 0 || 'El costo debe ser mayor o igual a 0',
    maxDecimalPlaces: (val) => (val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 2) || 'El campo no debe tener más de dos decimales',
    validYear: (val) => /^\d{4}$/.test(val) || 'Debe ser un año válido (formato: YYYY)',
    validEmail: (val) => /\S+@\S+\.\S+/.test(val) || 'Formato de correo electrónico inválido',
    validPhoneNumber: (val) => /^\d{10}$/.test(val) || 'El número de teléfono debe tener 10 dígitos',
    numeric: (val) => {
        if (isNaN(val)) {
            return 'Ingresa un valor numérico';
        } else if (/\d+e\d+/i.test(val)) {
            return 'No se aceptan números en formato exponencial';
        } else {
            return true;
        }
    },
    maxLength(maxLength) {
        return (val) => (val.length <= maxLength) || `El campo no debe exceder ${maxLength} caracteres`;
    },
    adultAge: (val) => {
        const currentDate = new Date();
        const birthDate = new Date(val);
        const minAdultDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

        return birthDate <= minAdultDate || 'Debes ser mayor de edad para continuar';
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
            if (/^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val)) {
                return val.trim().length > 0 || 'El campo es obligatorio';
            } else {
                return 'El campo solo debe contener letras y números';
            }
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
