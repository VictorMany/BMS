import { api } from 'boot/axios'; // Asegúrate de que la ruta sea la correcta si estás importando el archivo desde otro lugar

export default class StatsService {
    static endpoint = 'http://3.20.181.72:3000/bms/statistic/';

    static getStats(params) {
        return api.get(this.endpoint + 'list', {
            params
        });
    }
}