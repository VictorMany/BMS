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

export function MUTATE_USER(state, payload) {
    state.user = payload
    localStorage.setItem('user', JSON.stringify(payload))
}

export function MUTATE_ROLE(state, payload) {
    state.role = payload
    localStorage.setItem('role', JSON.stringify(payload))
}

export function UPDATE_USER(state, payload) {
    state.users = [...state.users, payload];
}