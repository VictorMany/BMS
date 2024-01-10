
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

export function formatTextfields(inputJson, { keys, textfields }) {
    const filledModel = {};

    for (const side of ['left', 'right']) {
        if (inputJson[side] && Array.isArray(inputJson[side])) {
            filledModel[side] = inputJson[side].map((item) => {
                const modelKey = keys.find((k) => k === item.model);

                if (modelKey) {
                    if (item.type === 'select') {
                        return { ...item, model: textfields[modelKey].value };
                    } else {
                        return { ...item, model: textfields[modelKey] };
                    }
                }

                return item;
            });
        }
    }

    if (inputJson.textarea) {
        filledModel.textarea = textfields[inputJson.textarea.model];
    }

    if (inputJson.image) {
        filledModel.image = textfields[inputJson.image.model];
    }

    return filledModel;
}
