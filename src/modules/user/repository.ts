import httpRepository, { HTTPRepository } from "@modules/core/repository/http";
import User from "@modules/user/entity";
import PaginationInfo from "@modules/pagination/entity";
import { IPaginationInfo } from "@modules/listGroup/repository";
import { IOption } from "@view/shared/components/TableComponent/interface";

// export interface IPaginationInfo {
//   pageSize?: number;
//   pageNumber?: number;
//   orderByQuery?: string;
//   SearchContent?: string;
// }

const getListUser = async () => {
  return await httpRepository.execute( {
    path: `/api/Users`,
    convert: ( res ) => {
      return [
        res.pagedData.map( ( user ) => {
          return {
            ...new User( { ...res } ),
          };
        } ),
      ];
    },
  } );
};

const getUserForPlaylist = async ( groupId: string = "null" ) => {
  return await httpRepository.execute( {
    path: `/api/Group/users/${ groupId }`,
    method: "get",
    showSuccess: false,
    showError: false,
    convert: ( res ) => {
      return res?.pagedData.map( ( user, index ) => {
        return new User( { ...user } );
      } );
    },
  } );
};

const getAllUser = async ( level ) => {
  return await httpRepository.execute( {
    path: `/api/Users/byLevel/${ level }`,
    method: "get",
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  } );
};

const getAllRole = async () => {
  return await httpRepository.execute( {
    path: `/api/Roles/showByLevel?level=0`,
    method: "get",
    showSuccess: false,
    showError: false,
    config: { isPrivate: true },
  } );
};

const getAllRoleUser = async () => {
  return await httpRepository.execute( {
    path: `/api/Roles/showByLevel?level=1`,
    method: "get",
    showSuccess: false,
    showError: false,
    config: { isPrivate: true },
  } );
};

const addUser = async ( payload ) => {
  return await httpRepository.execute( {
    path: `/api/Users`,
    method: "post",
    payload,
    config: { isPrivate: true },
  } );
};
const updateUser = async ( payload, id ) => {
  return await httpRepository.execute( {
    path: `/api/Users/${ id }`,
    method: "put",
    payload,
    config: { isPrivate: true },
  } );
};
const updateStatusUnactives = async ( id ) => {
  return await httpRepository.execute( {
    path: `/api/Users/unActives`,
    method: "put",
    payload: id,
    config: { isPrivate: true },
  } );
};

const getAllPermission = async () => {
  return await httpRepository.execute( {
    path: `/api/Permissions/showByLevel?level=0`,
    method: "get",
    showSuccess: false,
    config: { isPrivate: true },
  } );
};
const getAllPermissionUserSystem = async () => {
  return await httpRepository.execute( {
    path: `/api/Permissions/showByLevel?level=1`,
    method: "get",
    showSuccess: false,
    config: { isPrivate: true },
  } );
};

const updateStatusActives = async ( id ) => {
  return await httpRepository.execute( {
    path: `/api/Users/actives`,
    method: "put",
    payload: id,
    config: { isPrivate: true },
  } );
};

const deleteUser = async ( payload ) => {
  return await httpRepository.execute( {
    path: `/api/Users/DeleteMany`,
    method: "post",
    payload,
    config: { isPrivate: true },
  } );
};

const updateExtend = async ( payload, id ) => {
  await httpRepository.execute( {
    path: `/api/Users/exptendTime/${ id }`,
    method: "put",
    payload,
    config: { isPrivate: true },
  } );
};
const updatePermission = async ( payload, id ) => {
  await httpRepository.execute( {
    path: `/api/Users/updatePermission/${ id }`,
    method: "put",
    payload,
    config: { isPrivate: true },
  } );
};
const getPermissionUser = async ( id ) => {
  return await httpRepository.execute( {
    path: `/api/Users/permission/${ id }`,
    method: "get",
    config: { isPrivate: true },
    showError: false,
    showSuccess: false,
  } );
};

const getUserFromGroup = async ( payload: IPaginationInfo, option: IOption ) => {
  const params={
    PageSize:payload?.pageSize,
    PageNumber: payload?.current||payload?.pageNumber,
    SearchContent: payload?.SearchContent||option?.search,
    ...option?.filter
  }
  const dataListGroup = await httpRepository.execute( {
    path: `/api/Group/users`,
    method: "get",
    params,
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  });
  return {
    data: dataListGroup.pagedData,
    info: new PaginationInfo( dataListGroup.pageInfo ),
  };
};
const getUser = async ( payload: IPaginationInfo, option ) => {
  const dataListGroup = await httpRepository.execute( {
    path: `/api/Users?PageSize=${ payload?.pageSize || 10 }&PageNumber=${ payload?.current || 1
      }&SearchContent=${ option?.search || "" }`,
    method: "get",
    payload,
    showError: false,
    showSuccess: false,
    config: { isPrivate: true },
  } );
  return {
    data: User.createArrayUser( dataListGroup.pagedData  ),
    info: new PaginationInfo( dataListGroup.pageInfo ),
  };
};

const getUserById = async ( id ) => {
  return await httpRepository.execute( {
    path: `/api/Users/${ id }`,
    method: "get",
    config: { isPrivate: true },
    showError: false,
    showSuccess: false,
    convert: ( res ) => {
      return new User( res );
    },
  } );
};


export default {
  getUserById,
  getListUser,
  getAllUser,
  getUserForPlaylist,
  getAllRole,
  addUser,
  updateUser,
  deleteUser,
  updateStatusUnactives,
  updateStatusActives,
  updateExtend,
  getUserFromGroup,
  getUser,
  getAllRoleUser,
  getAllPermission,
  updatePermission,
  getPermissionUser,
  getAllPermissionUserSystem,
};
