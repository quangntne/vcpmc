import React, { useEffect, useState } from "react";
import { AutoComplete, DatePicker, Form, Input, Radio } from "antd";
import { useTranslate } from "@hook/useTranslate";
import moment from "moment";
import UilCalendarAlt from '@iconscout/react-unicons/icons/uil-calendar-alt';
import { useDispatch, useSelector } from "react-redux";
import auContractStore from "@modules/aucontract/auContractStore";
import { getAllAuthorizedRepresentor } from "@modules/authorizedRepresentation/repository";
import { useRef } from "react";
import lodash from 'lodash';
import { RootState } from "@modules/core/store/redux";
import AuContractEntity from "@modules/aucontract/entity";

const InfoPersonalColOne = ({ form }) => {
    const ref = useRef<any>();
    const dispatch = useDispatch();
    const autoComplete = useSelector((state: RootState) => state.auContractStore.autoComplete);
    const { Authorize_name, BirthDay, Nationality, Male, Female, Phone, Gender } = useTranslate("aucontractTranslateKey");
    //state
    const [search, setSearch] = useState("");
    const [arraySuggest, setArraySuggest] = useState([]);
    const [userSelect, setUserSelect] = useState<any>();
    const [lock, setLock] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setSearch(form.getFieldValue("personName"))
        }, 500);
    }, [form.getFieldValue("personName")])

    useEffect(() => {
        if (search == "" || search == undefined) {
            dispatch(auContractStore.actions.fetchIDAuRepresenter({ authorizedRepresentationId: "" }))
            dispatch(auContractStore.actions.fetchUserId({ userId: "" }))
            const resetEntity = AuContractEntity.resetEntity()
            dispatch(auContractStore.actions.autoComplete({ autoComplete: false }));
            setArraySuggest([])
            let newArr = {}
            lodash.mapValues(resetEntity, function (value, key) {
                switch (key) {
                    case "authorizedRepresentationType":
                        return Object.assign(newArr, { [key]: value })
                    default:
                        return Object.assign(newArr, { [key]: null });
                }
            });
            form.setFieldsValue({
                ...newArr
            })
        }
    }, [search]);

    useEffect(() => {
        form.setFieldsValue({ ...userSelect })
        dispatch(auContractStore.actions.fetchIDAuRepresenter({ authorizedRepresentationId: userSelect?.authorizedRepresentationId }))
        dispatch(auContractStore.actions.fetchUserId({ userId: userSelect?.userId }))
    }, [userSelect])

    const onSelect = value => {
        setLock(true);
        setHidden(true);
        const userSelect = lodash.find(arraySuggest, item => {
            if (item.value === value) {
                return item;
            }
        })
        setUserSelect(userSelect);
        dispatch(auContractStore.actions.autoComplete({ autoComplete: true }));
        form.setFieldsValue({ personPassword: "Quang@123" })
    };

    const onSearch = (value) => {
        if (lock) {
            form.setFieldsValue({ personName: search })
            return;
        }
        else {
            const type = form.getFieldValue("authorizedRepresentationType");
            setSearch(value)
            clearTimeout(ref.current);
            ref.current = setTimeout(() => {
                if (value !== "") {
                    getAllAuthorizedRepresentor({ pageSize: 5, current: 1, representationType: type }, { search: value })
                        .then((res: any) => {
                            const formatData = res?.data.map((item, index) => {
                                return Object.assign(item, { label: item.personName, value: item.authorizedRepresentationId })
                            })
                            setArraySuggest(formatData);
                        }).catch(err => {
                            console.log('err', err);
                        })
                }
            }, 300);
        }
    };

    const onChangeAutoComplete = value => {
        if (value === undefined) {
            setLock(false);
            setHidden(false);
            setSearch("");
        }
    }

    return (
        <>
            <Form.Item label={Authorize_name} required name={`personName`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <AutoComplete
                    className='label-autocomplete'
                    allowClear={true}
                    value={search}
                    options={arraySuggest}
                    onSelect={onSelect}
                    onSearch={onSearch}
                    onChange={onChangeAutoComplete}
                    dropdownClassName={hidden && 'label-hidden-dropdown'}
                >
                    <Input />
                </AutoComplete>
            </Form.Item>
            <Form.Item label={Gender} required name={`personGender`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Radio.Group disabled={autoComplete}>
                    <Radio value={0}>{Male}</Radio>
                    <Radio value={1}>{Female}</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label={BirthDay} required name={`personBirthDate`}
                rules={[{ required: true, message: "This field is required!" }, () => ({
                    validator(_, value) {
                        const year = moment(moment(new Date())).diff(value, "year");
                        if (year >= 18) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error("Bạn chưa đủ tuổi!!!"));
                    },
                })]}
            >
                <DatePicker disabled={autoComplete}
                    format={"DD/MM/YYYY"}
                    placeholder={`dd/mm/yyyy`}
                    suffixIcon={[<><UilCalendarAlt size={18} color={"#FF7506"} /></>]}
                />
            </Form.Item>

            <Form.Item label={Nationality} required name={`personNationality`}
                rules={[{ required: true, message: "This field is required!" }]}
            >
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Phone} name={`authorizedRepresentationPhoneNumber`}>
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
        </>
    )
};

export default InfoPersonalColOne;