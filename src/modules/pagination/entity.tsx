export interface IPaginationInfo {
  pageSize: number;
  current: number;
  total: number;
}

export default class PaginationInfo implements IPaginationInfo {
  pageSize: number = 10;
  current: number = 1;
  total: number = 10;

  constructor(paginationInfo?) {
    if(!paginationInfo) return null;
    this.pageSize = paginationInfo?.pageSize || 10;
    this.current = paginationInfo?.currentPage || 1;
    this.total = paginationInfo?.totalCount || 0;
  }
}

export class PaginationRequest {
  PageSize: number = 10;
  PageNumber: number = 1;
  SearchContent: string = "";

  constructor(pagination?) {
    this.PageSize = pagination?.pageSize || this.PageSize;
    this.PageNumber = pagination?.current || this.PageNumber;
    this.SearchContent = pagination?.search || pagination?.option?.search;

  }
}

export class PaginationParam{
  PageSize: number = 10;
  PageNumber: number = 1;
  SearchContent: string = "";
  constructor(pagination?) {
    Object.assign(this, pagination);
    this.PageSize = pagination?.pageSize || pagination?.PageSize;
    this.PageNumber = pagination?.current || pagination?.PageNumber;
    this.SearchContent = pagination?.search || pagination?.option?.search;
  }
}