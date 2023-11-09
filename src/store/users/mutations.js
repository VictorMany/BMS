export function MUTATE_USERS(state, payload) {
    state.users = payload
}

export function ADD_USERS(state, payload) {
    console.log('AQUI EN LA MUTACION', payload);
    state.users = [...state.users, payload];
}