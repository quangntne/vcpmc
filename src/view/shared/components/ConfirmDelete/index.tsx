import { Modal } from "antd";
import { translateConfirm } from "../../helper/functions";
import "./styles.scss";

const { confirm } = Modal;

interface IFaceConfirm {
  handleOk?: any;
  handleCancel?: () => void;
  content?: any;
  title?: any;
  okText?: string;
  width?: any;
  textOk?: string;
  textCancel?: string;
}

export const DeleteConfirm = (props: IFaceConfirm) => {
  const { handleOk, handleCancel, content, title, textOk, width, textCancel } = props;

  return confirm({
    style: { marginTop: "5%" },
    width: width || 500,
    title: title || translateConfirm("CONFIRM_DELETE"),
    content: content,
    okType: "danger",
    cancelText: textOk ? textOk : translateConfirm("Continue") ,//"Cancel"
    okText:textCancel ? textCancel : translateConfirm("Cancel"), //
    className: "modal-delete-confirm",
    
    onCancel() {
      return  handleOk();
    },
    onOk() {
      return handleCancel();
      // return new Promise((resolve, reject) => {
      //   return handleOk().then((res) => resolve(res))
      // }).catch(() => console.log('Oops errors!'));;
    },

  });
};
