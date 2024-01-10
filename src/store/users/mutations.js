export function MUTATE_USERS(state, payload) {
    state.users = payload
}

export function MUTATE_DETAILS(state, payload) {
    state.pagination = {
        page: payload.currentPage,
        totalItems: payload.totalItems,
        totalPages: payload.totalPages,
        rowsPerPage: payload.rowsPerPage,
        rowsNumber: state.users.length > 0 ? state.users.length : 0
    }
    state.message = payload.details
}

export function ADD_USER(state, payload) {
    state.users = [...state.users, payload];
}

export function UPDATE_USER(state, payload) {
    console.log('Tratando de actuializar el usuario', payload)
}