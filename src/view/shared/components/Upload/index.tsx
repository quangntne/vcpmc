import Dragger from 'antd/lib/upload/Dragger';
import React, { ReactNode, useState } from 'react';
import { Form, Typography } from "antd"
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import "./styles.scss";
import UilCloudUpload from '@iconscout/react-unicons/icons/uil-cloud-upload';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';


export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.onprogress = function (e) {
        // console.log("progress: ", Math.round((e.loaded * 100) / e.total));
    };
    reader.readAsDataURL(img);
}

interface Props {
    title?,
    accept?,
    name?,
    onChange?: (infoFile, stateFile) => void;
    icon?: ReactNode;
    preview?: boolean;
    propsDrag?: any
}

const initialState = {
    dataFile: [],
    loading: false,
    originFileObj: null,
};
//Auth: Chí Công mập
const Upload = (props: Props) => {
    const { title, accept } = props;
    const [state, setState] = useState(initialState);
    const action = async (file): Promise<any> => {

        const response = {
            name: "xxx.png",
            status: "done",
        };
        file.onSuccess();
        return response;
    };

    const GetTypeFile = (filename) => {
        const type = filename.split('.').pop();

        switch (type) {
            case "doc":
            case "docx":
                return <i className="far fa-file-word mr-2 font-icon-fa" />
            case "pdf":
                return <i className="far fa-file-pdf mr-2 font-icon-fa" />

        }
    }

    const handleRemoveFile = (data) => {
        if (state.dataFile.length === 0) return;
        const arrTemp = [...state.dataFile];
        const index = arrTemp.findIndex(item => item.uid === data.uid);

        if (index > -1) {
            arrTemp.splice(index, 1)
            setState((prev) => ({
                ...prev,
                dataFile: arrTemp,
            }));
        }

    }

    const propsDrag = {
        ...props.propsDrag,
        name: props.name,
        multiple: true,
        showUploadList: false,
        key: "dragMedia",
        accept: props.accept,
        customRequest: action,
        // beforeUpload: (file) => beforeUpload(file),
        onChange(info) {
            if (info.file.status === "uploading") {
                setState((prev) => ({ ...prev, loading: true }));
                props.onChange(info, {
                    ...state,
                    originFileObj: info.file.originFileObj,
                    loading: true, name: props.name
                })
                return;
            }
            if (info.file.status === "done") {
                // Get this url from response in real world.
                // getBase64(info.file.originFileObj, (imageUrl) => {

                //     setState((prev) => ({
                //         ...prev,
                //         dataFile: imageUrl,
                //         originFileObj: info.file.originFileObj,
                //         loading: false,
                //     }));
                //     props.onChange(info, {
                //         ...state, dataFile: imageUrl,
                //         originFileObj: info.file.originFileObj,
                //         loading: false, name: props.name
                //     })
                // });
                let arrTemp = [];
                info?.fileList.map((item, index) => {
                    arrTemp.push(item.originFileObj)
                    getBase64(item.originFileObj, (imageUrl) => {

                        setState((prev) => ({
                            ...prev,
                            dataFile: arrTemp,
                            originFileObj: info.file.originFileObj,
                            loading: false,
                        }));
                        props.onChange(info, {
                            ...state, dataFile: arrTemp,
                            originFileObj: info.file.originFileObj,
                            loading: false, name: props.name
                        })
                    });

                })
            }

        },
    };
    const getFile = () => {
        return state
    }

    return (
        <>

            {
                props.preview ? "" :
                    <>
                        <Dragger  {...propsDrag} >
                            <div className="d-flex">
                                <span className="ant-upload-drag-icon ">

                                    {state.loading ? (
                                        <LoadingOutlined />
                                    ) : (
                                            <UilCloudUpload size="27" color="#FFAC69" />
                                        )}
                                </span>
                                <span className="ant-upload-hint ml-3 mt-1">
                                    <div dangerouslySetInnerHTML={{ __html: props.title }} />
                                </span>
                            </div>
                        </Dragger>
                        {state.dataFile.length > 0 && state.dataFile.map((item, index) => {
                            return <div key={index} className="preview py-2 w-100 d-flex">
                                {GetTypeFile(item?.name)}
                                <Typography.Text ellipsis style={{
                                    color: "#fff",
                                    width: "100%"
                                }}>{item.name} </Typography.Text>
                                <span className="cursor-pointer" style={{ marginTop: '-4px' }}
                                    onClick={() => handleRemoveFile(item)}><UilTimes
                                        size="27" color="#FF4747" /></span>
                            </div>


                        })}
                    </>
            }


        </>


    )
}

export default Upload
