import service from 'src/api/users'

export async function getUsersAction(context, params) {
    return service.getUsers(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_USERS', response.data.contents.users)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return manageResponse('Obtener usuarios', true)
        } else {
            return manageResponse('Obtener usuarios', false)
        }
    })
}

export async function getUserAction(context, params) {
    return service.getUser(params.id).then(async (response) => {
        if (response.status == 200) {

            // We call the global action to format our payload
            const payload = await context.dispatch('global/formatTextfields', {
                keys: response.data.contents.user,
                textfields: params.textfields
            }, { root: true });

            console.log('ESTOS SON LOS TEXTFIELDS FORMATEADOS', payload)

            return payload
        } else {
            return manageResponse('Obtener usuario', false)
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

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        textfields: user
    }, { root: true });

    return await service.postUser(payload).then(async (response) => {
        try {
            if (response.status == 201) {
                context.commit('ADD_USER', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos

                return manageResponse('Añadir usuario', true)
            } else {
                console.log('error', response.data)

                return manageResponse('Añadir usuario', false)
            }
        } catch (error) {
            return manageResponse(error, false)
        }
    })
}

export async function updateUserAction(context, user) {
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

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        textfields: user
    }, { root: true });

    return await service.updateUser(payload).then(async (response) => {
        try {
            if (response.status == 201) {
                context.commit('UPDATE_USER', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
                return manageResponse('Editar usuario', true)
            } else {
                return manageResponse('Editar usuario', false)
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