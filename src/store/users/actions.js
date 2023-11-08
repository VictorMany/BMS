import service from 'src/api/users'

export function getUsersAction(context){
    return service.getUsers().then(async (response) => {
        if (response.status == 200) {
            console.log(response.data);
            context.commit('MUTATE_USERS', response.data)
            return manageResponse('Users', true)
        } else {
            return manageResponse('Users', false)
        }
    })
}

const manageResponse = (scope, success) => {
    if (success) {
        return {
            message: scope + ' successfully obtained',
            success
        }
    } else {
        return {
            message: 'An error occurred obtaining ' + scope.toLowerCase(),
            success
        }
    }
}