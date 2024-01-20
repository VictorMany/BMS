export function getMaintenancePlansGetter(state) {
    let maintenancePlans = state.maintenancePlans.map(plan => ({
        id: plan.PlanId,
        planName: plan.planName,
        user: plan.User?.userName,
        date: new Date(plan.createdAt).toLocaleDateString(),
    }));
    return maintenancePlans
}
