import service from 'src/api/equipments'

export async function getEquipmentsAction(context, params) {
    return service.getEquipments(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_EQUIPMENTS', response.data.contents.equipments)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        }
        else {
            return response
        }
    })
}

export async function getEquipmentAction(context, params) {
    return service.getEquipment(params.id).then(async (response) => {
        if (response.status == 200) {
            // We call the global action to format our payload
            context.commit('MUTATE_EQUIPMENT', response.data.contents.equipment)
            const payload = await context.dispatch('global/formatDetails', {
                keys: response.data.contents.equipment,
                fields: params.fields
            }, { root: true });

            return payload
        } else {
            return response
        }
    })
}

export async function getCategoriesAction(context) {
    return service.getCategories().then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_CATEGORIES', response.data.contents.categories);
            return true
        } else {
            return response
        }
    })
}

export async function updateCategories(context, val) {
    context.commit('MUTATE_CATEGORIES', val);
}

export async function getEquipmentsByCategoryAction(context, params) {
    return service.getEquipmentsByCategory(params).then(async (response) => {
        if (response.status == 200) {
            return response.data.contents.equipments;
        } else {
            return response
        }
    })
}

export async function getEquipmentsByDateAction(context, params) {
    return service.getEquipmentsByDate(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_EQUIPMENTS', response.data.contents.equipment)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        }
        else {
            return response
        }
    })
}

export async function getDatesPerMonthAction(context, params) {
    return service.getDatesPerMonth(params).then(async (response) => {
        if (response.status == 200) {
            return response.data.contents.dates
        }
        else {
            return response
        }
    })
}

export async function postEquipmentAction(context, equipment) {
    // Those are the keys you need in your payload and find in the fields
    let keys = {
        equipmentBrand: '',
        equipmentModel: '',
        equipmentName: '',
        CategoryId: '',
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

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        fields: equipment
    }, { root: true });

    return await service.postEquipment(payload).then(async (response) => {
        if (response.status == 201) {
            // context.commit('ADD_EQUIPMENT', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}

export async function updateEquipmentAction(context, equipment) {
    // Those are the keys you need in your payload and find in the fields
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

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        fields: equipment
    }, { root: true });

    return await service.updateEquipment(payload, equipment.id).then(async (response) => {
        if (response.status == 200) {
            return true
        } else {
            return response
        }
    })
}