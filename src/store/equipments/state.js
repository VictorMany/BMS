export default function () {
  return {
    equipments: [],
    categories: [],
    locations: [],
    departments: [],
    equipment: JSON.parse(localStorage.getItem('equipment')) || null,
    message: '',
    pagination: {
      page: 1,
      totalItems: 0,
      rowsPerPage: 20,
      totalPages: 1
    }
  }
}
