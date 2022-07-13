import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Tabs } from 'antd';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import TableCreation from '@view/AuContract/component/TableCreation';
import './styles.scss';
import { useRouter } from '@helper/functions';
import RightMenu from '@view/shared/components/layout/RightMenu';
import { useTranslate } from '@hook/useTranslate';
import auContractPresenter from '@modules/aucontract/presenter';
import CheckPermission from '@hoc/CheckPermission';
import ModalExtensionContract from '@view/AuContract/component/ModalExtentionContract';
import ModalCancelContract from '@view/AuContract/component/ModalCancelContract';
import InfoContractDetail from '@view/AuContract/AuContractDetail/component/InfoContract';
import { routerContract } from '@config/path';
import { withRouter } from 'react-router';
import AuContractEntity from '@modules/aucontract/entity';
import ModalDeleteContract from '../component/ModalDeleteContract';

const { TabPane } = Tabs;

const AuContractDetail = (props) => {
	const [form] = Form.useForm();
	const { match: { params } } = props;
	const IdContract = params?.id;
	const { getInfoAuContract } = auContractPresenter;
	const { } = auContractPresenter;
	const [dataResponse, setDataResponse] = useState<AuContractEntity>(null);
	const [detailMedia, setDetailMedia] = useState(null);
	const [modalExt, setModalExt] = useState({ modal: false, cancel: false, delete: false });
	// const [dataMedias, setDataMedias] = useState([]);
	const {
		List_contract,
		Contract_Info,
		View_Contract_Info,
		List_work_contract,
	} = useTranslate('aucontractTranslateKey');
	useEffect(() => {
		getInfoAuContract(IdContract).then((res) => {
			const contract = new AuContractEntity(res);
			setDataResponse(contract);
		});
		// getListMediasAuContract(IdContract).then(res => {
		// 	setDataMedias(res?.data)
		// })
	}, [IdContract]);

	const handleCloseModal = (value?: any) => {
		setModalExt({ modal: false, cancel: false, delete: false });
	};

	const handleOpenModalExt = () => {
		setModalExt({ modal: true, cancel: false, delete: false });
	};

	const handleOpenModalCancel = () => {
		setModalExt({ modal: false, cancel: true, delete: false });
	};

	const handleOpenModalDelete = () => {
		setModalExt({ modal: false, cancel: false, delete: true });
	};

	const getDataOnRow = (data) => {
		setDetailMedia(data);
	};

	return (
		<>
			{/* <CheckPermission permissionCode={"AU_CONTRACT"}> */}
			<div className="info-contract-detail">
				<MainTitleComponent
					breadcrumbs={[
						{
							name: List_contract,
							href: routerContract.CONTRACT,
						},
						{ name: Contract_Info, href: '' },
					]}
					title={View_Contract_Info}
					classBreadcumb={null}
					classTitle={null}
				/>
				<section className="info-contract-detail-content">
					<Tabs defaultActiveKey="1">
						<TabPane tab={Contract_Info} key="1">
							<InfoContractDetail
								dataResponse={dataResponse}
								openExt={handleOpenModalExt}
								openCancel={handleOpenModalCancel}
								openDelete={handleOpenModalDelete}
							/>
						</TabPane>
						<TabPane tab={List_work_contract} key="2">
							<TableCreation
								idCont={IdContract}
								dataOnRow={getDataOnRow}
								arrMediaRes={dataResponse?.medias}
								className="table-creation"
								openExt={handleOpenModalExt}
								openCancel={handleOpenModalCancel}
								openDelete={handleOpenModalDelete}
							/>
						</TabPane>
					</Tabs>
				</section>
			</div>
			<ModalExtensionContract dataResponse={dataResponse} visible={modalExt.modal} handleCancel={handleCloseModal} />
			<ModalCancelContract idContract={IdContract} visible={modalExt.cancel} handleCancel={handleCloseModal} />
			<ModalDeleteContract idContract={IdContract} visible={modalExt.delete} handleCancel={handleCloseModal} />
			{/* </CheckPermission> */}
		</>
	);
};

export default withRouter(AuContractDetail);
