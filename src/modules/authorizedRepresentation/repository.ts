import httpRepository from "@modules/core/repository/http";
import { IOption } from "@view/shared/components/TableComponent/interface";
import AuthorizedRepresentation from "./entity";
import PaginationInfo from "@modules/pagination/entity";

export const getAllAuthorizedRepresentor = async (payload: { pageSize: number; current: number; representationType: number }, option?: IOption) => {
  const tempData = await httpRepository.execute({
    path: `api/AuthorizedRepresentation`,
    method: "get",
    params: {
      PageSize: payload.pageSize,
      PageNumber: payload.current,
      RepresentationType: payload.representationType,
      SearchContent: option?.search,
      ...option.filter
    },
    config: { isPrivate: true },
    showSuccess: false,
  });
  console.log('ListAuthorizedRepresentation', AuthorizedRepresentation.createListAuthorizedRepresentation(tempData.pagedData));

  return {
    data: AuthorizedRepresentation.createListAuthorizedRepresentation(tempData.pagedData),
    info: new PaginationInfo(tempData.pageInfo),
  };
};

const changeStatusAuthorizedRepresentor = async (AuthorizedRepresentationId, RepresentationStatus) => {
  return await httpRepository.execute({
    path: `api/AuthorizedRepresentation/${AuthorizedRepresentationId}`,
    method: "post",
    params: {
      RepresentationStatus,
    },
    config: { isPrivate: true },
  });
};


export default {
  getAllAuthorizedRepresentor,
  changeStatusAuthorizedRepresentor
};
