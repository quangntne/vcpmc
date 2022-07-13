import { PaginationParam } from "@modules/pagination/entity";
import { MediaFormatEntity } from "./entity";
import RecordGalleryRepository from "./repository";
import _ from "lodash";

const RecordGalleryPresenter = { ...RecordGalleryRepository };

RecordGalleryPresenter.getListNewMedia = async (param) => {
  const params = new PaginationParam(param) ;
  return await RecordGalleryRepository.getListNewMedia(param)
}
RecordGalleryPresenter.approveManyMedia = async (data) => {
  const arrMedia = { mediaIds: data }
  return await RecordGalleryRepository.approveManyMedia(arrMedia);
}
RecordGalleryPresenter.getListMediaFormat = async (param) => {
  return await RecordGalleryRepository.getListMediaFormat(param).then((res: MediaFormatEntity[]) => {
    return res.map((item: MediaFormatEntity) => {
      return { value: item?.mediaFormatId, name: item?.mediaFormatName }
    })
  })
}

RecordGalleryPresenter.editMedia = async (values) => {
  const formdata = new FormData();
  const newForm = _.mapKeys(values, (value, key) => {
    switch (key) {
      // case "mediaThumbnail": {
      //   return value.reduce((result, item, index) => {
      //     result.append(key, item.originFileObj);
      //     return result;
      //   }, formdata);
      // }
      default: {
        return formdata.append(key.toString(), value);
      }
    }
  });
  return await RecordGalleryRepository.editMedia(formdata)
}
export default RecordGalleryPresenter;