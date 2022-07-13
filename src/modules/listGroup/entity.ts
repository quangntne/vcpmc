import moment from "moment";

class ListGroupEntity {
  groupId: string = "";
  groupName: string = "";
  groupCode: string = "";
  groupStatus: number = 0;
  groupImage: string = "";
  userAdminId: string = "";
  expired: string = "";
  created: string = "";
  admin: object = {};
  totalUser: number = 0;
  totalDevice: number = 0;
  stt: number = 0;
  adminfake = 'admin';

  constructor(listGroup) {
    if (!listGroup) return;
    Object.keys(this).forEach((key) => {
      this[key] = listGroup[key] || this[key];
      this['expired'] = moment(listGroup['expired']).format('DD/MM/YYYY')
    });
  }

  static createArrayListGroup(
    arrListGroup: Array<any>
  ): Array<ListGroupEntity> {
    return arrListGroup.map((x, index) => new ListGroupEntity({ ...x, 'stt': index + 1,  }));
  }
}

export default ListGroupEntity;
