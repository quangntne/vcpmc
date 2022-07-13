import React, { useEffect, useMemo, useState } from "react";
import { routerPlaylist } from "@config/path";
import MainTitleComponent, {
  Breadcrumbs,
} from "@view/shared/components/MainTitleComponent";
import { Button, Col, Row, Table } from "antd";
import SelectAndLabelComponent, {
  ISelectData,
} from "@view/shared/components/SelectAndLabelConponent";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import "./../DetailPlaylist/style.scss";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import "./styles.scss";
import TableComponent from "@view/shared/components/TableComponent";
import columnRecord from "./ColumnRecord";
import {
  arrayMove,
  SortableContainer as SortableC,
  SortableElement,
} from "react-sortable-hoc";
import { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import { IStateRecord } from "@view/Playlist/interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
import { updateListRecordGallery } from "@modules/playlist/playlistStore";
import { useHistory, useParams } from "react-router";
import { useTranslate } from "@view/shared/hook/useTranslate";
import PlayListEntities from "@modules/playlist/entity";
import useTable from "@view/shared/components/TableComponent/hook";
import { useAsync } from "@view/shared/hook/useAsync";
import playlistPresenter from "@modules/playlist/presenter";

const AddRecordToPlaylist = () => {
  let mediaFormat = useSelector((state: RootState) => state.settingStore.mediaFormat)
  const [getPlaylistDemo, getMediaOfEdit, getDetailPlaylist] = useAsync(playlistPresenter.getPlaylistPublic, RecordGalleryPresenter.getListMediaForAddRecordToGallery, playlistPresenter.getPlaylistId);
  const [valuePlaylistDemo, setValuePlaylistDemo] = useState<{
    valueSelect: string,
    filterPlaylist: ISelectData[]
  }>({
    valueSelect: null,
    filterPlaylist: []
  });
  const onChangeSelectPlaylistDemo = (value) => {
    setValuePlaylistDemo(prev => ({ ...prev, valueSelect: value }));
  }
  const param: { playlistId: string } = useParams();

  useEffect(() => {
    getPlaylistDemo.execute().then(res => {
      const filterPlaylist = res.map((item: PlayListEntities) => {
        return { value: item.playlistId, name: item.playlistName, ...item };
      })
      setValuePlaylistDemo(prev => ({ ...prev, filterPlaylist }))
    })
  }, [valuePlaylistDemo.valueSelect])

  const [state, setState] = useState<IStateRecord>({
    records: [],
    recordsSelected: [],
  });
  const [playlist, setPlaylist] = useState<PlayListEntities>(null)
  const { listRecordGallery } = useSelector((state: RootState) => state.playlistStore);
  useEffect(() => {
    if (param?.playlistId && listRecordGallery) {
      //khi biết là add vô playlist có sẵn thì gọi api và set recordsSelected ở đây
      setState(prev => ({ ...prev, recordsSelected: listRecordGallery }))
      // và set tên playlist ở đây
      getDetailPlaylist.execute(param?.playlistId).then((res: PlayListEntities) => {
        setPlaylist(res);
      })
    } else {
      //còn ko thì set recordSelected null ha

    }
  }, [])

  const dispatch = useDispatch();

  const handleDeleteRecord = (mediaId: string, colNewRecord) => {
    const newState = [...state.recordsSelected];
    const oldStateofRecord = state.records;
    if (colNewRecord == true) {
      const indexToDelete = newState.findIndex(
        (item) => item.mediaId == mediaId
      );
      const [removed] = newState.splice(indexToDelete, 1);
    } else {
      const indexToAdd = oldStateofRecord.find(
        (item) => item.mediaId == mediaId
      );
      newState.push(indexToAdd);
    }
    setState((prev) => ({ ...prev, recordsSelected: newState }));
  };


  // JUST TABLE 
  const _lang = useTranslate("recordGalleryTranslateKey", "playlistTranslateKey");
  const columnfirst = columnRecord(
    handleDeleteRecord,
    "list",
    null,
    state.recordsSelected
  );
  const columnfirst2 = () => {
    const columnTranslate: Array<any> = columnRecord(
      handleDeleteRecord,
      "selected",
      null,
      state.recordsSelected
    );
    return columnTranslate.map(item => {
      return { ...item, title: _lang[item.title] }
    })
  };
  const table = useTable();
  const onChangeMediaFormat = (value) => {
    // table.fetchData({
    //   option: {}
    // })
  }

  // DRAGGEBLE
  const SortableItem = SortableElement((props) => <tr {...props} />);
  const SortableContainer = SortableC((props) => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const dataSource = state.recordsSelected;
    if (oldIndex !== newIndex) {
      const newData = arrayMove(
        [].concat(dataSource),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      setState((prev) => ({ ...prev, recordsSelected: newData }));
    }
  };

  const DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging main-table edit-table"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const dataSource = state.recordsSelected;
    // function findIndex base on Table rowKey props and should always be a right array index
    let index = 0;
    if (state.recordsSelected) {
      index = dataSource.findIndex(
        (x) => x.mediaId === restProps["data-row-key"]
      );
    }
    return <SortableItem index={index} {...restProps} />;
  };
  // end draggeble

  const history = useHistory();
  const handleCancel = () => {
    if (param?.playlistId) {
      history.push(`${routerPlaylist.EDIT_PLAYLIST}/${param.playlistId}`);
    } else {
      history.push(routerPlaylist.ADD_PLAYLIST);
    }
  };
  const handleSave = () => {
    dispatch(updateListRecordGallery(state.recordsSelected));
    handleCancel();
  };

  const {
    RECORD_GALLERY,
    TYPE,
    DETAIL,
    RECORD_NAME,
    RECORD,
    PLAYLIST_DEMO,
    ADD_RECORD_PLAYLIST,
    TOTAL,
    DURATION,
    SAVE,
    ADD_NODATA,
    CANCEL,
    ADD,
  } = useTranslate("common", "playlistTranslateKey", "recordGalleryTranslateKey");

  // JUST NORMAL STATE
  const data: Breadcrumbs[] = [
    {
      name: "Playlist",
      href: routerPlaylist.PLAYLIST,
    },
    {
      name: param?.playlistId ? DETAIL + " playlist" : ADD + " playlist",
      href: param?.playlistId ? `${routerPlaylist.EDIT_PLAYLIST}/${param.playlistId}` : routerPlaylist.ADD_PLAYLIST,
    },
    { name: ADD_RECORD_PLAYLIST },
  ];

  const callApiMemo = useMemo(() => {
    return valuePlaylistDemo?.valueSelect ? RecordGalleryPresenter.getMedias(valuePlaylistDemo.valueSelect) :
      RecordGalleryPresenter.getListNewMedia
  }, [valuePlaylistDemo]);

  return (
    <>
      <MainTitleComponent breadcrumbs={data}
        detailName={param?.playlistId ? playlist?.playlistName : ""}
      />

      <Row gutter={16} className="padding-68">
        <Col span={12}>
          <div className="record-card">
            <div className="record-card-all-title">
              <h3 className="title-record">{RECORD_GALLERY}</h3>
              <div className="d-flex justify-content-between">
                <SelectAndLabelComponent
                  textLabel={TYPE}
                  className="label-opacity"
                  dataString={[{ value: null, name: "Tất cả" }, ...mediaFormat]}
                  onChange={onChangeMediaFormat}
                />
                <SelectAndLabelComponent
                  className="label-opacity"
                  textLabel={PLAYLIST_DEMO}
                  dataString={[{ value: null, name: "Tất cả" }, ...valuePlaylistDemo?.filterPlaylist]}
                  onChange={onChangeSelectPlaylistDemo}
                />
              </div>
            </div>
            <TableComponent
              search={{
                placeholder: RECORD_NAME,
                className: "record-card-all-title ",
              }}
              register={table}
              langs={["recordGalleryTranslateKey", "playlistTranslateKey"]}
              getDataAfter={(data) =>
                setState(prev => ({
                  ...prev,
                  records: data.data
                }))
              }
              columns={columnfirst}
              apiServices={
                callApiMemo
              }
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="record-card">
            <div className="record-card-all-title">
              <h3 className="title-record">{ADD_RECORD_PLAYLIST}</h3>
              <Row className="title-info-record">
                <Col span={12} className="label-content">
                  <span className="label">{TOTAL}:</span>
                  <span className="content">
                    {state?.recordsSelected?.length} {RECORD}
                  </span>
                </Col>
                <Col span={12} className="label-content">
                  <span className="label">
                    {TOTAL} {DURATION}:
                  </span>
                  <span className="content">--:--:--</span>
                </Col>
              </Row>
            </div>
            <div className="record-card-all-title d-flex justify-content-between">
              <SearchComponent placeholder={RECORD_NAME} />
            </div>
            <Table
              pagination={{ hideOnSinglePage: true, pageSize: 1000 }}
              className="main-table none-scroll"
              scroll={{ y: 625 }}
              locale={{
                emptyText: (
                  <>
                    <div className="no-data">
                      {ADD_NODATA}
                    </div>
                  </>
                ),
              }}
              dataSource={state.recordsSelected}
              rowKey={(item: MediaRecordGalleryEntities) => item.mediaId}
              columns={columnfirst2()}
              components={{
                body: {
                  wrapper: DraggableContainer,
                  row: DraggableBodyRow,
                },
              }}
            />
          </div>
        </Col>
      </Row>
      <div className="text-center mx-auto">
        <Button className="cancel-button mr-4" onClick={handleCancel}>
          {CANCEL}
        </Button>
        <Button className="normal-button" onClick={handleSave}>
          {SAVE}
        </Button>
      </div>
      {/* <ModalPreview /> */}
    </>
  );
};

export default AddRecordToPlaylist;
