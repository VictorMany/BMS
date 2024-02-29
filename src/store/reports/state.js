export default function () {
    return {
        reports: [],
        message: '',
        report: JSON.parse(localStorage.getItem('report')) || null,
        pagination: {
            page: 1,
            totalItems: 0,
            rowsPerPage: 20,
            totalPages: 1
        }
    }
}