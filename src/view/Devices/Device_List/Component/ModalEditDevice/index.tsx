import React, {useEffect} from "react";
import {Button, Col, DatePicker,
    Form, Input, Modal, Radio, Row,
} from "antd";
import {MinusCircleOutlined} from "@ant-design/icons";
import "./styles.scss";
import RepositoryDevice from "@modules/devices/repository";
import * as moment from "moment";
import {useTranslate} from "@hook/useTranslate";
import {common, deviceTranslateKey} from "@translateKey/index";
// import devicesPresenter from "@modules/devices/presenter";
import {decode} from "jsonwebtoken";
import CONFIG from "@config/index";
import CheckPermission from "@hoc/CheckPermission";
import notificationByLanguage from "@view/shared/components/Notification";

// const {Option} = Select;
const {TextArea} = Input;
const token: any = decode(localStorage.getItem(CONFIG.TOKEN_FEILD));

const ModalEditDevice = (props) => {
    const {visible, onCancel, data, handleOke} = props;

    const [form] = Form.useForm();
    const {
        Device_Name, MAC_Address, SKU_ID, Warranty_Expired, Location, Deactivate, Activate, Label_Modal_Edit, Device_Status,
        Note, Login_Name, Save, Cancel, Whitespace, License_Date, Add_Setting,
        Setting, Miss_Key, Miss_Value, Group_user,
    } = useTranslate("deviceTranslateKey");
    // const { getGroupUser } = devicesPresenter;
    // const [listGroup, setListGroup] = useState([]);
    const {VALIDATE_REQUIRE} = useTranslate("common");
    const validateMessages = {
        required: VALIDATE_REQUIRE + " ${label}!",
    };

    useEffect(() => {
        if (visible) {
            if (data?.deviceSetting) {
                const dataSetting = Object.keys(data?.deviceSetting).map((item) => ({
                    key: item,
                    value: data?.deviceSetting[item],
                }));
                form.setFieldsValue({DeviceSetting: dataSetting});
            }

            form.setFieldsValue({
                DeviceName: "Device12233444",//data?.deviceName,
                DeviceSku: "123345456789",//data?.deviceSku,
                DeviceMACAddress: "113.56.79.01",//data?.deviceMACAddress,
                LoginName: "User322334",//data?.loginName,
                DeviceLocation: "Ho Chi Minh",//data?.deviceLocation,
                DeviceStatus: 1,//data?.deviceStatus,
                // DeviceComment: data?.deviceComment,
                // DeviceExpired: moment(data?.deviceExpiredDateTime),
                // DeviceWarrantyExpiresDate: moment(data?.deviceWarrantyExpiresDate),
                // GroupId: data?.groupUserName,
            });
            // if(listGroup.length == 0){
            //     getGroupUser().then(res => {
            //         // console.log(res, "res======")
            //         setListGroup(res);
            //     })
            // }
            // console.log(data?.groupUserName, "data====");
        }
    }, [visible]);

    function disabledDate(current) {
        // Can not select days before today
        return current && current < moment().startOf("day");
    }

    const onFinish = (values: any) => {
        // const setting = {};
        // if (values.DeviceSetting) {
        //     values.DeviceSetting.forEach((item) => (setting[item.key] = item.value));
        // }
        // values.DeviceSetting = setting;
        // const frmData = new FormData();
        // frmData.append("DeviceName", values.DeviceName);
        // frmData.append("DeviceSku", values.DeviceSku);
        // frmData.append("DeviceMACAddress", values.DeviceMACAddress);
        // frmData.append("LoginName", values.LoginName);
        // frmData.append("DeviceLocation", values.DeviceLocation);
        // // frmData.append("DeviceStatus", values.DeviceStatus);
        // frmData.append("DeviceComment", values.DeviceComment);
        // frmData.append("DeviceSetting", JSON.stringify(values.DeviceSetting));
        // frmData.append(
        //     "DeviceExpired",
        //     moment(values.DeviceExpired).format("YYYY/MM/DD")
        // );
        // frmData.append(
        //     "DeviceWarrantyExpiresDate",
        //     moment(values.DeviceWarrantyExpiresDate).format("YYYY/MM/DD")
        // );
        // RepositoryDevice.updateDevice(data?.deviceId, frmData).then((res) => {
        //     onCancel(true);
        //     handleOke(true);
        // });

        notificationByLanguage({message: "Update success!",language:"UAS", type:"success"})
        setTimeout(function (){
            onCancel(true);
            // handleOke(true);
        },400)
    };

    const handleSubmit = () => {
        form.submit();
    };

    return (
        <>
            {/* <CheckPermission permissionCode={"EDIT_DEVICE"}> */}
                <Modal
                    width={670}
                    visible={visible}
                    className="main-modal modal-edit-device"
                    onCancel={onCancel}
                    title={`${Label_Modal_Edit} - ${data?.deviceName}`}
                    footer={[
                        <div>

                            <Button className="cancel-button mr-4" onClick={onCancel}>
                                {Cancel}
                            </Button>
                            <Button className="normal-button" onClick={handleSubmit}>
                                {Save}
                            </Button>
                        </div>,
                    ]}
                >
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                        className="main-form form-edit-device"
                        validateMessages={validateMessages}
                    >
                        {/*<TitleComponent title="Specifications" index={2} className="mt-0" />*/}

                        <Form.Item
                            label={`${Device_Name}:`}
                            required
                            rules={[
                                {required: true},
                                {whitespace: true, message: Whitespace},
                            ]}
                            name="DeviceName"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={`${SKU_ID}:`}
                            required
                            rules={[
                                {required: true},
                                {whitespace: true, message: Whitespace},
                            ]}
                            name="DeviceSku"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={`${MAC_Address}:`}
                            required
                            rules={[
                                {required: true},
                                {whitespace: true, message: Whitespace},
                            ]}
                            name="DeviceMACAddress"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={`${Login_Name}:`}
                            required
                            rules={[
                                {required: true},
                                {whitespace: true, message: Whitespace},
                            ]}
                            name="LoginName"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={`${Location}:`}
                            required
                            rules={[
                                {required: true},
                                {whitespace: true, message: Whitespace},
                            ]}
                            name="DeviceLocation"
                        >
                            <Input/>
                        </Form.Item>

                        {/*{token?.is_level == 1 && (*/}
                        {/*    <Form.Item*/}
                        {/*        label={Group_user}*/}
                        {/*        required*/}
                        {/*        name="GroupId"*/}
                        {/*        rules={[*/}
                        {/*            {*/}
                        {/*                required: true,*/}
                        {/*            },*/}
                        {/*        ]}*/}
                        {/*    >*/}
                        {/*        <Input disabled={true}/>*/}
                        {/*    </Form.Item>*/}
                        {/*)}*/}
                        {/*<Form.Item label={License_Date} name="DeviceExpired">*/}
                        {/*    <DatePicker*/}
                        {/*        disabled={true}*/}
                        {/*        className="w-100"*/}
                        {/*        format="DD/MM/YYYY"*/}
                        {/*        disabledDate={disabledDate}*/}
                        {/*    />*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item*/}
                        {/*    label={Warranty_Expired}*/}
                        {/*    name="DeviceWarrantyExpiresDate"*/}
                        {/*>*/}
                        {/*    <DatePicker*/}
                        {/*        className="w-100"*/}
                        {/*        format="DD/MM/YYYY"*/}
                        {/*        disabledDate={disabledDate}*/}
                        {/*    />*/}
                        {/*</Form.Item>*/}
                        <Form.Item
                            label={`${Device_Status}:`}
                            required
                            rules={[{required: true}]}
                            name="DeviceStatus"
                        >
                            <Radio.Group>
                                <Radio value={1}>{Activate}</Radio>
                                <Radio value={2}>{Deactivate}</Radio>
                            </Radio.Group>
                        </Form.Item>
                    {/*    <Form.Item label={Setting}>*/}
                    {/*        <Form.List name="DeviceSetting">*/}
                    {/*            {(fields, {add, remove}) => (*/}
                    {/*                <>*/}
                    {/*                    <div className="list-setting">*/}
                    {/*                        {fields.map((field) => (*/}
                    {/*                            <Row gutter={24}>*/}
                    {/*                                <Col span={8}>*/}
                    {/*                                    <Form.Item*/}
                    {/*                                        {...field}*/}
                    {/*                                        name={[field.name, "key"]}*/}
                    {/*                                        fieldKey={[field.fieldKey, "key"]}*/}
                    {/*                                        rules={[*/}
                    {/*                                            {required: true, message: Miss_Key},*/}
                    {/*                                            {*/}
                    {/*                                                whitespace: true,*/}
                    {/*                                                message: Whitespace,*/}
                    {/*                                            },*/}
                    {/*                                        ]}*/}
                    {/*                                    >*/}
                    {/*                                        <Input autoComplete="off"/>*/}
                    {/*                                    </Form.Item>*/}
                    {/*                                </Col>*/}
                    {/*                                <Col span={15}>*/}
                    {/*                                    <Form.Item*/}
                    {/*                                        {...field}*/}
                    {/*                                        name={[field.name, "value"]}*/}
                    {/*                                        fieldKey={[field.fieldKey, "value"]}*/}
                    {/*                                        rules={[*/}
                    {/*                                            {required: true, message: Miss_Value},*/}
                    {/*                                            {*/}
                    {/*                                                whitespace: true,*/}
                    {/*                                                message: Whitespace,*/}
                    {/*                                            },*/}
                    {/*                                        ]}*/}
                    {/*                                    >*/}
                    {/*                                        <Input autoComplete="off"/>*/}
                    {/*                                    </Form.Item>*/}
                    {/*                                </Col>*/}
                    {/*                                <span className="text-white">*/}
                    {/*        <MinusCircleOutlined*/}
                    {/*            onClick={() => remove(field.name)}*/}
                    {/*        />*/}
                    {/*      </span>*/}
                    {/*                            </Row>*/}
                    {/*                        ))}*/}
                    {/*                    </div>*/}
                    {/*                    <span*/}
                    {/*                        className="float-right cursor-pointer text-white"*/}
                    {/*                        onClick={() => add()}*/}
                    {/*                    >*/}
                    {/*  <i className="fas fa-plus"/> <span>{Add_Setting}</span>*/}
                    {/*</span>*/}
                    {/*                </>*/}
                    {/*            )}*/}
                    {/*        </Form.List>*/}
                    {/*    </Form.Item>*/}
                    {/*    <Form.Item label={Note} name="DeviceComment">*/}
                    {/*        <TextArea autoSize={{minRows: 3}}/>*/}
                    {/*    </Form.Item>*/}
                    </Form>
                </Modal>
            {/* </CheckPermission> */}
        </>
    );
};

export default ModalEditDevice;
