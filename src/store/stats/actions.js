import service from 'src/api/stats'

export async function getStatsAction(context, params) {
    return service.getStats(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_STATS', response.data.contents)
            return response.data.contents;
        } else {
            return response
        }
    })
}

export async function getCustomStatsAction(context) {
    return service.getCustomStats().then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_CUSTOM_STATS', response.data.contents)
            return response.data.contents;
        } else {
            return response
        }
    })
}

export async function addCustomStatsAction(context, params) {
    return service.addCustomStats(params).then(async (response) => {
        if (response.status == 200) {
            return response.data.contents;
        } else {
            return response
        }
    })
}

export async function getPeriodicStatsAction(context, params) {
    return service.getPeriodicStats(params).then(async (response) => {
        if (response.status == 200) {
            if (params.type === 'report')
                context.commit('MUTATE_PERIODIC_REPORTS', response.data.contents)
            else {
                context.commit('MUTATE_PERIODIC_MAINTENANCES', response.data.contents)
            }
            return response.data.contents;
        } else {
            return response
        }
    })
}





