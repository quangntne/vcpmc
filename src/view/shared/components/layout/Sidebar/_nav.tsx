import React, { ReactHTMLElement } from 'react';
import Icon, {
	MenuUnfoldOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { sideBarTranslateKey } from '@view/shared/translateKey';
import { checkFlag } from '@view/shared/helper/functions';
import {  routerPlaylist, routerRecordGallery, routerMedia, routerRptRevByExploiting, routerRole, routerBusinessContract } from '@config/path';
import MediaIcon from '../../Icons/Media';
import PlaylistIcon from '../../Icons/PlayList';
import RevenueIcon from '../../Icons/Revenue';
import CalendarIcon from '../../Icons/Calendar';
import ManagerIcon from '../../Icons/Manager';

export interface IActivePath {
	title: string;
	path: string;
}
export interface IListNav {
	title: string;
	icon?: any;
	path?: string;
	permissionCode?: string;
	activePath: Array<string>;
	children?: IActivePath[];
}

const listNav: Array<IListNav> = [
	{
		title: sideBarTranslateKey.ARTWORKS,
		icon: <MediaIcon />,
		path: routerRecordGallery.RECORD_GALLERY,
		activePath: [
			routerMedia.MEDIA_LIBRARY,
			routerMedia.ADD_MEDIA,
			routerMedia.DETAIL_MEDIA,
			routerRecordGallery.RECORD_GALLERY,
			routerRecordGallery.EDIT_RECORD_GALLERY,
			routerRecordGallery.APPROVAL_RECORD_GALLERY,
		].map((i) => i.split('/')[1]),
		// permissionCode: 'MEDIA_MENU',
	},
	{
		title: sideBarTranslateKey.PLAYLIST,
		icon: <PlaylistIcon />,
		path: routerPlaylist.PLAYLIST,
		activePath: [routerPlaylist.PLAYLIST, routerPlaylist.ADD_PLAYLIST, routerPlaylist.EDIT_PLAYLIST].map((i) => i.split('/')[1]),
		// permissionCode: 'PLAYLIST_MENU',
	},
	{
		title: sideBarTranslateKey.SCHEDULE,
		icon: <CalendarIcon />,
		path: '/schedule',
		activePath: ['schedule', 'schedule-add', 'schedule-edit'],
		// permissionCode: 'SCH_SHOW',
	},
	{
		title: sideBarTranslateKey.AuCONTRACT,
		icon: <ManagerIcon />,
		path: '/contract',
		// permissionCode: 'NAV_CONTRACTS',
		activePath: [
			'contract',
			'contract-add',
			'contract-edit',
			'contract-detail',
			routerBusinessContract.ADD_BUSINESS_CONTRACT.split('/')[1],
			routerBusinessContract.DETAIL_BUSINESS_CONTRACT.split('/')[1],
			routerBusinessContract.BUSINESS_CONTRACT.split('/')[1],
			routerBusinessContract.EDIT_BUSINESS_CONTRACT.split('/')[1],
			'device',
			'device-add',
			'device-log',
		],
		children: [
			{
				title: sideBarTranslateKey.MANAGER_CONTRACT,
				path: '/contract',
			},
			{
				title: sideBarTranslateKey.MANAGER_DEVICE,
				path: '/device',
			},
			{
				title: sideBarTranslateKey.USED_UNIT,
				path: '/list-used-unit',
			},
			{
				title: sideBarTranslateKey.AUTHORIZATION_UNIT,
				path: '/au-unit',
			},
		],
	},
	{
		title: sideBarTranslateKey.REVENUE,
		icon: <RevenueIcon />,
		path: '/revenue-distribution',
		activePath: ['revenue-distribute', "report", "history-comparison"],
		// permissionCode: 'SHOW_CONTRACT',
		children: [
			{
				title: sideBarTranslateKey.REPORT_REVENUE,
				path: "/report",
			},
			{
				title: sideBarTranslateKey.HISTORY_COMPARISON,
				path: "/history-comparison",
			},
			{
				title: sideBarTranslateKey.REVENUE_DISTRIBUTE,
				path: "/revenue-distribute",
			},
		]
	},
	// {
	// 	title: sideBarTranslateKey.USER_MANAGER,
	// 	icon: <ManagerIcon />,
	// 	// permissionCode: 'MANAGER_USER',
	// 	path: '/user-manager',
	// 	activePath: ['user-manager'],
	// },
	{
		title: sideBarTranslateKey.SETTING,
		icon: <SettingOutlined />,
		activePath: ['setting', 'user','manager-contract','infor-work','control-cycle'],
		// permissionCode: 'NAV_SETTING',
		children: [
			{
				title: sideBarTranslateKey.AU_USER,
				path: routerRole.USER_AND_ROLE,
			},
			{
				title: sideBarTranslateKey.MANAGER_CONTRACT_TYPE,
				path: '/manager-contract',
			},
			{
				title: sideBarTranslateKey.INFO_WORK,
				path: '/infor-work',
			},
			{
				title: sideBarTranslateKey.CONTROL_CYCLE,
				path: '/control-cycle',
			},
		],
	},
];
export default listNav;
