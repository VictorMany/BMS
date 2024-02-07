export function MUTATE_REPORTS(state, payload) {
    state.reports = payload
}

export function MUTATE_REPORT(state, payload) {
    state.report = payload

    localStorage.setItem('report', JSON.stringify(payload))
}