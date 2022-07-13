import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import "./styles.scss";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { useTranslate } from "@hook/useTranslate";
import { aucontractTranslateKey } from "@translateKey/index";
import * as moment from "moment";
import { useAsync } from "@hook/useAsync";
import auContractPresenter from "@modules/aucontract/presenter";
import { useRouter, validateMessages } from "@helper/functions";
import ModalAddCreation from "@view/AuContract/component/ModalAddCreation";
import ModalMediaContract from "@view/AuContract/component/ModalMediaContract";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "@store/redux";
import ContractInfo from "@view/AuContract/AuContractAdd/component/ContractInfo";
import AuthorInfoAdd from "@view/AuContract/AuContractAdd/component/AuthorInfo";
import CheckPermission from "@hoc/CheckPermission";
import auContractStore from "@modules/aucontract/auContractStore";
import { removeProfile } from "@modules/authentication/profileStore";
import notificationByLanguage from "@view/shared/components/Notification";
import ModalCancelContract from "@view/AuContract/component/ModalCancelContract";
import ModalRejectMedia from "@view/AuContract/component/ModalRejectMedia";
import { routerContract } from "@config/path";
import MessageComponent from "@view/shared/components/MessageComponent";
import { useParams } from "react-router";
import AuthorizedRepresentation from '@modules/authorizedRepresentation/entity'

const AuContractAdd = (props) => {
    const lang = useSelector((state: RootState) => state.translateStore.currentLanguage)
    const router = useRouter();
    const param: any = useParams();
    const [form] = Form.useForm();
    const { newAuContract, getInfoAuContract, updateAuContract } = auContractPresenter;
    const [{ execute: create, status }, { execute: detail }, { execute: update }] = useAsync(
        newAuContract, getInfoAuContract, updateAuContract
    );
    const dispatch = useDispatch();
    const { Required_field, Save, List_contract, Add_new_contract, Cancel, Update_contract, ADD } = useTranslate("aucontractTranslateKey");
    const [modalCreation, setModalCreation] = useState({
        creation: false,
        media: false,
    });
    const authorizedRepresentationId = useSelector((state: RootState) => state.auContractStore.authorizedRepresentationId);
    const userId = useSelector((state: RootState) => state.auContractStore.userId);
    const [authorizedContractAttachments, setAuthorizedContractAttachments] = useState<any>([]);

    useEffect(() => {
        store.dispatch(auContractStore.actions.remove({}));
        form.resetFields();
    }, []);

    useEffect(() => {
        // let arrCheck = [];
        if (param.id) {
            detail(param.id).then((res) => {
                console.log(res, "res======");
                console.log('res.authorizedRepresentation.authorizedRepresentationId', res.authorizedRepresentation.authorizedRepresentationId);
                dispatch(auContractStore.actions.fetchIDAuRepresenter({ authorizedRepresentationId: res.authorizedRepresentation.authorizedRepresentationId }))
                dispatch(auContractStore.actions.autoComplete({ autoComplete: true }));
                form.setFieldsValue({ personPassword: "Quang@123" })
                setAuthorizedContractAttachments(res.authorizedContractAttachments);
                const formatAuthorizedRepresentation = new AuthorizedRepresentation(res.authorizedRepresentation);
                form.setFieldsValue({
                    ...res,
                    ...formatAuthorizedRepresentation
                });
            });
        }
    }, [param.id]);

    useEffect(() => {
        // Get all elements which have class findByScroll
        let elementsToFindByScroll = Array.prototype.slice.call(
            document.getElementsByClassName("findByScroll")
        );

        // Map their ids to their positions so we can reference them later
        let positionsToIdsMap = elementsToFindByScroll.reduce(function (
            result,
            item
        ) {
            let top = item.getBoundingClientRect().y;
            result[top] = item.id;
            return result;
        },
            {});
        // When we scroll find which is the element we have scrolled past and log its id to console
    }, []);



    const onFinish = (value) => {
        let formatValue = value
        if (authorizedRepresentationId != "" && authorizedRepresentationId != undefined) {
            formatValue = Object.assign(value, { authorizedRepresentationId: authorizedRepresentationId, userId: userId })
        }
        console.log('formatValue', formatValue);
        if (param.id !== undefined) {
            const updateContract = Object.assign(formatValue, { authorityContractId: param.id, authorizedContractAttachments: authorizedContractAttachments })
            console.log('updateContract', updateContract);
            update(updateContract).then(res => {
                router.push(routerContract.CONTRACT);
            }).catch(
                err => {
                    console.log('err', err);
                }
            )
        }
        else {
            create(formatValue).then(res => {
                router.push(`${routerContract.ADD_CONTRACT_SUCCESS}/${res?.authorizedContractId}`);
            }).catch(
                err => {
                    console.log('err', err);
                }
            )
        }
    };


    const handleCancel = () => {

        router.push(routerContract.CONTRACT);
    };

    const onCloseModal = () => {
        setModalCreation({ creation: false, media: false });
    };

    const layout = {
        labelCol: { span: 11 },
        wrapperCol: { span: 13 },
    };


    return (
        <>
            <div className="contract-add">
                <MainTitleComponent
                    breadcrumbs={[
                        { name: List_contract, href: "/contract" },
                        {
                            name: param?.id ? Update_contract : Add_new_contract,
                            href: "/contract-add",
                        },
                    ]}
                    title={param?.id ? Update_contract : Add_new_contract}
                    classBreadcumb={null}
                    classTitle={null}
                />


                <div id={"div-form-contract"} className="form-contract">
                    <Form
                        {...layout}
                        labelAlign={"left"}
                        id={"div-main-form"}
                        form={form}
                        onFinish={onFinish}
                        validateMessages={validateMessages()}
                        initialValues={{
                            authorizedRepresentationType: 0
                        }}
                    >
                        <ContractInfo form={form} />
                        <div className="w-100 mt-2 mb-2">

                            <hr style={{ borderColor: "#727288", marginRight: "-65px", margin: "2rem 0" }} />
                        </div>
                        <AuthorInfoAdd form={form} />
                        <div className="mt-2"><span className="text-danger">*</span> <span style={{ color: "#F5F5FF", opacity: "0.5" }}>{Required_field}</span></div>
                        <section className="info-contract findByScroll" id="three">
                            <div className="div-btn-save">
                                <div className="d-flex justify-content-center mb-2">

                                    <Button className="mr-3 cancel-button" onClick={handleCancel}>
                                        {Cancel}
                                    </Button>
                                    <Button
                                        className="mr-3 normal-button"
                                        htmlType="submit"
                                        loading={status == "loading"}
                                    >
                                        {param?.id ? Save : ADD}
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </Form>
                </div>
                <ModalMediaContract
                    visible={modalCreation.media}
                    handleCancel={onCloseModal}
                />
            </div>
        </>
    );
};

export default AuContractAdd;