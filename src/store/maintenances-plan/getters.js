import { formatDate } from '../global/actions';

export function getMaintenancePlansGetter(state) {
    let maintenancePlans = state.maintenancePlans.map(plan => ({
        id: plan.PlanId,
        planName: plan.planName,
        user: plan.User?.userName,
        date: formatDate(plan.createdAt),
    }));
    return maintenancePlans
}

export function getPaginationGetter(state) {
    return state.pagination
}

