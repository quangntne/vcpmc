import React, { useState } from "react";
import "./style.scss";
import MainTitleComponent, {
  Breadcrumbs,
} from "@view/shared/components/MainTitleComponent";
import ContentComponent from "@view/shared/components/ContentComponent";
import NoteForm from "@view/shared/components/NoteForm";
import RightMenu, {
  IArrayAction,
} from "@view/shared/components/layout/RightMenu";
import {
  Table,
  Input,
  Row,
  Col,
  Form,
  Button,
  Tag,
  Popover,
  Switch,
} from "antd";
import * as Icon from "react-feather";
import { match, useHistory, useParams, withRouter } from "react-router";
import { validateMessages } from "@view/shared/helper/functions";
import { TweenOneGroup } from "rc-tween-one";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import TableGallery from "./TableGallery";
import { routerPlaylist } from "@config/path";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import TopicGallery from "./TopicGallery";
import EditImage from "./EditImage";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import { useDispatch, useSelector } from "react-redux";
import columnRecord from "../AddRecordToPlaylist/ColumnRecord";
//import useTimeLineListMedia from "@view/MediaLibrary/Components/TimeLineListMedia/useTimeLineListMedia";
import { RootState } from "@modules/core/store/redux";
//import ModalPreview from "@view/MediaLibrary/Components/TimeLineListMedia/components/ModalPreview";
import { updateListRecordGallery } from "@modules/playlist/playlistStore";
import { useTranslate } from "@view/shared/hook/useTranslate";
import TableComponent from "@view/shared/components/TableComponent";
import playlistPresenter from "@modules/playlist/presenter";
import PlayListEntities from "@modules/playlist/entity";
const fakeData = require("@view/Playlist/component/DetailPlaylist/fakeApit.json");

interface IDetailPlaylist {
  _: any;
  match: { params: { id: string }, path: string };
  location?: any;
}

