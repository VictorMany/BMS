import { formatDate } from '../global/actions';

export function getEquipmentsGetter(state) {
  let equipments = state.equipments.map(equipment => ({
    id: equipment.IdEquipment,
    cardTitle: equipment.equipmentName,
    cardImg: equipment.photo,
    cardLabels: [
      { label: 'Marca:', info: equipment.equipmentBrand },
      { label: 'No. serie:', info: equipment.serialNumber },
    ],
    cardDate: formatDate(equipment.createdAt),
    // FOR THE DETAILS MAINTENANCE AND REPORT
    label: equipment.equipmentName,
    value: equipment.IdEquipment,
    serialNumber: equipment.serialNumber,
  }));
  return equipments
}

export function getCategoriesGetter(state) {
  let categories = state.categories.map(category => ({
    ...category,
    value: category.id.split(' ')[0],
  }));
  return categories
}

export function getPaginationGetter(state) {
  return state.pagination
}

export function getEquipmentGetter(state) {
  return state.equipment
}

