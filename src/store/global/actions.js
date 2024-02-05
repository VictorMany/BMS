
export function changeMenu(context) {
    context.commit('CHANGE_MENU')
}

export function formatPayload(context, { keys, fields }) {
    const fd = new FormData();
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
                                    } else
                                        fd.append(k, fields[prop][i].model?.value);
                                } else {
                                    fd.append(k, fields[prop][i].model);
                                }
                            }
                        }
                    }
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
    const initialDate = new Date(date);
    // Ajustar la zona horaria a la de España (GMT+1)
    const fechaLocal = new Date(initialDate.getTime() + initialDate.getTimezoneOffset() * 60000);
    const optFormat = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = fechaLocal.toLocaleDateString('es-ES', optFormat);
    return fechaFormateada;
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
            item.color = '#d1b410'
        }
        return item
    } else if (item.key == 'reportStatus') {
        if (valueFromServer) {
            item.model = 'Pendiente'
            item.color = '#FF9900'
        } else {
            item.model = 'Atendido'
            item.color = '#1e65e8'
        }
        return item
    } else if (item.key == 'maintenanceType') {
        if (valueFromServer === 'preventivo') {
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
                item.model = 'Lector'
                break;
        }
        return item
    } else if (item.type == 'formatedDate') {
        item.model = formatDate(valueFromServer);
    } else item.model = valueFromServer
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