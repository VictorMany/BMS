export default function () {
    return {
        user: JSON.parse(localStorage.getItem('user')) || null,
        users: [],
        message: '',
        pagination: {
            page: 1,
            totalItems: 0,
            rowsPerPage: 12,
            totalPages: 1
        }
    }
}