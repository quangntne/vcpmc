import React, { useState } from "react";
import { Col, Form, Row, Radio } from "antd";
import { useTranslate } from "@hook/useTranslate";
import { aucontractTranslateKey } from "@translateKey/index";
import InfoPersonalColOne from "./component/Personal/InfoPersonalColOne";
import InfoPersonalColTwo from "./component/Personal/InfoPersonalColTwo";
import InfoPersonalColThree from "./component/Personal/InforPersonColThree";
import InfoOrganiColOne from "@view/AuContract/AuContractAdd/component/AuthorInfo/component/Organization/InfoOrganiColOne";
import InfoOrganiColThree from "@view/AuContract/AuContractAdd/component/AuthorInfo/component/Organization/InfoOrganiColThree";
import InfoOrganiColTwo from "@view/AuContract/AuContractAdd/component/AuthorInfo/component/Organization/InfoOrganiColTwo";
import AuContractEntity from "@modules/aucontract/entity";
import { useDispatch } from "react-redux";
import auContractStore from "@modules/aucontract/auContractStore";

const AuthorInfoAdd = ({ form }) => {
    const { Author_Legal, Personal, Organization, Proxy_Info } = useTranslate("aucontractTranslateKey");
    const dispatch = useDispatch();
    const [valTypeAuthor, setValTypeAuthor] = useState(0);

    const onChangeType = e => {
        const value = e.target.value;
        setValTypeAuthor(value)
        const resetFieldsValue = AuContractEntity.resetEntity()
        form.setFieldsValue({
            ...resetFieldsValue
        })
        dispatch(auContractStore.actions.fetchIDAuRepresenter({ authorizedRepresentationId: "" }))
        dispatch(auContractStore.actions.fetchUserId({ userId: "" }))
    };

    return (
        <>
            <section className="">


                <h5 className="title-author mb-5 mt-4">{Proxy_Info}</h5>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            name={`authorizedRepresentationType`}
                            label={Author_Legal}
                        >
                            <Radio.Group onChange={onChangeType} value={valTypeAuthor} defaultValue={valTypeAuthor}>
                                <Radio value={0}>{Personal}</Radio>
                                <Radio value={1}>{Organization}</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {
                            valTypeAuthor == 0 ?
                                <InfoPersonalColOne form={form} />
                                :
                                <InfoOrganiColOne form={form} />
                        }

                    </Col>
                    <Col span={7} push={1}>
                        {
                            valTypeAuthor == 0 ?
                                <InfoPersonalColTwo form={form} />
                                :
                                <InfoOrganiColTwo form={form} />
                        }
                    </Col>
                    <Col span={8} push={2}>
                        {
                            valTypeAuthor == 0 ?
                                <InfoPersonalColThree form={form} />
                                :
                                <InfoOrganiColThree form={form} />
                        }

                    </Col>
                </Row>
            </section>
        </>
    )
};

export default AuthorInfoAdd;
