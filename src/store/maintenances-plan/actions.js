import service from 'src/api/maintenances-plan'
import { formatDate } from '../global/actions';

export async function getMaintenancePlansAction(context, params) {
    return service.getMaintenancePlans(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_MAINTENANCES_PLAN', response.data.contents.maintenancePlans)
            context.commit('MUTATE_DETAILS', response.data.contents)

            let obj = response.data.contents;
            obj.rowsNumber = obj.maintenancePlans.length
            delete obj.reports

            return obj
        } else {
            return response
        }
    })
}

export async function getMaintenancePlanAction(context, params) {
    return service.getMaintenancePlan(params.id).then(async (response) => {
        if (response.status == 200) {
            // We call the global action to format our payload
            let res = response.data.contents.maintenancePlan
            const payload = {
                observations: res.observations,
                planName: res.planName,
                maintenanceDates: res.MaintenancePlanDates,
                equipments: res.Equipment,
                equipmentIds: res.equipmentIds,
                createdAt: formatDate(res.createdAt),
                id: res.PlanId
            }
            return payload
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

export async function deleteMaintenancePlanAction(context, plan) {
    return await service.deleteMaintenancePlan(plan).then(async (response) => {
        if (response.status == 200) {
            return true
        } else {
            return response
        }
    })
}


export async function updateMaintenancePlanAction(context, plan) {
    // Those are the keys you need in your payload and find in the fields
    const payload = {
        planName: plan.planName,
        observations: plan.observations,
        userId: 1,
        equipmentIds: plan.equipmentIds,
        maintenanceDates: plan.maintenanceDates
    }

    return await service.updateMaintenancePlan(payload, plan.id).then(async (response) => {
        if (response.status == 200) {
            // context.commit('ADD_MAINTENANCE', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}