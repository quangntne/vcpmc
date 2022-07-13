import React, { useState } from "react";
import ContractInfoDetail from "../ContractInfo";
import TitleComponent from "@view/shared/components/MainTitleComponent/TitleComponent";
import AuthorInfoDetail from "../AuthorInfo";
import { useTranslate } from "@hook/useTranslate";
import RightMenu from "@view/shared/components/layout/RightMenu";
import UilClipboardNotes from '@iconscout/react-unicons/icons/uil-clipboard-notes';
import AuContractEntity from "@modules/aucontract/entity";
import { useHistory } from "react-router";

interface IInfoContractDetailProps {
    dataResponse: AuContractEntity,
    openExt: () => void;
    openCancel: () => void;
    openDelete: () => void;

}

const InfoContractDetail = (props: IInfoContractDetailProps) => {
    const { Proxy_Info, Edit_Contract, Ext_Contract, Can_Contract } = useTranslate("aucontractTranslateKey");
    const history = useHistory()

    const arrayActionRight = [
        {
            iconType: "edit",
            name: Edit_Contract,
            disable: props?.dataResponse?.status == 3 || props?.dataResponse?.status == 2 || props?.dataResponse?.status == 4 && true,
            handleAction: () => {
                history.push(`/contract-edit/${props.dataResponse.authorizedContractId}`)
            },
        },
        {
            icon: <UilClipboardNotes size="33" />,
            name: Ext_Contract,
            disable: props?.dataResponse?.status !== 2 && true,
            handleAction: () => {
                props.openExt();
            },
        },
        {
            // icon: "fa fa-plus",
            iconType: "cancel",
            name: Can_Contract,
            disable: props?.dataResponse?.status !== 2 && true,
            handleAction: () => {
                props.openCancel();
            },
        },
        {
            // icon: "fa fa-plus",
            iconType: "delete",
            name: "Xoá Hợp Đồng",
            disable: props?.dataResponse?.status !== 1 && true,
            handleAction: () => {
                props.openDelete();
            },
        },
    ];

    return (
        <>
            <ContractInfoDetail data={props?.dataResponse} />
            <div className="mt-5" />
            <TitleComponent title={Proxy_Info} index={2} style={{ color: "#FFAC69" }} />
            <AuthorInfoDetail AuthorizedRepresentationType={props.dataResponse?.authorizedContractStatus} data={props.dataResponse?.authorizedRepresentation} />
            <RightMenu arrayAction={arrayActionRight} />
        </>
    )
};

export default InfoContractDetail