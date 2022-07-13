import React, { useState } from "react";
import TableComponent from "@view/shared/components/TableComponent";
import { useRouter } from "@helper/functions";
import RightMenu from "@view/shared/components/layout/RightMenu";
import "./styles.scss";
import RepositoryAuContract from "@modules/aucontract/repository";
import { useTranslate } from "@hook/useTranslate";
import useTable from "@view/shared/components/TableComponent/hook";
import SelectAndLabelComponent from "@view/shared/components/SelectAndLabelConponent";
import RenderStatus from "../component/RenderStatus";
const arrCopyright = [
  {
    value: 0,
    name: "ALL",
  },
  {
    value: 1,
    name: "perform_permission",
  },
  {
    value: 2,
    name: "producer_permission",
  },
];
const arrStatusContract = [
  {
    value: 0,
    name: "ALL",
  },
  {
    value: 1,
    name: "New",
  },
  {
    value: 2,
    name: "Time_Left",
  },
  {
    value: 3,
    name: "Expired",
  },
  {
    value: 4,
    name: "Canceled",
  },
];

const AuContractList = (props) => {
  const router = useRouter();
  const aucontractTranslateKey = useTranslate("aucontractTranslateKey");
  const [dataAction, setDataAction] = useState(null);
  const [keyRow, setKeyRow] = useState<Array<string>>(null);
  const [filterByPermision, setFilterByPermision] = useState<number>(0);
  const [filterByValidity, setFilterByValidity] = useState<number>(0);
  const table = useTable();

  const columns = React.useMemo(() => {
    return [
      {
        title: "Contract_number",
        dataIndex: "authorizedContractCode",
        key: "authorizedContractCode",
      },
      {
        title: "Contract_name",
        dataIndex: "authorizedContractName",
        key: "authorizedContractName",
      },
      {
        title: "Authorize_name",
        dataIndex: "authorizedRepresentation",
        key: "authorizedRepresentation",
        render: (text) => <span>{text?.personName}</span>,
      },
      {
        title: "Ownership",
        dataIndex: "ownership",
        key: "ownership",
        width: 160,
        render: (data: string[]) => (
          <span className="text-89">
            {data.map((ee) => aucontractTranslateKey[ee]).join(", ")}
          </span>
        ),
      },
      {
        title: "Validity",
        dataIndex: "status",
        key: "status",
        render: (text) => <RenderStatus status={text} />,
      },
      {
        title: "Create_at",
        dataIndex: "createAt",
        key: "createAt",
      },
      {
        title: "",
        dataIndex: "authorizedContractId",
        key: "authorizedContractId",
        render: (id) => (
          <span
            className="btn-detail cursor-pointer"
            onClick={() => router.push(`/contract-detail/${id}`)}
          >
            {aucontractTranslateKey.View_Detail}
          </span>
        ),
      },
    ];
  }, [aucontractTranslateKey.View_Detail]);

  const arrayActionRight = [
    {
      // icon: "fa fa-plus"
      iconType: "add",
      name: aucontractTranslateKey.Add_new,
      handleAction: () => {
        router.push("/contract-add");
      },
      // permissionCode: "SP_AUTHORIZED_CONTRACT_CREATE"
    },
  ];

  const rowSelection = {
    selectedRowKeys: keyRow,
    onChange: (selectedRowKeys, selectedRows) => {
      setKeyRow(selectedRowKeys);
    },
  };

  const onClickCheckbox = (record) => {
    setDataAction(record);
    if (record) {
      setKeyRow([record?.authorityContractId]);
    }
  };

  const onSearch = (value) => {
    table.fetchData({ option: { search: value } });
  };

  const onFilterByPermision = (event) => {
    setFilterByPermision(event);
    table.fetchData({
      option: {
        filter: {
          contractRole: event,
          contractStatus: filterByValidity,
        },
      },
    });
  };

  const onFilterByValidity = (event) => {
    setFilterByValidity(event);
    table.fetchData({
      option: {
        filter: {
          contractRole: filterByPermision,
          contractStatus: event,
        },
      },
    });
  };

  return (
    <>
      {/* <CheckPermission permissionCode={"AU_CONTRACT"}> */}
      <div className="contract-list">
        <div className="d-flex div-search justify-content-between">
          <div className="right-author">
            <SelectAndLabelComponent
              textLabel={"copyright_label"}
              dataString={arrCopyright}
              lang="aucontractTranslateKey"
              defaultValue={0}
              value={filterByPermision}
              onChange={onFilterByPermision}
            />
          </div>
          <div className="effect-contract ml-5">
            <SelectAndLabelComponent
              textLabel={"Validity_label"}
              lang="aucontractTranslateKey"
              dataString={arrStatusContract}
              onChange={onFilterByValidity}
              value={filterByValidity}
              defaultValue={0}
            />
          </div>
        </div>
        <div className="table-contract-list">
          <TableComponent
            langs={["aucontractTranslateKey"]}
            apiServices={RepositoryAuContract.getListAuContract}
            columns={columns}
            rowKey={"authorityContractId"}
            register={table}
            search={{
              placeholder: aucontractTranslateKey.Placeholder,
              align: "right",
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  onClickCheckbox(record);
                },
              };
            }}
          />
        </div>
        <RightMenu arrayAction={arrayActionRight} />
      </div>
      {/* </CheckPermission> */}
    </>
  );
};

export default AuContractList;
