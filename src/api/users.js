import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = 'http://localhost:3000/bms/user/'; //http://3.20.181.72:3000/bms/user/list

    // Obtiene todos los usuarios
    static getUsers(params) {
        return api.get(this.endpoint + 'list', {
            params
        }); // Utiliza $api para realizar la petición
    }

    // Generar nuevo usuario
    static postUser(payload) {
        return api.post(this.endpoint + 'create', payload);
    }
}