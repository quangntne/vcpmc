import http, { HTTPRepository } from "@modules/core/repository/http";
import CONFIG from "@config/index";
import { businessCustomerEntity, BusinessOrganizationEntity } from "./entity";
// import http from "@repository/http";

const getListBusinessContract = async (params?) => {
  return await http.execute({
    path: "api/BusinessContracts",
    params,
    showSuccess: false,
    showError: false,
  });
};

const getListBusinessOrganization= async (SearchContent?) => {
  return await http.execute({
    path: "api/BusinessOrganization",
    params:{
      PageSize:5,
      PageNumber:1,
      SearchContent
    },
    showSuccess: false,
    showError: false,
    convert:(res) => {
      return BusinessOrganizationEntity.createListBusinessOrganization(res.pagedData);
    }
  });
};

const getDetailBusinessContract = async (params) => {
  return await http.execute({
    path: "api/BusinessContracts/businessContractId",
    params,
    showSuccess: false,
    showError: false,
  });
};

const addBusinessContract = async (payload, businessContractId = null) => {
  return await http.execute({
    path: "api/BusinessContracts" + (businessContractId? "/"+businessContractId: ""),
    method: "post",
    payload,
  });
};

const editBusinessContract = async (payload, params) => {
  return await http.execute({
    path: "api/BusinessContracts",
    method: "post",
    params,
    payload,
  });
};

const deleteBusinessContract = async (params) => {
  return await http.execute({
    path: "api/BusinessContracts/businessContractId",
    method: "delete",
    params,
  });
};
const cancelBusinessContract = async (params, payload?) => {
  return await http.execute({
    path: "/api/BusinessContracts/businessContractId?businessContractId="+params,
    method: "put",
    payload
  });
};

const getListBusinessCustomer = async (SearchContent?) => {
  return await http.execute({
    path: "api/BusinessCustomer",
    params:{
      PageSize:5,
      PageNumber:1,
      SearchContent
    },
    showSuccess: false,
    showError: false,
    convert: (res)=>{
      return businessCustomerEntity.createListBusinessCustomer(res?.pagedData);
    }
  });
};

export default {
  getListBusinessOrganization,
  getListBusinessContract,
  addBusinessContract,
  getDetailBusinessContract,
  deleteBusinessContract,
  editBusinessContract,
  getListBusinessCustomer,
  cancelBusinessContract
};
