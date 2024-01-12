import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = 'http://3.20.181.72:3000/bms/maintenance/'; //http://3.20.181.72:3000/bms/Maintenance/list

    // Obtiene todos los usuarios
    static getMaintenances(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }

    // Obtiene todos los usuarios
    static getMaintenance(id) {
        return api.get(this.endpoint + 'getBy/' + id);
    }

    // Generar nuevo usuario
    static postMaintenance(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    // Actualizar nuevo usuario
    static updateMaintenance(payload, id) {
        return api.put(this.endpoint + 'update/' + id, payload);
    }
}