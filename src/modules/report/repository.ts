import http, { HTTPRepository } from "@modules/core/repository/http";
import Pagination from "@modules/pagination/entitiy";
import ReportBussinessHistoryContract from "./historyEntities";
import ReportBussinessContract from "./entities";
import { formatTimeStr } from "antd/lib/statistic/utils";
import { formatNumberDec } from "@view/shared/helper/functions";
import moment from "moment";
import CONFIG from "@config/index";
type IGetListBusinessContract = {
  data: Array<ReportBussinessContract>;
  info: Pagination;
};
type IGetListHistoryBusinessContract = {
  data: Array<ReportBussinessHistoryContract>;
  info: Pagination;
};

const getReportDataContract = async (pagi? , option?) => {
 
  const params = {
    PageSize: pagi?.pageSize || 10,
    PageNumber: pagi?.current || 1,
    dateFrom:option.dateFrom,
    dateTo:option.dateTo,
    searchContent:option.searchContent
  };
  return await http.execute({
    path: `/api/Reports/reportBusinessContract`,
    method: "get",
    convert: (res) => {
      if (!res) return;
      const info = new Pagination({
        total: res.pageInfo.totalCount,
        pageSize: res.pageInfo.pageSize,
      });
      const data = res.pagedData?.map((item) => {
        return {
          ...new ReportBussinessContract(item),
          businessContractType:
            item.businessContractType == 1
              ? "Trọn Gói"
              : "Giá trị bài hát / Lượt phát",
        };
      });
      return { data, info } as IGetListBusinessContract;
    },
    showSuccess: false,
    params,
    showError: true,
  });
};
const getReportHistoryDataContract = async (pagi?, option?) => {
  const params = {
    PageSize: pagi?.pageSize || 100000,
    PageNumber: pagi?.current || 1,
    dateFrom:option.dateFrom,
    dateTo:option.dateTo,
    searchContent:option.searchContent

  };
  return await http.execute({
    path: `/api/LatchDevices`,
    method: "get",
    convert: (res) => {
      
      if (!res) return;
      const info = new Pagination({
        total: res.pageInfo.totalCount,
        pageSize: res.pageInfo.pageSize,
      });
      //const dataLatch = res.pagedData?.map((item)=>{
      //   return {
      //     ...new ReportBussinessHistoryContract(item),
      //     dateLatch: formatTimeStr(item);
      //   };
      // })

      const data = res.pagedData?.map((item) => {
        return {
          ...new ReportBussinessHistoryContract(item),
          typeLatch:
            item.typeLatch == 1 ? "Trọn Gói" : "Giá trị bài hát / Lượt phát",
          dateLatch: moment(item.dateLatch).format("DD/MM/YYYY"),
          dateConfirmLatch: moment(item.dateConfirmLatch).format("DD/MM/YYYY"),
        };
      });
      return { data, info } as IGetListHistoryBusinessContract;
    },
    showSuccess: false,
    params,
    showError: true,
  });
};
const getReportListDate = async (pagi?) => {
  return await http.execute({
    path: `/api/LatchDevices/listDate`,
    method: "get",

    showSuccess: false,

    showError: true,
  });
};
// const getDateBySelect = async (pagi?) => {
//   const params = {
//     PageSize: pagi?.pageSize || 10,
//     PageNumber: pagi?.current || 1,
//   };
//   return await http.execute({
//     path: `/api/LatchDevices`,
//     method: "get",
//     convert: (res) => {
//       if (!res) return;
//       const info = new Pagination({
//         total: res.pageInfo.totalCount,
//         pageSize: res.pageInfo.pageSize,
//       });
//       //const dataLatch = res.pagedData?.map((item)=>{
//       //   return {
//       //     ...new ReportBussinessHistoryContract(item),
//       //     dateLatch: formatTimeStr(item);
//       //   };
//       // })

//       const data = res.pagedData?.map((item) => {
//         return {
//           ...new ReportBussinessHistoryContract(item),
//           typeLatch:
//             item.typeLatch == 1 ? "Trọn Gói" : "Giá trị bài hát / Lượt phát",
//           dateLatch: moment(item.dateLatch).format("DD/MM/YYYY"),
//           dateConfirmLatch: moment(item.dateConfirmLatch).format("DD/MM/YYYY"),
//         };
//       });
//       return { data, info } as IGetListHistoryBusinessContract;
//     },
//     showSuccess: false,
//     params,
//     showError: true,
//   });
// };
const  latchConstract =  async (payload:{dateTo:string}) =>{
  return await http.execute({
    path: `/api/LatchDevices`,
    method: "post",
    payload,
    showSuccess: true,
    showError: true,
  });
}
const  getLatchListDateByDate =  async (payload:{dateTo:string}) =>{
  return await http.execute({
    path: `/api/LatchDevices/getDateLatchLast`,
    method: "get",
    params:{latchId:payload?.dateTo},
    showSuccess: false,
    showError: true,
  });
}
export default {
  getReportDataContract,
  getReportListDate,
  getLatchListDateByDate,
  latchConstract,
  getReportHistoryDataContract,
};
