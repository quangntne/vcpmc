import { Modal } from "antd";
import { serverTranslateKey } from "@view/shared/translateKey";
import { useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
import { translateConfirm } from "@view/shared/helper/functions";
const { confirm } = Modal;

export const showDeleteConfirm = () => {
  confirm({
    title: "Are you sure delete this task?",
    content: "Some descriptions",
    okText: translateConfirm("Yes"),
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

