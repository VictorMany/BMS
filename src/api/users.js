import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = 'http://3.20.181.72:3000/bms/user/'; //http://3.20.181.72:3000/bms/user/list

    // Obtiene todos los usuarios
    static getUsers(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }

    // Obtiene todos los usuarios
    static getUser(id) {
        return api.get(this.endpoint + 'get/' + id);
    }

    // Generar nuevo usuario
    static postUser(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    // Actualizar nuevo usuario
    static updateUser(payload, id) {
        return api.put(this.endpoint + 'update/' + id, payload);
    }

    // Login
    static login(payload) {
        return api.post(this.endpoint + 'login', payload);
    }
}