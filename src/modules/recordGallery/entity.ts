import MediaCategoriesEntity from "@modules/mediaCategories/entity";
import moment from "moment";

class AuthorityContractEntity {
  authorityContractCode: string = "";
  effectiveAt: string = "";
  expireAt: string = "";
  duration: {
    year: number;
    month: number;
    days: number;
  };
  constructor(authorityContract) {
    if (!authorityContract) return;
    Object.keys(this).forEach((key) => {
      this[key] = authorityContract[key] || this[key];
      switch (key) {
        case "duration": {
          this.duration = getDurationTimeContract(
            authorityContract.effectiveAt,
            authorityContract.expireAt
          );
          break;
        }
        case "expireAt":
        case "effectiveAt": {
          this[key] = authorityContract.effectiveAt.format("DD/MM/YYYY");
          break;
        }
        default:
          break;
      }
    });
  }
}
class MediaExtendEntity {
  category: string = "";
  mixesRemixes: string = "";
  artist: string = "";
  writers: string = "";
  mix: string = "";
  dateRelease: string = "";
  datePublish: string = "";
  recorders: string = "";
  lyric: string = "";
  producer: string = "";
  constructor(mediaExtend) {
    if (!mediaExtend) return;
    Object.keys(this).forEach((key) => {
      this[key] = mediaExtend[key] || this[key];
      switch (key) {
        case "datePublish":
        case "dateRelease": {
          this[key] = moment(mediaExtend[key]).format("DD/MM/YYYY HH:mm:ss");
          break;
        }
        default:
          break;
      }
    });
  }
}

class RecordGalleryEntity {

  mediaId: string = "";
  mediaName: string = "";
  mediaUrl: string = "";
  mediaUrlPrivate: string = "";
  mediaTypeCode: string = "";
  mediaComment: string = "";
  mediaDuration: string = "00:00";
  mediaMd5: string = "";
  mediaSize: null;
  mediaStatus: number = 0; // MTC:{-1: unApproved , 0:waiting  , 1: approved } VCPMC:{-1:Reject , 0:unCofrim , 1:confirm}
  createAt: string = "";
  codeISRC: string = "";
  typeId: string = "";
  updatedAt: string = "";
  // mediaExpire: string = "";
  mediaExpire: string = undefined;
  mediaDocument: string = "";
  updateBy: string = "";
  authorityName: string = "Lisa";
  authorityContract: AuthorityContractEntity;
  mediaExtend: MediaExtendEntity;
  mediaPerformer: string;
  mediaProducer: string;
  constructor(media?) {
    if (!media) return;
    Object.assign(this, media);

    this.authorityName = media.mediaProducer;
    this.mediaDuration = moment.utc(media.mediaDuration * 1000).format("HH:mm:ss")
    // Object.keys(this).forEach((key) => {
    //   this[key] = media[key] || this[key];
    //   switch (key) {
    //     case "mediaUrl": {
    //       this["mediaUrl"] = media?.mediaUrlPrivate || media?.mediaUrl || this[key];
    //       break;
    //     }
    //     case "createAt": {
    //       this["createAt"] = moment(media?.createAt).format("DD/MM/YYYY") || this[key];
    //       break;
    //     }
    //     case "updatedAt": {
    //       this["updatedAt"] = moment(media?.updatedAt).format("DD/MM/YYYY") || this[key];
    //       break;
    //     }
    //     case "mediaExtend": {
    //       this["mediaExtend"] = new MediaExtendEntity(media?.mediaExtendParse);
    //       break;
    //     }
    //     case "authorityContract": {
    //       this["authorityContract"] = new AuthorityContractEntity(
    //         media?.authorityContract
    //       );
    //       break;
    //     }
    //     case "user": {
    //       this.updateBy = media.user.userName || "";
    //       break;
    //     }
    //     case "mediaExpire": {
    //       this.updateBy = moment(media.user.mediaExpire).format("DD/MM/YYYY") || this[key];
    //       break;
    //     }
    //     default:
    //       break;
    //   }
    // });
  }

  static createListMedia(listMedia) {
    if (!Array.isArray(listMedia)) return [];
    return listMedia.map((media) => {
      return new RecordGalleryEntity(media);
    });
  }
  static renderPageInfor = (paginationInfo) => {
    return {
      pageSize: paginationInfo?.pageSize || 10,
      total: paginationInfo?.totalCount || 0,
      current: paginationInfo?.currentPage || 1,
      searchContent: paginationInfo?.searchContent || "",
    };
  };
}
const getDurationTimeContract = (
  effectiveAt,
  expireAt,
  format = "YYYY-MM-DDTHH:mm:ss"
) => {
  const momentEffectiveAt = moment(effectiveAt);
  const momentExpireAt = moment(expireAt);

  const year =
    moment.duration(momentExpireAt.diff(momentEffectiveAt)).get("y") || 0;
  const month =
    moment.duration(momentExpireAt.diff(momentEffectiveAt)).get("M") || 0;
  const days =
    moment.duration(momentExpireAt.diff(momentEffectiveAt)).get("d") || 0;
  return {
    year,
    month,
    days,
  };
};

