
export function changeMenu(context) {
    context.commit('CHANGE_MENU')
}

export function formatPayload(context, { keys, textfields }) {
    const fd = new FormData();

    for (let k in keys) {
        if (k == 'photo' && textfields.photo) {
            fd.append(k, textfields['photo']);
        }
        for (let prop in textfields) {
            if (Array.isArray(textfields[prop])) {
                for (let i = 0; i < textfields[prop].length; i++) {
                    for (let key in textfields[prop][i]) {
                        if (k == textfields[prop][i][key]) {
                            // Verificar si la clave ya existe en FormData
                            if (!fd.has(k)) {
                                if (textfields[prop][i].type === 'select') {
                                    fd.append(k, textfields[prop][i].model.value);
                                } else {
                                    fd.append(k, textfields[prop][i].model);
                                }
                            }
                        }
                    }
                }
            } else {
                for (let key in textfields[prop]) {
                    if (k == textfields[prop][key]) {
                        // Verificar si la clave ya existe en FormData
                        if (!fd.has(k)) {
                            fd.append(k, textfields[prop].model);
                        }
                    }
                }
            }
        }
    }
    return fd;
}

export async function formatTextfields(context, { keys, textfields }) {
    textfields.image = keys.photo
    textfields.createdAt = await context.dispatch('formatDate', keys.createdAt);

    for (let k in keys) {
        for (let prop in textfields) {
            if (Array.isArray(textfields[prop])) {
                for (let i = 0; i < textfields[prop].length; i++) {
                    for (let key in textfields[prop][i]) {
                        if (k == textfields[prop][i][key]) {
                            if (textfields[prop][i].type === 'status') {
                                textfields[prop][i] = getColorStatus(textfields[prop][i], keys[k])
                            } else if (textfields[prop][i].key === 'userRole') {
                                textfields[prop][i] = getRole(textfields[prop][i], keys[k])
                            } else {
                                textfields[prop][i].model = keys[k]
                            }
                        }
                    }
                }
            } else {
                for (let key in textfields[prop]) {
                    if (k == textfields[prop][key]) {
                        // Verificar si la clave ya existe en FormData
                        textfields[prop][key].model = keys[k]
                    }
                }
            }
        }
    }

    return textfields;
}

export function formatDate(context, date) {
    // Crear un objeto Date a partir de la cadena
    const initialDate = new Date(date);
    // Definir las opciones de formato deseado
    const optFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    // Obtener la fecha formateada
    const fechaFormateada = initialDate.toLocaleDateString('es-ES', optFormat);

    return fechaFormateada;
}


function getColorStatus(item, status) {
    if (status) {
        item.model = 'Activo'
        item.color = '#10D13A'
    } else {
        item.model = 'Inactivo'
        item.color = '#d1b410'
    }
    return item
}


function getRole(item, role) {
    switch (role) {
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
}

