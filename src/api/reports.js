import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class ReportService {
    static endpoint = '/bms/report/';

    // Obtiene todos los reportes
    static getReports(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }

    // Cancelar reporte por id
    static cancelReport(params) {
        console.log(params)
        return api.put(this.endpoint + 'deactivate/' + params);
    }


    // Obtiene todos los reportes
    static getReportsByEquipment(params) {
        let id = params.id;
        delete params.id

        return api.get(this.endpoint + 'getBy/' + id, {
            params
        });
    }


    // Obtiene todos los reportes
    static getReportsByUser(params) {
        let id = params.id;
        delete params.id

        return api.get(this.endpoint + 'getByUsr/' + id, {
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
    static updateReport(report) {
        return api.put(this.endpoint + 'deactivate/' + report.idReport + '/' + report.idUser);
    }
}