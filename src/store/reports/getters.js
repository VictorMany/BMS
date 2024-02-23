import { formatDate } from '../global/actions';

export function getReportsGetter(state) {
    let reports = state.reports.map(report => ({
        id: report.ReportId,
        idReport: report.ReportId,
        reason: report.reason,

        Equipment: {
            maintenanceType: 'Correctivo',
            ...report.Equipment
        },

        encharged_name: report.User?.userName,
        status: report.reportStatus,
        date: formatDate(report.createdAt),
        total_cost: report.cost,

        ...report
    }));
    return reports
}

export function getPaginationGetter(state) {
    return state.pagination
}

export function getReportGetter(state) {
    return state.report
}
