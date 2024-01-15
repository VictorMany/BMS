export function MUTATE_REPORTS(state, payload) {
    state.reports = payload
}

export function MUTATE_DETAILS(state, payload) {
    state.pagination = {
        page: payload.currentPage,
        totalItems: payload.totalItems,
        totalPages: payload.totalPages,
        rowsPerPage: payload.rowsPerPage,
        rowsNumber: state.reports.length > 0 ? state.reports.length : 0
    }
    state.message = payload.details
}

export function ADD_REPORT(state, payload) {
    state.reports = [...state.reports, payload];
}

export function UPDATE_REPORT(state, payload) {
    state.reports = [...state.reports, payload];
}