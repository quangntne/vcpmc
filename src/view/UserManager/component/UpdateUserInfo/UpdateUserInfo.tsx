import listGroupPresenter from "@modules/listGroup/presenter";
import User from "@modules/user/entity";
import userPresenter from "@modules/user/presenter";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import NoteForm from "@view/shared/components/NoteForm";
import { validateMessages } from "@view/shared/helper/functions";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { representativeTranslateKey } from "@view/shared/translateKey";
import { Row, Form, Col, Input, Button, Select, Radio } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";
import { useHistory, useParams } from "react-router";
import { routerRole } from "@config/path";
import { formUser } from "@view/UserManager/interface";
import "./../../../Representative/UpdateRepresentati/style.scss";
import { useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";

const UpdateUserInfo = () => {
  const userEdited = useSelector( ( state ) => state.userStore.userEdited );
  const history = useHistory();
  const param = useParams<any>();
  const [ form ] = Form.useForm();


  //state
  const [ groupName, setGroupName ] = React.useState( "" );
  //const [user, setUser] = React.useState<User>();

  const { getUserById, updateUser, addUser } = userPresenter;
  const [ getUser, createNewUser, updateUserInfo ] = useAsync( getUserById, addUser, updateUser);


  React.useEffect( () => {
    if ( userEdited ) {
      getUser.execute( param?.userId ).then( res => {
        //setUser(res);
        form.setFieldsValue( res );
      } );
    } else {
      form.resetFields();
    }
  }, [] );
  // const [getGroup, getUser] = useAsync(getGroupById, getUserById);
  const _lang = useTranslate( "representativeTranslateKey" );
  const {
    AU_USER,
    NOTE_RED_POINT,
    EDIT,
    USER,
    ACTIVE_USER,
    DEACTIVE,
    CANCEL,
    SAVE,
    ADD,
  } = useTranslate(
    "representativeTranslateKey",
    "common",
    "sideBarTranslateKey"
  );

  const data = [
    {
      name: AU_USER,
      href: routerRole.USER_AND_ROLE,
    },
    {
      name: param?.userId ? EDIT + " " + USER : ADD + " " + USER,
    },
  ];
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0 },
  };

  const handleChange = ( value ) => {
    form.setFieldsValue( { roleId: value } );
  };
  const onChangeCheckbox = ( value ) => {
    console.log( value, 'value' );
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const onFinish = ( values: any ) => {
    console.log({...userEdited,...values}, 'values', param)
    if ( userEdited?.userId ) {
      // update
      console.log( 'update' );
      updateUserInfo
      .execute( {...userEdited,...values}, param?.userId )
      .then( res => {
        console.log(res)
        form.resetFields()
      } )
      .catch( err => console.log( err ) );
    } else {
      // create
      createNewUser
        .execute( { ...values, userLevel: "1" } )
        .then( res => {
          form.resetFields();
        } ).catch( err => console.log( err ) );
    }
  };
  const onFinishFailed = ( e ) => {
    console.log( e );
  };

  const listRole = useSelector( ( state: RootState ) => state.roleStore.listRole );

  const renderForm = () => {
    const listForm = formUser();
    if ( !param?.userId ) {
      listForm.splice( listForm.length - 1, 1 );
    }
    return listForm.map( ( item ) => {
      const renderItem = () => {
        switch ( item.name ) {
          case "userStatus": {
            return (
              <Form.Item
                key={ item.name }
                name={ item.name }
                label={ _lang[ item.label ] || item.label }
                rules={ [ { required: item.require } ] }
              >
                <Radio.Group className="radio-eidt" onChange={ onChangeCheckbox }>
                  <Radio value={ 1 }>{ ACTIVE_USER }</Radio>
                  <Radio value={ 0 }>{ DEACTIVE }</Radio>
                </Radio.Group>
              </Form.Item>
            );
          }
          case "roleId": {
            return (
              <Form.Item
                key={ item.name }
                name={ item.name }
                label={ _lang[ item.label ] || item.label }
                rules={ [ { required: item.require } ] }
              >
                <Select className="label-iput-phone" onChange={ handleChange }>
                  { listRole &&
                    listRole.map( ( item ) => {
                      if ( userEdited ) {
                        return ( item.roleLevel === userEdited.userLevel ) && (
                          <Select.Option value={ item.roleId }>
                            { item.roleName }
                          </Select.Option>
                        );
                      } else {
                        return (
                          <Select.Option value={ item.roleId }>
                            { item.roleName }
                          </Select.Option>
                        );
                      }
                    } ) }
                </Select>
              </Form.Item>
            );
          }
          case "userPassword": {
            return (
              <Form.Item
                key={ item.name }
                name={ item.name }
                label={ _lang[ item.label ] || item.label }
                rules={ [ { required: item.require } ] }
              >
                <Input.Password
                  className="label-input-edit"
                  iconRender={ ( visible ) =>
                    visible ? <EyeInvisibleOutlined /> : <EyeOutlined />
                  }
                />
              </Form.Item>
            );
          }
          case "userPhoneNumber":
            return (
              <Form.Item
                key={ item.name }
                name={ item.name }
                label={ _lang[ item.label ] || item.label }

                rules={ [
                  {
                    required: item.require,
                  },
                  {
                    pattern: item.pattern,
                    message: "Phone number is invalid format"
                  },
                ] }
              >
                <Input className="label-input-edit" />
              </Form.Item>
            );
          case "userEmail":
            return (
              <Form.Item
                key={ item.name }
                name={ item.name }
                label={ _lang[ item.label ] || item.label }
                rules={ [ { required: item.require, type: item.type } ] }
              >
                <Input className="label-input-edit" />
              </Form.Item>
            );
          default: {
            return (
              <Form.Item
                key={ item.name }
                name={ item.name }
                label={ _lang[ item.label ] || item.label }
                rules={ [ { required: item.require } ] }
              >
                <Input className="label-input-edit" />
              </Form.Item>
            );
          }
        }
      };

      return (
        <Col lg={ 12 } sm={ 24 } xs={ 24 }>
          { renderItem() }
        </Col>
      );
    } );
  };

  return (
    <div>
      <MainTitleComponent breadcrumbs={ data } />
      <Form
        { ...layout }
        autoComplete="false"
        form={ form }
        name="formedituser"
        // onFinish={handleOk}
        scrollToFirstError
        id="formedituser"
        validateMessages={ validateMessages }
        className="mt-5 quang-tran-form form-edit-user"
        onFinish={ onFinish }
        onFinishFailed={ onFinishFailed }

      >
        <Row>{ renderForm() }</Row>
        <div className="mt-5 location">
          <label>
            <span className="point-red" />
            <span style={ { opacity: "0.6" } }>{ NOTE_RED_POINT }</span>
          </label>
        </div>
        <Row className="mt-3" gutter={ 25 }>
          <Col className="col-save" lg={ 12 } sm={ 24 } xs={ 24 }>
            <Form.Item { ...tailLayout } className="text-right">
              <Button
                type="primary"
                className="btn-cancel-form"
                onClick={ () => history.push( routerRole.USER_AND_ROLE ) }
              >
                { CANCEL }
              </Button>
            </Form.Item>
          </Col>
          <Col className="col-save" lg={ 12 } sm={ 24 } xs={ 24 }>
            <Form.Item { ...tailLayout } key="submit">
              <Button
                type="primary"
                className="btn-save-form"
                htmlType="submit"
              >
                { SAVE }
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateUserInfo;
