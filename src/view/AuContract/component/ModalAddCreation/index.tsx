import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, } from "antd";
import { useTranslate } from "@hook/useTranslate";
import { aucontractTranslateKey } from "@translateKey/index";
import Upload from "@view/shared/components/Upload";
import "./styles.scss";
import store, { RootState } from "@store/redux";
import { validateMessages, useRouter } from "@view/shared/helper/functions";
import { useSelector } from "react-redux";
import MediaCategoriesEntity from "@modules/mediaCategories/entity";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import { routerContract } from "@config/path";

const ModalAddCreation = (props) => {
    const { visible, handleCancel, id } = props;
    const router = useRouter();
    const [form] = Form.useForm();
    const {
        Work_name, Type, Author, Singer, Add_new_creation
    } = useTranslate("aucontractTranslateKey");
    //state
    const [loading, setLoading] = useState<boolean>(false);
    //selector
    const mediaCategories = useSelector((state: RootState) => state.settingStore.mediaCategories)
    const { uploadMedia } = RecordGalleryPresenter;
    const [{ execute: upload }] = useAsync(uploadMedia);
    const handleSubmit = () => {
        form.submit();
    };

    const onFinish = values => {
        setLoading(true);
        const formatValue = Object.assign(values, { AuthorizedContractId: id })
        upload(formatValue).then(res => {
            router.push(routerContract.CONTRACT);
        }).catch(err => {
            console.log('err', err);
        }).finally(() => {
            setLoading(false);
        })

    };

    const handleCancelModal = () => {
        form.resetFields();
        handleCancel();
    };


    return (
        <>
            <Modal className="main-modal extend-contract-modal" visible={visible}
                onCancel={handleCancel} width={700}
                title={Add_new_creation}
                footer={[
                    <div className="text-center">

                        <Button className="cancel-button mr-3" onClick={handleCancelModal}>
                            Huỷ
                           </Button>
                        <Button loading={loading} className="normal-button ml-3" onClick={handleSubmit}>
                            Lưu
                           </Button>
                    </div>
                ]}
            >
                <Form form={form} className="main-form form-new-work" onFinish={onFinish}
                    validateMessages={validateMessages()}
                // initialValues={{
                //     mediaName: "Anh Từng Cố Gắng (Lofi Ver.)",
                //     iSRCCode: "ATCGLV",
                //     mediaAuthor: "Nhật Phong",
                //     mediaPerformer: "Nhật Phong x FreakD",
                //     mediaProducer: "Nhật Phong Entertainment"
                // }}
                >
                    <Form.Item label={Work_name} name={`mediaName`}
                        rules={[{ required: true, message: "This field is required!" }]} required>
                        <Input autoComplete={"off"} />
                    </Form.Item>
                    <Form.Item label={"Mã ISRC"} name={`iSRCCode`}
                        rules={[{ required: true, message: "This field is required!" }]}>
                        <Input autoComplete={"off"} />
                    </Form.Item>
                    <Form.Item label={Author} name={`mediaAuthor`}
                        rules={[{ required: true, message: "This field is required!" }]} required>
                        <Input autoComplete={"off"} />
                    </Form.Item>
                    <Form.Item label={Singer} name={`mediaPerformer`} required
                        rules={[{ required: true, message: "This field is required!" }]}>
                        <Input autoComplete={"off"} />
                    </Form.Item>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label={Type} name={`mediaCategoryId`} required
                                rules={[{ required: true, message: "This field is required!" }]}>
                                {/*<Input autoComplete={"off"}/>*/}
                                <Select>
                                    {/* <Select.Option value={0}>Rap</Select.Option>
                                    <Select.Option value={1}>Ballad</Select.Option>
                                    <Select.Option value={2}>Rock n Roll</Select.Option>
                                    <Select.Option value={3}>R&B</Select.Option> */}
                                    {
                                        mediaCategories && mediaCategories.map(((item: MediaCategoriesEntity) => {
                                            return (
                                                <Select.Option value={item?.mediaCategoryId}>{item?.mediaCategoryName}</Select.Option>
                                            )
                                        }))
                                    }
                                </Select>
                            </Form.Item>

                            {/*<Form.Item label={Lyrics} name={`lyric`}>*/}
                            {/*    <Input autoComplete={"off"}/>*/}
                            {/*</Form.Item>*/}
                        </Col>
                        <Col span={12}>
                            <Form.Item label={`Nhà sản xuất`} name={`mediaProducer`} required
                                rules={[{ required: true, message: "This field is required!" }]}>
                                <Input autoComplete={"off"} />
                            </Form.Item>

                            {/*<Form.Item label={Lyrics} name={`lyric`}>*/}
                            {/*    <Input autoComplete={"off"}/>*/}
                            {/*</Form.Item>*/}
                        </Col>

                    </Row>
                    <Row gutter={24} className="mt-3">

                        <Col span={12}>
                            {/*<Upload listType="picture">*/}
                            {/*    <Button icon={<UploadOutlined />}>{File_mp3}</Button>*/}
                            {/*</Upload>*/}
                            <Form.Item label={`Đính kèm bản ghi`} required name={`mediaContent`}>

                                <Upload
                                    // icon={<i className="far fa-file-alt fa-2x" />}
                                    title={`Tải lên`}
                                    accept={".mp3,.mp4"}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            {/*<Upload listType="picture">*/}
                            {/*    <Button icon={<UploadOutlined />}>{File_doc}</Button>*/}
                            {/*</Upload>*/}
                            <Form.Item label={`Đính kèm lời bài hát`} name={`mediaContentOptional`}>
                                <Upload
                                    // icon={<i className="far fa-file-audio fa-2x" />}
                                    title={`Tải lên`}
                                    accept={".doc,.docx,.pdf,.txt"}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
};

export default ModalAddCreation