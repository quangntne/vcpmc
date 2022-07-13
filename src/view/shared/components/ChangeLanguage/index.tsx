import store, { RootState } from '@modules/core/store/redux';
import translateStore from '@modules/translation/translateStore';
import { Selector } from '@reduxjs/toolkit';
import { Dropdown, Menu, Select } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';
import { LANGUAGE } from '@config/index';
import { memo } from 'react';
import UilAngelDown from "@iconscout/react-unicons/icons/uil-angle-down"

interface Iprop {
	className?: string;
	style?: any;
}

interface IChangeLanguage {
	language: string;
}

const ChangeLanguageSelector: Selector<RootState, IChangeLanguage> = (state: RootState) => ({
	language: state.translateStore.currentLanguage,
});

const ChangeLanguage = (props: Iprop) => {
	// JUST LANGUAGE
	const { language } = useSelector(ChangeLanguageSelector);
	const changeLanguage = (language: string) => {
		store.dispatch(translateStore.actions.updateLanguage(language));
	};

	return (
		<div className={` select-custom ${props?.className ? props?.className : ''}`}>
			<Select value={language} onChange={changeLanguage} suffixIcon={[<><UilAngelDown size={25} color={"#FFF"}
																							style={{marginTop: "-8px"}}/></>]}>
				{LANGUAGE.map((lang) => {
					return (
						<Select.Option value={lang.code} key={lang.code}>
							{`${lang.title}`}
							<img src={lang.icon} className="language-icon" alt={lang.code} />
						</Select.Option>
					);
				})}
			</Select>
		</div>
	);
};

export default memo(ChangeLanguage);
