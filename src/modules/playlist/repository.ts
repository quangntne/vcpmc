import httpRepository from "@modules/core/repository/http";
import Pagination, { PaginationConvert } from "@modules/pagination/entitiy";
import { PaginationRequest } from "@modules/pagination/entity";
import User from "@modules/user/entity";
import { IFormCopyPlaylist, IFormTemplate } from "@view/Playlist/interface";
import PlayList from "./entity";

export const getListPlayList = async (data?, option?) => {
  const paginationRequest = new PaginationRequest({...data, ...option})
  return await httpRepository.execute({
    path: "/api/PlayList",
    params: paginationRequest,
    showSuccess: false,
    convert: (res) => {
      
      return {
        info: new PaginationConvert(res?.pageInfo),
        data: res?.pagedData.map((playlist, index) => {
          return new PlayList(playlist)
        }),
      };
    },
  });
};

export const getPlaylistId = async (id) => {
  return await httpRepository.execute({
    path: "/api/PlayList/" + id,
    showSuccess: false,
    convert: (res) => {
      return new PlayList(res);
    }
  });
};

export const getPlaylistPublic = async () => {
  return await httpRepository.execute({
    path: "/api/Playlist/GetPublic",
    showSuccess: false,
    convert: (res) => {
      return res?.pagedData.map((playlist, index) => {
        return new PlayList(playlist)
      });
    }
  });
};

export const deletePlaylist = async (id) => {
  return await httpRepository.execute({
    path: "/api/PlayList/" + id,
    method: "delete",
  });
};

export const addNewPlaylist = async (payload) => {
  return await httpRepository.execute({
    path: "/api/PlayList",
    method: "post",
    payload,
  });
};

export const editPlaylist = async (payload, param) => {
  return await httpRepository.execute({
    path: "/api/PlayList/" + param,
    method: "put",
    payload,
  });
};


