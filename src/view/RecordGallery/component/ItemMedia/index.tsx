import React, { useRef, useState } from "react";
import { Badge, Tooltip, Typography } from "antd";
import LazyLoadImage from "@view/shared/components/LazyLoadImage/LazyLoadImage";
import LazyLoadVideoAudio from "@view/shared/components/LazyLoadVideoAudio";
import Checkbox from "antd/lib/checkbox/Checkbox";
//import { Media } from "@modules/media/interface";
import { useHistory } from "react-router";
import * as Icon from "react-feather";
import "./styles.scss";
import { useTranslate } from "@view/shared/hook/useTranslate";
import {
  artworkTranslateKey,
  mediaTranslateKey,
} from "@view/shared/translateKey";
import { flagMTC } from "@config/index";
import { routerRecordGallery } from "@config/path";
import RecordGalleryEntity, { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
import { selectItem } from "@modules/recordGallery/recordGalleryStore";
interface Props {
  data: MediaRecordGalleryEntities;
  clickToPreview?: (data) => void;
  className?: any;
  isApprove?: boolean
}

const regexCheckUrlImage =
  /(http(s?):)([/|.|\w|\s|\-|*])*\.(?:jpg|gif|png|jpeg)/g;
const { Text } = Typography;
const ItemMediaTimeLine = (props: Props) => {
  const history = useHistory();
  const { data, isApprove } = props;
  const itemSelected = useSelector((state: RootState) => state.recordGalleryStore.itemSelected);

  const renderMediaByType = (data: MediaRecordGalleryEntities) => {
    let typeMedia =
      data?.mediaContentVideo &&
      data?.mediaContentVideo.split("/").length > 0 &&
      data?.mediaContentVideo.split("/")[0];

    if (typeMedia === "link") {
      data?.mediaContentVideo.match(regexCheckUrlImage) != null
        ? (typeMedia = "image")
        : (typeMedia = "video");
    }
    switch (typeMedia) {
      case "audio":
        return (
          <div>
            <div className="bg-audio">
              <i className="fa fa-music fa-4x" />
            </div>
            <LazyLoadVideoAudio
              key={"audio"}
              className="react-player"
              url={data?.mediaContentVideo}
              width="100%"
              height="100%"
              playing={false}

            />
          </div>
        );
      case "video":
        const light = data?.mediaContentVideo.includes("www.youtube.com");

        return (
          <div>
            <LazyLoadVideoAudio
              key={"video"}
              className="react-player"
              url={data?.mediaContentVideo}
              width="100%"
              height="100%"
              playing={false}
              light={light}
            />
          </div>
        );
      default:
        return (
          <LazyLoadImage
            key={"image"}
            src={data?.mediaContentVideo}
            alt={data?.mediaName}
          />
        );
    }
  };
  const isSelected = itemSelected?.findIndex(
    (i) => i == data.mediaId
  );
  const dispatch = useDispatch();
  const { SINGER, DURATION, TYPE, WRITERS, FORMAT, CONTRACT_ID } = useTranslate("recordGalleryTranslateKey");
  return (
    <div className="padding-here" >
      <div className={`itemMediaList record-gallery `}>
        <div className={`content-item`} onClick={() => {
          if (isApprove) {
            history.push(
              `${routerRecordGallery.EDIT_RECORD_GALLERY}/${data.mediaId}`
            );
          } else {
            dispatch(selectItem(data?.mediaId))
          }
        }}>
          <div className="text">
            <Text ellipsis className="title">
              {data?.mediaName}
            </Text>
            <Text ellipsis className="description">
              <span className="title-small">{SINGER}: </span>
              {data?.mediaPerformer || "--"}
            </Text>
            <Text ellipsis className="description">
              <span className="title-small">{WRITERS}: </span>
              {data?.mediaAuthor || "--"}
            </Text>
            {/* <Text ellipsis className="description">
              <span className="title-small">{CONTRACT_ID}: </span>
              {data?.mediaId ? data?.mediaId : "--"}
            </Text> */}
            <div className="list-info">
              <div className="grid-info-box">
                <h4>{TYPE}</h4>
                <p>
                  {data?.mediaCategoryName || "--"}
                </p>
              </div>
              <div className="grid-info-box">
                <h4>{FORMAT}</h4>
                <p>{data?.mediaTypeCode ? data?.mediaTypeCode : "--"}</p>
              </div>

              <div className="grid-info-box">
                <h4>{DURATION}</h4>
                <p>{data?.mediaDuration ? data?.mediaDuration : "--"}</p>
              </div>
            </div>
            <div className="edit-button">
              {isApprove ? (
                <Icon.Edit />
              ) : (
                <Checkbox className="check-button" checked={isSelected > -1} />
              )}
            </div>
          </div>
        </div>
        <div onClick={() => props.clickToPreview(data)}>
          <div className="bg-audio" style={{ color: "#fff" }}>
            <i className="fa fa-play fa-x" />
          </div>
          {renderMediaByType(data)}
        </div>
      </div>
    </div>
  );
};

export default ItemMediaTimeLine;
