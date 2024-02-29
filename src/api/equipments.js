import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class EquipmentService {
    static endpoint = '/bms/equipment/';

    // Obtiene todos los equipos
    static getEquipments(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }

    static getCategories() {
        return api.get(this.endpoint + 'listCatGetEq');
    }

    static getAllCategories() {
        return api.get(this.endpoint + 'listCat');
    }

    static getAllLocations() {
        return api.get(this.endpoint + 'listLoc');
    }

    static getEquipmentsByCategory(params) {
        return api.get(this.endpoint + 'listCatGetEq', { params });
    }

    // Obtiene todos los equipos
    static getEquipmentsByDate(params) {
        let date = params.date;
        // delete params.date

        return api.get('/bms/maintenancePlan/listByDate/' + date, {
            params
        })
    }

    // Obtiene todos los equipos
    static getDatesPerMonth(params) {
        return api.get('/bms/maintenancePlan/listByMonth/' + params)
    }


    static getEquipment(id) {
        return api.get(this.endpoint + 'get/' + id);
    }

    // Generar nuevo equipo
    static postEquipment(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    // Generar nuevos equipo desde un excel
    static postEquipmentsFromExcel(payload) {
        // console.log('ESTE ES MI PAYLOAD', payload)
        const formData = new FormData();
        formData.append('file', payload.file);
        return api.post(this.endpoint + 'createExl', formData);
    }

    // Actualizar nuevo equipo
    static updateEquipment(payload, id) {
        return api.put(this.endpoint + 'update/' + id, payload);
    }
}
