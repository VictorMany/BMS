import { formatDate } from '../global/actions';

export function getContractsGetter(state) {
    let serviceContract = state.contracts.map(contract => ({
        id: contract.ContractId,
        contractName: contract.contractName,
        user: contract.User?.userName,
        date: formatDate(contract.createdAt),
    }));
    return serviceContract
}

export function getPaginationGetter(state) {
    return state.pagination
}

