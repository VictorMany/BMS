export function MUTATE_MAINTENANCES_PLAN(state, payload) {
    state.maintenancePlans = payload
}

export function MUTATE_DETAILS(state, payload) {
    state.pagination = {
        page: payload.currentPage,
        totalItems: payload.totalItems,
        totalPages: payload.totalPages,
        rowsPerPage: payload.rowsPerPage,
        rowsNumber: state.maintenancePlans.length > 0 ? state.maintenancePlans.length : 0
    }
    state.message = payload.details
}