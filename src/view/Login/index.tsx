import { useTranslate } from '@view/shared/hook/useTranslate';
import { common } from '@view/shared/translateKey';
import { Button, Card, Input } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import authenticationPresenter from '@modules/authentication/presenter';
import { useAsync } from '@view/shared/hook/useAsync';
import ChangeLanguage from '@view/shared/components/ChangeLanguage';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

const logo = require('../shared/assets/images/logo.png');
const { login } = authenticationPresenter;
const Login = () => {
	const history = useHistory();
	//state
	const [formData, setFormData] = useState({
		userName: '',
		userPassword: '',
	});
	const [checkError, setCheckError] = useState('');
	const [remember, setRemember] = useState(false);

	const { SIGN_IN, PASSWORD, FORGOT_PASS, REMEMBER, USER_NAME, ERROR_LACK_VALUE, ERROR_ACONT } =
		useTranslate('common');
	const [logincall] = useAsync(login);

	useEffect(() => {
		setCheckError('');
	}, [formData]);

	const handleSubmit = () => {
		if (formData.userPassword === '' || formData.userName === '') {
			setCheckError(ERROR_LACK_VALUE);
			return;
		}
		document.cookie = `remember_me=${true}; SameSite=None; Secure`;
		logincall
			.execute(formData, remember)
			.then((res) => {
				setTimeout(() => {
					history.push('/');
				}, 300);
			})
			.catch((err) => {
				setCheckError(ERROR_ACONT);
			});
	};

	const handleChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleKeyPress = (e) => {
		e.charCode == 13 && handleSubmit();
	};

	const renderError = useMemo(() => {
		if (checkError == '' || checkError == null) return false;
		return <span className="text-err">{checkError}</span>;
	}, [checkError]);

	const onchange = (e) => {
		setRemember(e.target.checked);
	};
	return (
		<div className="Authen">
			<ChangeLanguage className="label-langue-login" />
			<Card style={{ width: '25vw', margin: 'auto' }}>
				<div className="Authen_companyName">
					<img src={logo} className="label-logo-login" />
				</div>
				<div className="quang-tran-form">
					<div className="label-sign">
						<span>{SIGN_IN}</span>
					</div>
					<div className={checkError ? 'check-err' : ''}>
						<label style={{ opacity: '0.7' }}>{USER_NAME}</label>
						<input
							name="userName"
							className={'label-username'}
							onChange={handleChange}
							autoComplete="off"
							maxLength={100}
						/>
					</div>
					<div className={checkError ? 'check-err-pass' : ''}>
						<label className='mt-3' style={{ opacity: '0.7' }}>{PASSWORD}</label>
						<Input.Password
							key="userPassword"
							type="password"
							name="userPassword"
							onChange={handleChange}
							maxLength={100}
							autoComplete="off"
							onKeyPress={handleKeyPress}
							iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
						/>
					</div>
					<div>{renderError}</div>
					<div className="checkbox d-flex mt-2">
						<div className="d-flex">
							<Checkbox defaultChecked={remember} className="mr-2" name="remember" onChange={onchange} />
							<label style={{ opacity: '0.7' }}>{REMEMBER}</label>
						</div>
					</div>
					<div className="authen_button">
						<Button
							className="form-signin-submit-btn btn-save-form"
							onClick={handleSubmit}
							loading={logincall.status == 'loading'}
						>
							<span>{SIGN_IN}</span>
						</Button>
					</div>
				</div>
			</Card>
			<div style={{ textAlign: 'center' }}>
				<p className="forgot">
					<a onClick={() => history.push('/forgotPass')}>{FORGOT_PASS}</a>
				</p>
			</div>
		</div>
	);
};
export default Login;
