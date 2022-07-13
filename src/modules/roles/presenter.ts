



import store from "@modules/core/store/redux";
import RoleEntity from "./entity";
import { Role } from "./interface";
import roleRepository from "./repository";
import RoleStore from "./roleStore";

const rolePresenter = { ...roleRepository };

rolePresenter.getListRole = async () => {
    const listRole = await roleRepository.getListRole();
    store.dispatch( RoleStore.actions.getListRole(  { data: listRole.data }  ) );
    return listRole;
};
rolePresenter.getPermissionsByType = async () => {
    const listPermissions = await roleRepository.getPermissionsByType();
    store.dispatch( RoleStore.actions.fetchListPermission( ( { data: listPermissions } ) ) );
    return listPermissions;
};
rolePresenter.addRole = async ( payload ) => {
    const response: RoleEntity = await roleRepository.addRole( payload );

    store.dispatch( RoleStore.actions.updateList( ( { data: { ...response, permissions: payload.permissionIds }, role: "add" } ) ) );

    return response;
};
rolePresenter.updateRole = async ( payload, idRole ) => {
    const response = await roleRepository.updateRole( payload, idRole );
    store.dispatch( RoleStore.actions.updateList( ( { data: { ...response, permissions: payload.permissionIds }, role: "update" } ) ) );

    return response;
};
rolePresenter.removeRole = async ( payload ) => {
    const response = await roleRepository.removeRole( payload );
    store.dispatch( RoleStore.actions.updateList( ( { data: response, role: "delete" } ) ) );

    return response;
};
rolePresenter.getRoleInGroup = async ( payload ) => {
    const response = await roleRepository.getRoleInGroup( payload );


    return response;
};

export default rolePresenter;
