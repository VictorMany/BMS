import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class MaintenanceService {
    static endpoint = '/bms/maintenance/';

    static getMaintenances(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }

    static getMaintenance(id) {
        return api.get(this.endpoint + 'getById/' + id);
    }

    static postMaintenance(payload) {
        console.log('EL PAYLOAD EN EL ENDPOINT', payload)
        return api.post(this.endpoint + 'create', payload);
    }

    // Obtiene todos los reportes
    static getMaintenancesByEquipment(params) {
        let id = params.id;
        delete params.id

        return api.get(this.endpoint + 'getBy/' + id, {
            params
        });
    }
    // Obtiene todos los reportes
    static getMaintenancesByUser(params) {
        let id = params.id;
        delete params.id

        return api.get(this.endpoint + 'getByUsrId/' + id, {
            params
        });
    }
}