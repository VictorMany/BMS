import { formatDateOnly } from '../global/actions';

export function getContractsGetter(state) {
    let serviceContract = state.contracts.map(contract => ({
        id: contract.ContractId,
        contractName: contract.contractName,
        user: contract.User?.userName,
        dates: contract.comodato ? 'Contrato comodato' : formatDateOnly(contract.startDate) + ' - ' + formatDateOnly(contract.endDate),
        comodato: contract.comodato
    }));
    return serviceContract
}

export function getPaginationGetter(state) {
    return state.pagination
}

