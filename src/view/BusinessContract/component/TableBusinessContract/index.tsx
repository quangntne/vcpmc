import { routerBusinessContract } from '@config/path';
import BusinessContractEntity from '@modules/businessContract/entity';
import businessContractPresenter from '@modules/businessContract/presenter';
import RightMenu from '@view/shared/components/layout/RightMenu';
import SearchComponent from '@view/shared/components/SearchComponent/SearchComponent';
import TableComponent from '@view/shared/components/TableComponent';
import useTable from '@view/shared/components/TableComponent/hook';
import { useAsync } from '@view/shared/hook/useAsync';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { businessContractTranslateKey, common } from '@view/shared/translateKey';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import BusinessContractColumns from './columns';
import './../../styles.scss';

const TableBusinessContract = () => {
	const history = useHistory();
	const { Holder_Search, CONTRACT } = useTranslate('businessContractTranslateKey');
	const { ADD, DETAIL } = useTranslate('common');
	const register = useTable();


	// JUST RIGHT MENU
	const arrayAction = [
		{
			// icon: "fas fa-plus",
			iconType: 'add',
			name: `${ADD} ${CONTRACT}`,
			handleAction: () => {
				history.push(routerBusinessContract.ADD_BUSINESS_CONTRACT);
			},
			// permissionCode: "SP_EXPLOITATION_CONTRACT_CREATE",
		},
		// {
		//   icon: "fas fa-info-circle",
		//   name: DETAIL,
		//   handleAction: () => {
		//     history.push(
		//       `${routerBusinessContract.DETAIL_BUSINESS_CONTRACT}/${keyRow}`
		//     );
		//   },
		//   permissionCode: "SP_EXPLOITATION_CONTRACT_SHOW",
		// },
	];
	return (
		<div className="contract-list">
			<div className="business-contract-table">
				<TableComponent
					register={register}
					apiServices={businessContractPresenter.getListBusinessContract}
					columns={BusinessContractColumns()}
					search={{placeholder: Holder_Search}}
					langs={["aucontractTranslateKey", "businessContractTranslateKey"]}
				/>
			</div>
			<RightMenu arrayAction={arrayAction} />
		</div>
	);
};

export default TableBusinessContract;
