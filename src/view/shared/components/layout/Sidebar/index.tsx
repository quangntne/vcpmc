import React, { memo, useState } from 'react';
import './styles.scss';
import Icon from '@ant-design/icons';
import listNav, { IListNav } from './_nav';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/core/store/redux';
import CheckPermission from '@view/shared/hoc/CheckPermission';
const logoVCPMV = require('@assets/images/logo.png');
import User from '@modules/user/entity';
import { Selector } from '@reduxjs/toolkit';
import MenuItem from './ItemMenu';
import { UilAngleRight } from '@iconscout/react-unicons';
interface ISiderComponent {
	linkImage: string;
	token: string;
	user: User;
	language: string;
}
const SiderComponentSelector: Selector<RootState, ISiderComponent> = (state: RootState) => {
	return {
		linkImage: state.profile.linkImage,
		token: state.profile.token,
		user: state.profile.user,
		language: state.translateStore.currentLanguage,
	};
};

interface IRenderMenuProps {
	listNav: Array<IListNav>;
	language: string;
	location: string;
}

const _RenderMenu: React.FC<IRenderMenuProps> = (props: IRenderMenuProps) => {
	const { listNav, language, location } = props;
	const pathnameSplit = location.split('/');
	pathnameSplit.shift();
	return (
		<>
			{listNav.map((item: IListNav) => {
				let activeMenu = false;
				item.activePath.forEach((x) => {
					const checkFind = pathnameSplit.find((y) => y == x);

					if (checkFind !== undefined) {
						activeMenu = true;
						return;
					}
				});
				const active = activeMenu ? 'menu-active' : '';
				const threeDot = item.children ? 'three-dot' : '';

				if (item.permissionCode) {
					return (
						<CheckPermission permissionCode={item.permissionCode}>
							<MenuItem active={active} data={item} language={language} />
						</CheckPermission>
					);
				} else {
					return <MenuItem active={active} data={item} language={language} />;
				}
			})}
		</>
	);
};

const RenderMenu = memo(_RenderMenu);

interface ISiderComponentProps {
	diplay: boolean;
	onClickOpen: () => void;
}

const SiderComponent: React.FC<ISiderComponentProps> = (props: ISiderComponentProps) => {
	const location = useLocation();
	const { language } = useSelector(SiderComponentSelector);

	// if (!props.diplay) {
	// 	return (
	// 		<div className="sider-component sider-component-mini" onClick={props.onClickOpen}>
	// 			<Icon component={UilAngleRight} className="icon" />
	// 		</div>
	// 	);
	// }
	return (
		<div
			className={`sider-component ${!props.diplay && 'sider-component-pointer'}`}
			style={{ width: props.diplay ? '8.85%' : '0%' }}
			onClick={props.onClickOpen}
		>
			<div
				className="mask"
				onClick={props.onClickOpen}
				style={{ left: props.diplay ? '0%' : '-9%', width: 0.0885 * window.innerWidth }}
			>
				<div className="logo">
					<img src={logoVCPMV} alt="logo" />
				</div>
				<div className="menu">
					<RenderMenu listNav={listNav} location={location.pathname} language={language} />
				</div>
				<div className="nothing"></div>
			</div>
			<Icon component={UilAngleRight} className="icon" />
		</div>
	);
};

export default SiderComponent;
