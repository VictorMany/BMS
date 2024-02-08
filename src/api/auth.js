import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export function setAuthHeader(token) {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
}