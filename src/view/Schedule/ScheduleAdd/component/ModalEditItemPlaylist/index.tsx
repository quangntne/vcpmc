import React, { useEffect, useState } from 'react';
import { Modal, Checkbox, Button, Row, Col, Input,message } from 'antd';
import './styles.scss';
import moment from 'moment';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useTranslate } from '@view/shared/hook/useTranslate';

const options = [
	{ label: 'Monday', value: 1 },
	{ label: 'Tuesday', value: 2 },
	{ label: 'Wednesday', value: 3 },
	{ label: 'Thursday', value: 4 },
	{ label: 'Friday', value: 5 },
	{ label: 'Saturday', value: 6 },
	{ label: 'Sunday', value: 7 },
];

interface IModalEditItemPlaylist {
	visible: boolean;
	onClose: () => void;
	returnTimeEdit: (event: any) => boolean;
	data: any;
}

interface IWeek {
	choose: number[];
	onChange: (choose: CheckboxValueType[]) => void;
}

const Week = (props: IWeek) => {
	return (
		<Checkbox.Group value={props.choose} onChange={props.onChange}>
			<Row>
				{options.map((item, index) => {
					return (
						<Col span={6} key={item.value}>
							<Checkbox value={item.value}>{item.label}</Checkbox>
						</Col>
					);
				})}
			</Row>
		</Checkbox.Group>
	);
};

const ModalEditItemPlaylist = (props: IModalEditItemPlaylist) => {
	const { visible, onClose, data, returnTimeEdit } = props;
	const [valueInput, setValueInput] = useState({
		hourStart: null,
		minuteStart: null,
		secondStart: null,
		hourEnd: null,
		minuteEnd: null,
		secondEnd: null,
	});
	const [listDoW, setListDoW] = useState([]);
	const scheduleTranslateKey = useTranslate('scheduleTranslateKey');

	useEffect(() => {
		if (visible) {
			setListDoW(data?.loop || []);
			const [hourStart, minuteStart, secondStart] = data.time_start.split(':');
			const [hourEnd, minuteEnd, secondEnd] = data.time_end.split(':');
			setValueInput({ hourStart, minuteStart, secondStart, hourEnd, minuteEnd, secondEnd });
		}
	}, [visible, data]);

	function onChange(checkedValues) {
		setListDoW(checkedValues);
	}

	const handleSubmit = () => {
		const time_start = [valueInput.hourStart, valueInput.minuteStart, valueInput.secondStart].join(':');
		const time_end = [valueInput.hourEnd, valueInput.minuteEnd, valueInput.secondEnd].join(':');
		if (returnTimeEdit({ ...data, time_start, time_end, loop: listDoW })) {
			onClose();
			return;
		}
		message.error(scheduleTranslateKey.EVENT_OVERLAP)
		//returnTimeEdit(arrLoopConvert )
	};
	const handleCancelModal = () => {
		onClose();
	};

	const handleChangeInput = (e) => {
		const { value, name } = e.target;
		const reg = /^-?\d*(\.\d*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
			setValueInput((prev) => ({ ...prev, [name]: value }));
		}
	};

	return (
		<Modal
			className="main-modal extend-contract-modal modal-edit-item-playlist"
			visible={visible}
			onCancel={onClose}
			width={650}
			footer={[
				<div className="text-center">
					<Button className="cancel-button mr-3" onClick={handleCancelModal}>
						{scheduleTranslateKey.Cancel}
					</Button>
					<Button className="normal-button  ml-3" onClick={handleSubmit}>
						{scheduleTranslateKey.Save}
					</Button>
				</div>,
			]}
		>
			<section className="content-item-playlist">
				<label className="content-item-playlist-name">{data?.title}</label>
				<div className="mt-3 mb-3">
					<div className="mb-3">{scheduleTranslateKey.LOOP_ON_WEEK}</div>
                    <Week choose={listDoW} onChange={onChange} />
				</div>
				<hr className="hr-playlist" />
				<div className="mt-4">
					<div>
						<label className={"bold"}>{scheduleTranslateKey.RANGE_TIME}</label>
					</div>
					<div className="wrap-input-time">
						<div className="d-flex align-items-center">
							<Input
								className="input-class"
								onChange={handleChangeInput}
								value={valueInput.hourStart}
								name={'hourStart'}
								max={24}
								min={0}
								maxLength={2}
								autoComplete={'off'}
							/>
							<span className="mr-1 ml-1">:</span>
							<Input
								className="input-class"
								onChange={handleChangeInput}
								max={59}
								min={0}
								maxLength={2}
								value={valueInput.minuteStart}
								name={'minuteStart'}
								autoComplete={'off'}
							/>
							<span className="mr-1 ml-1">:</span>
							<Input
								className="input-class"
								onChange={handleChangeInput}
								max={59}
								min={0}
								maxLength={2}
								value={valueInput.secondStart}
								name={'secondStart'}
								autoComplete={'off'}
							/>

							<span className="mr-2 ml-2">-</span>

							<Input
								className="input-class"
								onChange={handleChangeInput}
								max={59}
								min={0}
								maxLength={2}
								value={valueInput.hourEnd}
								name={'hourEnd'}
								autoComplete={'off'}
							/>
							<span className="mr-1 ml-1">:</span>
							<Input
								className="input-class"
								onChange={handleChangeInput}
								max={59}
								min={0}
								maxLength={2}
								value={valueInput.minuteEnd}
								name={'minuteEnd'}
								autoComplete={'off'}
							/>
							<span className="mr-1 ml-1">:</span>
							<Input
								className="input-class"
								onChange={handleChangeInput}
								max={59}
								min={0}
								maxLength={2}
								value={valueInput.secondEnd}
								name={'secondEnd'}
								autoComplete={'off'}
							/>
						</div>
					</div>
				</div>
			</section>
		</Modal>
	);
};

export default ModalEditItemPlaylist;
