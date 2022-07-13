import CheckPermission from "@view/shared/hoc/CheckPermission";
import React, { ReactNode } from "react";
import "./styles.scss";
import * as Unicons from '@iconscout/react-unicons';
import * as Icon from "react-feather";
import { CSVLink } from 'react-csv';
import { useDispatch } from "react-redux";
import UserStore from "@modules/user/userStore";


export interface IArrayAction {
  icon?: any;
  name?: string;
  handleAction?: any;
  isAllow?: boolean;
  disable?: any;
  permissionCode?: string;
  iconType?:
  | "add"
  | "delete"
  | "edit"
  | "cancel"
  | "check"
  | "lock"
  | "logout"
  | "info"
  | "report"
  | "check"
  | "import"
  | "fileEdit"
  | "CalenDa";
  imgIcon?: any;
}

interface SelectIconType extends Omit<IArrayAction, "iconType"> {
  iconType?:
  | "add"
  | "delete"
  | "edit"
  | "cancel"
  | "check"
  | "lock"
  | "logout"
  | "info"
  | "report"
  | "check"
  | "import"
  | "fileEdit"
  | "CalenDa";
}


interface Iprops {
  csvReport?: any;
  arrayAction?: Array<any>;
}

const RightMenu = (props: Iprops) => {
  const { arrayAction } = props;
  const changeAction = (index) => {
    if (!arrayAction[index].disable) {
      arrayAction[index].handleAction();
    }
  };
  if (
    arrayAction.filter((i) => {
      return typeof i.isAllow == "undefined" || i.isAllow;
    }).length == 0
  ) {
    return <></>;
  }

  if (arrayAction?.length == 0) {
    return <></>;
  }

  const renderIcon = (item: IArrayAction) => {
    if (typeof item.icon == "string") {
      return <i className={item.icon} aria-hidden="true" />;
    } else if (item.icon) {
      return item.icon;
    } else if (item.iconType) {
      switch (item.iconType) {
        case "add":
          return <Icon.Plus size="27" className="icon-feather" />;
        case "edit":
          return <Icon.Edit size="27" className="icon-feather" />;
        case "delete":
          return (
            <Icon.Trash2 size="27" className="icon-feather red-icon" />
          );
        case "cancel":
          return <Icon.X size="27" className="icon-feather red-icon" />;
        case "check":
          return (
            <Icon.Check size="27" className="icon-feather green-icon"  />
          );
        case "lock":
          return <Icon.Lock size="27" className="icon-feather" />;
        case "logout":
          return <Icon.LogOut size="27" className="icon-feather" />;
        case "info":
          return <Icon.Info size="27" className="icon-feather" />;
        case "report":
          return <Unicons.UilReceipt size="27" className="icon-feather" />;
        case "check":
          return <Unicons.UilFileCheckAlt size="27" className="icon-feather" />;
        case "import":
          return <CSVLink {...props?.csvReport} className="icon-feather lable-icon-import"><Unicons.UilFileExport size="27" /></CSVLink>;
        case "fileEdit":
          return <Unicons.UilFileEditAlt size="27" className="icon-feather" />;
        case "CalenDa":
          return <Unicons.UilCalendarAlt size="27" className="icon-feather" />;
        default:
          break;
      }
    } else if (item?.imgIcon) {
      return <img src={item?.imgIcon} alt="" style={{ width: "25px" }} />
    }
  };
  const renderRightMenuContent = () => {
    return arrayAction.map((item, index) => {
      const renderItem = () => {
        return (
          <a
            key={index}
            className={`item ${item.disable == true ? "no-click" : ""}`}
            onClick={() => changeAction(index)}
          >
            <div className="item__icon">{renderIcon(item)}</div>
            <p className="item__name">{item.name}</p>
          </a>
        );
      };
      if (item.isAllow == false) {
        return <></>;
      }
      if(item.permissionCode=== "USER_CREATE_FE"){
        const dispatch = useDispatch()
        const dispatchUserEdited= () => dispatch(UserStore.actions.setUserEdited({userEdited : null}))
        return (
          <a
            key={index}
            className={`item ${item.disable == true ? "no-click" : ""}`}
            onClick={() => {
              dispatchUserEdited();
              changeAction(index)
            }}
          >
            <div className="item__icon">{renderIcon(item)}</div>
            <p className="item__name">{item.name}</p>
          </a>
        );
      }
      // else if (item.permissionCode) {
      //   return (
      //     <CheckPermission permissionCode={item.permissionCode}>
      //       {renderItem()}
      //     </CheckPermission>
      //   );
      // }
       else {
        return renderItem();
      }
    });
  };
  return (
    <div className={`right ${arrayAction?.length > 8 ? "right-long" : ""}`}>
      <div className="right__menu">
        <div className="right__menu__content">{renderRightMenuContent()}</div>
        {arrayAction?.length > 8 && (
          <div className="right__menu__down">
            <i className="fas fa-caret-down"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightMenu;
