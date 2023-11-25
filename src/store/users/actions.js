import service from 'src/api/users'

export function getUsersAction(context) {
    return service.getUsers().then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_USERS', response.data.contents)
            context.commit('MUTATE_DETAILS', response.data)
            return manageResponse('Obtener usuarios', true)
        } else {
            return manageResponse('Obtener usuarios', false)
        }
    })
}

export async function postUserAction(context, user) {
    // Those are the keys you need in your payload and find in the textfields
    let keys = {
        userName: '',
        email: '',
        userPassword: '',
        phone: '',
        userRole: '',
        photo: '',
        userStatus: '',
        birthday: '',
    }

    // the textfields are the user

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        textfields: user
    }, { root: true });

    return await service.postUser(payload).then(async (response) => {
        try {
            if (response.status == 201) {
                console.log(response.data);
                context.commit('ADD_USERS', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
                return manageResponse('Añadir usuario', true)
            } else {
                return manageResponse('Añadir usuario', false)
            }
        } catch (error) {
            return manageResponse(error, false)
        }
    })
}

const manageResponse = (scope, success) => {
    if (success) {
        return {
            scope,
            message: 'Operación realizada exitosamente',
            success
        }
    } else {
        return {
            scope,
            message: 'Ha ocurrido un error al realizar la operación ',
            success
        }
    }
}