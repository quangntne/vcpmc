import React from "react";
import { Col, Row } from "antd";
import { useTranslate } from "@hook/useTranslate";
import ContentComponent from "@view/shared/components/ContentComponent";
import * as moment from "moment";
import { authorityUserIFace } from "@modules/aucontract/interface";

interface IAuthorInfoDetailProps {
    data: authorityUserIFace | undefined
}

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14, pull: 1 },
};

const AuthorInfoDetail = (props: IAuthorInfoDetailProps) => {

    const { data } = props;
    if (data == null) {
        return null;
    }
    const dataLang = useTranslate("aucontractTranslateKey");
    const dataGenders = [dataLang.Female, dataLang.Male]
    const dataTypes = [dataLang.Contract_type_0, dataLang.Contract_type_1]

    return (
        <>
            <Row gutter={24}>
                <Col span={8}>
                    {
                        data.authorizedRepresentationType === 1 ? (<>
                            <ContentComponent text={dataTypes[data.authorizedRepresentationType]} label={dataLang.Author_Legal} />
                            <ContentComponent text={data.organizationName} label={dataLang.NAME_ORGANIZATION} />
                            <ContentComponent text={data.authorizedRepresentationTaxNumber} label={dataLang.TAX_CODE} />
                            <ContentComponent text={data.authorizedRepresentationBankName} label={dataLang.BANK} />
                            <ContentComponent text={data.personNationality} label={dataLang.NATIONALITY} />
                            <ContentComponent text={data.organizationAddress} label={dataLang.ADDRESS} />
                        </>) : (<>
                            <ContentComponent text={dataTypes[data.authorizedRepresentationType]} label={dataLang.Author_Legal} />
                            <ContentComponent text={data.personName} label={dataLang.Author_Legal_Name} />
                            <ContentComponent text={moment(data.personBirthDate).format("DD/MM/YYYY")}
                                label={dataLang.BirthDay} />
                            <ContentComponent text={dataGenders[data.personGender]} label={dataLang.Gender} />
                            <ContentComponent text={data.personNationality} label={dataLang.Nationality} />
                            <ContentComponent text={data.authorizedRepresentationPhoneNumber} label={dataLang.Phone} />
                        </>)
                    }
                </Col>
                <Col span={7}>
                    {
                        data.authorizedRepresentationType === 1 ? (<>
                            <ContentComponent layout={layout} text={data.personName} label={dataLang.REPRESENTATIVE} />
                            <ContentComponent layout={layout} text={data.personTitle} label={dataLang.POSITION} />
                            <ContentComponent text={moment(data.personBirthDate).format("DD/MM/YYYY")}
                                label={dataLang.BirthDay} />
                            <ContentComponent text={dataGenders[data.personGender]} label={dataLang.Gender} />
                            <ContentComponent layout={layout} text={data.personIdentify} label={dataLang.ID} />
                            <ContentComponent layout={layout} text={data.personIdentify} label={dataLang.ID} />
                            <ContentComponent layout={layout} text={moment(data.personIdentifiIssuanceDate).format("DD/MM/YYYY")}
                                label={dataLang.Date_issued} />
                        </>) : (<>
                            <ContentComponent layout={layout} text={data.personIdentify} label={dataLang.ID} />
                            <ContentComponent layout={layout} text={moment(data.personIdentifiIssuanceDate).format("DD/MM/YYYY")} label={dataLang.Date_issued} />
                            <ContentComponent layout={layout} text={data.personIdentifiIssuancePlace} label={dataLang.Place_issuance} />
                            <ContentComponent layout={layout} text={data.authorizedRepresentationTaxNumber} label={dataLang.Tax_Code} />
                            <ContentComponent layout={layout} text={data.personAddress} label={dataLang.Address} />
                        </>)
                    }
                </Col>
                <Col span={7} >
                    {
                        data.authorizedRepresentationType === 1 ? (<>
                            <ContentComponent text={data.personNationality} label={dataLang.Nationality} />
                            <ContentComponent text={data.organizationAddress} label={dataLang.RESIDENCE} />
                            <ContentComponent text={data.authorizedRepresentationPhoneNumber} label={dataLang.Phone} />
                            <ContentComponent text={data.authorizedRepresentationUsername} label={dataLang.User_name} />
                            <ContentComponent text={<div className="d-flex  align-items-center mt-2">
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                            </div>} label={dataLang.Pass_word} />
                        </>) : (<>
                            <ContentComponent text={data.authorizedRepresentationEmail} label={dataLang.Email} />
                            <ContentComponent text={data.authorizedRepresentationUsername} label={dataLang.User_name} />
                            <ContentComponent text={<div className="d-flex  align-items-center mt-2">
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                                <div className="circle-status bg-white" />
                            </div>} label={dataLang.Pass_word} />
                            <ContentComponent text={data.authorizedRepresentationBankNumber} label={dataLang.Account_number} />
                            <ContentComponent text={data.authorizedRepresentationBankName} label={dataLang.Bank_name} />
                            {/*<ContentComponent text={data?.authorityUser?.authorityUserPhoneNumber} label={Phone}/>*/}
                        </>)
                    }
                </Col>
            </Row>
        </>
    )
};

export default AuthorInfoDetail