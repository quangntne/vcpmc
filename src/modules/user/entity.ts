import { BusinessOrganizationEntity } from "@modules/businessContract/entity";
import RoleEntity from "@modules/roles/entity";

export class subUserEntity {
  userId: string = "";
  businessOrganizationId: string = "";
  roleId: string = "";
  userName: string = "";
  userPassword: null;
  userFullName: string = "";
  userEmail: string = "";
  userPhoneNumber: number = 0;
  userDayOfBirth: string = "";
  userAvatar: string = "";
  userUpdateProfileStatus: number = 0;
  userStatus: number = 0;
  userLevel: string = "";
  userExpiredAt: string = "";
  userCreateAt: string = "";
  userPermissions: Array<string> = [];
  role: RoleEntity;

  constructor ( user ) {
    if ( !user ) return;
    Object.assign( this, user );
    this.role = new RoleEntity( user.role );
  }
}

class UserEntity {
  userId: string = "";
  userName: string = "";
  userPassword: null;
  userFullName: string = "";
  userStatus: number=0;
  userContent: string = "";
  userPhoneNumber: number = 12345678910;
  userEmail: string = "";
  userLevel: string = "";
  groupId: string = "";
  userCreateAt: string = "";
  updatedAt: string = "";
  userDayOfBirth: string = "";
  userPermissions: Array<string> = [];
  permissions: string = "";
  roleId: string = "";
  expiredAt: string = "";
  group: string = "";
  role: RoleEntity;
  is_level: number = 0;
  userAvatar: string = "";
  userExpiredAt: string = "";
  businessOrganization: BusinessOrganizationEntity;
  businessOrganizationId: string = "";
  userRole: string = "";
  userUpdateProfileStatus: number = 0;

  constructor ( user ) {
    if ( !user ) return;
    // this.role = new RoleEntity( user.role );
    // this.businessOrganization = new BusinessOrganizationEntity( user.businessOrganization );
    // Object.keys(this).forEach((key) => {
    //   this[key] = user[key] || this[key];
    // });
    Object.assign( this, user );
  }

  static createArrayUser ( arrUser: Array<any> ): Array<UserEntity> {
    const list = arrUser.map( ( x ) => new UserEntity( x ) );
    return list;
  }
}



export default UserEntity;
