import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class UserService {
    static endpoint = '/bms/user/';

    // Obtiene todos los usuarios
    static getUsers(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }

    // Obtiene todos los usuarios
    static getUser(id) {
        if (Number(id)) return api.get(this.endpoint + 'get/' + id);
        else return api.get(this.endpoint + 'get');
    }

    // Generar nuevo usuario
    static postUser(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    // Actualizar nuevo usuario
    static updateUser(payload, id) {
        return api.put(this.endpoint + 'update/' + id, payload);
    }

    static updatePassword(payload) {
        return api.put(this.endpoint + 'updatePsw', payload);
    }

    // Login
    static login(payload) {
        return api.post(this.endpoint + 'login', payload);
    }
}