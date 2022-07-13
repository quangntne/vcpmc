import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Select } from 'antd';
import { useSelector } from 'react-redux';
import store, { RootState } from '@store/redux';
import TitleComponent from '@view/shared/components/MainTitleComponent/TitleComponent';
import listDevicesStore from '@modules/devices/listDevicesStore';

const { Option } = Select;

const ModalAddDevice = (props) => {
	const { visible, handleClose } = props;
	const { listAllDevice, listTempDevice } = useSelector((state: RootState) => state.listDevices);
	const [chooseDevice, setChooseDevice] = useState([]);

	useEffect(() => {
		if (listTempDevice.length > 0) {
			const arrTemp = listTempDevice.map((item) => item.deviceId);
			let hash = listAllDevice.filter((item) => arrTemp.includes(item.deviceId));
			setChooseDevice(hash.map((item) => item.deviceId));

			// store.dispatch(listDevicesStore.actions.updateTimeCalendar({listAllDevice: hash}))
		} else {
			return setChooseDevice([]);
		}
	}, [visible]);

	const handleSubmit = () => {
		// let temp = listTempDevice.map(item=>item.deviceId);
		let arrayAdd = listAllDevice.filter((item) => chooseDevice.includes(item.deviceId));

		store.dispatch(listDevicesStore.actions.updateListDevice({ listTempDevice: arrayAdd }));
		handleClose();
		setChooseDevice([]);
	};

	const onChangeSelect = (value) => {
		// console.log(value);
		setChooseDevice(value);
	};

	return (
		<Modal
			className="main-modal"
			visible={visible}
			onCancel={handleClose}
			width={800}
			footer={[
				<div>
					<Button className="normal-button" onClick={handleSubmit}>
						Save
					</Button>
					<Button className="cancel-button" onClick={handleClose}>
						Cancel
					</Button>
				</div>,
			]}
			title="Add device"
		>
			<Form className="main-form">
				<div className="text-center">
					<TitleComponent title={'Choose device'} index={2} />
					<Select mode="multiple" style={{ width: 500 }} onChange={onChangeSelect} value={chooseDevice}>
						{visible &&
							listAllDevice.map((item, index) => (
								<Option value={item.deviceId} key={index}>
									{item.deviceName}
								</Option>
							))}
					</Select>
				</div>
			</Form>
		</Modal>
	);
};

export default ModalAddDevice;
