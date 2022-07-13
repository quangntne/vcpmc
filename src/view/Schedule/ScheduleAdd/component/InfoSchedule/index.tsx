import React from 'react';
import { DatePicker, Input } from 'antd';
import UilCalendarAlt from '@iconscout/react-unicons/icons/uil-calendar-alt';
import moment, { Moment } from 'moment';

interface IInfoSchedule {
	startDate?: string;
	endDate?: string;
	name?: string;
	onChange?: (schedule: { startDate: string; endDate: string; name: string }) => void;
}

const InfoSchedule = (props: IInfoSchedule) => {
	const [startDate, setStartDate] = React.useState<string | undefined>(props.startDate);
	const [endDate, setEndDate] = React.useState<string | undefined>(props.endDate);
	const onChangeStartDate = (date: Moment) => {
		const _startDate = date?.format('YYYY-MM-DD');
		if (_startDate != null && _startDate <= endDate && endDate != null) {
			return;
		}

		setStartDate(_startDate);
		if (endDate != null || startDate == null) {
			props.onChange({ startDate, endDate, name: props.name });
		}
	};

	const onChangeEndDate = (date: Moment) => {
		const _endDate = date?.format('YYYY-MM-DD');
		if (_endDate != null && _endDate <= startDate) {
			return;
		}
		setEndDate(_endDate);
		props.onChange({ startDate, endDate: _endDate, name: props.name });
	};

	const disabledDateEndDate = (current: Moment) => {
		if (startDate == undefined) return true;
		return current <= moment(startDate).endOf('dates');
	};

	const disabledDateStartDate = (current: Moment) => {
		if (endDate == undefined) return false;
		return current >= moment(endDate).endOf('dates');
	};

	const onChangeText = ({ target }) => {
		props.onChange && props.onChange({ startDate, endDate, name: target.value });
	};

	return (
		<div className="info-name-schedule">
			<h5 className="font-weight-bold">Thông tin lịch phát</h5>
			<label htmlFor="nameSchedule" className="gay-color">
				Tên lịch phát:
			</label>
			<div className="">
				<Input className="input-class" onChange={onChangeText} />
			</div>
			<label htmlFor="day-form" className="gay-color mt-3">
				Từ ngày
			</label>
			<div className="picker-date">
				<DatePicker
					format={'DD/MM/YYYY'}
					placeholder={`dd/mm/yyyy`}
					defaultValue={startDate && moment(startDate)}
					suffixIcon={[<UilCalendarAlt size={18} color={'#FF7506'} />]}
					onChange={onChangeStartDate}
					disabledDate={disabledDateStartDate}
				/>
			</div>
			<label htmlFor="day-to" className="gay-color mt-3">
				Đến ngày
			</label>
			<div className="picker-date">
				<DatePicker
					defaultValue={endDate && moment(endDate)}
					format={'DD/MM/YYYY'}
					placeholder={`dd/mm/yyyy`}
					onChange={onChangeEndDate}
					disabledDate={disabledDateEndDate}
					suffixIcon={[<UilCalendarAlt size={18} color={'#FF7506'} />]}
				/>
			</div>
		</div>
	);
};

export default React.memo(InfoSchedule);
