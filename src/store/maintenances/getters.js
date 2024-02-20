import { formatDate } from '../global/actions';

export function getMaintenancesGetter(state) {
    let maintenances = state.maintenances.map(maintenance => ({
        id: maintenance.MaintenanceId,
        type_maintenance: maintenance.maintenanceType,
        encharged_name: maintenance.User?.userName,
        date: formatDate(maintenance.createdAt),
        total_cost: maintenance.cost,
        status: maintenance.maintenanceType,
        equipment: maintenance.Equipment.categoryName + ' - ' + maintenance.Equipment.equipmentModel
    }));
    return maintenances
}

export function getPaginationGetter(state) {
    return state.pagination
}
