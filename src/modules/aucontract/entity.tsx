import { authorityUserIFace } from "@modules/aucontract/interface";
import * as moment from "moment";
const nowDate = moment().endOf("date");

class AuContractEntity {
    authorizedContractId: string;
    authorizedContractStatus: 0;
    authorizedContractCode: "";
    authorizedContractName: "";
    authorizedContractParentId: "";
    authorityMedias: "";
    authorizedRepresentation: authorityUserIFace = {
        authorizedRepresentationType: 0,
        userId: "",
        authorizedRepresentationId: "",
        personName: "",
        personGender: 1,
    };
    createAt: string = "";
    authorizedContractStart: moment.Moment;
    authorizedContractEnd: moment.Moment;
    fileLinks: Array<any>;
    medias: Array<any>;
    copyrightPercent: 0;
    performPercent: 0;
    producerPercent: 0;
    status: number = 0;
    ownership: string[] = [];

    constructor(aucontract) {
        this.authorizedRepresentation = new authorityUserIFace();
        Object.assign(this, aucontract);
        this.createAt = aucontract?.createAt && moment(aucontract?.createAt).format("DD/MM/YYYY HH:mm:ss");
        this.authorizedContractEnd = moment(aucontract?.authorizedContractEnd);
        this.authorizedContractStart = moment(aucontract?.authorizedContractStart)
        this.fileLinks = aucontract?.authorizedContractAttachments && JSON.parse(aucontract?.authorizedContractAttachments);
        if (this.authorizedContractStatus != 0) {

            if (nowDate < this.authorizedContractStart) {
                this.status = 1;
            } else if (nowDate <= this.authorizedContractEnd) {
                this.status = 2
            } else {
                this.status = 3;
            }
        } else {
            this.status = 4;
        }
        if (this.copyrightPercent > 0) {
            this.ownership.push("copyright_permission")
        }
        if (this.producerPercent > 0) {
            this.ownership.push("producer_permission")
        }
        if (this.performPercent > 0) {
            this.ownership.push("perform_permission")
        }
    }

    static resetEntity() {
        const resetAuthorizedRepresentation = new AuContractEntity({}).authorizedRepresentation;
        delete resetAuthorizedRepresentation.authorizedRepresentationType;
        return resetAuthorizedRepresentation;
    }

    static createListAuContract(listAuContract) {
        if (!Array.isArray(listAuContract)) return [];
        return listAuContract.map((aucontract) => new AuContractEntity(aucontract));
    }
}

export default AuContractEntity;
