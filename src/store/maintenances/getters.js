export function getMaintenancesGetter(state) {
    let maintenances = state.maintenances.map(maintenance => ({
        id: maintenance.MaintenanceId,
        type_maintenance: maintenance.maintenanceType,
        encharged_name: maintenance.User?.userName,
        date: maintenance.createdAt,
        total_cost: maintenance.cost,
    }));
    return maintenances
}

export function getPaginationGetter(state) {
    return state.pagination
}
