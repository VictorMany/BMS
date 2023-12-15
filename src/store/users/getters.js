export function getUsersGetter(state) {
    let users = state.users.map(user => ({
        cardTitle: user.userName,
        cardImg: user.photo,
        cardLabels: [
            { label: 'Ingeniero biomédico' }
        ],
        cardDate: roleFormater(user.userRole)
    }));
    console.log(users);
    return users
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