export function MUTATE_EQUIPMENTS(state, payload) {
  state.equipments = payload;
}

export function MUTATE_CATEGORIES(state, payload) {
  state.categories = payload;
}

export function MUTATE_LOCATIONS(state, payload) {
  state.locations = payload;
}

export function MUTATE_EQUIPMENT(state, payload) {
  if (payload === null) {
    state.equipment = null;
    localStorage.removeItem('equipment');
    return;
  }

  const equipment = { ...payload, categoryName: `${payload.categoryName} - ${payload.equipmentModel} - No. serie: ${payload.serialNumber}` };
  state.equipment = equipment;
  localStorage.setItem('equipment', JSON.stringify(equipment));
}

export function MUTATE_DETAILS(state, payload) {
  state.pagination = {
    page: payload.currentPage,
    totalItems: payload.totalItems,
    totalPages: payload.totalPages,
    rowsPerPage: payload.rowsPerPage,
    rowsNumber: state.equipments.length > 0 ? state.equipments.length : 0
  }
  state.message = payload.details
}