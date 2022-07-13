import PaginationInfo from '@modules/pagination/entity';
import MediaCategoriesEntity from '@modules/mediaCategories/entity';
import * as moment from 'moment';
import newHttpRepository from '@repository/http';
import { IOption } from '@view/shared/components/TableComponent/interface';
import _ from 'lodash';
import store from '@store/redux';
import { fetchMediaCategories } from '@modules/setting/settingStore';
const getListMediaCategories = async (payload: { pageSize?: number; current?: number }, option?: IOption) => {
	const tempData = await newHttpRepository.execute({
		path: '/api/MediaCategories',
		method: 'get',
		params: {
			PageSize: payload?.pageSize,
			PageNumber: payload?.current,
			SearchContent: option?.search,
			...option?.filter,
		},
		config: { isPrivate: true },
		showSuccess: false,
	});
	const mediaCategories = MediaCategoriesEntity.createListMediaCategories(tempData.pagedData);
	mediaCategories.sort((m1, m2) =>
		m1.mediaCategoryCreatedAt > m2.mediaCategoryCreatedAt
			? -1
			: m1.mediaCategoryCreatedAt < m2.mediaCategoryCreatedAt
			? 1
			: 0
	);
	store.dispatch(fetchMediaCategories({ mediaCategories }));
	return {
		data: mediaCategories,
		info: new PaginationInfo(tempData.pageInfo),
	};
};

const newMediaCategories = async (data) => {
	return await newHttpRepository.execute({
		path: `api/MediaCategories`,
		method: 'post',
		payload: data,
		config: { isPrivate: true },
	});
};

const updateMediaCategories = async (data) => {
	const formatData = {
		mediaCategoryName: data?.mediaCategoryName,
		mediaCategoryDescription: data?.mediaCategoryDescription,
	};
	return await newHttpRepository.execute({
		path: `/api/MediaCategories/${data?.mediaCategoryId}`,
		method: 'put',
		payload: formatData,
		config: { isPrivate: true },
	});
};

const deleteMediaCategories = async (idMediaCategories) => {
	return await newHttpRepository.execute({
		path: `/api/MediaCategories/${idMediaCategories}`,
		method: 'delete',
		config: { isPrivate: true },
	});
};

export default {
	getListMediaCategories,
	newMediaCategories,
	updateMediaCategories,
	deleteMediaCategories,
};
