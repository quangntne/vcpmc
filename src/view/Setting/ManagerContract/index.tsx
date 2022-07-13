import React, { useState, useEffect, useContext, useRef } from 'react';
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import TableComponent from "@view/shared/components/TableComponent";
import { Input, Button, Form, Row, Col } from 'antd';
import useTable from '@view/shared/components/TableComponent/hook';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@modules/core/store/redux';
import { fetchNumberDateWarning } from '@modules/setting/settingStore';
import { useTranslate } from '@view/shared/hook/useTranslate';
import './style.scss';

const ManagerContract = () => {
    const setting = useTranslate("settingTranslateKey");
    const table = useTable();
    const EditableContext = React.createContext(null);
    const dispatch = useDispatch();
    //selector
    const numberDateWarning: any = useSelector((state: RootState) => state.settingStore.numberDateWarning);
    //state
    const [dateWarning, setNumberDateWarning] = useState(numberDateWarning);
    const [typeSetting, settypeSetting] = useState<any>('view');
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<any>(
        [
            {
                key: '0',
                typeContract: "Trọn gói",
                revenueVCPMC: "20%"
            },
            {
                key: '1',
                typeContract: "Giá trị bài hát/ lượt phát",
                revenueVCPMC: "20%"
            },
        ]
    );
    const [realData, setRealData] = useState<any>(dataSource);

    const data = [
        {
            name: setting.MANAGE_CONTRACT
        },
    ];

    const arrayViewAction = () => {
        let infoArray: IArrayAction[] = [
            {
                iconType: "add",
                name: setting.ADD_NEW,
                handleAction: () => {
                    const newRow = {
                        key: dataSource.length + 1,
                        typeContract: "New Type",
                        revenueVCPMC: "20%"
                    }
                    setDataSource([...dataSource, newRow])
                },
            },
            {
                iconType: "delete",
                name: setting.DELETE,
                handleAction: () => {
                },
            },
            {
                iconType: "fileEdit",
                name: setting.EDIT_CONTRACT,
                handleAction: () => {
                    settypeSetting("editTypeContract");
                },
            },
            {
                iconType: "CalenDa",
                name: setting.EDIT_DAY_EXPIR,
                handleAction: () => {
                    settypeSetting("editDateWarning")
                },
            }
        ];
        if (typeSetting == 'view') {
            infoArray = infoArray.splice(2, 2);
        } else if (typeSetting == 'editTypeContract') {
            infoArray = infoArray.splice(0, 2);
        } else if (typeSetting == 'editDateWarning') {
            infoArray == infoArray.splice(0, infoArray.length)
        }
        return infoArray;
    }


    const api = () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res({
                    data: dataSource,
                    info: {
                        total: dataSource.length,
                    },
                });
            }, 100);
        });
    };
    const columns = [
        {
            title: setting.TYPE_CONTRACT,
            dataIndex: "typeContract",
            editable: typeSetting === "editTypeContract" ? true : false
        },
        {
            title: setting.REVENU_VCPMC,
            dataIndex: "revenueVCPMC",
            editable: typeSetting === "editTypeContract" ? true : false
        }
    ];

    useEffect(() => {
        if (realData !== dataSource) setDataSource(realData);
        if (dateWarning !== numberDateWarning) setNumberDateWarning(numberDateWarning);
    }, [realData, typeSetting]);

    const handleSave = row => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.key == item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const columnsFormat = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave
            })
        };
    });

    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex]
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`
                        }
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 1
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    };

    const onChangeInput = e => {
        setNumberDateWarning(e.target.value);
    }

    const renderBody = () => {
        switch (typeSetting) {
            case "view":
                return (
                    <div className="table-contract-list">
                        <Row>
                            <Col lg={14} sm={14} xs={14} className='label-left pr-3'>
                                <TableComponent
                                    apiServices={api}
                                    columns={columns}
                                    register={table}
                                    disableFirstCallApi={true}
                                    dataSource={realData}
                                />
                            </Col>
                            <Col lg={10} sm={10} xs={10} className='label-right'>
                                <div className='label-div'>
                                    <div className='label-warning mb-5'>
                                        <label>{setting.WARNING_EXPIR}</label>
                                    </div>
                                    <div className='label-contract mb-5'>
                                        {setting.CONTRACT_WARNING} <span>{numberDateWarning} {setting.DAY}</span>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </div>
                );
            case "editTypeContract":
                return (
                    <div className="table-contract-list">
                        <Row>
                            <Col lg={14} sm={14} xs={14} className='label-left pr-3'>
                                <TableComponent
                                    components={components}
                                    apiServices={api}
                                    columns={columnsFormat}
                                    register={table}
                                    disableFirstCallApi={true}
                                    dataSource={dataSource}
                                />
                            </Col>
                        </Row>
                    </div>
                );
            case "editDateWarning":
                return (
                    <div className="table-contract-list">
                        <Row>
                            <Col lg={10} sm={10} xs={10} className='label-right'>
                                <div className='label-div'>
                                    <div className='label-warning mb-5'>
                                        <label>{setting.WARNING_EXPIR}</label>
                                    </div>
                                    <div className='quang-tran-form label-contract mb-5'>
                                        {setting.CONTRACT_WARNING} <span>
                                            <Input style={{ width: '4.5vw' }} type="text" value={dateWarning} onChange={(e) => onChangeInput(e)} /> {setting.DAY}</span>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </div>
                );
            default:
                break;
        }
    }

    return (
        <div className="w-100 setting-type-Contract">
            <MainTitleComponent
                breadcrumbs={data}
                title={setting.TYPE_CONTRACT}
                classBreadcumb={null}
                classTitle={null}
            />
            {renderBody()}
            {
                typeSetting !== "view" && (
                    <Row className='row-btn-submit  quang-tran-form'>
                        <Col className='col-cancel' lg={12} sm={24} xs={24} >
                            <Form.Item className='text-right'>
                                <Button type="primary" className='label-btn-cancel' onClick={() => {
                                    settypeSetting("view")
                                }
                                }>
                                    {setting.CANCEL}
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col className='col-save' lg={12} sm={24} xs={24} >
                            <Form.Item key='submit' className='text-left' >
                                <Button loading={loading} type="primary" className='label-btn-save' htmlType='submit'
                                    onClick={() => {
                                        setLoading(true);
                                        if (typeSetting === "editTypeContract") setRealData(dataSource)
                                        if (typeSetting === "editDateWarning") dispatch(fetchNumberDateWarning({ numberDateWarning: dateWarning }));
                                        setTimeout(() => {
                                            settypeSetting("view")
                                            setLoading(false)
                                        }, 1000);
                                    }}
                                >
                                    {setting.SAVE}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                )
            }
            <RightMenu arrayAction={arrayViewAction()} />
        </div>
    )
}

export default ManagerContract
