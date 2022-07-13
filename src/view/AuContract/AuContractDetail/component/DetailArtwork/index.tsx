import React, {useEffect} from "react";
import {Col, Row} from "antd";
import ContentComponent from "@view/shared/components/ContentComponent";
import * as moment from "moment";
import {useTranslate} from "@hook/useTranslate";
import {artworkTranslateKey} from "@translateKey/index";
import "./styles.scss";


const DetailArtWork = props => {
    const {data} = props;
    const {
        TYPE_MEDIA, ARTIST, MIXES_REMIXES, WRITERS, DATE_RELEASE,
        LYRIC, RECORDERS, DATE_PUBLISH, ARTWORK_DETAIL
    } = useTranslate("artworkTranslateKey");

    useEffect(() => {
        console.log(data);
    }, [data]);

    //mediaExtendParse:
    // artist: "Hoài Lâm Tâm"
    // category: "V-pop"
    // datePublish: "2020-06-26 00:00:00"
    // dateRelease: "2020-06-26 00:00:00"
    // lyric: "Nguyễn Minh Cường"
    // mix: "Trần Việt Dương "
    // mixesRemixes: "Trần Việt Dương  111"
    // recorders: "Nguyễn Minh Cường"
    // writers: "Nguyễn Minh Cường"

    return (
        <>{
            data &&

            <section className="detail-artwork">
                <div className="detail-artwork-wrap-title">
                    <span className="font-weight-bold">{ARTWORK_DETAIL}</span>
                </div>
                <div className="detail-artwork-wrap">

                    <Row gutter={24}>
                        <Col span={8}>
                            <ContentComponent text={data?.mediaExtendParse?.category} label={TYPE_MEDIA}/>
                            <ContentComponent text={data?.mediaExtendParse?.writers} label={WRITERS}/>
                            <ContentComponent text={data?.mediaExtendParse?.lyric} label={LYRIC}/>
                        </Col>
                        <Col span={8}>
                            <ContentComponent text={data?.mediaExtendParse?.mixesRemixes} label={MIXES_REMIXES}/>
                            <ContentComponent text={data?.mediaExtendParse?.mix} label={"Mix & Master"}/>
                            <ContentComponent text={data?.mediaExtendParse?.recorders} label={RECORDERS}/>
                        </Col>
                        <Col span={8}>
                            <ContentComponent text={data?.mediaExtendParse?.artist} label={ARTIST}/>
                            <ContentComponent text={moment(data?.mediaExtendParse?.dateRelease).format("DD/MM/YYYY")}
                                              label={DATE_RELEASE}/>
                            <ContentComponent text={moment(data?.mediaExtendParse?.datePublish).format("DD/MM/YYYY")}
                                              label={DATE_PUBLISH}/>
                        </Col>
                    </Row>
                </div>
            </section>
        }
        </>
    )
};

export default DetailArtWork