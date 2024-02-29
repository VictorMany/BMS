export function CHANGE_MENU(state) {
    state.changedMenu++
}

export function UPDATE_LOCAL_STORAGE(state, newData) {
    state.localStorage = {
        ...state.localStorage, ...newData
    }
    // También actualizamos el localStorage
    localStorage.setItem('configuration', JSON.stringify(state.localStorage));
}