import moment from "moment";

class representatiEntity {
  stt: number = 0;
  created: string = "";
  expired: string = "";
  representativeStatus: number = 0;
  role: string = "";
  representativeId: string = "";
  representativeName: string = "";
  representativeEmail: string = "";
  representativePhone: string = "";

  constructor(listRepresentative) {
    if (!listRepresentative) return;
    Object.keys(this).forEach((key) => {
      this[key] = listRepresentative[key] || this[key];
      this['expired'] = moment(listRepresentative['expired']).format('DD/MM/YYYY')
    });
  }

  static createArrayRepresentative(
    arrListGroup: Array<any>
  ): Array<representatiEntity> {
    return arrListGroup.map((x, index) => new representatiEntity({ ...x, 'stt': index + 1,  }));
  }
}

export default representatiEntity;
