
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
                                if (fields[prop][i].type === 'select') {
                                    fd.append(k, fields[prop][i].model.value);
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
    fields.createdAt = await context.dispatch('formatDate', keys.createdAt);

    if (keys.User) {
        // add equipment name
        fields.left[1].model = keys.User.IdEquipment;

        // add incharged name
        fields.left[1].model = keys.User.userName;

        // add photo
        fields.right[1].model = keys.User.photo;

        // add serialNumber
        fields.right[0].model = '0001';
    }

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
    return fields;
}


// actions aux
export function formatDate(context, date) {
    const initialDate = new Date(date);
    const optFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = initialDate.toLocaleDateString('es-ES', optFormat);
    return fechaFormateada;
}

function getModelSelected(item, valueFromServer) {
    if (item.options) {
        item.options.forEach(opt => {
            if (opt.value == valueFromServer) {
                item.model = opt
            }
        });
        return item
    } else if (item.label == 'Estatus') {
        if (valueFromServer) {
            item.model = 'Activo'
            item.color = '#10D13A'
        } else {
            item.model = 'Inactivo'
            item.color = '#d1b410'
        }
        return item
    }
    else if (item.key == 'maintenanceType') {
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
    } else {
        item.model = valueFromServer
        return item
    }
}