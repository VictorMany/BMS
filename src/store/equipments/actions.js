import service from 'src/api/equipments'

export function getEquipmentsAction(context, params) {
    console.log('Llamando a getEquipmentsAction');
    return service.getEquipments(params).then(async (response) => {
        console.log(response)
        if (response.status == 200) {
            context.commit('MUTATE_EQUIPMENTS', response.data.contents)
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
            message: scope + ' successfully obtained',
            success
        }
    else
        return {
            message: 'An error occurred obtaining ' + scope.toLowerCase(),
            success
        }
}