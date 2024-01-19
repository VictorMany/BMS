export function getEquipmentsGetter(state) {
  let equipments = state.equipments.map(equipment => ({
    id: equipment.IdEquipment,
    cardTitle: equipment.equipmentName,
    cardImg: equipment.photo,
    cardLabels: [
      { label: 'Marca:', info: equipment.equipmentBrand },
      { label: 'No. serie:', info: equipment.serialNumber },
    ],
    cardDate: new Date(equipment.createdAt).toLocaleDateString(),

    // FOR THE DETAILS MAINTENANCE AND REPORT
    label: equipment.equipmentName,
    value: equipment.IdEquipment,
    serialNumber: equipment.serialNumber,
  }));
  return equipments
}

export function getCategoriesGetter(state) {
  return state.categories
}


export function getPaginationGetter(state) {
  return state.pagination
}

export function getEquipmentGetter(state) {
  return state.equipment
}

