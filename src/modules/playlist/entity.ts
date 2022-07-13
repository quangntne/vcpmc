import moment from "moment";

class PlayListEntities {
  playlistId: string = "";
  playlistName: string = "";
  playListComment: string = "";
  playListLoop: 0 | 1;
  totalMedia: number = 0; //số bản ghi
  topics: Array<string> = []; //chủ đề
  playlistCreator: { userFullName: string; userEmail: string; userId: string };
  userCreate: string = "Unknown"; //người tạo
  playlistDuration: string = "00:00:00"; // thời lượng
  playlistCreateAt: string = "";
  totalDuration: number;
  businessOrganizationId: string = "";
  playlistCategories: string = "";
  playlistCreatorId: string = "";
  playlistDescription: string = "";
  playlistImageCover: string = "";
  playlistStatus: 0 | 1 = 0; //1.public 0.private
  playlistRepeat: 0 | 1 = 0; //1.repeat 0.norepeat
  playlistHowToPlay: 0 | 1 = 0; //1.random 0.sequentially
  globe: boolean = false;
  shuffle: boolean = false;
  repeat: boolean = false;
  constructor(playlist) {
    if (!playlist) return;
    Object.assign(this, playlist);
    this.playlistCreateAt = moment(playlist.playlistCreateAt).format("DD/MM/YYYY")
    if (playlist.playlistCategories) {
      this.topics = String(playlist.playlistCategories).split(",")
    }
    if (playlist.totalDuration) {
      this.playlistDuration = moment.utc(playlist.totalDuration * 1000).format("HH:mm:ss");
    }
    this.userCreate = playlist?.playlistCreator?.userFullName;
    this.globe = playlist?.playlistStatus == 1;
    this.shuffle = playlist?.playlistHowToPlay == 1;
    this.repeat = playlist?.playlistRepeat == 1;
  }

  static createListPlaylistEntity(listPlaylist) {
    if (!Array.isArray(listPlaylist)) return [];
    return listPlaylist.map((playlist) => {
      return new PlayListEntities(playlist);
    })
  }
}

export default PlayListEntities;
