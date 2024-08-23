import service from 'src/api/contracts'
import { formatDate } from '../global/actions';

export async function getContractsAction(context, params) {
    return service.getContracts(params).then(async (response) => {
        if (response.status == 200) {
            context.commit('MUTATE_SERVICE_CONTRACTS', response.data.contents.contracts)
            context.commit('MUTATE_DETAILS', response.data.contents)

            let obj = response.data.contents;
            obj.rowsNumber = obj.contracts.length
            delete obj.reports

            return obj
        } else {
            return response
        }
    })
}

export async function getContractAction(context, params) {
    return service.getContract(params.id).then(async (response) => {
        if (response.status == 200) {
            // We call the global action to format our payload
            let res = response.data.contents.contract

            const payload = {
                observations: res.observations,
                contractName: res.contractName,
                equipments: res.Equipment,
                equipmentIds: res.equipmentIds,
                createdAt: formatDate(res.createdAt),
                startDate: res.startDate,
                endDate: res.endDate,
                comodato: res.comodato,
                contractStatus: res.contractStatus,
                file: res.documentUrls?.length > 0 ? res.documentUrls[0] : null,
                id: res.ContractId
            }
            return payload
        } else {
            return response
        }
    })
}

export async function postContractAction(context, payload) {

    // // We call the global action to format our payload
    const formData = new FormData();
    formData.append('contractName', payload.contractName);
    formData.append('observations', payload.observations);
    formData.append('equipmentIds', payload.equipmentIds);
    formData.append('comodato', payload.comodato);
    formData.append('startDate', payload.startDate ? payload.startDate : null);
    formData.append('endDate', payload.endDate ? payload.endDate : null);
    formData.append('maintenanceDates', payload?.maintenanceDates ? payload.maintenanceDates : null);
    formData.append('file', payload?.file ? payload.file : null);

    return await service.postContract(formData).then(async (response) => {
        if (response.status == 201) {
            return true
        } else {
            return response
        }
    })
}

export async function deleteContractAction(context, contract) {
    return await service.deleteContract(contract).then(async (response) => {
        if (response.status == 200) {
            return true
        } else {
            return response
        }
    })
}


export async function updateContractAction(context, payload) {
    // Those are the keys you need in your payload and find in the fields

    const formData = new FormData();
    formData.append('contractName', payload.contractName);
    formData.append('observations', payload.observations);
    formData.append('equipmentIds', payload.equipmentIds);
    formData.append('comodato', payload.comodato);
    formData.append('startDate', payload.startDate ? payload.startDate : null);
    formData.append('endDate', payload.endDate ? payload.endDate : null);
    // formData.append('maintenanceDates', payload?.maintenanceDates ? payload.maintenanceDates : null);
    if (payload?.file)
        formData.append('file', payload?.file);

    if (payload?.removeDocument)
        formData.append('removeDocument', true);

    return await service.updateContract(formData, payload.id).then(async (response) => {
        if (response.status == 200) {
            // context.commit('ADD_MAINTENANCE', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}