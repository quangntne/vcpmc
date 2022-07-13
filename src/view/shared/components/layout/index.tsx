import React, { Component, ReactNode } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import MainTitleComponent from '../MainTitleComponent';
import HeaderComponent from './Header';
import SiderComponent from './Sidebar';
import './styles.scss';

interface IDefaultLayoutProps {
	history: any;
	children?:ReactNode
}

const DefaultLayout = (props: IDefaultLayoutProps) => {
	const [display, setDisplay] = React.useState(true);
	props.history.listen((location, action) => {
		setDisplay(true);
	});
	const onClickOpen = () => {
		setDisplay(true);
	};

	const onClickClose = () => {
		setDisplay(false);
	};

	const onClickGuard=(e)=>{
		const targetNode = e.target as HTMLDivElement;
		if (targetNode.className == 'main-component' || e.target == e.currentTarget) {
			onClickClose();
			return;
		}
		if (
			targetNode.tagName == 'INPUT' ||
			targetNode.tagName == 'BUTTON' ||
			targetNode.onclick != null ||
			targetNode.parentElement!.onclick != null
		) {
			return;
		}
		onClickClose();
	}

	return (
		<div className="all-page-component" >
			<SiderComponent diplay={display} onClickOpen={onClickOpen} />
			<div
				className="right-page-component"
				onClick={onClickGuard}
			>
				<HeaderComponent />
				<div className="main-component">{props.children}</div>
			</div>
		</div>
	);
};

export default withRouter(DefaultLayout);
