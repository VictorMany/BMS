import { saveTokenToCookie } from 'app/utils/utils'
import { setAuthHeader } from 'src/api/auth'
// import EquipmentService from 'src/api/equipments'
// import MaintenanceService from 'src/api/maintenances'
// import MaintenancePlanService from 'src/api/maintenances-plan'
// import ReportService from 'src/api/reports'
// import StatsService from 'src/api/stats'
// import UserService from 'src/api/users'


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
            // console.log("")
            const {
                email,
                photo,
                userName,
                userRole,
                userStatus
            } = response.data.contents.user;

            context.commit('MUTATE_USER', {
                email,
                photo,
                userName,
                userRole,
                userStatus
            })

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

export async function loginAction(context, form) {
    // Those are the keys you need in your payload and find in the fields
    return await service.login(form).then(async (response) => {
        if (response.status == 200) {
            //Add token to cookies
            saveTokenToCookie(response.data.token);
            // add header to api authorization
            setAuthHeader(response.data.token);
            //Mutate role in LS
            context.commit('MUTATE_ROLE', response.data.Rol)
            return true
        } else {
            // Si la respuesta no fue exitosa, manejar el error
            // Puedes lanzar un nuevo error para que se maneje en el catch
            throw new Error(`Error: Se recibió un código de estado ${response.status}`);
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

