import { LangType } from "@view/shared/translateKey";
import { TableProps } from "antd";

export interface IBEPaginationTable extends TableProps<any> {
  apiServices?: Function;
  columns?: any;
  defaultOption?: any;
  register?: any;
  getDataAfter?: (data) => void;
  disableFirstCallApi?: boolean;
  search?: { placeholder: any; align?: "left" | "right", className?: string };
  noStt?: boolean;
  langs?: Array<keyof LangType>
}
export interface IOption {
  search?: string;
  filter?: any;
  sorter?: {
    sortField: string;
    sortOrder: string;
  };
  [propName: string]: any;
}
export const InitOption: IOption = {
  search: "",
  filter: {},
  sorter: {
    sortField: "",
    sortOrder: "",
  },
};
export interface IPagination {
  pageSize?: number;
  total?: number;
  current?: number;
  search?:string;
}
export const InitPagination: IPagination = {
  pageSize: 10,
  total: 0,
  current: 1,
};
