import CONFIG from "@config/index";
import { decode } from "jsonwebtoken";
import httpRepository from "@modules/core/repository/http";
import User from "@modules/user/entity";
import PaginationInfo from "@modules/pagination/entity";
import listGroup from "./entity";
import ListGroupEntity from "./entity";

export interface IPaginationInfo {
  pageSize?: number;
  current?: number;
  orderByQuery?: string;
  SearchContent?: string;
  pageNumber?:number;
}

const getInfor = async (payload?: IPaginationInfo, option) => {
  const dataListGroup = await httpRepository.execute({
    path: `/api/Group?PageSize=${payload?.pageSize || 10}&PageNumber=${
      payload?.current || 1
    }&SearchContent=${option?.search || ""}`,
    method: "get",
    payload,
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  });
  return {
    data: ListGroupEntity.createArrayListGroup(dataListGroup.pagedData),
    info: new PaginationInfo(dataListGroup.pageInfo),
  };
};

const deleteListGroup = async (payload) => {
  await httpRepository.execute({
    path: `/api/Group`,
    method: "delete",
    payload: {
      data: payload,
    },
    config: { isPrivate: true },
  });
};
const addListGroup = async (payload) => {
  await httpRepository.execute({
    path: `/api/Group`,
    method: "post",
    payload,
    config: { isPrivate: true },
  });
};
const updateListGroup = async (payload, id) => {
  await httpRepository.execute({
    path: `/api/Group/${id}`,
    method: "put",
    payload,
    config: { isPrivate: true },
  });
};
const detailListGroup = async (id) => {
  return await httpRepository.execute({
    path: `/api/Group/${id}`,
    showError: false,
    showSuccess: false,
  });
};
const updateExtend = async (payload, id) => {
  await httpRepository.execute({
    path: `/api/Group/extendTime/${id}`,
    method: "put",
    payload,
    config: { isPrivate: true },
  });
};

const updateStatusGroup = async (id) => {
  await httpRepository.execute({
    path: `/api/Group/active/${id}`,
    method: "put",
    config: { isPrivate: true },
  });
};
const activeGroup = async (id) => {
  await httpRepository.execute({
    path: "/api/Group/actives",
    method: "put",
    payload: id,
    config: { isPrivate: true },
  });
};
const unActiveGroup = async (id) => {
  await httpRepository.execute({
    path: "/api/Group/unActives",
    method: "put",
    payload: id,
    config: { isPrivate: true },
  });
};
const getFullGroupForBusinessContract = async () => {
  return await httpRepository.execute({
    path: "/api/Group/full",
    convert: (res) => {
      if(!res) return;
      return ListGroupEntity.createArrayListGroup(res);
    },
    showError: true,
    showSuccess: false,
  })
}
const getGroupById = async (id) => {
  return await httpRepository.execute({
    path: `/api/Group/${id}`,
    method: "get",
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  });
};

export default {
  getInfor,
  deleteListGroup,
  addListGroup,
  detailListGroup,
  updateListGroup,
  updateExtend,
  updateStatusGroup,
  activeGroup,
  unActiveGroup,
  getFullGroupForBusinessContract,
  getGroupById
};
