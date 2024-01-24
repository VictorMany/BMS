import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = 'http://3.20.181.72:3000/bms/maintenancePlan/';

    static postMaintenancePlan(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    static getMaintenancePlans(params) {
        return api.get(this.endpoint + 'listAll', {
            params
        });
    }

    static getMaintenancePlan(id) {
        return api.get(this.endpoint + 'getById/' + id);
    }

    // Actualizar nuevo maintenance plan
    static updateMaintenancePlan(payload, id) {
        return api.put(this.endpoint + 'update/' + id, payload);
    }
}

// // Generar nuevo equipo
// static postEquipment(payload) {
//     return api.post(this.endpoint + 'create', payload);
// }

// // Actualizar nuevo equipo
// static updateEquipment(payload, id) {
//     return api.put(this.endpoint + 'update/' + id, payload);
// }
