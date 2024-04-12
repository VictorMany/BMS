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
                id: res.ContractId
            }
            return payload
        } else {
            return response
        }
    })
}

export async function postContractAction(context, contract) {
    // We call the global action to format our payload
    const payload = {
        contractName: contract.contractName,
        observations: contract.observations,
        equipmentIds: contract.equipmentIds,
        comodato: contract.comodato,
        startDate: contract.startDate ? contract.startDate : null,
        endDate: contract.endDate ? contract.endDate : null,
        maintenanceDates: contract.maintenanceDates
    }

    return await service.postContract(payload).then(async (response) => {
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


export async function updateContractAction(context, contract) {
    // Those are the keys you need in your payload and find in the fields
    const payload = {
        contractName: contract.contractName,
        observations: contract.observations,
        equipmentIds: contract.equipmentIds,
        comodato: contract.comodato,
        startDate: contract.startDate ? contract.startDate : null,
        endDate: contract.endDate ? contract.endDate : null,
        maintenanceDates: contract.maintenanceDates
    }

    return await service.updateContract(payload, contract.id).then(async (response) => {
        if (response.status == 200) {
            // context.commit('ADD_MAINTENANCE', response.data)    // mutamos el arreglo local y agregamos el nuevo usuario, de manera que no consultamos la base de datos
            return true
        } else {
            return response
        }
    })
}