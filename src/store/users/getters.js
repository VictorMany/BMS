export function getUsersGetter(state) {
    let users = state.users.map(user => ({
        id: user.UserId,
        cardTitle: user.userName,
        cardImg: user.photo,
        cardLabels: [
            { label: 'Rol de usuario', info: roleFormater(user.userRole) }
        ],
        // cardDate: roleFormater(user.userRole),

        label: user.userName,
        value: user.UserId,
    }));
    return users
}


export function getPaginationGetter(state) {
    return state.pagination
}

export function getRoleGetter(state) {
    return state.role
}

export function getUserGetter(state) {
    return state.user
}

const roleFormater = (role) => {
    switch (role) {
        case 1:
            return 'Administrador'
        case 2:
            return 'Auxiliar'
        case 3:
            return 'Expectador'
        default:
            break;
    }
}