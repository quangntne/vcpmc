import listGroupPresenter from '@modules/listGroup/presenter';
import userPresenter from '@modules/user/presenter';
import ContentComponent from '@view/shared/components/ContentComponent';
import RightMenu, { IArrayAction } from '@view/shared/components/layout/RightMenu';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import { useAsync } from '@view/shared/hook/useAsync';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { common, groupList } from '@view/shared/translateKey';
import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import User from '@modules/user/entity';

//style
import './style.scss';

const ViewUser = () => {
    const history = useHistory()
    const { idGroup, idUser } = useParams<any>();
    //state
    const [groupName, setGroupName] = useState('');
    const [user, setUser] = useState<User>();
    const { getGroupById } = listGroupPresenter;
    const { getUserById } = userPresenter;

    const [getGroup, getUser] = useAsync(getGroupById, getUserById);

    useEffect(() => {
        getGroup.execute(idGroup).then(res => {
            setGroupName(res.groupName)
        })
        getUser.execute(idUser).then(res => {
            setUser(res);
        })
    }, []);

    const { VIEW_USER, INACTIVE, ACTIVE, EXPIRED, USER_NAME,
        ROLE, EMAIL, NAME_USER, PASSWORD, STATUS_DEVICE, EDIT } = useTranslate("groupList");
    const { LIST_UNITS_USED, LIST_USER } = useTranslate("common");


    const data = [
        {
            name: LIST_UNITS_USED,
            href: "/list-used-unit",
        },
        {
            name: `${LIST_USER} ${groupName}`,
            href: `/list-used-unit/${idGroup}/used-unit`,
        },
        {
            name: VIEW_USER
        }
    ];
    const arrayAction: IArrayAction[] = [
        {
            iconType: 'edit',
            name: EDIT,
            handleAction: () => {
                history.push(`/list-used-unit/${idGroup}/used-unit/${idUser}/edit-user`)
            },
        },
    ];
    return (
        <div>
            <MainTitleComponent
                breadcrumbs={data}
                title={VIEW_USER}
                classBreadcumb={null}
                classTitle={'mt-3 mb-3'}
            />
            <Row className='mt-5 label-view-user'>
                <Col lg={12} sm={12} xs={24} className='pr-3'>
                    <ContentComponent className='mb-2' label={USER_NAME} text={user?.userName} />
                    <ContentComponent className='mb-2' label={ROLE} text='QA' />
                    <ContentComponent className='mb-2' label={EMAIL} text={user?.userEmail} />
                </Col>
                <Col lg={12} sm={12} xs={24} className='pl-3'>
                    <ContentComponent className='mb-2' label={NAME_USER} text={user?.userEmail} />
                    <ContentComponent className='mb-2 label-pass-view-user' label={PASSWORD} text='••••••••••' />
                    <ContentComponent className='mb-2' label={STATUS_DEVICE} text={user?.userStatus == 0 ? INACTIVE : user?.userStatus == 1 ? ACTIVE : EXPIRED} />
                </Col>

            </Row>
            <RightMenu arrayAction={arrayAction} />
        </div>
    )
}

export default ViewUser