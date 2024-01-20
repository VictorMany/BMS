export function MUTATE_REPORTS(state, payload) {
    state.reports = payload
}

export function ADD_REPORT(state, payload) {
    state.reports = [...state.reports, payload];
}

export function UPDATE_REPORT(state, payload) {
    state.reports = [...state.reports, payload];
}