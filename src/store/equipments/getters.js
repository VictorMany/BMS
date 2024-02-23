import { formatDate } from '../global/actions';

export function getEquipmentsGetter(state) {
  let equipments = state.equipments.map(equipment => ({
    id: equipment.IdEquipment,
    cardTitle: equipment.categoryName,
    cardImg: equipment.photo,
    cardLabels: [
      { label: 'Modelo', info: equipment.equipmentModel },
      { label: 'Número de serie', info: equipment.serialNumber },
    ],
    cardDate: formatDate(equipment.nextMaintenanceDate), // CAMBIAR POR NEXTMAINTENANCE DATE

    // FOR THE DETAILS MAINTENANCE AND REPORT
    label: equipment.categoryName,
    value: equipment.IdEquipment,
    serialNumber: equipment.serialNumber,
    equipmentModel: equipment.equipmentModel,

    isReported: equipment.isReported,
    status: equipment.isReported ? 'Reportado' : 'Sin reportes',
  }));
  return equipments
}

export function getCategoriesGetter(state) {
  let categories = state.categories.map(category => ({
    ...category,
    value: category?.id?.split(' ')[0] ? category?.id?.split(' ')[0] : category.CategoryId,
    label: category.label ? category.label : category.categoryName
  }));
  return categories
}

export function getPaginationGetter(state) {
  return state.pagination
}

export function getEquipmentGetter(state) {
  return state.equipment
}

export function getLocationsGetter(state) {
  let locations = state.locations.map(location => ({
    ...location,
    value: location.LocationId,
    label: location.locationName
  }));
  return locations
}

