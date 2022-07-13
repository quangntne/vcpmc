import TitleComponent from '@view/shared/components/MainTitleComponent/TitleComponent'
import { useTranslate } from '@view/shared/hook/useTranslate'
import { settingTranslateKey } from '@view/shared/translateKey'
import { Table } from 'antd'
import React from 'react'

interface Props {

}

const SystemUser = (props: Props) => {
    const { SYSTEMUSER_MANAGER } = useTranslate("settingTranslateKey")
    return (
        <div>
            <TitleComponent title={SYSTEMUSER_MANAGER} />

        </div>
    )
}

export default SystemUser
