import service from 'src/api/reports'

export async function getReportsAction(context, params) {
    return service.getReports(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_REPORTS', response.data.contents.reports)

            let obj = response.data.contents;
            obj.rowsNumber = obj.reports.length
            delete obj.reports

            return obj
        } else {
            return response
        }
    })
}

export async function getReportsByEquipmentAction(context, params) {
    return service.getReportsByEquipment(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_REPORTS', response.data.contents.reports)
            // context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        } else {
            return response
        }
    })
}

export async function getReportAction(context, params) {
    return service.getReport(params.id).then(async (response) => {
        if (response.status == 200) {
            const reportFromRes = response.data.contents.report

            const {
                ReportId,
                reason,
                report,
                userId,
                User,
                Equipment,
            } = reportFromRes


            context.commit('MUTATE_REPORT', {
                ReportId,
                reason,
                report,
                userId,
                User,
                Equipment,
            })
            // We call the global action to format our payload
            let payload = response

            if (params.fields) {
                payload = await context.dispatch('global/formatDetails', {
                    keys: reportFromRes,
                    fields: params.fields
                }, { root: true });
            }

            return payload
        } else {
            return response
        }
    })
}

export async function cancelReportAction(context, params) {
    return service.cancelReport(params.id).then(async (response) => {
        if (response.status == 200) {
            return true
        } else {
            return response
        }
    })
}


export async function postReportAction(context, report) {
    // Those are the keys you need in your payload and find in the fields
    let keys = {
        // ReportId: '',
        reason: '',
        report: '',
        reportUrgency: '',
        idEquipment: '',
        userId: '',
    }

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        fields: report
    }, { root: true });

    return await service.postReport(payload).then(async (response) => {
        if (response.status == 201) {
            // context.commit('ADD_REPORT', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}

export async function updateReportAction(context, report) {
    return await service.updateReport(report).then(async (response) => {
        if (response.status == 200) {
            return true
        } else {
            return response
        }
    })
}

