import userPresenter from "@modules/user/presenter";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import RightMenu, {
  IArrayAction,
} from "@view/shared/components/layout/RightMenu";
import TableComponent from "@view/shared/components/TableComponent";
import useTable from "@view/shared/components/TableComponent/hook";
import { useAsync } from "@view/shared/hook/useAsync";
import { translate, useTranslate } from "@view/shared/hook/useTranslate";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Selector } from "@reduxjs/toolkit";
import { RootState } from "@modules/core/store/redux";
import User from "@modules/user/entity";
import { useDispatch, useSelector } from "react-redux";
import "./../../styles.scss";
import { routerRole } from "@config/path";
import UserEntity from "@modules/user/entity";
import UserStore from "@modules/user/userStore";
import { Space, Switch } from "antd";

interface IUserManager {
  token: string;
  user: User;
}


const UserManagerSelector: Selector<RootState, IUserManager> = (
  state: RootState
) => {
  return {
    token: state.profile.token,
    user: state.profile.user,
  };
};

const UserManager = () => {
const dispatch = useDispatch();
const dispatchUserEdited = (user) => dispatch(UserStore.actions.setUserEdited({userEdited: user}))


  const table = useTable();
  const { user } = useSelector( UserManagerSelector );
  if ( user == null ) {
    return null;
  }
  // const [dataModal, setDataModal] = useState({
  //   data: [],
  //   visible: false,
  //   type: "",
  // });
  // const [dataModalPer, setDataModalPer] = useState({
  //   data: [],
  //   visible: false,
  // });
  const [ selectedRow, setSelectedRow ] = useState( [] );
  const [ selectedRowKeys, setSelectedRowKeys ] = useState( [] );

  const { deleteUser, updateStatusActives, updateStatusUnactives } =
    userPresenter;
  const [ deleteUsercall, updateStatusActivescall, updateStatusUnactivescall ] =
    useAsync( deleteUser, updateStatusActives, updateStatusUnactives );

  const { ADD, EXPIRED, USER, INACTIVE, ACTIVE, DELETE_USER, DELETE_MUL_USER } =
    useTranslate( "common", "groupList", "sideBarTranslateKey" );

  // const handleCancel = (isReload) => {
  //   setDataModal((pre) => ({ ...pre, visible: false, type: "" }));
  //   isReload && setSelectedRowKeys([]);
  //   isReload && setSelectedRow([]);
  //   isReload && table.fetchData();
  // };
  // const handleCancelPer = (isReload) => {
  //   setDataModalPer((pre) => ({ ...pre, visible: false }));
  //   isReload && setSelectedRowKeys([]);
  //   isReload && setSelectedRow([]);
  //   isReload && table.fetchData();
  // };

  const handleDelete = ( val ) => {
    DeleteConfirm( {
      content: `${ val.length == 1 ? DELETE_USER : DELETE_MUL_USER } ${ val.length == 1 ? val[ 0 ]?.userName : ""
        }  ?`,
      title: `${ DELETE_USER }`,

      handleOk: () => {
        deleteUsercall
          .execute({userIds: selectedRow})
          .then( ( res ) => {
            console.log(res)
            table.fetchData();
            setSelectedRow( [] );
            setSelectedRowKeys( [] );
          } )
          .catch(err=> console.log(err));
      }
        ,
      handleCancel: () => {
        console.log('cancel')
      },
    } );
    setSelectedRow(prev => [])
  };

  const handleActive = () => {
    updateStatusActivescall
      .execute( {
        userIds: selectedRow.map( ( item ) => item?.userId ),
      } )
      .then( ( res ) => {
        table.fetchData();
        setSelectedRow( [] );
        setSelectedRowKeys( [] );
      } );
  };
  const handleDeActive = () => {
    updateStatusUnactivescall
      .execute( {
        userIds: selectedRow.map( ( item ) => item?.userId ),
      } )
      .then( ( res ) => {
        table.fetchData();
        setSelectedRow( [] );
        setSelectedRowKeys( [] );
      } );
  };
  const history = useHistory();
  const arrayAction: IArrayAction[] = [
    {
      icon: "fas fa-plus",
      name: ADD + " " + USER,
      handleAction: () => {
        history.push( routerRole.ADD_USER );
      },

      permissionCode: "USER_CREATE_FE",
    },
    // {
    //   icon: "fas fa-edit",
    //   name: EDIT,
    //   handleAction: () => {
    //     setDataModal({ visible: true, data: selectedRow, type: "edit" });
    //   },
    //   disable: selectedRow.length != 1,
    //   permissionCode: "USER_UPDATE_FE",
    // },
    // {
    //   icon: "fa fa-check",
    //   name: `${ACTIVE} (${selectedRow?.length})`,
    //   handleAction: () => {
    //     handleActive();
    //   },
    //   disable: selectedRow.length <= 0,
    //   permissionCode: "USER_UPDATE_FE",
    // },
    // {
    //   icon: "fa fa-times-circle",
    //   name: `${INACTIVE} (${selectedRow?.length})`,
    //   handleAction: () => {
    //     handleDeActive();
    //   },
    //   disable: selectedRow.length <= 0,
    //   permissionCode: "USER_UPDATE_FE",
    // },
    // {
    //   icon: "fas fa-edit",
    //   name: UPDATE_EX,
    //   handleAction: () => {
    //     setDataModal({ visible: true, data: selectedRow, type: "expired" });
    //   },
    //   disable: selectedRow.length != 1,
    //   permissionCode: "USER_UPDATE_FE",
    // },
    // {
    //   icon: "fas fa-user-shield",
    //   name: PERMISSION,
    //   handleAction: () => {
    //     setDataModalPer({ visible: true, data: selectedRow });
    //   },
    //   disable: selectedRow.length != 1,
    //   permissionCode: "USER_UPDATE_FE",
    // },
    // {
    //   icon: "fas fa-trash-alt",
    //   name: `${DELETE} (${selectedRow?.length}) `,
    //   handleAction: () => {
    //     handleDelete(selectedRow);
    //   },
    //   disable: selectedRow.length <= 0,
    //   permissionCode: "USER_DELETE_FE",
    // },
  ];

  const columns = [
    {
      title: "NAME",
      dataIndex: "userFullName",
    },
    {
      title: "USER_NAME",
      dataIndex: "userName"
    },
    {
      title: "ROLES",
      dataIndex: "role",
      render: ( userRole ) => userRole?.roleName,
    },
    {
      title: "STATUS",
      dataIndex: "userStatus",
      render: ( text ) => {
        console.log(text, 'text')

        return (
          <>
          <Space size="small">
            <Switch checked={text==0?false:text==1?true:false} />
            <small>{ text == 0 ? INACTIVE : text == 1 ? ACTIVE : EXPIRED }</small>
          </Space>
          </>
        )
      },
    },
    {
      title: "Email",
      dataIndex: "userEmail",
    },

    {
      title: "PHONE",
      dataIndex: "userPhoneNumber",
    },
    {
      dataIndex: "action",
      render: ( text, record: UserEntity, index ) => {
        return <a className="link-table" onClick={ () =>{
          dispatchUserEdited(record)
          history.push( `${ routerRole.EDIT_USER }/${ record.userId }` )
        } } >Chỉnh sửa</a>;
      },
    },
    {
      dataIndex: "action",
      render: (ext, record: UserEntity, index ) => {
        return <a className="link-table"
          onClick={()=>{
            selectedRow.push(record.userId)
            handleDelete(record)
          }}
        >Xóa</a>;
      },
    },
  ];

  return (
    // <CheckPermission permissionCode={"MANAGER_USER"}>
    <div>
      <TableComponent
        register={ table }
        apiServices={ userPresenter.getUser }
        defaultOption={ { idGroup: user.groupId } }
        columns={ columns }
        search={ { placeholder: USER, align: "right" } }
        langs={ [ "groupList", "common" ] }
      />
      {/* <ModalUploadUser
        dataModal={dataModal}
        onCancelModal={handleCancel}
        userName={selectedRow[0]?.userName}
      />
      <ModalPermision
        dataModalPer={dataModalPer}
        onCancelModalPer={handleCancelPer}
        userData={selectedRow[0]}
      />
      */}
      <RightMenu arrayAction={ arrayAction } />
    </div>
    // </CheckPermission>
  );
};

export default UserManager;
