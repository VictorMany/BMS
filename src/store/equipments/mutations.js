export function MUTATE_EQUIPMENTS(state, payload) {
  state.equipments = payload;
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


export function ADD_EQUIPMENT(state, payload) {
  state.equipments = [...state.equipments, payload];
}
