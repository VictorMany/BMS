export function MUTATE_SERVICE_CONTRACTS(state, payload) {
    state.contracts = payload
}

export function MUTATE_DETAILS(state, payload) {
    state.pagination = {
        page: payload.currentPage,
        totalItems: payload.totalItems,
        totalPages: payload.totalPages,
        rowsPerPage: payload.rowsPerPage,
        rowsNumber: state.contracts.length > 0 ? state.contracts.length : 0
    }
    state.message = payload.details
}