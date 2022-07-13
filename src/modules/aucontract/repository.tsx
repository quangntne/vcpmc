import PaginationInfo, { IPaginationInfo } from "@modules/pagination/entity";
import CONFIG from "@config/index";
import AuContractEntity from "@modules/aucontract/entity";
import * as moment from "moment";
import newHttpRepository, { HTTPRepository } from "@repository/http";
import { IOption } from "@view/shared/components/TableComponent/interface";
import _ from 'lodash';
import { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";

const getListAuContract = async (payload: { pageSize: number; current: number }, option?: IOption) => {
    const tempData = await newHttpRepository.execute({
        path: "/api/AuthorizedContract",
        method: "get",
        params: {
            PageSize: payload.pageSize,
            PageNumber: payload.current,
            SearchContent: option?.search,
            ...option.filter
        },
        config: { isPrivate: true },
        showSuccess: false,
    });
    return {
        data: AuContractEntity.createListAuContract(tempData.pagedData),
        info: new PaginationInfo(tempData.pageInfo),
    };
};

const getInfoAuContract = async (id) => {
    const tempData = await newHttpRepository.execute({
        path: `/api/AuthorizedContract/${id}`,
        method: "get",
        showSuccess: false,
        config: { isPrivate: true },
    });
    return new AuContractEntity(tempData)
};

const newAuContract = async (data, idCont, arrMedia) => {
    const frmData = new FormData();
    _.mapKeys(data, (bsitem, index) => {
        switch (index) {
            case "authorizedContractStart":
            case "authorizedContractEnd":
            case "personBirthDate":
            case "personIdentifiIssuanceDate": {
                return frmData.append(index.toString(), data[index].format("YYYY-MM-DD"));
            }
            case "attachmentFiles": {
                return data?.attachmentFiles?.fileList.reduce((result, item, index) => {
                    result.append("attachmentFiles", item.originFileObj);
                    return result;
                }, frmData);
            }
            default: {
                return frmData.append(index.toString(), data[index]);
            }
        }
    });
    if (idCont) { frmData.append("authorizedContractParentId", idCont); }
    return await newHttpRepository.execute({
        path: `/api/AuthorizedContract`,
        method: "post",
        payload: frmData,
        config: { isPrivate: true },
    })
};

const updateAuContract = async (data, idCont, arrMedia) => {
    console.log(data, "dataupdate====");
    const frmData = new FormData();
    _.mapKeys(data, (bsitem, index) => {
        switch (index) {
            case "authorizedContractStart":
            case "authorizedContractEnd":
            case "personBirthDate":
            case "personIdentifiIssuanceDate": {
                return frmData.append(index.toString(), data[index].format("YYYY-MM-DD"));
            }
            case "attachmentFiles": {
                return data?.attachmentFiles?.fileList.reduce((result, item, index) => {
                    result.append("attachmentFiles", item.originFileObj);
                    return result;
                }, frmData);
            }
            default: {
                return frmData.append(index.toString(), data[index]);
            }
        }
    });
    if (idCont) { frmData.append("authorizedContractParentId", idCont); }
    return await newHttpRepository.execute({
        path: `api/AuthorizedContract/update/${data.authorityContractId}`,
        method: "post",
        payload: frmData,
        config: { isPrivate: true },
    })
};

const extendAuContract = async (data, id) => {
    const frmData = new FormData();
    _.mapKeys(data, (bsitem, index) => {
        switch (index) {
            case "authorizedContractEnd": {
                return frmData.append(index.toString(), data[index].format("YYYY-MM-DD"));
            }
            case "attachmentFiles": {
                return data?.attachmentFiles?.fileList.reduce((result, item, index) => {
                    result.append("attachmentFiles", item.originFileObj);
                    return result;
                }, frmData);
            }
            default: {
                return frmData.append(index.toString(), data[index]);
            }
        }
    });
    // if (idCont) { frmData.append("authorizedContractParentId", idCont); }
    return await newHttpRepository.execute({
        path: `/api/AuthorizedContract/extent/${id}`,
        method: "post",
        showSuccess: false,
        payload: frmData,
        config: { isPrivate: true },
    })
};

const cancelAuContract = async (data, id) => {
    return await newHttpRepository.execute({
        path: `/api/AuthorizedContract/cancel/${id}`,
        method: "put",
        showSuccess: false,
        payload: data,
        config: { isPrivate: true },
    })
};


const deleteAuContract = async (idCont) => {
    return await newHttpRepository.execute({
        path: `/api/AuthorizedContract/${idCont}`,
        method: "delete",
        config: { isPrivate: true },
    })
};

const getListMediasAuContract = async (payload: IPaginationInfo, option: any) => {
    const tempData = await newHttpRepository.execute({
        path: `api/AuthorizedContract/${option?.idCont}/Medias`,
        method: "get",
        params: {
            PageSize: payload.pageSize,
            PageNumber: payload.current,
            SearchContent: option?.search,
            ...option.filter
        },
        config: { isPrivate: true },
        showSuccess: false,
    });
    return {
        data: MediaRecordGalleryEntities.createListMedia(tempData.pagedData),
        info: new PaginationInfo(tempData.pageInfo),
    };
};

export default {
    getListAuContract,
    getInfoAuContract,
    newAuContract,
    extendAuContract,
    updateAuContract,
    deleteAuContract,
    cancelAuContract,
    getListMediasAuContract
}