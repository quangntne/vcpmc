import { RootState } from "@modules/core/store/redux";
import { Permission, PermissionModule } from "@modules/roles/interface";
import RoleStore from "@modules/roles/roleStore";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { Form, Checkbox, Row, Col } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./../../styles.scss";

const ListPermission = ( { permission } ) => {
  const listPermiss = useSelector(
    ( state: RootState ) => state.permissionStore.listPermission
  );
  const roleEdited = useSelector( ( state: RootState ) => state.roleStore.roleEdited );

  const param: any = useParams();

  const dispatch = useDispatch();
  const dispatchSetCheckListPermission = ( data ) => dispatch( RoleStore.actions.setCheckedListPermission( data ) );

  const [ checkedList, setCheckedList ] = React.useState( [] );
  const [ indeterminate, setIndeterminate ] = React.useState( false );
  const [ checkAll, setCheckAll ] = React.useState( false );

  const [ listCheckboxPermiss, setlistCheckboxPermiss ] = React.useState( [] );
  React.useEffect( () => {
    if ( listPermiss && listPermiss.length > 0 ) {
      listPermiss.map( ( perModule: PermissionModule ) => {
        return perModule.permissions.map( ( per: Permission ) => {
          return listCheckboxPermiss.push( per.permissionCode );
        } );
      } );
    }

    if ( param?.roleId && roleEdited?.rolePermissions && roleEdited?.rolePermissions.length >= 0 ) {
      let lstPermissionCode = roleEdited.rolePermissions.map(item => item.permissionCode)
      setCheckedList( lstPermissionCode );
      setCheckAll( lstPermissionCode.length === listCheckboxPermiss.length );
    }
  }, [] );
  const renderListPer = ( permission: Array<Permission> ) => {
    if ( permission && permission.length > 0 ) {
      return permission.map( ( item: Permission ) => {
        return (
          <Row className="listper-row">
            <Col span={ 2 } className="listper-col">
              <Checkbox value={ item.permissionCode } />
            </Col>
            <Col span={ 10 } offset={ 1 } className="listper-name">
              { item.permissionName }
            </Col>
            <Col span={ 11 } className="listper-code">
              { item.permissionCode }
            </Col>
          </Row>
        );
      } );
    }
  };

  React.useEffect( () => {
    dispatchSetCheckListPermission( { data: checkedList } );
  }, [ checkedList ] );

  const onChangeGroupCheckbox = ( list ) => {
    setCheckedList( list );
    setIndeterminate( !!list.length && list.length < listCheckboxPermiss.length );
    setCheckAll( list.length === listCheckboxPermiss.length );
  };



  const onCheckAllChange = ( e ) => {

    setCheckedList( e.target.checked ? listCheckboxPermiss : [] );
    setIndeterminate( false );
    setCheckAll( e.target.checked );
  };
  const _lang = useTranslate( "roleTranslateKey", "templateKey" );

  return (
    <>

      <h6 style={{color:"#fff"}}> { `${ _lang.DECENTRALIZATION } ${ _lang.FUNCTIONAL }` }</h6>
      <div className="group-check-permission">

        <Form.Item name="listPermission">
          <Row className="per-td">
            <Col span={ 8 }>
              { _lang.GROUP_NAME } { _lang.FUNCTIONAL }
            </Col>
            <Col span={ 2 }>
              <Checkbox
                indeterminate={ indeterminate }
                checked={ checkAll }
                onChange={ onCheckAllChange }
              />
            </Col>
            <Col span={ 7 }>{ _lang.FUNCTIONAL }</Col>
            <Col span={ 7 }>
              { _lang.CODE } { _lang.FUNCTIONAL }
            </Col>
          </Row>

          <Checkbox.Group
            value={ checkedList }
            onChange={ onChangeGroupCheckbox }
          >
            { listPermiss &&
              listPermiss.length > 0 &&
              listPermiss.map( ( module: PermissionModule, index: number ) => {
                return (
                  <Row className="per-row">
                    <Col span={ 8 } className="per-module">
                      { module.moduleName }
                    </Col>
                    <Col span={ 16 } className="per-listPer">
                      { renderListPer( module.permissions ) }
                    </Col>
                  </Row>
                );
              } ) }
          </Checkbox.Group>
        </Form.Item>
      </div>
    </>
  );
};

export default ListPermission;
