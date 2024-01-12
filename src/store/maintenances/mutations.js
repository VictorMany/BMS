export function MUTATE_MAINTENANCES(state, payload) {
    state.maintenances = payload
}

export function MUTATE_DETAILS(state, payload) {
    state.pagination = {
        page: payload.currentPage,
        totalItems: payload.totalItems,
        totalPages: payload.totalPages,
        rowsPerPage: payload.rowsPerPage,
        rowsNumber: state.maintenances.length > 0 ? state.maintenances.length : 0
    }
    state.message = payload.details
}

export function ADD_MAINTENANCE(state, payload) {
    state.maintenances = [...state.maintenances, payload];
}

export function UPDATE_MAINTENANCE(state, payload) {
    state.maintenances = [...state.maintenances, payload];
}