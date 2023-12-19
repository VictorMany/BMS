// mutations.js
export function MUTATE_EQUIPMENTS(state, payload) {
    if (Array.isArray(payload.filteredEquipment)) {
      state.equipments = payload.filteredEquipment;
    } else {
      console.error('El payload de MUTATE_EQUIPMENTS no contiene un array válido:', payload);
    }
  }
  