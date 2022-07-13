import NoteForm from "@view/shared/components/NoteForm";
import ContentComponent from "@view/shared/components/ContentComponent";
import TopicGallery from "./../DetailPlaylist/TopicGallery";
import React, { useState } from "react";
import * as Icon from "react-feather";
import MainTitleComponent, {
  Breadcrumbs,
} from "@view/shared/components/MainTitleComponent";
import TableComponent from "@view/shared/components/TableComponent";
import "./../DetailPlaylist/style.scss";
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
import { validateMessages } from "@view/shared/helper/functions";
import { routerPlaylist, routerRecordGallery } from "@config/path";
import { useHistory } from "react-router";
import "./../AddRecordToPlaylist/styles.scss";
import columnRecord from "../AddRecordToPlaylist/ColumnRecord";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
import { updateListRecordGallery } from "@modules/playlist/playlistStore";
import { useTranslate } from "@view/shared/hook/useTranslate";
import EditImage from "../DetailPlaylist/EditImage";
import useTimeLineListMedia from "@view/RecordGallery/useTimeLineListMedia";
import { useAsync } from "@view/shared/hook/useAsync";
import playlistPresenter from "@modules/playlist/presenter";
import { fakeDataAddPlaylist } from "@view/Playlist/interface";

const AddPlaylist = () => {
  const history = useHistory();
  const tailLayout = {
    wrapperCol: { offset: 0 },
  };

  const [form] = Form.useForm();
  const listRecord = useSelector(
    (state: RootState) => state.playlistStore.listRecordGallery
  );
  const { totalRecordDuration } = useSelector((state: RootState) => state.playlistStore);
  React.useEffect(() => {
    form.setFieldsValue(fakeDataAddPlaylist)
  }, [])
  const [arrayTag, setArrayTag] = useState<any>([]);
  
  const dispatch = useDispatch();
  const handleDeleteRecord = (mediaId: string, colNewRecord) => {
    const newState = [...listRecord];
    const indexToDelete = newState.findIndex((item) => item.mediaId == mediaId);
    dispatch(updateListRecordGallery(newState));
  };
  const { clickToPreview } = useTimeLineListMedia();
  const columnTable = columnRecord(
    handleDeleteRecord,
    "addNew",
    clickToPreview,
    null
  );
  const [addPlaylist] = useAsync(playlistPresenter.addNewPlaylist)
  const { RECORD, CANCEL, SAVE, ADD, COVER_IMAGE, ADD_NODATA, TITLE, PUBLIC_MODE, Description, DURATION, TOTAL } = useTranslate("playlistTranslateKey", "recordGalleryTranslateKey", "common");
  const arrayAction: IArrayAction[] = [
    {
      iconType: "add",
      name: `${ADD} ${RECORD}`,
      handleAction: () => {
        history.push(routerPlaylist.ADD_RECORD_TO_PLAYLIST);
      },
    },
  ];

  const [imgUrl, setImgUrl] = useState(null);
  const data: Breadcrumbs[] = [
    {
      name: "Playlist",
      href: routerPlaylist.PLAYLIST,
    },
    {
      name: ADD + " playlist",
    },
  ];
  const onFinishForm = (values) => {
    addPlaylist.execute({ ...values, playlistImageCover: imgUrl, medias: listRecord, playlistCategories: arrayTag }).then(res => {
      // onCancelForm();
    })
  }
  const onCancelForm = () => {
    dispatch(updateListRecordGallery([]));
    history.push(routerPlaylist.PLAYLIST);
  }

  return (
    <>
      <MainTitleComponent breadcrumbs={data} />

      <div className="form-detail-playlist">
        <Row className="">
          <Col lg={5} sm={5} xs={24} className="pr-5">
            <Form
              autoComplete="false"
              form={form}
              name="formDetailPlaylist"
              onFinish={onFinishForm}
              scrollToFirstError
              id="formDetailPlaylist"
              validateMessages={validateMessages()}
              className="mt-3 quang-tran-form form-view-user"
              layout="vertical"
            >
              <Form.Item name="playlistImageCover" label={COVER_IMAGE}>
                <EditImage imgUrl={imgUrl} setImgUrl={setImgUrl} checkIsEdit={true} />
              </Form.Item>

              <Form.Item
                name="playlistName"
                label={TITLE}
                rules={[{ required: true }]}
                className="mt-3"
              >
                <Input />
              </Form.Item>
              <hr className="label-hr" />

              <ContentComponent
                className="label-content"
                label={TOTAL}
                text={`${listRecord?.length || 0} ${RECORD}`}
              />
              <ContentComponent
                className="label-content"
                label={`${TOTAL} ${DURATION}`}
                text={totalRecordDuration}
              />
              <hr className="label-hr" />
              <Form.Item key="desPlaylist" name="playlistDescription" label={`${Description}:`}>
                <Input.TextArea />
              </Form.Item>
              <hr className="label-hr" />
              <TopicGallery getArrayTag={(res) => setArrayTag(res)} checkIsEdit={true} />
              <hr className="label-hr" />
              <Form.Item name="playlistStatus" label={PUBLIC_MODE} valuePropName="checked">
                <Switch className="mr-3" />
              </Form.Item>
              <NoteForm />
            </Form>
          </Col>
          <Col className="label-table-detail" lg={19} sm={19} xs={24}>
            <TableComponent
              langs={["playlistTranslateKey", "recordGalleryTranslateKey"]}
              className="main-table"
              columns={columnTable}
              dataSource={listRecord}
              locale={{
                emptyText: (
                  <>
                    <div className="no-data">
                      {ADD_NODATA}
                    </div>
                  </>
                ),
              }}
            />
            <div className="mt-5">
              <Row gutter={25}>
                <Col lg={12} sm={24} xs={24}>
                  <Form.Item {...tailLayout} className="text-right">
                    <Button
                      type="primary"
                      className="cancel-button"
                      onClick={() => {
                        onCancelForm()
                      }}
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
                      }}
                    >
                      {SAVE}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      {/* <ModalPreview /> */}
      <RightMenu arrayAction={arrayAction} />
    </>
  );
};

export default AddPlaylist;
