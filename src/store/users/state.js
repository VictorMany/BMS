export default function () {
    return {
        user: JSON.parse(localStorage.getItem('user')) || null,
        role: JSON.parse(localStorage.getItem('role')) || null,
        users: [],
        message: '',
        pagination: {
            page: 1,
            totalItems: 0,
            rowsPerPage: 20,
            totalPages: 1
        }
    }
}