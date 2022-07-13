import Pagination from "@modules/pagination/entitiy";
import moment from "moment";
import BusinessContractEntity from "./entity";
import businessContractRepository from "./repository";
import _, { min } from "lodash";
import { toFirstLowerCase } from "@view/shared/helper/functions";
const businessContractPresenter = { ...businessContractRepository };

type IGetListBusinessContract = {
  data: Array<BusinessContractEntity>;
  info: any;
};

businessContractPresenter.deleteBusinessContract = async (param: string) => {
  const paginationRequest = {
    businessContractId: param,
  };
  return await businessContractRepository
    .deleteBusinessContract(paginationRequest)
    .then((res) => { });
};

businessContractPresenter.getListBusinessContract = async (param?, option?) => {
  const paginationRequest = {
    PageSize: param?.pageSize || null,
    PageNumber: param?.current || null,
    SearchContent: option?.search || null,
  };
  return await businessContractRepository
    .getListBusinessContract(paginationRequest)
    .then((res) => {
      if (!res) return;
      const info = new Pagination({ total: res.pageInfo.totalCount });
      const data = res.pagedData?.map((item) => {
        return new BusinessContractEntity(item);
      });
      return { data, info } as IGetListBusinessContract;
    });
};

businessContractPresenter.getDetailBusinessContract = async (param: string) => {
  const paginationRequest = {
    businessContractId: param,
  };
  return await businessContractRepository
    .getDetailBusinessContract(paginationRequest)
    .then((res) => {
      if (!res) return;
      try {
        res.businessContractAttachments = JSON.parse(
          res.businessContractAttachments
        );
        return new BusinessContractEntity({
          ...res,
        });
      } catch (error) {
        return new BusinessContractEntity({
          ...res,
          businessContractAttachments: [],
        });
      }
    });
};

businessContractPresenter.addBusinessContract = async (values, businessContractId = null) => {
  const formContract = new FormData();
  const newForm = _.mapKeys(values, (value, key) => {
    switch (key) {
      case "businessCustomerBirthday":
      case "businessCustomerIdentityIssuanceDate":
      case "businessContractEnd":
      case "businessContractStart": {
        return formContract.append(key.toString(), value.format("YYYY-MM-DD"));
      }
      case "businessCustomerOrganizationName": {
        return formContract.append("businessOrganizationName", value);
      }
      case "attachmentFiles": {
        return value?.fileList.reduce((result, item, index) => {
          result.append(key, item.originFileObj);
          return result;
        }, formContract);
      }
      default: {
        return formContract.append(key.toString(), value);
      }
    }
  });

  return await businessContractRepository
    .addBusinessContract(formContract, businessContractId)
    .then((res) => {
      return res;
    });

};

export default businessContractPresenter;
