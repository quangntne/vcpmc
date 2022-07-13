class Pagination {
    pageSize: number = 10
    currentPage: number = 1
    total: number = 10

    constructor(pagination) {
        if (!pagination) return
        Object.assign(this, pagination);
        this.total = pagination.totalCount;
    }
}

export class PaginationConvert{
    pageSize: number = 10;
    current: number = 1;
    total: number = 10;

    constructor(pagination) {
        if (!pagination) return
        this.total = pagination?.totalCount;
        this.current = pagination?.currentPage;
    }
}

export default Pagination