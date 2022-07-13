import store from '@modules/core/store/redux';
import PermissionStore from './permissionStore';
import permissionRepository from './repository'

const permissionPresenter = {...permissionRepository}

permissionPresenter.getListPermission = async ()=>{
	const listPermission = await permissionRepository.getListPermission();
	store.dispatch(PermissionStore.actions.getListPermission({data: listPermission.data}))

	return listPermission;
}

export default permissionPresenter;
