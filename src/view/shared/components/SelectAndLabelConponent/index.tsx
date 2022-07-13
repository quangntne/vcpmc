import React from 'react';
import { Select } from 'antd';
import UilAngelDown from '@iconscout/react-unicons/icons/uil-angle-down';
import './styles.scss';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { LangType } from '@view/shared/translateKey';

const { Option } = Select;

export interface ISelectData {
	value?: any;
	name?: any;
}
interface Iprop {
	textLabel?: any;
	defaultValue?: any;
	dataString?: Array<ISelectData>;
	onChange?: any;
	placeholder?: string;
	style?: any;
	value?: any;
	className?: string;
	lang?: keyof LangType;
}

const SelectAndLabelComponent = (props: Iprop) => {
	const lang = useTranslate(props.lang || 'common');
	return (
		<>
			<div className={`select-label-component ${props.className ? props.className : ''}`}>
				<div className="label-select">
					{props?.textLabel && <span className="mr-3">{lang[props.textLabel] || props.textLabel} </span>}
					<Select
						className="select-custom"
						style={{ ...props?.style, minWidth: '190px' }}
						value={props.value}
						defaultValue={props?.defaultValue ? props?.defaultValue : lang.ALL}
						onChange={props.onChange}
						placeholder={props?.placeholder}
						suffixIcon={<UilAngelDown size={25} color={'#FF7506'} style={{ marginTop: '-5px' }} />}
					>
						{props?.dataString.length > 0 &&
							props?.dataString.map((item, index) => {
								return (
									<Option value={item.value} key={index}>
										{lang[item.name] || item.name}
									</Option>
								);
							})}
					</Select>
				</div>
			</div>
		</>
	);
};

export default SelectAndLabelComponent;
