import BusinessContractEntity, {
  businessCustomerEntity,
} from "@modules/businessContract/entity";
import UserEntity from "@modules/user/entity";
import moment from "moment";

export interface IDay {
  start: any;
  end: any;
  duration: any;
}

export interface IFormBusinessContract {
  businessContractId?: string;
  businessContractCode?: string;
  businessContractName?: string;
  businessContractValue?: number;
  businessContractType?: number; //0:hợp đồng theo ngày , 1: trọn gói
  businessContractStart?: any;
  businessContractEnd?: any;
  businessContractAttachments?: any;
  businessContractCreatedAt?: string;
  businessCustomer?: businessCustomerEntity;
  businessContractStatus?: number;
  businessCustomerId?: string;
  businessCustomerEmail?: string;
  businessCustomerIdentity?: string;
  businessCustomerName?: string;
  businessCustomerPhone?: string;
  businessCustomerAddress?: string;
  businessCustomerPosition?: string;
  businessCustomerBankAccountNumber?: string;
  businessCustomerBankName?: string;
  businessCustomerCreatedAt?: string;
  businessCustomerEnterprisePhone?: string;
  businessCustomerOrganizationName?: string;
  businessCustomerNationality?: string;
  businessCustomerGender?: number;
  businessCustomerIdentityIssuanceDate?: any;
  businessCustomerIdentityIssuancePlace?: string;
  businessCustomerTaxNumber?: string;
  businessCustomerUpdatedAt?: string;
  businessCustomerLoginEmail?: string;
  businessCustomerBirthday?: any;
  userId?: string;
  user?: UserEntity;
  users?: string;

  // chưa có nha 
  businessCustomerLoginname?: string;
  businessCustomerPassword?: string;
}

export const draftData: IFormBusinessContract = {
  businessContractCode: (Math.round(Math.random() * 1000)).toString(),
  businessContractName: "[FE]_Test Contract Minier",
  businessContractValue: 200000000,
  businessContractType: 1,
  businessContractStatus: 1,
  businessCustomerEnterprisePhone: "0905907362",
  businessContractStart: moment("12/12/2021"),
  businessContractEnd: moment("05/05/2023"),
  businessCustomerAddress:
    "86/32 Đường Âu Cơ, Phường 14, Quận Tân Bình, Thành phố Hồ Chí Mình",
  businessCustomerBankAccountNumber: "0905 9073 9258 9362",
  businessCustomerBankName: "OCB - Ngan hang Phuong Dong",
  businessCustomerPosition: "Director",
  businessCustomerBirthday: moment("03/05/1988"),
  businessCustomerNationality: "VN",
  businessCustomerPhone: "0377256300",
  businessCustomerEmail: "alta@alta.com.vn",
  businessCustomerGender: 1,
  businessCustomerIdentity: "2266351258",
  businessCustomerIdentityIssuanceDate: moment("03/20/2000"),
  businessCustomerIdentityIssuancePlace: "Hồ Chí Minh",
  businessCustomerTaxNumber: "63251478952365",
  businessCustomerLoginname: "noreply@alta.com.vn",
  businessCustomerPassword: "VGN-SZ770n",
  businessCustomerName: "Hòa " + (Math.round(Math.random() * 1000)).toString(),
  businessCustomerOrganizationName: "Hòa company "+(Math.round(Math.random() * 1000)).toString(),
  businessCustomerLoginEmail: "hoa" + (Math.round(Math.random() * 1000)).toString() + "@alta.com"
};

export const detailCustomerInfo = [
  { label: "AUTHORITY_NAME", text: `businessCustomerName` },
  { label: `Gender`, text: `businessCustomerGender` },
  { label: `User_name`, text: `businessCustomerLoginEmail` },
  { label: "BC_NAME", text: `businessOrganizationName` },
  { label: `ID`, text: `businessCustomerIdentity` },
  { label: `Pass_word`, text: `***********` },
  { label: "BC_POSITION", text: `businessCustomerPosition` },
  { label: `DAY_CREATE`, text: `businessCustomerIdentityIssuanceDate` },
  { label: "Account_number", text: `businessCustomerBankAccountNumber` },
  { label: `BIRTHDAY`, text: `businessCustomerBirthday` },
  { label: `PLACE_CREATE`, text: `businessCustomerIdentityIssuancePlace` },
  { label: "Bank_name", text: `businessCustomerBankName` },
  { label: `Nationality`, text: `businessCustomerNationality` },
  { label: `Tax_Code`, text: `businessCustomerTaxNumber`, col: 16 },
  { label: `BC_PHONE`, text: `businessCustomerPhone` },
  { label: `RESIDENCE`, text: `businessCustomerPosition`, col: 16 },
  { label: `Email`, text: `businessCustomerEmail` },
];

export const renderGender = {
  0: "Male",
  1: "Female"
}
export const emptyBusinessOrganization = {
  businessOrganizationCreatedAt: "",
  businessOrganizationId: "",
  businessOrganizationStatus: "",
  businessOrganization: "",

}
export const emptyBusinessCustomer = {
  businessContractId: "",
  businessCustomerAddress: "",
  businessCustomerBankAccountNumber: "",
  businessCustomerBankName: "",
  businessCustomerBirthday: null,
  businessCustomerCreatedAt: null,
  businessCustomerEmail: "",
  businessCustomerEnterprisePhone: "",
  businessCustomerGender: null,
  businessCustomerId: null,
  businessCustomerIdentity: "",
  businessCustomerIdentityIssuanceDate: null,
  businessCustomerIdentityIssuancePlace: "",
  businessCustomerLoginEmail: "",
  businessCustomerPassword: "",
  businessCustomerNationality: "",
  businessCustomerOrganizationName: "",
  businessCustomerPhone: "",
  businessCustomerPosition: "",
  businessCustomerTaxNumber: "",
  businessCustomerUpdatedAt: null,
  businessOrganization: "",
  businessOrganizationId: "",
  businessOrganizationName: "",
  userId: "",
  user: null,
}