import { atom } from "recoil";

export const patientsAtom = atom({
    key: 'patients-atom',
    default: {
        paginationSkipIndex: 1,
        itemsCount: 0,
        patientsItemsLimit:0,
    }
})