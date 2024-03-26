import { formatDate } from '../global/actions';

export function getContractsGetter(state) {
    let serviceContract = state.contracts.map(contract => ({
        id: contract.ContractId,
        contractName: contract.contractName,
        user: contract.User?.userName,
        dates: contract.comodato ? 'Contrato comodato' : formatDate(contract.startDate) + ' - ' + formatDate(contract.endDate),
        comodato: contract.comodato
    }));
    return serviceContract
}

export function getPaginationGetter(state) {
    return state.pagination
}

