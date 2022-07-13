class ReportBussinessContract {
  businessContractCode: string = "";
  authorityName: string = "";
  businessContractStart: string = "";
  businessContractEnd: string = "";
  businessContractType: number = 0;
  businessContractId: number = 0;
  countDevice: number = 0;
  countPlaysMedia: number = 0;
  totalRevenue: number = 0;
  constructor(report) {
    if (!report) return;
    Object.assign(this, report);
    // Object.keys(report).forEach((key) => {
    //   if (typeof report[key] == "undefined") return;
    //   this[key] = report[key];
    // });
  }
}
export default ReportBussinessContract;
