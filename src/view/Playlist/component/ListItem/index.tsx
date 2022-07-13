import React, { useRef, useState } from "react";
import { Badge, Tooltip, Typography } from "antd";
import LazyLoadImage from "@view/shared/components/LazyLoadImage/LazyLoadImage";
import { useHistory } from "react-router";
import * as Icon from "react-feather";
import "./../../../RecordGallery/component/ItemMedia/styles.scss";
import { useTranslate } from "@view/shared/hook/useTranslate";

import PlayListEntities from "@modules/playlist/entity";
import { noImg } from "@view/shared/assets/images";
import { routerPlaylist } from "@config/path";
interface Props {
  data: PlayListEntities;
  handleSelectItem?: (data) => void;
  clickToPreview?: (data) => void;
  className?: any;
  itemSelected?: Array<any>;
}

const regexCheckUrlImage =
  /(http(s?):)([/|.|\w|\s|\-|*])*\.(?:jpg|gif|png|jpeg)/g;
const { Title, Text } = Typography;
const ListItemPlaylist = (props: Props) => {

  const history = useHistory();
  const { data, itemSelected } = props;
  const { APPROVED, UNAPPROVED, WAITING, CLICK_TO_PREVIEW } =
    useTranslate("mediaTranslateKey");
  const { EXPIRED, EXPIRING } = useTranslate("artworkTranslateKey");

  // const isSelected = itemSelected?.findIndex(
  //   (i) => i?.mediaId == data?.playListId
  // );
  const isSelected = 0;
const {CREATOR, CREATE_AT, NUMBER_RECORD, DURATION} = useTranslate("playlistTranslateKey");
  return (
    <div className="padding-here">
      <div
        className={`itemMediaList record-gallery ${
          isSelected > -1 ? "selected" : ""
        }`}
      >
        {itemSelected?.length > 0 ? (
          <div
            onClick={() => props.handleSelectItem(data)}
            className="modSelected"
          ></div>
        ) : (
          <div
            onClick={() => props.clickToPreview(data)}
            className="modSelected modPreview"
          ></div>
        )}

        <div
          className={`content-item`}
          onClick={() =>
            history.push(`${routerPlaylist.PLAYLIST}/${data.playlistId}`)
          }
        >
          <div className="text">
            <Text ellipsis className="title">
              {data?.playlistName}
            </Text>
            <div className="list-topic">
              <div className="topic-box">
                <p>Pop</p>
              </div>
              <div className="topic-box">
                <p>Trending</p>
              </div>
            </div>
            <Text ellipsis className="description">
              <span className="title-small">{CREATOR}: </span>
              {data?.userCreate ? data?.userCreate : "--"}
            </Text>
            <Text ellipsis className="description">
              <span className="title-small">{CREATE_AT}: </span>
              {data?.playlistCreateAt ? data?.playlistCreateAt : "--"}
            </Text>
            <div className="list-info">
              <div className="grid-info-box">
                <h4>{NUMBER_RECORD}</h4>
                <p>{data?.numberMedia ? data?.numberMedia : "--"}</p>
              </div>

              <div className="grid-info-box">
                <h4>{DURATION}</h4>
                <p>{data?.playlistDuration ? data?.playlistDuration : "--"}</p>
              </div>
            </div>
            <div className="edit-button">
              <Icon.Info />
            </div>
          </div>
        </div>
        <LazyLoadImage key={"image"} src={noImg} alt={data?.playListName} />
      </div>
    </div>
  );
};

export default ListItemPlaylist;
