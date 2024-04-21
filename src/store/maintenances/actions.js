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
        file: ''
    }

    // We call the global action to format our payload
    let payload = await context.dispatch('global/formatPayload', {
        keys,
        fields: maintenance
    }, { root: true });

    if (maintenance.reportRelated) {
        payload.append('reportRelated', maintenance.reportRelated)
    }

    return await service.postMaintenance(payload).then(async (response) => {
        if (response.status == 201) {
            context.commit('ADD_MAINTENANCE', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}

export async function uploadFileAction(context, payload) {
    const fd = new FormData()
    fd.append('file', payload.file)

    const idMaintenance = payload.id

    return await service.uploadFile(fd, idMaintenance).then(async (response) => {
        if (response.status == 200) {
            // context.commit('ADD_MAINTENANCE', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}

