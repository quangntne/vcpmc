import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auContractIFace } from "@modules/aucontract/interface";

export interface IListAuContract {
    listAuContract?: Array<any>,
    infoAu?: auContractIFace,
    effectiveDate?: any,
    expireDate?: any,
    autoComplete?: boolean,
    authorizedRepresentationId?: string,
    userId?: string
}
const iniListAuContract: IListAuContract = {
    listAuContract: [],
    infoAu: {
        authorityContractCode: null,
        authorityContractFile: null,
        authorityContractId: null,
        authorityContractName: null,
        authorityContractParentId: null,
        authorityMedias: null,
        authorityUser: null,
        bankAccountNo: null,
        bankName: null,
        createAt: null,
        effectiveAt: null,
        expireAt: null,
        fileLinks: [],
        isExpired: null,
        medias: [],
        percentCopyRight: 0,
        percentPerform: 0,
        percentRelate: 0,
    },
    effectiveDate: null,
    expireDate: null,
    autoComplete: false,
    authorizedRepresentationId: "",
    userId: ""

};
const auContractStore = createSlice({
    name: 'listAuContract',
    initialState: iniListAuContract as IListAuContract,
    reducers: {
        fetchListAuContract: (state, action: PayloadAction<IListAuContract>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        infoAuContractById: (state, action: PayloadAction<IListAuContract>) => {
            // console.log(action.payload,"action.payload=====")
            return {
                ...state,
                ...action.payload
            }
        },
        getEffectiveDate: (state, action: PayloadAction<IListAuContract>) => {
            state.effectiveDate = { ...state.effectiveDate, ...action.payload };
            state.expireDate = { ...state.expireDate, ...action.payload }

            return state
        },
        autoComplete: (state, action: PayloadAction<IListAuContract>) => {
            state.autoComplete = action.payload.autoComplete;
            return state;
        },
        fetchIDAuRepresenter: (state, action: PayloadAction<IListAuContract>) => {
            state.authorizedRepresentationId = action.payload.authorizedRepresentationId;
            return state;
        },
        fetchUserId: (state, action: PayloadAction<IListAuContract>) => {
            state.userId = action.payload.userId;
            return state;
        },
        remove: (state, action: PayloadAction<IListAuContract>) => {
            state = iniListAuContract
            return state
        }
    }
});

export default auContractStore