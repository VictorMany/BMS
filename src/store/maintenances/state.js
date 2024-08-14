export default function () {
    return {
        maintenances: [],
        totalCost: JSON.parse(localStorage.getItem('totalCost')) || null,

        message: '',

        pagination: {
            page: 1,
            totalItems: 0,
            rowsPerPage: 20,
            totalPages: 1,
        }
    }
}