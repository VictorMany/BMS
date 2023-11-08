import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = 'http://3.20.181.72:3000/bms/';

    // Obtiene todos los usuarios
    static getUsers() {
        return api.get(this.endpoint + 'users'); // Utiliza $api para realizar la petición
    }
}