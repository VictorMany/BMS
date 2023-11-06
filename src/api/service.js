export default class service {
    static endpoint = 'http://3.20.181.72:3000/bms/equipments';

    //Obtiene todos los equipos
    static getEquipments() {
        return this.$axios.get(
            service.endpoint
        );
    }

}