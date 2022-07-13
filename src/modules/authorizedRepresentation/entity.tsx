import * as moment from "moment";
const nowDate = moment().endOf("date");

class AuthorizedRepresentation {
    authorizedContractId: string = "";
    authorizedRepresentationId: string = "";
    authorizedRepresentationType: number = 0;
    authorizedRepresentationTaxNumber: string = "";
    authorizedRepresentationBankNumber: number = 0;
    authorizedRepresentationBankName: string = "";
    authorizedRepresentationPhoneNumber: number = 0;
    authorizedRepresentationEmail: string = "";
    authorizedRepresentationUsername: string = "";
    userId: string = "";
    organizationName: string = "";
    organizationAddress: string = "";
    personName: string = "";
    personGender: number = 0;
    personTitle: string = "";
    personBirthDate: any;
    personIdentify: string = "";
    personIdentifiIssuanceDate: any;
    personIdentifiIssuancePlace: string = "";
    personNationality: string = "";
    personAddress: string = "";
    createAt: any;
    updateAt: any;
    user: string = "";

    constructor(authorizedrepresentation) {
        Object.assign(this, authorizedrepresentation);
        this.personBirthDate = authorizedrepresentation?.personBirthDate && moment(authorizedrepresentation?.personBirthDate);
        this.personIdentifiIssuanceDate = authorizedrepresentation?.personIdentifiIssuanceDate && moment(authorizedrepresentation?.personIdentifiIssuanceDate);
        this.createAt = authorizedrepresentation?.createAt && moment(authorizedrepresentation?.createAt);
        this.updateAt = authorizedrepresentation?.updateAt && moment(authorizedrepresentation?.updateAt);
    }

    static createListAuthorizedRepresentation(listAuthorizedRepresentation) {
        if (!Array.isArray(listAuthorizedRepresentation)) return [];
        return listAuthorizedRepresentation.map((authorizedrepresentation) => new AuthorizedRepresentation(authorizedrepresentation));
    }

}

export default AuthorizedRepresentation