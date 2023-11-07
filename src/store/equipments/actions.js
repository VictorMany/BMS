import service from 'src/api/equipments'

export function getEquipmentsAction(context) {
    return service.getEquipments().then(async (response) => {
        console.log(response)
        if (response.status == 200) {
            context.commit('MUTATE_EQUIPMENTS', response.data.equipments)
            return manageResponse('Equipos', true)
        }
        else {
            return manageResponse('Equipos', false)
        }
    })
}

const manageResponse = (scope, success) => {
    if (success)
        return {
            message: scope + ' obtenidos éxitosamente',
            success
        }
    else
        return {
            message: 'Ocurrió un error obteniendo ' + scope.toLowerCase(),
            success
        }
}