class RevenueDistribution {
  authorityContractName: string = "";
  authorityUserName: string = "";
  countMedia: number = 0;
  revenue: number = 0;
  vcpmc: number = 0;
  author: number = 0;
  dateLatchData: string = "";
  authorityContractId: string = "";

  constructor(user) {
    if (!user) return;
    Object.keys(this).forEach((key) => {
      this[key] = user[key] || this[key];
    });
  }

  static createArrayContract(arrUser: Array<any>): Array<RevenueDistribution> {
    return arrUser.map((x) => new RevenueDistribution(x));
  }
}

export default RevenueDistribution;
