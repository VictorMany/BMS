export function MUTATE_USERS(state, payload) {
    state.users = payload
}

export function MUTATE_DETAILS(state, payload) {
    state.pagination = {
        currentPage: payload.currentPage,
        totalItems: payload.totalItems,
        totalPages: payload.totalPages,
        rowsPerPage: payload.rowsPerPage,
    }
    state.message = payload.details
}

export function ADD_USERS(state, payload) {
    state.users = [...state.users, payload];
}