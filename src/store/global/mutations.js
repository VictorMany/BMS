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

export function UPDATE_IS_DARK(state, newData) {
    state.isDark = newData
    // También actualizamos el localStorage
    localStorage.setItem('isDark', JSON.stringify(state.isDark));
}

export function RESET_LOCAL_STORAGE(state) {
    state.localStorage = null
}