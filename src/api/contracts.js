import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class ServiceContractService {
    static endpoint = '/bms/contract/';


    static postContract(payload) {
        return api.post(this.endpoint + 'create', payload);
    }

    static deleteContract(payload) {
        return api.delete(this.endpoint + 'delete/' + payload);
    }

    static getContracts(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }

    static getContract(id) {
        return api.get(this.endpoint + 'getById/' + id);
    }

    // Actualizar nuevo contrato de servicio
    static updateContract(payload, id) {
        return api.put(this.endpoint + 'update/' + id, payload);
    }
}
