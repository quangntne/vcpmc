import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.scss';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import RightMenu, { IArrayAction } from '@view/shared/components/layout/RightMenu';
import TableComponent from '@view/shared/components/TableComponent';
import useTable from '@view/shared/components/TableComponent/hook';
import { Input, Button, Form, Col } from 'antd';
import { useTranslate } from '@view/shared/hook/useTranslate';
import mediaCategorise from '@modules/mediaCategories/repository';
import mediaCategoriesPresenter from '@modules/mediaCategories/presenter';
import { useAsync } from '@view/shared/hook/useAsync';
import ModalDeleteMediaCategories from './component/ModalDeleteMediaCategories';
import { useForm } from 'antd/lib/form/Form';
import { RootState } from '@modules/core/store/redux';
import { Selector } from '@reduxjs/toolkit';
import MediaCategoriesEntity from '@modules/mediaCategories/entity';
import { useDispatch, useSelector } from 'react-redux';

interface IInforWorkSelector {
	dataSource: MediaCategoriesEntity[];
}

const InforWorkSelector: Selector<RootState, IInforWorkSelector> = (state: RootState) => {
	return {
		dataSource: state.settingStore.mediaCategories,
	};
};

const InforWork = () => {
	const table = useTable();
	const [form] = Form.useForm();
	const setting = useTranslate('settingTranslateKey');
	const { getListMediaCategories, newMediaCategories, updateMediaCategories } = mediaCategoriesPresenter;
	const [{ execute: getList }, { execute: add }, { execute: update }] = useAsync(
		getListMediaCategories,
		newMediaCategories,
		updateMediaCategories
	);
	// state
	const { dataSource } = useSelector(InforWorkSelector);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectedRow, setSelectedRow] = useState([]);
	const [modalDelete, setModalDelete] = useState(false);

	const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
		const [editing, setEditing] = useState(false);

		const toggleEdit = () => {
			setEditing(!editing);
			form.setFieldsValue({
				[dataIndex]: record[dataIndex],
			});
		};

		const save = async () => {
			try {
				const values = await form.validateFields();
				if (record[dataIndex] !== values[dataIndex]) {
					await update({ ...record, ...values });
					await getList();
				}
			} catch (errInfo) {
			} finally {
				toggleEdit();
			}
		};

		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item
						style={{
							margin: 0,
						}}
						name={dataIndex}
						rules={[
							{
								required: true,
								message: `${setting[title]} is required.`,
							},
						]}
					>
						<Input onPressEnter={save} onBlur={save} autoFocus={record?.mediaCategoryId != null} />
					</Form.Item>
				) : (
						<div
							className="editable-cell-value-wrap"
							style={{
								paddingRight: 1,
							}}
							onClick={toggleEdit}
						>
							{children}
						</div>
					)}
			</td>
		);
	};

	const data = React.useMemo(() => {
		return [
			{
				name: setting.SETTING,
			},
		];
	}, []);

	useEffect(() => {
		getList().then(() => { });
	}, []);

	const arrayViewAction = () => {
		let infoArray: IArrayAction[] = [
			{
				iconType: 'add',
				name: setting.ADD_NEW,
				disable: dataSource.some((m) => m.mediaCategoryId == undefined),
				handleAction: async () => {
					await add({ mediaCategoryName: 'Category 01', mediaCategoryDescription: 'Category 01' });
					await getList();
				},
			},
			{
				iconType: 'delete',
				name: `${setting.DELETE} ${selectedRow.length}`,
				disable: selectedRow.length == 0,
				handleAction: () => {
					setModalDelete(true);
				},
			},
		];
		return infoArray;
	};

	const columns = React.useMemo(() => {
		return [
			{
				title: 'CATEGORY',
				dataIndex: 'mediaCategoryName',
				editable: true,
			},
			{
				title: 'DES',
				dataIndex: 'mediaCategoryDescription',
				editable: true,
			},
		];
	}, []);

	const columnsFormat = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
			}),
		};
	});
	const components = React.useMemo(() => {
		return {
			body: {
				cell: EditableCell,
			},
		};
	}, []);
	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRowKeys(selectedRowKeys);
			setSelectedRow(selectedRows);
		},
	};

	const handleCloseModal = (value?: any) => {
		setModalDelete(false);
	};

	const fetchDataMediaCategories = (value) => {
		if (value) {
			getList().then((res) => {
				//setDataSource(res?.data);
			});
			setSelectedRow([]);
		}
	};

	return (
		<div className="w-100 label-infor-work">
			<MainTitleComponent
				breadcrumbs={data}
				title={setting.ARTWORK_INFO}
				classBreadcumb={null}
				classTitle={null}
			/>
			<div className="label-gene-work mt-5">
				<label>{setting.GENRE_WORKS}</label>
			</div>
			<div className="table-contract-list mt-5 mb-5">
				<Form form={form} component={false}>
					<TableComponent
						components={components}
						columns={columnsFormat}
						register={table}
						dataSource={dataSource}
						rowSelection={rowSelection}
						langs={['common', 'settingTranslateKey']}
						rowKey={'mediaCategoryId'}
					/>
				</Form>
			</div>
			<RightMenu arrayAction={arrayViewAction()} />
			<ModalDeleteMediaCategories
				fetchDataMediaCategories={fetchDataMediaCategories}
				selectedRow={selectedRow}
				visible={modalDelete}
				handleCancel={handleCloseModal}
			/>
		</div>
	);
};

export default InforWork;
