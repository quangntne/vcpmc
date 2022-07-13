import React, { useRef } from "react";
import { Form, Input, AutoComplete } from "antd";
import { useTranslate } from "@hook/useTranslate";
import lodash from 'lodash';
import auContractStore from "@modules/aucontract/auContractStore";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthorizedRepresentor } from "@modules/authorizedRepresentation/repository";
import { RootState } from "@modules/core/store/redux";
import AuContractEntity from "@modules/aucontract/entity";

const InfoOrganiColOne = ({ form }) => {
    const ref = useRef<any>();
    const dispatch = useDispatch();
    const autoComplete = useSelector((state: RootState) => state.auContractStore.autoComplete);
    const { Organization_Name, Tax_Code, Account_number, Bank_name, Address } = useTranslate("aucontractTranslateKey");
    //state
    const [search, setSearch] = React.useState("");
    const [arraySuggest, setArraySuggest] = React.useState([]);
    const [userSelect, setUserSelect] = React.useState<any>({});
    const [lock, setLock] = React.useState<boolean>(false);
    const [hidden, setHidden] = React.useState<boolean>(false);

    React.useEffect(() => {
        setTimeout(() => {
            setSearch(form.getFieldValue("organizationName"))
        }, 500);
    }, [form.getFieldValue("organizationName")])

    React.useEffect(() => {
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

    React.useEffect(() => {
        form.setFieldsValue({
            ...userSelect
        })
        dispatch(auContractStore.actions.fetchIDAuRepresenter({ authorizedRepresentationId: userSelect.authorizedRepresentationId }))
        dispatch(auContractStore.actions.fetchUserId({ userId: userSelect.userId }))
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

    const onSearch = value => {
        if (lock) {
            form.setFieldsValue({ organizationName: search })
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
                            console.log('res', res);
                            const formatData = res?.data.map((item, index) => {
                                return Object.assign(item, { label: item.organizationName, value: item.authorizedRepresentationId })
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
            <Form.Item label={Organization_Name} required name={`organizationName`}
                rules={[{ required: true, message: "This field is required!" }]}>
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
            <Form.Item label={Tax_Code} name={`authorizedRepresentationTaxNumber`}>
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Account_number} name={`authorizedRepresentationBankNumber`}>
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Bank_name} name={`authorizedRepresentationBankName`}>
                <Input disabled={autoComplete} autoComplete={"off"} />
            </Form.Item>
            <Form.Item label={Address} name={`organizationAddress`}>
                <Input.TextArea disabled={autoComplete} autoComplete={"off"} autoSize={{ minRows: 6, maxRows: 6 }} />
            </Form.Item>
        </>
    )
};

export default InfoOrganiColOne