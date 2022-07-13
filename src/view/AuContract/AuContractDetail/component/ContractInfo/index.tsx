import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Input, Row } from 'antd';
import { useTranslate } from '@hook/useTranslate';
import { aucontractTranslateKey } from '@translateKey/index';
import ContentComponent from '@view/shared/components/ContentComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@store/redux';
import { useRouter } from '@helper/functions';
import LabelComponent from '@view/shared/components/ContentComponent/LabelComponent';
import * as moment from 'moment';
import { InfoCircleOutlined } from '@ant-design/icons';
import AuContractEntity from '@modules/aucontract/entity';
import RenderStatus from '@view/AuContract/component/RenderStatus';
import RenderFile from '@view/AuContract/component/FileComponent';
import TextComponent from '@view/shared/components/ContentComponent/TextComponent';
interface IContractInfoDetailProps {
	data: AuContractEntity;
}

const ContractInfoDetail = (props: IContractInfoDetailProps) => {
	const { data } = props;
	if (data == null) {
		return null;
	}
	const flagEdit = true;
	// const {infoAu} = useSelector((state: RootState) => state.auContractStore);
	// const router = useRouter();
	// const IdContract = router.query["key"];
	const {
		Contract_name,
		Contract_number,
		Attachments,
		Date_Au,
		Royalties,
		Date_Au_Ex,
		Status,
		Copyright,
		Right_Related,
		Right_Per,
		Right_Manuf,
		Record,
	} = useTranslate('aucontractTranslateKey');

	const layout = {
		labelCol: { span: 10 },
		wrapperCol: { span: 14, pull: 1 },
	};

	return (
		<>
			<Row gutter={24}>
				<Col span={8}>
					<ContentComponent text={data.authorizedContractCode} label={Contract_number} layout={layout} />
					<ContentComponent text={data.authorizedContractName} label={Contract_name} layout={layout} />
					<ContentComponent
						text={data.authorizedContractStart.format('DD/MM/YYYY')}
						label={Date_Au}
						layout={layout}
					/>
					<ContentComponent
						text={data.authorizedContractEnd.format('DD/MM/YYYY')}
						label={Date_Au_Ex}
						layout={layout}
					/>
					<ContentComponent
						text={<RenderStatus status={data.status} />}
						label={Status}
						layout={layout}
						noShowTooltip={true}
					/>
				</Col>
				<Col span={7}>
					<ContentComponent
						text={<>{data.fileLinks.map((file, index) => {
							return <RenderFile ellipsis={true} className={'content text-89 w-100'} fileName={file.FileName} key={index} filePath={file.FilePath} />;
						})}</>}
						label={Attachments}
						layout={layout}
						noShowTooltip={true}
					/>
				</Col>

				<Col span={7} >
					{/*<LabelComponent text={Royalties}/>*/}
					<div className="royal-label mb-3">
						<InfoCircleOutlined className="mr-2" style={{ fontSize: '18px' }} />
						{Royalties}
					</div>
					<ContentComponent text={`${data.copyrightPercent || 0}%`} label={Copyright} />
					<div className="mb-2">
						<ContentComponent text={''} label={Right_Related} />
					</div>
					<ContentComponent text={`${data.performPercent || 0}%`} label={Right_Per} bold={false} />
					<ContentComponent text={`${data.producerPercent || 0}%`} label={Right_Manuf} bold={false} />
					<div className="text-white" style={{ marginTop: '0.6vh' }}>
						({Record}/video)
					</div>
				</Col>
			</Row>
		</>
	);
};

export default ContractInfoDetail;
