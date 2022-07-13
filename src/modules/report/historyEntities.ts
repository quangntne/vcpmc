class ReportBussinessHistoryContract {
  businessContractId: string = "";
  businessContractName: string = "";
  typeLatch: number = 0;
  valueLatch: string = "";
  dateFrom: string = "";
  dateTo: string = "";
  dateLatch: string = "";
  dateConfirmLatch: string = "";
  statusLatch: number = 0;
  constructor(report) {
    if (!report) return;
    Object.assign(this, report);
    
  }
}
export default ReportBussinessHistoryContract;
