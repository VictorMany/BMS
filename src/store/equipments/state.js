export default function () {
  return {
    equipments: [],
    categories: [],
    equipment: JSON.parse(localStorage.getItem('equipment')) || null,
    message: '',
    pagination: {
      page: 1,
      totalItems: 0,
      rowsPerPage: 12,
      totalPages: 1
    }
  }
}
