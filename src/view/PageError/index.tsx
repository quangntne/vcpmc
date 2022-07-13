import React from 'react';
import { useHistory } from 'react-router';
import { Button } from "antd";
import './style.scss';
import ChangeLanguage from '@view/shared/components/ChangeLanguage';
import { useTranslate } from '@view/shared/hook/useTranslate';

const logo = require('../shared/assets/images/logo.png');

const PageError = () => {
    const history = useHistory();
    const { BACK_SIGNIN } = useTranslate("common");

    return (
        <div className="Authen forgot-password">
            <ChangeLanguage className='label-langue-forgot-pass' />
            <span className="label-logo" >
                <img className='label-logo-forgot' src={logo} />
            </span>
            <div className="Authen_content text-center">
                <div className='label-div-err'><span>ERROR</span></div>
                <div className='label-div-404'><span>404</span></div>
                <div className='label-div-page-not-found'><span>PAGE NOT FOUND</span></div>
            </div>
            <div>
                <p className="forgot">
                    <Button>
                        <a onClick={() => history.push("/login")}>{BACK_SIGNIN}</a>
                    </Button>
                </p>
            </div>
        </div>
    )
}

export default PageError
