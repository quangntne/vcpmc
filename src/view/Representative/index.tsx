import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import TableComponent from '@view/shared/components/TableComponent';
import { useTranslate } from '@view/shared/hook/useTranslate';
import React from 'react';
import { Switch } from "antd";
import useTable from '@view/shared/components/TableComponent/hook';
import { useHistory } from 'react-router';
import SearchComponent from '@view/shared/components/SearchComponent/SearchComponent';
import authorizedRepresentationRepository from "@modules/authorizedRepresentation/repository";
import authorizedRepresentationPresenter from '@modules/authorizedRepresentation/presenter';
import { useAsync } from '@view/shared/hook/useAsync';

const Representative = () => {
  const table = useTable();
  const history = useHistory();
  //state
  const [input, setInput] = React.useState(null);
  const { changeStatusAuthorizedRepresentor } = authorizedRepresentationPresenter;
  const [{ execute: changeStatus }] = useAsync(changeStatusAuthorizedRepresentor);
  const { AUTHOR_PARTNER, RECORD, Au_Unit, EMAIL, PHONE, STATUS, Type_Au_Unit,
    Personal, Organization } = useTranslate("representativeTranslateKey");
  const { ACTIVE, INACTIVE, EXPIRED } = useTranslate("groupList");

  const data = [
    {
      name: AUTHOR_PARTNER,
    },
  ];

  const columns = [
    {
      title: Au_Unit,
      dataIndex: "",
      render: (auRepresenter) => auRepresenter?.authorizedRepresentationType === 1 ?
        <>{auRepresenter?.organizationName}</> : <>{auRepresenter?.personName}</>
    },
    {
      title: Type_Au_Unit,
      dataIndex: "",
      render: (auRepresenter) => auRepresenter?.authorizedRepresentationType === 1 ?
        <>{Organization}</> : <>{Personal}</>
    },
    {
      title: EMAIL,
      dataIndex: "authorizedRepresentationEmail",
    },
    {
      title: PHONE,
      dataIndex: "authorizedRepresentationPhoneNumber",
    },
    {
      title: STATUS,
      dataIndex: "",
      render: (auRepresenter) => <>
        <Switch checked={auRepresenter?.authorizedRepresentationStatus == 1 ? true : false} onClick={() => onClickChangeStatus(auRepresenter)} className='mr-1' />
        {auRepresenter?.authorizedRepresentationStatus == 1 ? ACTIVE : INACTIVE}
      </>
    }
  ];

  const onClickChangeStatus = (value) => {
    if (value?.authorizedRepresentationStatus === 1) {
      changeStatus(value?.authorizedRepresentationId, 0).then(res => {
        table.fetchData();
      })
    } else {
      changeStatus(value?.authorizedRepresentationId, 1).then(res => {
        table.fetchData();
      })
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <>
      <MainTitleComponent
        breadcrumbs={data}
        title={AUTHOR_PARTNER}
        classBreadcumb={null}
        classTitle={null}
      />
      {/* <SearchComponent
        onChange={handleSearch}
        placeholder={RECORD}
      /> */}
      <TableComponent
        style={{ fontSize: '12px', marginTop: '24px' }}
        apiServices={authorizedRepresentationRepository.getAllAuthorizedRepresentor}
        register={table}
        columns={columns}
        search={{
          className: 'mt-3',
          placeholder: RECORD,
          align: "left",
        }}
        rowKey={"groupId"}
      />
    </>
  )
}

export default Representative;
