import httpRepository from "@modules/core/repository/http";
import newHttpRepository from "@repository/http";
import Pagination, { PaginationConvert } from "@modules/pagination/entitiy";
import PaginationInfo from "@modules/pagination/entitiy";
import { IOption, IPagination } from "@view/shared/components/TableComponent/interface";
import RecordGalleryEntity, { MediaFormatEntity, MediaRecordGalleryEntities } from "./entity";
import _ from 'lodash';
import { debug } from "console";
import { PaginationRequest } from "@modules/pagination/entity";

function getMedias(playlistId: string) {
  return async (params?: IPagination, options?: IOption) => {
    const paginationRequest = {
      PageSize: params?.pageSize,
      PageNumber: params?.current,
      SearchContent: options?.search,
      ...options?.filter,
    };

    return await httpRepository.execute({
      path: `/api/PlayList/${playlistId}/medias`,
      params: paginationRequest,
      showSuccess: false,
      convert: (res) => {
        return {
          info: new Pagination({ total: res.pageInfo.totalCount }),
          data: res?.pagedData.map((media, index) => {
            return new MediaRecordGalleryEntities(media)
          }),
        };
      },
    });
  }
}
const getListMediaForAddRecordToGallery = async ( playlistId: string) => {
  return await httpRepository.execute({
    path: `/api/PlayList/${playlistId}/medias`,
    showSuccess: false,
    convert: (res) => {
      return {
        info: new Pagination({ total: res.pageInfo.totalCount }),
        data: res?.pagedData.map((media, index) => {
          return new MediaRecordGalleryEntities(media)
        }),
      };
    },
  });
}


const editMedia = async (payload) => {
  return await httpRepository.execute({
    path: `/api/Medias`,
    payload,
    method: "put"
  })
}
const getListNewMedia = async (params) => {
  return await httpRepository.execute({
    path: `/api/Medias`,
    params,
    showError: false,
    showSuccess: false,
    convert: (res) => {
      return {
        data: MediaRecordGalleryEntities.createListMedia(res?.pagedData),
        info: new PaginationConvert(res?.pageInfo),
      }
    }
  })
}
const getListMediaFormat = async (params?) => {
  return await httpRepository.execute({
    params,
    showError: false,
    showSuccess: false,
    path: `/api/MediaFormats`,
    convert: (res) => {
      return MediaFormatEntity.createListMediaFormat(res.pagedData)
    }
  })
}
const getDetailMedia = async (mediaId: string) => {
  return await httpRepository.execute({
    showError: false,
    showSuccess: false,
    path: `/api/Medias/${mediaId}`,
    convert: (res) => {
      return new MediaRecordGalleryEntities(res)
    }
  })
}
const uploadMedia = async (data) => {
  const frmData = new FormData();
  _.mapKeys(data, (bsitem, index) => {
    switch (index) {
      case "mediaContent": {
        return data?.mediaContent?.fileList.reduce((result, item, index) => {
          result.append("mediaContent", item.originFileObj);
          return result;
        }, frmData);
      }
      case "mediaContentOptional": {
        return data?.mediaContentOptional?.fileList.reduce((result, item, index) => {
          result.append("mediaContentOptional", item.originFileObj);
          return result;
        }, frmData);
      }
      default: {
        return frmData.append(index.toString(), data[index]);
      }
    }
  });
  return await newHttpRepository.execute({
    path: `/api/Medias/upload`,
    method: "post",
    payload: frmData,
    config: { isPrivate: true },
  })
};
const approveManyMedia = async (data) => {
  return await newHttpRepository.execute({
    path: `/api/Medias/ApproveMany`,
    method: "post",
    payload: data,
  })
};
const refuseApproveManyMedia = async (data) => {
  return await newHttpRepository.execute({
    path: `/api/Medias/RefuseApproveMany`,
    method: "post",
    payload: data,
  })
};



export default {
  editMedia, getListMediaFormat, getDetailMedia,getListMediaForAddRecordToGallery,
  getListNewMedia, getMedias, uploadMedia, refuseApproveManyMedia, approveManyMedia
};
