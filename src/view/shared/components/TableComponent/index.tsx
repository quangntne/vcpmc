import { useAsync } from '@hook/useAsync';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Pagination from './Component/Pagination';
import { InitPagination, IPagination } from './interface';
import { IBEPaginationTable, InitOption, IOption } from './interface';
import SearchComponent from '../SearchComponent/SearchComponent';
import { useTranslate } from '@view/shared/hook/useTranslate';

interface IState {
	pagination: IPagination;
	option: any;
	selection: Array<any>;
	rowKey?: any;
}

const TableComponent = (props: IBEPaginationTable) => {
	let {
		apiServices,
		columns = [],
		register,
		defaultOption,
		getDataAfter,
		disableFirstCallApi = false,
		dataSource = [],
		search,
		langs,
		noStt,
	} = props;

	const [repository] = useAsync(apiServices);
	const langText = langs ? useTranslate(...langs) : useTranslate('common');
	const [state, setState] = useState<IState>({
		pagination: InitPagination,
		option: { ...defaultOption, ...InitOption },
		selection: [],
	});

	useEffect(() => {
		if (!disableFirstCallApi && apiServices) getDataWithCurrentState();
	}, [apiServices]);

	const getDataWithCurrentState = (_state?: { pagination?: IPagination; option?: IOption }) => {
		const pagination = Object.assign({}, state.pagination, _state?.pagination);
		const option = Object.assign({}, state.option, _state?.option);
		setState((prev) => ({ ...prev, option }));
		//console.log(pagination,"pagination");
		if (apiServices) {
			repository.execute({ ...pagination, ...option }, option).then((res) => {
				if (getDataAfter) {
					getDataAfter(res);
				}
				setState((prev) => {
					return {
						...prev,
						pagination: {
							...pagination,
							...res?.info,
						},
					};
				});
			});
		} else {
			setState((prev) => ({ ...prev, pagination }));
		}
	};

	const handleSearch = (text) => {
		let pagination = InitPagination;
		let option = {
			search: text,
		};

		getDataWithCurrentState({ pagination, option });
	};

	const handleChangePage = (newPagination: IPagination, _filter?, _sorter?) => {
		let option = state.option;
		let newCurrent = newPagination.current;
		if (newPagination.pageSize != state.pagination.pageSize) {
			newCurrent = 1;
		}
		if (_sorter) {
			option.sorter = {
				sortOrder: _sorter.order || '',
				sortField: _sorter.field,
			};
		}
		getDataWithCurrentState({
			pagination: { ...newPagination, current: newCurrent },
			option,
		});
		setState((prev) => ({ ...prev, selection: [] }));
	};

	const getData = () => {
		return {
			data: repository.value?.data || [],
			...state,
		};
	};

	if (register) {
		register.getData = getData;
		register.fetchData = getDataWithCurrentState;
		register.setOption = (value) => setState((prev) => ({ ...prev, option: { ...prev.option, ...value } }));
		register.setPagination = (value) =>
			setState((prev) => ({
				...prev,
				pagination: { ...prev.pagination, ...value },
			}));
		register.setSelection = (value) => setState((prev) => ({ ...prev, selection: value }));
	}

	const searchClassName = () => {
		const align = {
			left: 'to-left',
			right: 'to-right',
		};
		return `search-in-table ${search?.align ? align[search?.align] : ''} ${search?.className && search?.className}`;
	};
	const thisColumns = React.useMemo(() => {
		const col = new Array(
			{
				title: langText['STT'],
				dataIndex: 'tableComponentstt',
				render: (text, record, index) => {
					return (state.pagination.current - 1) * state.pagination.pageSize + (index + 1);
				},
			},
			...columns.map((item) => {
				return { ...item, title: langText[item.title] || item.title };
			})
		);
		if (noStt) {
			const columnReturn = col.filter((item) => item.dataIndex != 'tableComponentstt');
			return columnReturn;
		}
		return col;
	}, [noStt, columns, state.pagination]);
	return (
		<>
			{search?.placeholder && (
				<SearchComponent
					onSearch={handleSearch}
					placeholder={search?.placeholder}
					classNames={searchClassName()}
				/>
			)}
			<div className={`BE-pagination-table ${props?.className}`}>
				<Table
					{...props}
					className="main-table"
					dataSource={repository?.value?.data || dataSource}
					loading={props?.loading || repository?.status == 'loading'}
					pagination={state.pagination}
					onChange={handleChangePage}
					columns={thisColumns}
				/>
				<Pagination pagination={state.pagination} onChange={handleChangePage} />
			</div>
		</>
	);
};

export default TableComponent;
