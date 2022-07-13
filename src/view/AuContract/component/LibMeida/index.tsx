import store, {RootState} from "@modules/core/store/redux";
import {useTranslate} from "@view/shared/hook/useTranslate";
import {Col, Row, List} from "antd";
import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroller";
import {useSelector} from "react-redux";
import {artworkTranslateKey} from "@translateKey/index";
//import "@view/MediaLibrary/Components/TimeLineListMedia/styles.scss";
// import useTimeLineListMedia from "@view/MediaLibrary/Components/TimeLineListMedia/useTimeLineListMedia";
// import ListMediaByDate from "@view/MediaLibrary/Components/TimeLineListMedia/components/ListMediaByDate";
// import SkeletonListMedia from "@view/MediaLibrary/Components/TimeLineListMedia/components/SkeletonListMedia";
// import ModalPreview from "@view/MediaLibrary/Components/TimeLineListMedia/components/ModalPreview";
import * as moment from "moment";


interface Props {
    showContract?: boolean
}

export const LibMedia = (props: Props) => {
    const {showContract} = props;
    const {
        ARTWORK
    } = useTranslate("artworkTranslateKey");
    // const {
    //     handleInfiniteOnLoad,
    //     handleSelectItem,
    //     clickToPreview,
    // } = useTimeLineListMedia();
    // const {handelSelectFilter, FilterMediaByDate} = useTimeLineListMedia();
    // const {
    //     data,
    //     info,
    //     itemSelected,
    // } = useSelector((state: RootState) => state.mediaStore);


    useEffect(() => {
        const name: any = "status";
        if (showContract) {
            //FilterMediaByDate();
            // handelSelectFilter(0,name);
        }
    }, [showContract]);

    return (
        <Col span={24}>
            <Row gutter={[15, 15]} className="position-relative">
                <Col span={24} className="wrapContentListMedia">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        // loadMore={handleInfiniteOnLoad}
                        // hasMore={!info.loading && info.hasMore}
                        useWindow={false}
                    >
                        {/*{console.log(arrMedia, 'arrMedia======')}*/}
                        {(
                            <List
                                //dataSource={data}
                                // locale={
                                //     {
                                //         emptyText:
                                //     }
                                // }
                                renderItem={(item, index) => (
                                    <Col span={24} className="pb-5" key={index}>
                                        {/* <ListMediaByDate
                                            contract={true}
                                            data={item}
                                            translate={{ARTWORK: ARTWORK}}
                                            itemSelected={itemSelected}
                                            handleSelectItem={(item) => handleSelectItem(item)}
                                            clickToPreview={(item) => clickToPreview(item)}
                                        /> */}
                                    </Col>
                                )}
                            >
                                {/* {info.loading && info.hasMore && <SkeletonListMedia/>} */}
                                {/* {info.loading && info.hasMore && (
                  <div className="demo-loading-container">
                    <HorizontalLoading />
                  </div>
                )} */}
                            </List>
                        )}
                    </InfiniteScroll>
                </Col>
            </Row>
        </Col>
    );
};
