import React, {useEffect, useState} from "react";
import {useAsync} from "@hook/useAsync";
import RepositoryDevice from "@modules/devices/repository";
import InfiniteScroll from 'react-infinite-scroller';
import {Col, Divider, List, Row, Spin} from "antd";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import "./styles.scss";
import * as moment from "moment";
import {useTranslate} from "@hook/useTranslate";
import {deviceTranslateKey} from "@translateKey/index";
import {useSelector} from "react-redux";
import {RootState} from "@store/redux";
import {useRouter} from "@helper/functions";
import devicesPresenter from "@modules/devices/presenter";
import ModalDetailLog from "@view/Devices/Device_Log/Component/DetailLog";
import CheckPermission from "@hoc/CheckPermission";

const noImg = require("../../shared/assets/images/no-image.jpg");

const DeviceLog = props => {
    const router = useRouter();
    const idDevice = router.query["key"];
    const [stable, setStable] = useState({data: [], loading: false, hasMore: true, current: 1});
    // const [{execute: list, status}] = useAsync(RepositoryDevice.getLogDevice);
    const [locale, setLocale] = useState(null);
    const {currentLanguage} = useSelector((state: RootState) => state.translateStore);
    const {CREATE, UPDATE, DELETE, Device_Log, Device_List} = useTranslate("deviceTranslateKey");
    const {getLogDevice} = devicesPresenter;
    const [openModal, setOpenModal] = useState({modal: false, data: {}});

    useEffect(() => {
        if (currentLanguage == "USA") return setLocale('en');
        else return setLocale('vi');
    }, [currentLanguage]);
    useEffect(() => {
        getLogDevice(idDevice, {pageSize: 5, current: 1}).then(res => {
            // console.log(res,"res===")
            setStable(prev => ({...prev, data: res.data, current: res.info.current}))
        });

    }, []);

    const handleInfiniteOnLoad = () => {
        let tempData = [...stable.data];
        setStable(prev => ({...prev, loading: true}));
        let current = stable.current + 1;
        getLogDevice(idDevice, {pageSize: 5, current: current}).then(res => {
            // console.log(res,'res====')
            tempData = tempData.concat(res.data);
            setStable(prev => ({...prev, loading: false, data: tempData, current: res.info.current}));
            if (tempData.length == res.info.total) {
                return setStable(prev => ({...prev, hasMore: false}));

            }
        })


    };

    const handleOpenModal = data => {
        setOpenModal({modal: true, data: data})
    };

    const handleCloseModal = () => {
        setOpenModal({modal: false, data: {}})
    };

    return (
        <CheckPermission permissionCode={"VIEW_DEVICE"}>
            <div className="device-log">
                <MainTitleComponent
                    breadcrumbs={[
                        {
                            name: Device_List,
                            href: "/device",
                        },
                        {
                            name: Device_Log,
                            href: "",
                        },
                    ]}
                    title={Device_Log}
                    classBreadcumb={null}
                    classTitle={null}
                />
                <div className="list-device-log-container">

                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={stable.hasMore}
                        useWindow={false}

                    >

                        <Row gutter={24} className="title-list text-center">
                            <Col span={24}>
                                <span>{Device_Log}</span>
                            </Col>
                        </Row>
                        <List
                            dataSource={stable.data}
                            className="list-device-log"
                            // header={"DEVICE LOG"}
                            renderItem={item => (
                                <>
                                    <Row gutter={24} className="title-date text-center">
                                        <Col span={24} className="text-capitalize">
                                            {moment(item.deviceLogCreatedAt).locale(locale).format("dddd - MMMM DD, YYYY")}
                                        </Col>
                                    </Row>
                                    {
                                        item.listLog.map(itemChild => {
                                            return <Row gutter={24} className="title-item">
                                                <Col span={4} className="text-center div-time-log">
                                                    <span
                                                        className="time-log">{moment(itemChild.deviceLogCreatedAt).format("HH:mm")}</span>
                                                </Col>
                                                <Col span={3}>
                                                    <div className="div-img-device text-center">
                                                        {itemChild.userAvatar == null ? <img src={noImg} alt="avatar-device"/> :
                                                            <img className="" src={itemChild.userAvatar}
                                                                 alt="avatar-device"/>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div className=" info-log">
                                                        <span className="user-log">{itemChild.userName}</span>
                                                        <div><span
                                                            className="type-log">{itemChild.deviceLogType == 0 ? UPDATE : itemChild.deviceLogType == 1 ? DELETE : CREATE}</span>
                                                            &ensp;<span
                                                                className="name-log">{itemChild.deviceName}</span>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col span={5}
                                                     className="d-flex justify-content-center align-items-center">
                                                    {itemChild.deviceLogType == 0 &&
                                                    <div className="detail-log"
                                                         onClick={() => handleOpenModal(itemChild.deviceLogValue)}>
                                                        <i className="fas fa-info-circle fa-2x cursor-pointer"/>
                                                    </div>
                                                    }
                                                </Col>
                                            </Row>
                                        })
                                    }

                                </>
                            )}
                        >
                            {stable.loading && stable.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin/>
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
                <ModalDetailLog visible={openModal.modal} data={openModal.data} handleCancel={handleCloseModal}/>
            </div>
        </CheckPermission>
    )
};

export default DeviceLog