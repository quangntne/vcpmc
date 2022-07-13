import httpRepository from "@modules/core/repository/http";
import PermissionEntity from "./entity";

const getListPermission = async (PageSize= 10, PageNumber=1)=>{
	const respone = await httpRepository.execute({
		path: `/api/Permissions?PageSize=${PageSize}&PageNumber=${PageNumber}`,
		method: 'get',
		config: {isPrivate: true},
		showSuccess: false
	});
	return {data:PermissionEntity.createListPermission(respone.pagedData)}
}

export default {
	getListPermission
}
