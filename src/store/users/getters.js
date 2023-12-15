export function getUsersGetter(state) {
    let users = state.users.map(user => ({
        cardTitle: user.userName,
        cardImg: 'https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg',
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