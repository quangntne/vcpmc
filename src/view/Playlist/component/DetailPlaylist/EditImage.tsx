import { useTranslate } from "@view/shared/hook/useTranslate";
import { Popover } from "antd";
import React, { useState } from "react";
import * as Icon from "react-feather";
const fakeData = require("@view/Playlist/component/DetailPlaylist/fakeApit.json");
interface IEditImage {
  checkIsEdit: boolean;
  imgUrl: any; setImgUrl: any;
}
const EditImage = ({ checkIsEdit, imgUrl, setImgUrl }: IEditImage) => {
  const initImg = fakeData?.imagePlaylist;
  // const [imgUrl, setImgUrl] = useState(initImg);
  const { UP_IMG, DELETE_IMG } = useTranslate("playlistTranslateKey");
  const content = () => {
    return (
      <div className="label-popup-img">
        <div>
          <label htmlFor="input-media" className="no-margin-bottom">
            <a>{UP_IMG}</a>
          </label>
          <input
            hidden
            onChange={(e) => {
              const media = e.target.files[0]
              console.log(e.target.files[0], "e.target.files");
              setImgUrl(media)
            }}
            type="file"
            id="input-media"
            readOnly
            name="input-media"
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <hr className="label-hr" />
        <div>
          <a onClick={() => setImgUrl(initImg)}>{DELETE_IMG}</a>
        </div>
      </div>
    );
  };
  const imgSrc = (imgUrl == null || typeof imgUrl == "string") ? imgUrl : URL.createObjectURL(imgUrl);
  return (
    <div className="text-left label-div-img">
      {checkIsEdit && (
        <Popover placement="left" content={content} trigger="hover">
          <div className="label-yellow-point-img">
            <Icon.MoreVertical size="25" className="icon-feather" />
          </div>
        </Popover>
      )}
      <img alt="img-playlist" className="label-img"
        // src={(imgUrl == null || typeof imgUrl == "string") ? imgUrl : URL.createObjectURL(imgUrl)} 
        src={imgUrl ? imgSrc : initImg}
      />

    </div>
  );
};

export default EditImage;
