import service from 'src/api/maintenances'

export async function getMaintenancesAction(context, params) {
    return service.getMaintenances(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_MAINTENANCES', response.data.contents.maintenances)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        } else {
            return response
        }
    })
}

export async function getMaintenancesPlanAction(context, params) {
    return service.getMaintenancesPlan(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_MAINTENANCES_PLAN', response.data.contents.maintenances)
            context.commit('MUTATE_DETAILS_PLAN', response.data.contents)
            return true
        } else {
            return response
        }
    })
}

export async function getMaintenanceAction(context, params) {
    return service.getMaintenance(params.id).then(async (response) => {
        if (response.status == 200) {
            // We call the global action to format our payload
            const payload = await context.dispatch('global/formatDetails', {
                keys: response.data.contents.maintenance,
                fields: params.fields
            }, { root: true });
            return payload
        } else {
            return response
        }
    })
}

export async function getMaintenancesByEquipmentAction(context, params) {
    return service.getMaintenancesByEquipment(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_MAINTENANCES', response.data.contents.maintenances)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        } else {
            return response
        }
    })
}

export async function getMaintenancesByUserAction(context, params) {
    return service.getMaintenancesByUser(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_MAINTENANCES', response.data.contents.maintenances)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        } else {
            return response
        }
    })
}

export async function postMaintenanceAction(context, maintenance) {
    // Those are the keys you need in your payload and find in the fields
    let keys = {
        // MaintenanceId: '',
        maintenanceType: '',
        reason: '',
        cost: '',
        observations: '',
        tools: '',
        materials: '',
        reportRelated: '',
        idEquipment: '',
        userId: '',
    }

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        fields: maintenance
    }, { root: true });

    return await service.postMaintenance(payload).then(async (response) => {
        if (response.status == 200) {
            context.commit('ADD_MAINTENANCE', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}


export async function postMaintenancePlanAction(context, plan) {
    // We call the global action to format our payload
    const payload = {
        planName: plan.planName,
        observations: plan.observations,
        userId: 1,
        equipmentIds: plan.equipmentIds,
        maintenanceDates: plan.maintenanceDates
    }

    return await service.postMaintenancePlan(payload).then(async (response) => {
        if (response.status == 200) {
            // context.commit('ADD_MAINTENANCE', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}