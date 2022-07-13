import { notification } from "antd";
import { translate } from "@hook/useTranslate";

interface INotification {
  message: string;
  type: 'open' | 'success' | 'error',
  language:string;
}

const notificationByLanguage = ({ message = "message", type = "open",language="USA" }: INotification) => {
  let decription = "You didn't translate in serverTranslateKey yet";
  let messageType = "You didn't translate in serverTranslateKey yet";
  decription= translate("serverTranslateKey",message,language);
  messageType= translate("serverTranslateKey",type,language);
  notification[type]({
    message: messageType,
    description:decription,
    placement: "bottomRight",
  });
};


export default notificationByLanguage