import React, { Suspense, useState } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import PrivatePage from './routers/component/PrivatePage';
import PublicPage from './routers/component/PublicPage';
import { useDispatch, useSelector } from 'react-redux';

import 'antd/dist/antd.css';
import '@styles/styles.scss';
import { Selector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { RootState } from '@modules/core/store/redux';
import { getCookie } from './shared/helper/functions';
import { removeProfile } from '@modules/authentication/profileStore';


interface IAppSelector {
	token?: string;
	statusLogin: boolean;
	remember:boolean;
}

const AppSelector: Selector<RootState, IAppSelector> = (state: RootState) => ({
	token: state.profile.token,
	statusLogin: state.profile.statusLogin,
	remember:state.profile.remember
});

const App = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { token, statusLogin, remember } = useSelector(AppSelector);
	// useEffect(() => {
	// 	if (!token) {
	// 		history.push('/login');
	// 	}else if(getCookie("remember_me")!="true" && !remember){
	// 		dispatch(removeProfile())
	// 	}
	// }, [token]);

	return (
		<Switch>
			{token || statusLogin ? (
				<Suspense fallback={<></>}>
					<PrivatePage />
				</Suspense>
			) : (
				<Suspense fallback={<></>}>
					<PublicPage />
				</Suspense>
			)}
		</Switch>
	);
};

export default App;
