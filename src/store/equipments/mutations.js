export function MUTATE_EQUIPMENTS(state, payload) {
  state.equipments = payload;
}

export function MUTATE_CATEGORIES(state, payload) {
  state.categories = payload;
}

export function MUTATE_LOCATIONS(state, payload) {
  state.locations = payload;
}

export function MUTATE_DEPARTMENTS(state, payload) {
  state.departments = payload;
}

export function MUTATE_EQUIPMENT(state, payload) {
  try {
    if (payload === null) {
      localStorage.removeItem('equipment');
      state.equipment = null;
      return;
    }
    state.equipment = payload;
    localStorage.setItem('equipment', JSON.stringify(payload));
  } catch (error) {
    console.log(error)
  }
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