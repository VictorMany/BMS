import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = 'http://3.20.181.72:3000/bms/equipment/';

    // Obtiene todos los equipos
    static getEquipmentsByDate(params) {
        return api.get('http://3.20.181.72:3000/bms/maintenancePlan/listByDate', {
            params
        });
    }

    static getMaintenancePlan(id) {
        return api.get(this.endpoint + 'get/' + id);
    }

    // Generar nuevo equipo
    static postEquipment(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    // Actualizar nuevo equipo
    static updateEquipment(payload, id) {
        return api.put(this.endpoint + 'update/' + id, payload);
    }
}