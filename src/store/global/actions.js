
export function changeMenu(context) {
    context.commit('CHANGE_MENU')
}

export function formatPayload(context, { keys, textfields }) {
    for (let k in keys) {
        for (let prop in textfields) {
            // console.log('Propiedades de textfields.' + prop + ':');
            if (Array.isArray(textfields[prop])) {
                for (let i = 0; i < textfields[prop].length; i++) {
                    for (let key in textfields[prop][i]) {
                        if (k == textfields[prop][i][key]) {
                            if (textfields[prop][i].type === 'select') {
                                console.log('VALORES', k, textfields[prop][i].model.value)
                                keys[k] = textfields[prop][i].model.value
                            } else {
                                console.log('VALORES', k, textfields[prop][i].model)
                                keys[k] = textfields[prop][i].model
                            }
                        }
                    }
                    // console.log('------');
                }
            } else {
                // console.log('No es un array. Valor: ' + textfields[prop]);
            }
            // console.log('======');
        }
    }

    return keys
}