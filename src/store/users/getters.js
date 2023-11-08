export function getUsersGetter(state) {
    let users = state.users.map(user => ({
        cardTitle: user.userName,
        cardImg: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/27/08/jennifer-lawrence.jpg?quality=75&width=982&height=726&auto=webp',
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