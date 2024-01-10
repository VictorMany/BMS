
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

export function formatTextfields(context, { keys, textfields }) {

    for (let k in keys) {
        textfields.image = keys.photo

        for (let prop in textfields) {
            if (Array.isArray(textfields[prop])) {
                for (let i = 0; i < textfields[prop].length; i++) {
                    for (let key in textfields[prop][i]) {
                        if (k == textfields[prop][i][key]) {
                            // Verificar si la clave ya existe en FormData
                            if (textfields[prop][i].type === 'select') {
                                textfields[prop][i].model.value = keys[k]
                            } if (textfields[prop][i].type === 'status') {
                                textfields[prop][i] = getColorStatus(textfields[prop][i], keys[k])
                            } else {
                                console.log(keys[k], k, keys)
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

    console.log('ESTOS SON LOS TEXTFIELDS LLENOS', this.textfields)
    return textfields;
}


function getColorStatus(item, keys) {
    console.log(item, keys)
    item.model = 'Activo'
    item.color = '#10D13A'

    return item
}