import { formatDate } from '../global/actions';

export function getReportsGetter(state) {
    let reports = state.reports.map(report => ({
        id: report.ReportId,
        title_report: report.reason,
        type_report: report.reportType,
        encharged_name: report.User?.userName,
        status: report.reportStatus ? 'Pendiente' : 'Atendido',
        date: formatDate(report.createdAt),
        total_cost: report.cost,
    }));
    return reports
}


export function getReportGetter(state) {
    return state.report
}
