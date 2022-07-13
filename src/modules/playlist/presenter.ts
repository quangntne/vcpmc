import * as PlaylistRepository from "./repository";
import _ from "lodash";
import { ITagPlaylist } from "@view/Playlist/interface";
import PlayListEntities from "./entity";
const playlistPresenter = { ...PlaylistRepository };

playlistPresenter.getPlaylistId = async (values) => {
  return await PlaylistRepository.getPlaylistId(values).then((res: PlayListEntities) => {
    let topics: ITagPlaylist[] = res?.topics.map((item: string, index) => {
      return { id: index, label: item }
    })
    return { ...res, topics }
  })
}


const convertObjectToForm = (values) => {
  const formData = new FormData();

  const newForm = _.mapKeys(values, (value, key) => {
    switch (key) {
      case "playlistHowToPlay":
      case "playlistRepeat":
      case "playlistStatus": {
        return formData.append(key.toString(), value ? "1" : "0");
      }
      case "medias": {
        return value?.reduce((result, item, index) => {
          result.append(`medias[${index}].mediaId`, item.mediaId);
          result.append(`medias[${index}].mediaOrder`, index);
          return result;
        }, formData);
      }
      case "playlistCategories": {
        let categorie = value.map((item: ITagPlaylist) => {
          return item.label
        })
        categorie = _.toString(categorie);
        return formData.append(key.toString(), categorie);
      }
      default: {
        return formData.append(key.toString(), value);
      }
    }
  });
  return formData;
}

playlistPresenter.editPlaylist = async (values) => {
  const { playlistId } = values;
  const formData = convertObjectToForm(values);
  return await PlaylistRepository.editPlaylist(formData, playlistId);
}


playlistPresenter.addNewPlaylist = async (values) => {
  const formData = convertObjectToForm(values);
  return await PlaylistRepository.addNewPlaylist(formData);
}

export default playlistPresenter;