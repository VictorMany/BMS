import service from 'src/api/equipments'

export async function getEquipmentsAction(context, params) {
    return service.getEquipments(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_EQUIPMENTS', response.data.contents.equipments)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return manageResponse('Obtener equipos', true)
        }
        else {
            return manageResponse('Equipos', false)
        }
    })
}

export async function getEquipmentAction(context, params) {
    return service.getEquipment(params.id).then(async (response) => {
        if (response.status == 200) {
            // We call the global action to format our payload
            const payload = await context.dispatch('global/formatTextfields', {
                keys: response.data.contents.equipment,
                textfields: params.textfields
            }, { root: true });
            return payload
        } else {
            return manageResponse('Obtener equipo', false)
        }
    })
}

export async function postEquipmentAction(context, equipment) {
    // Those are the keys you need in your payload and find in the textfields
    let keys = {
        equipmentBrand: '',
        equipmentModel: '',
        equipmentName: '',
        equipmentStatus: '',
        location: '',
        manufacturingYear: '',
        observations: '',
        price: '',
        provider: '',
        serialNumber: '',
        trackingNumber: '',
        warrantyDate: '',
        photo: ''
    }

    // the textfields are the equipment

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        textfields: equipment
    }, { root: true });

    return await service.postEquipment(payload).then(async (response) => {
        try {
            if (response.status == 201) {
                context.commit('ADD_EQUIPMENT', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
                return manageResponse('Añadir equipo', true)
            } else {
                return manageResponse('Añadir equipo', false)
            }
        } catch (error) {
            return manageResponse(error, false)
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