const DetailPlaylist = ({ _, match }: IDetailPlaylist) => {
  const [form] = Form.useForm();
  const [getList, getDetailPlaylist, deletePlaylist, editPlaylist] = useAsync(RecordGalleryPresenter.getMedias(match.params.id), playlistPresenter.getPlaylistId, playlistPresenter.deletePlaylist, playlistPresenter.editPlaylist);
  const [checkIsEdit, setCheckIsEdit] = React.useState<boolean>(false);
  const [playlist, setPlaylist] = useState<PlayListEntities>(null);
  const { EDIT, DELETE, SURE_DELETE, ADD, DETAIL, TITLE, UPLOADER } =
    useTranslate("common");
  const {
    TOTAL,
    DURATION,
    Description,
    DISPLAY_PUB,
    SUFFER,
    REPLAY,
  } = useTranslate("playlistTranslateKey");
  const history = useHistory();
  const { RECORD, CANCEL, SAVE } = useTranslate("recordGalleryTranslateKey");
  const arrayAction: IArrayAction[] = [
    {
      iconType: "edit",
      name: EDIT,
      handleAction: () => {
        setCheckIsEdit(true);
      },
    },
    {
      iconType: "delete",
      name: DELETE + " Playlist",
      handleAction: () => {
        DeleteConfirm({
          title: DELETE + " " + playlist?.playlistName,
          content: SURE_DELETE + " " + playlist?.playlistName + " ?",
          handleOk: () =>
            deletePlaylist.execute(playlist?.playlistId).then(res => {
              history.push(routerPlaylist.PLAYLIST);
            })
          ,
          handleCancel: () => { },
        });
      },
    },
  ];

  const arrayViewAction: IArrayAction[] = [
    {
      iconType: "add",
      name: ADD + " " + RECORD,
      handleAction: () => {
        history.push(routerPlaylist.ADD_RECORD_TO_PLAYLIST + "/" + match.params.id);
      },
    },
  ];

  const data: Breadcrumbs[] = [
    {
      name: "Playlist",
      href: routerPlaylist.PLAYLIST,
    },
    {
      name: DETAIL + " playlist",
    },
  ];
  const listTable = useSelector(
    (state: RootState) => state.playlistStore.listRecordGallery
  );
  const tailLayout = {
    wrapperCol: { offset: 0 },
  };
  const dispatch = useDispatch();
  const [doCallAgain, setDoCallAgain] = useState(1);
  const [activeIcon, setActiveIcon] = useState<{
    globe: boolean
    shuffle: boolean,
    repeat: boolean
  }>({
    globe: false, //playlistStatus
    shuffle: false, //playlistHowtoplay
    repeat: false, //playlistRepeat
  });
  const [imgUrl, setImgUrl] = useState(null);

  const [arrayTag, setArrayTag] = useState([]);
  const callApiDetailList = () => {
    getDetailPlaylist.execute(match.params.id).then((res: PlayListEntities) => {
      setPlaylist(res);
      form.setFieldsValue(res);
      setActiveIcon(res);
      setImgUrl(res?.playlistImageCover);
    })
  }
  const callApiListRecordGallery = () => {
    getList.execute().then((res) => {
      dispatch(updateListRecordGallery(res.data));
    });
    setDoCallAgain(2);
  }

  React.useEffect(() => {
    // xét router coi có phải show edit liền hay ko 
    if (match?.path?.split('/')[1] == routerPlaylist.EDIT_PLAYLIST.split('/')[1]) {
      setCheckIsEdit(true);
    }
    callApiDetailList();
    // có nên gọi thằng list Media hay ko 
    if (doCallAgain == 1 && listTable == []) {
      callApiListRecordGallery();
    }

  }, [checkIsEdit]);


  const handleDeleteRecord = (mediaId: string, colNewRecord) => {
    if (!checkIsEdit) {
      setCheckIsEdit(true);
    }
    const newState = [...listTable];
    const indexToDelete = newState.findIndex((item) => {
      return item.mediaId == mediaId;
    });
    const [removed] = newState.splice(indexToDelete, 1);
    dispatch(updateListRecordGallery(newState));
  };
  const thisColumn = () => {
    return columnRecord(handleDeleteRecord, checkIsEdit ? "edit" : "detail", null, null);
  };
  const onFinish = (values) => {
    editPlaylist.execute({ ...values, playlistId: playlist.playlistId, playlistImageCover: imgUrl, medias: listTable, playlistCategories: arrayTag }).then(res => {
      oncancelEdit();
    })
  }
  const oncancelEdit = () => {
    setDoCallAgain(1);
    setCheckIsEdit(false);
    callApiListRecordGallery();
    history.push(`${routerPlaylist.PLAYLIST}/${match.params.id}`)
  }
  return (
    <>
      <MainTitleComponent
        breadcrumbs={data}
        title={`Playlist ${playlist?.playlistName}`}
      />

      <div className="form-detail-playlist">
        <Row>
          <Col lg={5} sm={5} xs={24} className="pr-5">
            <Form
              autoComplete="false"
              form={form}
              name="formDetailPlaylist"
              onFinish={onFinish}
              scrollToFirstError
              id="formDetailPlaylist"
              validateMessages={validateMessages()}
              className="mt-3 quang-tran-form form-view-user"
              layout="vertical"
            >
              <EditImage imgUrl={imgUrl} setImgUrl={setImgUrl} checkIsEdit={checkIsEdit} />
              <Form.Item
                name="playlistName"
                label={checkIsEdit && TITLE}
                rules={[{ required: true }]}
                className="mt-3"
              >
                {checkIsEdit === true ? (
                  <Input />
                ) : (
                  <div className="label-title">
                    <label>{playlist?.playlistName}</label>
                  </div>
                )}
              </Form.Item>
              <hr className="label-hr" />
              <ContentComponent
                className="label-content"
                label={UPLOADER}
                text={playlist?.userCreate || "--"}
              />
              <ContentComponent
                className="label-content"
                label={TOTAL}
                text={`${playlist?.totalMedia || 0} ${RECORD}`}
              />
              <ContentComponent
                className="label-content"
                label={`${TOTAL} ${DURATION}`}
                text={playlist?.totalDuration || "00:00:00"}
              />
              <hr className="label-hr" />
              <Form.Item
                key="desPlaylist"
                name="playlistDescription"
                label={checkIsEdit && `${Description}:`}
              >
                {checkIsEdit === true ? (
                  <Input.TextArea />
                ) : (
                  <div className="label-des">
                    <label>{playlist?.playlistDescription || "--"}</label>
                  </div>
                )}
              </Form.Item>
              <hr className="label-hr" />
              <TopicGallery data={playlist} getArrayTag={(value) => setArrayTag(value)} checkIsEdit={checkIsEdit} />
              {checkIsEdit ? (
                <>
                  <NoteForm />
                </>
              ) : (
                <>
                  <hr className="label-hr" />
                  <div className="text-color">
                    <div
                      className={`icon-awesome d-center ${activeIcon?.globe ? "active" : ""}`}
                      onClick={() =>
                        setActiveIcon((prev) => ({
                          ...prev,
                          globe: !prev.globe,
                        }))
                      }
                    >
                      <i className="fa fa-globe-africa" />
                      {DISPLAY_PUB}
                    </div>
                    <div
                      className={`d-center ${activeIcon?.shuffle ? "active" : ""}`}
                      onClick={() =>
                        setActiveIcon((prev) => ({
                          ...prev,
                          shuffle: !prev.shuffle,
                        }))
                      }
                    >
                      <div className="border-icon">
                        <Icon.Shuffle
                          size="15px"
                          color={activeIcon?.shuffle ? "#FF7506" : "white"}
                          className="icon-feather"
                        />
                      </div>
                      {SUFFER}
                    </div>
                    <div
                      className={`d-center ${activeIcon?.repeat ? "active" : ""
                        }`}
                      onClick={() =>
                        setActiveIcon((prev) => ({
                          ...prev,
                          repeat: !prev.repeat,
                        }))
                      }
                    >
                      <div className="border-icon">
                        <Icon.Repeat
                          size="15px"
                          color={activeIcon?.repeat ? "#FF7506" : "white"}
                          className="icon-feather"
                        />
                      </div>
                      {REPLAY}
                    </div>
                  </div>
                </>
              )}
            </Form>
          </Col>
          <Col className="label-table-detail" lg={19} sm={19} xs={24}>
            <TableComponent
              langs={['recordGalleryTranslateKey', 'common']}
              dataSource={listTable}
              columns={thisColumn()}
              className="main-table"
            />
            {checkIsEdit ? (
              <div className="mt-5">
                <Row gutter={24}>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item {...tailLayout} className="text-right">
                      <Button
                        type="primary"
                        className="cancel-button"
                        onClick={() => oncancelEdit()}
                      >
                        {CANCEL}
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item {...tailLayout} key="submit">
                      <Button
                        type="primary"
                        className="normal-button"
                        htmlType="submit"
                        onClick={() => {
                          form.submit();
                          // setDoCallAgain(1)
                        }}
                      >
                        {SAVE}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
      <RightMenu arrayAction={checkIsEdit ? arrayViewAction : arrayAction} />
    </>
  );
};

export default withRouter(DetailPlaylist);
