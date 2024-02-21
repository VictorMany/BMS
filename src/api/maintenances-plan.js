import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class MaintenancePlanService {
    static endpoint = '/bms/maintenancePlan/';

    static postMaintenancePlan(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    static deleteMaintenancePlan(payload) {
        return api.delete(this.endpoint + 'delete/' + payload);
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
