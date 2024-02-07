import service from 'src/api/stats'

export async function getStatsAction(context, params) {
    return service.getStats(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_STATS', response.data.contents.statistics)

            return response.data.contents;
        } else {
            return response
        }
    })
}

