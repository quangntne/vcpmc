import React, { useState } from "react";
import TableData from "./component/MainTable/TableData";
import FormAdd from "./component/FormAdd/FormAdd";

import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import TitleComponent from "@view/shared/components/MainTitleComponent/TitleComponent";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import { Col, Input, Row } from "antd";
import ModalAdd from "./component/MainModal/ModalAdd";
import { IModal } from "./interface";
import TemplateEditorSkeleton from "@view/Template/components/TemplateEditor/components/TemplateEditorSkeleton";
import ChartLineComponent from "@view/shared/components/ChartLineComponent";

const TestHoa = () => {
  const [ modal, setModal ] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
  });
  const data = [
    {
      name: "User system",
      href: "/ss",
    },
    {
      name: "Test Hoa",
    },
  ];

  return (
    <div>
      {/* MainTitleComponent đã bao gồm title và breadcumb, nếu ko truyền title sẽ tự hiểu là name cuối của breadcumb */}
      <MainTitleComponent
        breadcrumbs={data}
        title="Test Test"
        classBreadcumb={null}
        classTitle={null}
      />

      {/* TitleComponent chỉ cần truyền title thì sẽ tự động hiểu là title đầu trang, còn thêm props index = {2} thì là title phụ  */}
      <TitleComponent title="Secondary title" index={2} />
      <Row>
        <Col lg={12} xs={24}>
          <p>Search component</p>
          <SearchComponent />
        </Col>
        <Col lg={12} xs={24}>
          <p>Search của ant design</p>
          <Input.Search className="ant-form-search" onSearch={() => { }} />
        </Col>
      </Row>
      <ModalAdd modal={modal} setModal={setModal} />
      <TableData setModal={setModal} />
    </div>
  );
};

export default TestHoa;
