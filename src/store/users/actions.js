import service from 'src/api/users'

export async function getUsersAction(context, params) {
    return service.getUsers(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_USERS', response.data.contents.users)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        } else {
            return response
        }
    })
}

export async function getUserAction(context, params) {
    return service.getUser(params.id).then(async (response) => {
        if (response.status == 200) {
            // We call the global action to format our payload
            context.commit('MUTATE_USER', response.data.contents.user)

            const payload = await context.dispatch('global/formatDetails', {
                keys: response.data.contents.user,
                fields: params.fields
            }, { root: true });
            return payload
        } else {
            return response
        }
    })
}

export async function postUserAction(context, user) {
    // Those are the keys you need in your payload and find in the fields
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
        fields: user
    }, { root: true });

    return await service.postUser(payload).then(async (response) => {
        if (response.status == 201) {
            return true
        } else {
            return response
        }
    })
}

export async function updateUserAction(context, user) {
    // Those are the keys you need in your payload and find in the fields
    let keys = {
        phone: '',
        userRole: '',
        photo: '',
        userStatus: '',
    }

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        fields: user
    }, { root: true });

    return await service.updateUser(payload, user.id).then(async (response) => {
        if (response.status == 200) {
            return true
        } else {
            return response
        }
    })
}


export function getUserGetter(state) {
    return state.user
}

