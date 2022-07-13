import UserEntity, { subUserEntity } from "@modules/user/entity";
import { toFirstUpperCase } from "@view/shared/helper/functions";
import _ from "lodash";
import moment from "moment";
class BusinessContractEntity {
  businessContractId: string = "";
  authorityName: string = "";
  businessContractCode: string = "";
  businessContractName: string = "";
  businessContractValue: number = 0;
  businessContractType: number = 0; //0:hợp đồng theo ngày , 1: trọn gói
  businessContractStart: string = "";
  businessContractEnd: string = "";
  businessContractAttachments: any = null;
  businessContractCreatedAt: string = "";
  businessCustomer: businessCustomerEntity;
  businessContractStatus: number = 0;
  businessCustomerId: string = "";
  cancelReason: string = "";
  constructor ( contract ) {
    if ( !contract ) return;

    Object.keys( contract ).forEach( ( key ) => {
      if ( typeof contract[ key ] == "undefined" ) return;
      if ( key == "businessCustomer" ) {
        this[ "businessCustomer" ] = new businessCustomerEntity(
          contract.businessCustomer
        ) || contract.businessCustomer;
      } else {
        this[ key ] = contract[ key ];
      }
    } );
  }
  static createBusinessContractForEdit (
    businessContractItem
  ) {
    let businessContractEdited = {};
    _.mapValues( businessContractItem, ( value, key ) => {
      if ( typeof value == "object" ) {
        const businessCustomer = {};
        _.mapValues( value, ( businessCustomerValue, businessCustomerKey ) => {
          return Object.assign( businessCustomer, {
            [ businessCustomerKey ]: businessCustomerValue,
          } );
        } );
        return _.assign( businessContractEdited, businessCustomer );
      }
      return _.assign( businessContractEdited, {
        [ key ]: value,
      } );
    } );
    // nếu ko convert ra moment thì trắng trang
    let momentArray = [
      "businessContractEnd",
      "businessContractStart",
      "businessCustomerBirthday",
      "businessCustomerCreatedAt",
      "businessCustomerUpdatedAt",
      "businessCustomerIdentityIssuanceDate",
    ];
    let momentArrayConvert = momentArray.map( ( item ) => {
      return Object.assign( businessContractEdited, { [ item ]: moment( businessContractEdited[ item ] ) } );
    } );
    Object.assign( businessContractEdited, { businessCustomerPassword: "VGN-SZ770n" } );
    // Object.assign(businessContractEdited, { businessCustomerOrganizationName: "Tổ chức hòa minzy" });
    return businessContractEdited;
  }
}

export class businessCustomerEntity {
  businessCustomerId: string = "";
  businessContractId: string = "";
  businessCustomerEmail: string = "";
  businessCustomerIdentity: string = "";
  businessCustomerName: string = "";
  businessCustomerPhone: string = "";
  businessCustomerAddress: string = "";
  businessCustomerPosition: string = "";
  businessCustomerPassword: string = "VGN-SZ770n";
  businessCustomerBankAccountNumber: string = "";
  businessCustomerBankName: string = "";
  businessCustomerCreatedAt: string = "";
  businessCustomerEnterprisePhone: string = "";
  businessCustomerOrganizationName: string = "";
  businessCustomerBirthday: string = "";
  businessCustomerNationality: string = "";
  businessCustomerGender: string = "";
  businessCustomerIdentityIssuanceDate: string = "";
  businessCustomerIdentityIssuancePlace: string = "";
  businessCustomerTaxNumber: string = "";
  businessCustomerUpdatedAt: string = "";
  businessCustomerLoginEmail: string = "";
  businessOrganizationName: string = "";
  businessOrganization: BusinessOrganizationEntity;
  businessOrganizationId: string = "";
  userId: string = "";
  user: UserEntity;
  constructor ( contract ) {
    if ( !contract ) return;
    Object.assign( this, contract );
    this.businessCustomerOrganizationName = contract[ "businessOrganizationName" ] || contract?.businessOrganization?.businessOrganizationName || contract?.businessCustomerOrganizationName;
    this.businessOrganization = new BusinessOrganizationEntity( contract[ "businessOrganization" ] ) || contract.businessOrganization;
  }
  static createListBusinessCustomer ( listBC ) {
    if ( !Array.isArray( listBC ) ) return [];
    return listBC.map( ( businessCus ) => {
      let momentArray = [
        "businessCustomerBirthday",
        "businessCustomerCreatedAt",
        "businessCustomerUpdatedAt",
        "businessCustomerIdentityIssuanceDate",
      ];
      let momentArrayConvert = momentArray.map( ( item ) => {
        return Object.assign( businessCus, { [ item ]: moment( businessCus[ item ] ) } );
      } );
      return new businessCustomerEntity( businessCus );
    } );
  }

  static createBusinessCustomerForEdit (
    businessCustomerItem: businessCustomerEntity
  ) {
    const businessCustomer = {};
    _.mapValues( businessCustomerItem, ( value, key ) => {
      return Object.assign( businessCustomer, {
        [ toFirstUpperCase( key ) ]: value,
      } );
    } );
    return businessCustomer;
  }
}

export class BusinessOrganizationEntity {
  businessOrganizationId: string = "";
  businessOrganizationName: string = "";
  businessOrganizationStatus: number = 0;
  businessOrganizationCreatedAt: string = "";
  businessCustomerOrganizationName: string = "";
  businessCustomers: string = "";
  users: Array<subUserEntity> = [];
  constructor ( organization ) {
    if ( !organization ) return;
    Object.assign( this, organization );
    if ( this.users && this.users.length > 0 ) {
      this.users = organization.users.map( ( item: subUserEntity ) => new subUserEntity( item ) );
    }

    this.businessCustomerOrganizationName = organization[ "businessOrganizationName" ] || organization.businessCustomerOrganizationName;
  }
  static createListBusinessOrganization ( listBC ) {
    if ( !Array.isArray( listBC ) ) return [];
    return listBC.map( ( businessOrganization ) => {

      return new BusinessOrganizationEntity( businessOrganization );
    } );
  }
}


export default BusinessContractEntity;

