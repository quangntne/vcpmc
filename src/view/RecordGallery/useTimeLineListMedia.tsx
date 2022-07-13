import { message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import store, { RootState } from '@modules/core/store/redux';
import RecordGalleryPresenter from '@modules/recordGallery/presenter';
import recordGalleryStore from '@modules/recordGallery/recordGalleryStore';

const format = 'DD/MM/YYYY';

const useTimeLineListMedia = () => {


  const handleSelectItem = (item) => {
    store.dispatch(recordGalleryStore.actions.selectItem(item))
  }
  const handlDeleteItem = (item) => {

  }
  const handleApproved = (item) => {

  }
  const handleSelectedAll = (e) => {
    const target = e.target;
    const checked = target.checked;
    store.dispatch(recordGalleryStore.actions.selectAll(checked))

  }

  const clickToPreview = (data) => {


  }
  return {
    handleSelectItem,
    handlDeleteItem,
    handleApproved,
    handleSelectedAll,
    clickToPreview,
  }
}


export default useTimeLineListMedia