class mediaCreatorEntity {
  userId: string = "";
  businessOrganizationId: string = "";
  roleId: string = "";
  userName: string = "";
  userFullName: string = "";
  userEmail: string = "";
  userPhoneNumber: string = "";
  userDayOfBirth: string = "";
  userAvatar: string = "";
  userUpdateProfileStatus: string = "";
  userStatus: string = "";
  userLevel: string="";
  userExpiredAt: string = "";
  userCreateAt: string = "";
  userPermissions: string = "";
  userRole: string = "";
  businessOrganization: string = "";
  constructor(creator) {
    if (!creator) return null;
    Object.assign(this, creator);
  }
}
export class MediaRecordGalleryEntities {
  mediaId: string = "";
  mediaCategoryId: string = "";
  mediaFormatId: string = "";
  isrcCode: string = "";
  mediaName: string = "";
  mediaDuration: string = "";
  mediaTypeCode: string = "";
  mediaFullFormat: string = "";
  mediaAuthor: string = "";//tác giả
  mediaPerformer: string = ""; //ca sĩ
  mediaProducer: string = ""; //sản xuất
  mediaThumbnail: string = "";
  mediaApprover: string = "";
  mediaReasonsRefusalApproval: string = "";
  mediaComment: string = "";
  mediaExtend: string = "";
  mediaContentVideo: string = "";
  mediaContentAudio: string = "";
  mediaContentMPD: string = "";
  mediaContentOptional: string = "";
  mediaCreateAt: string = "";
  mediaContentMD5: string = "";
  mediaContentVideoMD5: string = "";
  mediaContentAudioMD5: string = "";
  mediaContentMPDMD5: string = "";
  mediaContentVideoEncryptionKey: string = "";
  mediaContentAudioEncryptionKey: string = "";
  mediaContentVideoEncryptionKeyId: string = "";
  mediaContentAudioEncryptionKeyId: string = "";
  mediaStatus: number = 0; //1. confirm , 0:notconfirm, -1 reject
  mediaStatusUpload: number = 0; //1: available, 0: not available
  applicableAuthorizedContractId: string = "";
  mediaEffectiveTime: string = "";
  mediaExpirationTime: string = "";
  mediaShelfLifeStatus: number = 0; //Expired = 0, Unexpired = 1, Undue = 2
  mediaCategory: MediaCategoriesEntity;
  mediaFormat: MediaFormatEntity;
  mediaCreator: mediaCreatorEntity;
  applicableAuthorizedContract: applicableAuthorizedContractEntity;
  mediaCreatorId: string = "";
  mediaApproverId: string = "";
  mediaFormatName: string = "";
  mediaCategoryName: string = "";
  mediaTypeApproval: number = 0; //1: duyệt bởi người dùng, 2 là duyệt bởi hệ thống
  mediaApproverTime: string = ""; //Ngày phê duyệt:
  mediaNumberDuration: number = 0;
  constructor(media) {
    if (!media) return null;
    Object.assign(this, media);
    this.mediaCategory = new MediaCategoriesEntity(media?.mediaCategory);
    this.mediaFormat = new MediaFormatEntity(media?.mediaFormat);
    this.mediaCreator = new mediaCreatorEntity(media?.mediaCreator);
    this.applicableAuthorizedContract = new applicableAuthorizedContractEntity(media?.applicableAuthorizedContract);
    this.mediaNumberDuration = parseInt( media?.mediaDuration) || 0;
    this.mediaDuration = moment.utc((media?.mediaDuration) * 1000).format("HH:mm:ss");
    this.mediaFormatName = media?.mediaFormat?.mediaFormatName;
    this.mediaCategoryName = media?.mediaCategory?.mediaCategoryName;
    Object.keys(media).map(key => {
      if (key == "mediaEffectiveTime" || key == "mediaApproverTime" || key == "mediaCreateAt" || key == "mediaExpirationTime") {
        this[key] = moment(media[key]).format("DD/MM/YYYY HH:mm:ss")
      }
    })

  }
  static createListMedia(listmedia) {
    if (!Array.isArray(listmedia)) return [];
    return listmedia.map((media) => {
      return new MediaRecordGalleryEntities(media);
    });
  }
}


class applicableAuthorizedContractEntity {
  authorizedContractId: string = "";
  authorizedContractParentId: string = "";
  authorizedContractCode: string = "";
  authorizedContractName: string = "";
  authorizedContractStart: string = ""; //Ngày nhận ủy quyề
  authorizedContractEnd: string = "";
  authorizedContractStatus: number = 0;
  authorizedContractAttachments: string = "";
  copyrightPercent: number = 0;
  performPercent: number = 0;
  producerPercent: number = 0;
  createAt: string = "";
  updateAt: string = "";
  authorizedRepresentationId: string = "";
  authorizedContractCancelReason: string = "";
  authorizedRepresentation: string = "";
  authorizedContractMedias: string = "";
  constructor(props) {
    if (!props) return null;
    Object.assign(this, props);
  }
}
export class MediaFormatEntity {
  mediaFormatId: string = "";
  mediaFormatCode: string = "";
  mediaFormatName: string = "";
  mediaFormatDefaultIcon: string = "";
  mediaFormatCreatedAt: string = "";
  constructor(format) {
    if (!format) return null;
    Object.assign(this, format);
    this.mediaFormatCreatedAt = moment(format.mediaFormatCreatedAt).format("DD/MM/YYYY HH:mm:ss");
  }
  static createListMediaFormat(list) {
    if (!Array.isArray(list)) return [];
    return list.map(media => {
      return new MediaFormatEntity(media);
    })
  }
}


export default RecordGalleryEntity;
