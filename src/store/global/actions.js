
export function changeMenu(context) {
    context.commit('CHANGE_MENU')
}

export function formatPayload(context, { keys, fields }) {
    const fd = new FormData();
    const updatedObj = {}

    for (let k in keys) {
        for (let prop in fields) {
            if (Array.isArray(fields[prop])) {
                for (let i = 0; i < fields[prop].length; i++) {
                    for (let key in fields[prop][i]) {
                        if (k == fields[prop][i][key]) {
                            // Verificar si la clave ya existe en FormData
                            if (!fd.has(k)) {
                                if (fields[prop][i].type === 'select' || fields[prop][i].type === 'autocomplete') {
                                    if (typeof fields[prop][i].model == 'string') {
                                        fd.append(k, fields[prop][i].model)
                                        updatedObj[k] = fields[prop][i].model
                                    } else {
                                        fd.append(k, fields[prop][i].model?.value);
                                        updatedObj[k] = fields[prop][i].model?.value
                                    }
                                } else {
                                    fd.append(k, fields[prop][i].model);
                                    updatedObj[k] = fields[prop][i].model
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (fields.originalObj) {
        return updatePayload(fields.originalObj, updatedObj, fd)
    } else {
        return fd
    }
}

function updatePayload(original, toUpdate, fd) {
    for (const key in toUpdate) {
        if (Object.prototype.hasOwnProperty.call(toUpdate, key)) {
            if (Object.prototype.hasOwnProperty.call(original, key)) {
                if (original[key] == toUpdate[key]) {
                    delete toUpdate[key];
                    fd.delete(key);
                }
            }
        }
    }
    return fd;
}

export async function formatDetails(context, { keys, fields }) {
    fields.createdAt = formatDate(keys.createdAt);

    for (let k in keys) {
        for (let prop in fields) {
            if (Array.isArray(fields[prop])) {
                for (let i = 0; i < fields[prop].length; i++) {
                    for (let key in fields[prop][i]) {
                        if (k == fields[prop][i][key]) {
                            fields[prop][i] = getModelSelected(fields[prop][i], keys[k])
                        }
                    }
                }
            }
        }
    }

    if (keys.User) {
        updateFieldByKeyInAllArrays(fields, 'userName', {
            model: keys.User.userName
        })
    }

    if (keys.Equipment) {
        updateFieldByKeyInAllArrays(fields, 'categoryName', {
            model: keys.Equipment.categoryName
        })

        updateFieldByKeyInAllArrays(fields, 'equipmentModel', {
            model: keys.Equipment.equipmentModel
        })

        updateFieldByKeyInAllArrays(fields, 'serialNumber', {
            model: keys.Equipment.serialNumber
        })

        updateFieldByKeyInAllArrays(fields, 'photo', {
            model: keys.Equipment.photo
        })
    }

    return fields;
}

export function addSttingsToLocalStorage(context, newData) {
    context.commit('UPDATE_LOCAL_STORAGE', newData)
}

export function formatDate(date) {
    if (date) {
        const initialDate = new Date(date);

        if (!isNaN(initialDate)) {
            const optFormat = { day: 'numeric', month: 'long', year: 'numeric' };
            const fechaFormateada = initialDate.toLocaleDateString('es-MX', optFormat);
            return fechaFormateada;
        }
    } else {
        return '';
    }
}

function getModelSelected(item, valueFromServer) {
    if (item.options && item.options.length > 0) {
        item.options.forEach(opt => {
            if (opt.value == valueFromServer) {
                item.model = opt
            }
        });
        return item
    } else if (item.label == 'Estatus' && item.key != 'reportStatus') {
        if (valueFromServer) {
            item.model = 'Activo'
            item.color = '#10D13A'
        } else {
            item.model = 'Inactivo'
            item.color = '#dc4e5f'
        }
        return item
    } else if (item.key == 'reportStatus') {
        if (valueFromServer == 'Pendiente') {
            item.color = '#FF9900'
        } else if (valueFromServer == 'Resuelto') {
            item.color = '#1e65e8'
        } else if (valueFromServer == 'Cancelado') {
            item.color = '#dc4e5f'
        }
        item.model = valueFromServer

        return item
    } else if (item.key == 'maintenanceType') {
        if (valueFromServer === 'Preventivo') {
            item.model = 'Preventivo'
            item.color = '#10D13A'
        } else {
            item.model = 'Correctivo'
            item.color = '#d1b410'
        }
        return item
    } else if (item.key == 'userRole') {
        switch (valueFromServer) {
            case 1:
                item.model = 'Administrador'
                break;
            case 2:
                item.model = 'Auxiliar'
                break;
            case 3:
                item.model = 'Expectador'
                break;
        }
        return item
    } else if (item.type == 'formatedDate') {
        item.model = formatDate(valueFromServer);
    } else if (item.key == 'isReported') {
        item.model = valueFromServer ? item.model = 'Si' : item.model = 'Sin reportes'
        return item
    }
    else item.model = valueFromServer
    return item
}

function updateFieldByKeyInAllArrays(fields, key, updates) {
    for (const arrayKey in fields) {
        if (Array.isArray(fields[arrayKey])) {
            const fieldEntry = fields[arrayKey].find(entry => entry.key === key);
            if (fieldEntry) {
                Object.assign(fieldEntry, updates);
                return; // Termina la iteración después de encontrar la primera coincidencia
            }
        }
    }
    console.error(`No se encontró la entrada para la clave '${key}' en ningún arreglo o no tiene opciones.`);
}