import service from 'src/api/equipments'

export async function getEquipmentsAction(context, params) {
    return service.getEquipments(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_EQUIPMENTS', response.data.contents.equipments)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        }
        else {
            return response
        }
    })
}

export async function getEquipmentAction(context, params) {
    return service.getEquipment(params.id).then(async (response) => {
        if (response.status == 200) {
            // We call the global action to format our payload
            const equipment = response.data.contents.equipment

            const categoryName = `${equipment.categoryName} - ${equipment.equipmentName} - No. serie: ${equipment.serialNumber}`
            const IdEquipment = params.id

            const {
                serialNumber,
                equipmentModel,
                equipmentBrand,
                equipmentStatus,
                equipmentName,
                // department,
                photo
            } = equipment

            context.commit('MUTATE_EQUIPMENT', {
                serialNumber,
                equipmentModel,
                equipmentBrand,
                equipmentStatus,
                photo,
                categoryName,
                // department,
                equipmentName,
                IdEquipment
            })

            if (params.fields) {
                await context.dispatch('global/formatDetails', {
                    keys: response.data.contents.equipment,
                    fields: params.fields
                }, { root: true });
            }

            console.log('Este es el equipment a retornar', equipment)
            return equipment
        } else {
            return response
        }
    })
}

export async function getCategoriesAction(context, params) {
    return service.getCategories(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_CATEGORIES', response.data.contents.categories);
            return true
        } else {
            return response
        }
    })
}

export async function getAllCategoriesAction(context) {
    return service.getAllCategories().then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_CATEGORIES', response.data.contents.categories);
            return true
        } else {
            return response
        }
    })
}

export async function getAllLocationsAction(context) {
    return service.getAllLocations().then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_LOCATIONS', response.data.contents.locations);
            return true
        } else {
            return response
        }
    })
}

export async function getAllDepartmentsAction(context) {
    return service.getAllDepartments().then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_DEPARTMENTS', response.data.contents.departments);
            return true
        } else {
            return response
        }
    })
}

export async function updateCategories(context, val) {
    context.commit('MUTATE_CATEGORIES', val);
}

export async function getEquipmentsByCategoryAction(context, params) {
    return service.getEquipmentsByCategory(params).then(async (response) => {
        if (response.status == 200) {
            return response.data.contents.equipments.map(category => ({
                ...category,
                label: category.categoryName + ' - ' + category.label
            }));
        } else {
            return response
        }
    })
}

export async function getEquipmentsByDateAction(context, params) {
    return service.getEquipmentsByDate(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_EQUIPMENTS', response.data.contents.equipment)
            context.commit('MUTATE_DETAILS', response.data.contents)
            return true
        }
        else {
            return response
        }
    })
}

export async function getDatesPerMonthAction(context, params) {
    return service.getDatesPerMonth(params).then(async (response) => {
        if (response.status == 200) {
            return response.data.contents.dates
        }
        else {
            return response
        }
    })
}

export async function postEquipmentAction(context, equipment) {
    // Those are the keys you need in your payload and find in the fields
    let keys = {
        department: '',
        equipmentName: '',
        equipmentBrand: '',
        equipmentModel: '',
        CategoryId: '',
        LocationId: '',
        DepartmentId: '',
        location: '',
        manufacturingYear: '',
        observations: '',
        price: '',
        provider: '',
        serialNumber: '',
        trackingNumber: '',
        warrantyDate: '',
        acquisitionDate: '',
        photo: ''
    }

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        fields: equipment
    }, { root: true });

    return await service.postEquipment(payload).then(async (response) => {
        if (response.status == 201) {
            return true
        } else {
            return response
        }
    })
}

export async function postEquipmentsFromExcelAction(context, excel) {
    return await service.postEquipmentsFromExcel(excel).then(async (response) => {
        if (response.status == 201) {
            return true
        } else {
            return response
        }
    })
}

export async function updateEquipmentAction(context, equipment) {
    // Those are the keys you need in your payload and find in the fields
    let keys = {
        equipmentStatus: '',
        LocationId: '',
        DepartmentId: '',
        observations: '',
        serialNumber: '',
        trackingNumber: '',
        warrantyDate: '',
        price: '',
        provider: '',
        acquisitionDate: '',
        photo: ''
    }

    // We call the global action to format our payload
    const payload = await context.dispatch('global/formatPayload', {
        keys,
        fields: equipment,
    }, { root: true });

    // If we dont have any changes 
    if (payload.entries().next().done) {
        return true
    } else {
        return await service.updateEquipment(payload, equipment.id).then(async (response) => {
            if (response.status == 200) {
                return true
            } else {
                return response
            }
        })
    }
}

export async function updateEquipmentsAction(context, payload) {
    // We call the global action to format our payload
    const idEquipments = payload.equipments

    const equipmentData = Object.assign({},
        payload.form.DepartmentId?.model?.value !== '' && {
            DepartmentId: (typeof payload.form.DepartmentId?.model === 'string') ? payload.form.DepartmentId.model : payload.form.DepartmentId?.model?.value
        },
        payload.form.LocationId?.model?.value !== '' && {
            LocationId: (typeof payload.form.LocationId?.model === 'string') ? payload.form.LocationId.model : payload.form.LocationId?.model?.value
        },
        payload.form.equipmentStatus?.model?.value !== '' && { equipmentStatus: payload.form.equipmentStatus?.model?.value },
        payload.form.observations?.model && { observations: payload.form.observations?.model },
        payload.form.warrantyDate?.model && { warrantyDate: payload.form.warrantyDate?.model },
        payload.form.price?.model && { price: payload.form.price?.model },
        payload.form.provider?.model && { provider: payload.form.provider?.model },
        payload.form.acquisitionDate?.model && { acquisitionDate: payload.form.acquisitionDate?.model }
    );


    return await service.updateEquipments({ idEquipments, equipmentData }).then(async (response) => {
        if (response.status == 200) {
            return true
        } else {
            return response
        }
    })
}

export async function deleteEquipmentsAction(context, equipment) {
    return await service.deleteEquipments(equipment).then(async (response) => {
        if (response.status == 200) {
            return true
        } else {
            return response
        }
    })
}