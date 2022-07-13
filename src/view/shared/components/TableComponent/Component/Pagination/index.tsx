import { useTranslate } from "@view/shared/hook/useTranslate";
import { common } from "@view/shared/translateKey";
import { InputNumber, Select } from "antd";
import React from "react";
import { IPagination } from "../../interface";

interface IProps {
  pagination: IPagination;
  onChange: (pagination: IPagination) => void;
}

const Pagination = (props: IProps) => {
  const { pagination, onChange } = props;
  const { ENTRIES, DISPLAY, OF, PAGE } = useTranslate("common");
  if(pagination?.total == 0) {
    return <></>;
  }
  return (
    <div className="table-function">
      <div className="pagesize">
        <span className="text-white">{DISPLAY}</span>
        <InputNumber
          onChange={(value) => {
            onChange({
              ...pagination,
              pageSize: value,
            });
          }}
          max={100}
          min={1}
          defaultValue={props?.pagination?.pageSize}
        />
        <span className="pagesize--entries">
          {ENTRIES}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
