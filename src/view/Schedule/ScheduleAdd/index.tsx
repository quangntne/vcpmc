import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd';
import './style.scss';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '@store/redux';
import ScheduleRepository from '@modules/schedule/repository';
import { useAsync } from '@hook/useAsync';
import ModalAddDevice from '@view/Schedule/component/ModalAddDevice';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import { decode } from 'jsonwebtoken';
import CONFIG from '@config/index';
import { useRouter } from '@helper/functions';
import { useTranslate } from '@hook/useTranslate';
import CheckPermission from '@hoc/CheckPermission';
import InfoSchedule from '@view/Schedule/ScheduleAdd/component/InfoSchedule';
import ListPlaylist from '@view/Schedule/ScheduleAdd/component/ListPlaylist';
import RightMenu from '@view/shared/components/layout/RightMenu';
import WeekendDrop from '@view/Schedule/ScheduleAdd/component/WeekendDrop';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const { Option } = Select;

const NewSchedule = () => {
	const router = useRouter();
	const [form] = Form.useForm();
	const { arrayWeekly, arrayMonthly, arrayYearly } = useSelector((state: RootState) => state.timeSchedule);
	const [arrPlayList, setArrayPlayList] = useState({ playlist: [], sequent: [] });
	const [{ execute: getPlayList }, { execute: addSchedule, status }] = useAsync(
		ScheduleRepository.getPlayList,
		ScheduleRepository.addSchedule
	);
	const [showModalDevice, setShowModalDevice] = useState(false);
	const [schedule,setSchedule]=useState(null)
	const [typeSchedule, setTypeSchedule] = useState(0);
	const user = decode(localStorage.getItem(CONFIG.TOKEN_FEILD));
	const onUpdateSchedule=(schedule)=>{
		setSchedule(schedule)
	}
	const {
		Name,
		Start_Date,
		End_Date,
		Start_Time,
		End_Time,
		Play_list,
		Setting,
		Loop,
		Save,
		Cancel,
		Type_loop,
		No_loop,
		Daily,
		Weekly,
		Monthly,
		Schedule,
		Yearly,
		Add_Schedule,
		Please_Input,
		Mess_Time,
		Mess_Date,
		Sequentially,
		Not_Sequentially,
	} = useTranslate('scheduleTranslateKey');

	const [itemPlaylistDrop, setItemPlaylistDrop] = useState({});
	useEffect(() => {
		getPlayList().then((res) => {
			setArrayPlayList((prev) => ({ ...prev, playlist: res?.data }));
		});

		form.setFieldsValue({
			scheduleTimeBeginStr: moment('00:00:00', 'HH:mm:ss'),
			scheduleTimeEndStr: moment('00:00:00', 'HH:mm:ss'),
		});
	}, []);

	const handleClose = (value) => {
		setShowModalDevice(false);
	};

	function ConvertArrayLoop(key) {
		switch (key) {
			case 0:
			case 1:
				return [];
			case 2:
				return arrayWeekly;
			case 3:
				return arrayMonthly;
			case 4:
				const arrConvert = arrayYearly.map((item) => moment(item).format('DD/MM'));
				return arrConvert;
		}
	}

	function onFinish(value) {
		const raw = {
			scheduleDateTimeBeginStr: moment(value['scheduleDateTimeBeginStr']).format('YYYY-MM-DD') + ' 00:00:00',
			scheduleDateTimeEndStr:
				typeSchedule > 0
					? moment(value['scheduleDateTimeEndStr']).format('YYYY-MM-DD') + ' 23:59:59'
					: moment(value['scheduleDateTimeBeginStr']).format('YYYY-MM-DD') + ' 23:59:59',
			scheduleTimeBeginStr: moment(value['scheduleTimeBeginStr']).format('HH:mm:ss'),
			scheduleTimeEndStr: moment(value['scheduleTimeEndStr']).format('HH:mm:ss'),
			scheduleRepeat: typeSchedule,
			scheduleName: value['scheduleName'],
			playlistId: value['playlistId'],
			scheduleRepeatValues: ConvertArrayLoop(typeSchedule),
			userId: user['user_id'],
			scheduleSequential: value.scheduleSequential,
		};

		addSchedule(raw).then((res) => {
			setTimeout(function () {
				router.push({
					pathname: '/schedule-edit',
					search: `?key=${res?.scheduleId}`,
				});
			});
		});
	}

	const breadcrumbs = [
		{ name: Schedule, href: '/schedule' },
		{ name: Add_Schedule, href: '/schedule-add' },
	];

	const arrayActionRight = [
		{
			// icon: "fa fa-plus"
			iconType: 'add',
			name: 'Áp lịch cho thiết bị',
			handleAction: () => {
				console.log('Áp lịch cho thiết bị');
			},
			// permissionCode: "SP_AUTHORIZED_CONTRACT_CREATE"
		},
	];

	const handleCancel = () => {};

	const handleSubmit = () => {};

	return (
		<>
			<section className="add-schedule w-100">
				<MainTitleComponent breadcrumbs={breadcrumbs} title={Add_Schedule} />
				<Row>
					<DndProvider backend={HTML5Backend}>
						<Col span={5} className="mr-4">
							<InfoSchedule onChange={onUpdateSchedule}/>
							<div className="mt-4" />
							<ListPlaylist />
						</Col>
						<Col span={18}>
							<WeekendDrop itemPlaylistDrop={itemPlaylistDrop} schedule={schedule}/>
						</Col>
					</DndProvider>
					<div className="d-flex justify-content-center align-items-center w-100">
						<div className="btn-gr">
							<Button className="cancel-button mr-3" onClick={handleCancel}>
								Huỷ
							</Button>
							<Button className="normal-button  ml-3" onClick={handleSubmit}>
								Lưu
							</Button>
						</div>
					</div>
				</Row>
			</section>
			<ModalAddDevice visible={showModalDevice} handleClose={handleClose} />
			<RightMenu arrayAction={arrayActionRight} />
		</>
	);
};

export default NewSchedule;
