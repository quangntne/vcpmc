import React, { useState } from "react";
import { Checkbox, Divider, Form, InputNumber } from "antd";
import { useTranslate } from "@hook/useTranslate";
import './style.scss';


const RoyaltiesComp = props => {
    const { wrapperCol } = props;
    const {
        Copyright, Right_Related, Right_Per, Right_Manuf, Record, Sum_100
    } = useTranslate("aucontractTranslateKey");
    const [isCheck, setIsCheck] = useState({
        checkedAuthor: false,
        checkedRelate: false,
        checkedPerform: false,
        disCheckPerform: true,
        disCheckProducer: true,
        checkedProducer: false,
        inputAuthor: true,
        inputPerform: true,
        inputProducer: true
    });

    const handleCheckbox = e => {
        const target = e.target;
        const value = target.value;
        switch (value) {
            case 1:
                return setIsCheck(prevState => ({
                    ...prevState,
                    inputAuthor: !isCheck.inputAuthor,
                    checkedAuthor: !isCheck.checkedAuthor
                }));
            case 2:
                return setIsCheck(prevState => ({
                    ...prevState,
                    checkedRelate: !isCheck.checkedRelate,
                    disCheckProducer: !isCheck.disCheckProducer,
                    disCheckPerform: !isCheck.disCheckPerform,
                    checkedPerform: !isCheck.checkedPerform,
                    checkedProducer: !isCheck.checkedProducer,
                    inputPerform: !isCheck.inputPerform,
                    inputProducer: !isCheck.inputProducer,

                }));
            case 3:
                return setIsCheck(prevState => ({
                    ...prevState,
                    inputPerform: !isCheck.inputPerform,
                    checkedRelate: true,
                    checkedPerform: !isCheck.checkedPerform,
                }));
            case 4:
                return setIsCheck(prevState => ({
                    ...prevState,
                    inputProducer: !isCheck.inputProducer,
                    checkedRelate: true,
                    checkedProducer: !isCheck.checkedProducer
                }));
        }

    };

    const functionTotal100 = async (getFieldValue, value, PercentOne, PercentTwo): Promise<any> => {
        const tempNum_1 =
            getFieldValue(PercentOne) == undefined
                ? 0
                : getFieldValue(PercentOne);
        const tempNum_2 =
            getFieldValue(PercentTwo) == undefined
                ? 0
                : getFieldValue(PercentTwo);
        const tempNum_3 = value == undefined ? 0 : value;
        if (
            +tempNum_1 + +tempNum_2 + +tempNum_3 == 100 ||
            +value == 100
        ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(Sum_100)).then(function () { });
    };

    return (
        <>
            <div className="d-flex"><span className="mt-2 mr-2 text-white royal-label-span">{Copyright}<span className="text-white"> %</span></span>
                <Form.Item name={`copyrightPercent`} wrapperCol={wrapperCol}
                    dependencies={["performPercent", "producerPercent"]}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const tempNum_1 =
                                    getFieldValue("performPercent") == undefined
                                        ? 0
                                        : getFieldValue("performPercent");
                                const tempNum_2 =
                                    getFieldValue("producerPercent") == undefined
                                        ? 0
                                        : getFieldValue("producerPercent");
                                const tempNum_3 = value == undefined ? 0 : value;
                                if (
                                    +tempNum_1 + +tempNum_2 + +tempNum_3 == 100 ||
                                    +value == 100
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(Sum_100));
                            },
                        }),
                    ]}
                >
                    <InputNumber
                        autoComplete={"off"}
                        style={{ width: "90px" }}
                    />
                </Form.Item>

            </div>
            <br />
            <span className="royal-label-span text-white">{Right_Related}</span>
            <div className="d-flex mt-3">
                <div className="ml-2 mr-1 mt-1">
                    <Divider type="vertical" className="text-white"
                        style={{ height: "6.3rem", borderColor: "#727288" }} />

                </div>
                <div>
                    <div className="d-flex"><span className="mt-2 mr-2 text-white">{Right_Per}<span className="text-white"> %</span></span>
                        <Form.Item name={`performPercent`} wrapperCol={wrapperCol}
                            dependencies={["copyrightPercent", "producerPercent"]}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const tempNum_1 =
                                            getFieldValue("copyrightPercent") == undefined
                                                ? 0
                                                : getFieldValue("copyrightPercent");
                                        const tempNum_2 =
                                            getFieldValue("producerPercent") == undefined
                                                ? 0
                                                : getFieldValue("producerPercent");
                                        const tempNum_3 = value == undefined ? 0 : value;
                                        if (
                                            +tempNum_1 + +tempNum_2 + +tempNum_3 == 100 ||
                                            +value == 100
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(Sum_100));

                                    },
                                }),
                            ]}

                        >
                            <InputNumber
                                autoComplete={"off"}
                                style={{ width: "90px" }}
                            />
                        </Form.Item>

                    </div>
                    <br />
                    <div className="d-flex">
                        <span className="mt-2 mr-2 text-white">{Right_Manuf}
                            <div>({Record}/video)<span className="text-white"> %</span></div>
                        </span>
                        <Form.Item name={`producerPercent`} wrapperCol={wrapperCol}
                            dependencies={["copyrightPercent", "performPercent"]}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const tempNum_1 =
                                            getFieldValue("copyrightPercent") == undefined
                                                ? 0
                                                : getFieldValue("copyrightPercent");
                                        const tempNum_2 =
                                            getFieldValue("performPercent") == undefined
                                                ? 0
                                                : getFieldValue("performPercent");
                                        const tempNum_3 = value == undefined ? 0 : value;
                                        if (
                                            +tempNum_1 + +tempNum_2 + +tempNum_3 == 100 ||
                                            +value == 100
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(Sum_100));

                                    },
                                }),
                            ]}

                        >
                            <InputNumber
                                autoComplete={"off"}
                                style={{ width: "90px" }}
                            />
                        </Form.Item>

                    </div>
                </div>
            </div>

        </>
    )
};

export default RoyaltiesComp