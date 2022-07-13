import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import DropDay from '@view/Schedule/ScheduleAdd/component/DropDay';
import ModalEditItemPlaylist from '@view/Schedule/ScheduleAdd/component/ModalEditItemPlaylist';
import { DeleteConfirm } from '@view/shared/components/ConfirmDelete';
import LoopEvent, { IEvent } from '@view/Schedule/ScheduleAdd/component/LoopEvent';
import { message } from 'antd';
import { useTranslate } from '@view/shared/hook/useTranslate';

interface ITime {
	start: Date;
	end: Date;
	resource?: any;
	weekDay?: number;
}

const rand = () => {
	return Math.floor(Math.random() * 10000) + 1;
};

const toString = (_date: Date) => {
	const _m = moment(_date);
	const time = _m.format('HH:mm:ss');
	const date = _m.format('YYYY-MM-DD');
	return [date, time];
};

const range_time_overlap = (time1: ITime, time2: { time_start: string; time_end: string }) => {
	const time1_start = moment(time1.start).format('HH:mm:ss');
	const time2_end = moment(time1.end).format('HH:mm:ss');
	if (time1_start >= time2.time_start && time1_start <= time2.time_end) {
		// 1->4 || 0->3 === 1->4 || 0->5
		return true;
	}
	if (time2_end >= time2.time_start && time2_end <= time2.time_end) {
		// 1->4 || 2->5
		return true;
	}
	if (time1_start <= time2.time_start && time2.time_end <= time2_end) {
		// 1->4 || 2->3
		return true;
	}
	return false;
};

const overlap = (events: IEvent[], { start, end, weekDay }: ITime, ignore: number = -1) => {
	const _events = events.filter((e, index) => index != ignore && e.loop.some((ll) => ll == weekDay));
	return _events.some((ee) => range_time_overlap({ start, end }, ee));
};

const event_overlap = (events: IEvent[], event: IEvent, ignore: number = -1) => {
	return event.loop.some((e, index) => {
		const start = moment(event.date_start + ' ' + event.time_start).toDate();
		const end = moment(event.date_end + ' ' + event.time_end).toDate();
		return overlap(events, { start, end, weekDay: e }, ignore);
	});
};

interface IWeekendDrop {
	schedule: { startDate?: string; endDate?: string }|undefined;
	itemPlaylistDrop:any
}

const WeekendDrop = (props:IWeekendDrop) => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const itemDropRef = useRef<ITime>(null);
	const [openModal, setOpenModal] = useState({ modalEdit: false, data: {} });
	const {schedule}= props;
	const scheduleTranslateKey = useTranslate('scheduleTranslateKey','common');
	const moveEvent = (_index: number, value) => {
		const { start, end } = value;
		const loop = value.event.loop.length > 1 ? value.event.loop : [moment(start).isoWeekday()];
		if (loop.length == 1 && overlap(events, { start, end, weekDay: loop[0] }, _index)) {
			return false;
		}
		const [date_start, time_start] = toString(start);
		const [date_end, time_end] = toString(end);

		const tempEvent = Object.assign({}, events[_index], {
			date_start,
			time_start,
			date_end,
			time_end,
			loop,
		});
		if (loop.length > 1 && event_overlap(events, tempEvent, _index)) {
			message.error(scheduleTranslateKey.EVENT_OVERLAP)
			return false;
		}
		const _events = [...events];
		_events[_index] = tempEvent;
		setEvents(_events);
		return true;
	};

	const onDropFromOutside = (value) => {
		const weekDay = moment(value.start).isoWeekday();
		if (overlap(events, { start: value.start, end: value.end, weekDay })) {
			return;
		}
		itemDropRef.current = value;
	};

	const handleOnDrop = (item) => {
		const valueTime = itemDropRef.current;
		if (valueTime != null) {
			const [date_start, time_start] = toString(valueTime.start);
			const [date_end, time_end] = toString(valueTime.end);
			const _loop = moment(valueTime.start).isoWeekday();
			const event: IEvent = {
				id: rand(),
				title: item?.name,
				time_start,
				time_end,
				date_start,
				date_end,
				loop: [_loop],
			};
			const _events = [...events, event];
			setEvents(_events);
			itemDropRef.current = null;
		}
	};

	const SelectEvent = (value) => {
		setOpenModal({ modalEdit: true, data: value });
	};

	const handleCloseModal = () => {
		setOpenModal({ modalEdit: false, data: {} });
	};

	const funDeleteEvent = (index) => {
		DeleteConfirm({
			handleOk: () => {
				if (index != -1) {
					const _events = [...events];
					_events.splice(index, 1);
					setEvents(_events);
				}
			},
			title: scheduleTranslateKey.DELETE_SCHEDULE_TITLE,
			content: scheduleTranslateKey.DELETE_SCHEDULE_DESC,
			textOk: scheduleTranslateKey.SAVE,
			textCancel: scheduleTranslateKey.CANCEL,
		});
	};

	const ReturnTimeEdit = (value: IEvent) => {
		const index = events.findIndex((ee) => ee.id == value.id);
		if (index < 0) {
			return false;
		}
		if (event_overlap(events, value, index)) {
			return false;
		}
		const __events = [...events];
		__events[index] = value;
		setEvents(__events);
		return true;
	};

	return (
		<>
			<DropDay handleOnDrop={handleOnDrop}>
				<section className="wrap-weekend w-100 h-100">
					<div className="wrap-weekend-calendar">
						<LoopEvent
							arrEvents={events}
							onEventDrop={moveEvent}
							onDropFromOutside={onDropFromOutside}
							onSelectEvent={SelectEvent}
							onCloseEvent={funDeleteEvent}
							schedule={schedule}
						/>
					</div>
				</section>
			</DropDay>
			<ModalEditItemPlaylist
				visible={openModal.modalEdit}
				onClose={handleCloseModal}
				data={openModal.data}
				returnTimeEdit={ReturnTimeEdit}
			/>
		</>
	);
};
export default WeekendDrop;
