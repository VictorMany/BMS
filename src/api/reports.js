import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = 'http://3.20.181.72:3000/bms/report/'; //http://3.20.181.72:3000/bms/Report/list

    // Obtiene todos los reportes
    static getReports(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }

    // Obtiene todos los reportes
    static getReport(id) {
        return api.get(this.endpoint + 'getById/' + id);
    }

    // Generar nuevo reporte
    static postReport(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    // Actualizar nuevo reporte
    static updateReport(payload, id) {
        return api.put(this.endpoint + 'update/' + id, payload);
    }
}