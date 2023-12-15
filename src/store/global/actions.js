
export function changeMenu(context) {
    context.commit('CHANGE_MENU')
}

export function formatPayload(context, { keys, textfields }) {
    const fd = new FormData()
    for (let k in keys) {
        if (k == 'photo' && textfields.photo) {
            fd.append(k, textfields['photo']);
        }
        for (let prop in textfields) {
            if (Array.isArray(textfields[prop])) {
                for (let i = 0; i < textfields[prop].length; i++) {
                    for (let key in textfields[prop][i]) {
                        if (k == textfields[prop][i][key]) {
                            if (textfields[prop][i].type === 'select') {
                                fd.append(k, textfields[prop][i].model.value);
                            } else {
                                fd.append(k, textfields[prop][i].model);
                            }
                        }
                    }
                }
            } else {
                // console.log('No es un array. Valor: ' + textfields[prop]);
            }
        }
    }
    console.log('BODY: ', fd);
    return fd
}