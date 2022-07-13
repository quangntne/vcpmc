export class authorityUserIFace {
    authorizedRepresentationId: string = "";
    personName: string = "";
    personPassword?: string = "";
    authorizedRepresentationType: 0 | 1;
    userId: string = "";
    personBirthDate?: string = "";
    personGender?: 0 | 1 = 0;
    personNationality?: string = "";
    authorizedRepresentationPhoneNumber?: string = "";
    personIdentify?: string = "";
    personIdentifiIssuanceDate?: string = "";
    personIdentifiIssuancePlace?: string = "";
    personAddress?: string = "";
    authorizedRepresentationUsername?: string = "";
    authorizedRepresentationEmail?: string = "";
    authorizedRepresentationTaxNumber?: string = "";
    authorizedRepresentationBankNumber?: string = "";
    authorizedRepresentationBankName?: string = "";
    organizationName?: string = "";
    organizationAddress?: string = "";
    personTitle?: string = "";
}

export interface auContractIFace {
    authorityContractCode: string,
    authorityContractFile: string,
    authorityContractId: string,
    authorityContractName: string,
    authorityContractParentId: string,
    authorityMedias: string,
    authorityUser: authorityUserIFace,
    bankAccountNo: string,
    bankName: string,
    createAt: string,
    effectiveAt: string,
    expireAt: string,
    fileLinks: Array<any>,
    isExpired: number,
    medias: Array<any>,
    percentCopyRight: number,
    percentPerform: number,
    percentRelate: number,
}