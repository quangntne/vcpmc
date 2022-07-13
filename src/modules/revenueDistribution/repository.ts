import newHttpRepository, { HTTPRepository } from "@modules/core/repository/http";
import User from "@modules/user/entity";
import PaginationInfo from "@modules/pagination/entity";
import { IPaginationInfo } from "@modules/listGroup/repository";
import RevenueDistribution from "./entity";
import CONFIG from "@config/index";

const getContract = async (payload?: IPaginationInfo, option) => {
  const dataContract = await newHttpRepository.execute({
    path: `/api/ReportAuthorityContracts?PageSize=${
      payload?.pageSize || 10
    }&PageNumber=${payload?.pageNumber || 1}&SearchContent=${
      option?.search || ""
    }&dateFrom=${option?.dateFrom || ""}&dateTo=${option?.dateTo || ""}`,
    method: "get",
    payload,
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  });
  return {
    data: RevenueDistribution.createArrayContract(dataContract.pagedData),
    info: new PaginationInfo({
      total: dataContract.pageInfo.totalCount,
    }),
  };
};

const getMusics = async (payload?: IPaginationInfo, option) => {
  if (option?.id == undefined) {
    return;
  }
  const dataMusic = await newHttpRepository.execute({
    path: `/api/ReportAuthorityContracts/${option?.id}?PageSize=${
      payload?.pageSize || 10
    }&PageNumber=${payload?.pageNumber || 1}&SearchContent=${
      option?.search || ""
    }&dateFrom=${option?.dateFrom || ""}&dateTo=${option?.dateTo || ""}`,
    method: "get",
    payload,
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  });
  return {
    data: dataMusic.pagedData,
    info: new PaginationInfo({
      total: dataMusic.pageInfo.totalCount,
    }),
    totalAuthor: dataMusic.totalAuthor,
    totalCountMedia: dataMusic.totalCountMedia,
    totalCountPlaysMedia: dataMusic.totalCountPlaysMedia,
    totalPrice: dataMusic.totalPrice,
    totalVCPMC: dataMusic.totalVCPMC,
  };
};

const getAllMusics = async (id, dateFrom, dateTo) => {
  if (id == undefined) {
    return;
  }

  const dataAllMusic = await newHttpRepository.execute({
    path: `/api/ReportAuthorityContracts/${id}`,
    method: "get",
    showError: false,
    showSuccess: false,
  });
  return {
    dataAllMusic,
  };
};
const getDetailMedia = async (payload?: IPaginationInfo, option) => {
  if (option?.id == undefined) {
    return;
  }
  const dataMusic = await newHttpRepository.execute({
    path: `api/ReportAuthorityContracts/detailMedia/${option?.id}?PageSize=${
      payload?.pageSize || 10
    }&PageNumber=${payload?.pageNumber || 1}&SearchContent=${
      option?.search || ""
    }&dateFrom=${option?.dateFrom || ""}&dateTo=${option?.dateTo || ""}`,
    method: "get",
    payload,
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  });
  return {
    data: dataMusic.pagedData,
    info: new PaginationInfo({
      total: dataMusic.pageInfo.totalCount,
    }),
  };
};
const getAllDetailMedia = async (id, dateFrom, dateTo) => {
  if (id == undefined) {
    return;
  }
  const dataMedia = await newHttpRepository.execute({
    path: `api/ReportAuthorityContracts/detailMedia/${id}`,
    method: "get",
    // payload,
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  });
  return {
    data: dataMedia.pagedData,
    info: new PaginationInfo({
      total: dataMedia.pageInfo.totalCount,
    }),
  };
};
const detailContract = async (id) => {
  if (id == undefined) {
    return;
  }
  const detailContract = await newHttpRepository.execute({
    path: `/api/AuthorityContract/${id}`,
    method: "get",
    // payload,
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  });
  return {
    detailContract,
  };
};

export default {
  getContract,
  getMusics,
  getDetailMedia,
  getAllMusics,
  getAllDetailMedia,
  detailContract,
};
