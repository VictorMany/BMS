import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = 'http://3.20.181.72:3000/bms/maintenance/';

    // Obtiene todos los equipos
    static getMaintenances(params) {
        return api.get(this.endpoint + 'list', {
            params
        }); // Utiliza $api para realizar la petición
    }
}