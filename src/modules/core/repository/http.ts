import CONFIG from "@config/index";
import store from '@store/redux';
import notificationByLanguage from "@view/shared/components/Notification";
import axios from "axios";
import { removeProfile } from "@modules/authentication/profileStore";
import MessageComponent from "@view/shared/components/MessageComponent";
export interface IParamsHTTP {
  method?: "get" | "post" | "delete" | "put";
  path: string;
  payload?: any;
  params?;
  config?: {
    isPrivate?: boolean;
    isFormData?: boolean;
  };
  showSuccess?: boolean;
  showError?: boolean;
  convert?: (res) => any;
}

export class HTTPRepository {
  private service: any;
  private token?: any;
  private language?: string;

  constructor(baseURL?) {
    this.service = axios.create({
      baseURL: baseURL || CONFIG.API_BASE_URL,
      withCredentials: false,
    });
    store.subscribe(() => {
      this.token = store.getState().profile.token;
      this.language = store.getState().translateStore.currentLanguage;
    });

  }

  private handleSuccess(response, convert, showSuccess) {
    if (showSuccess) {
      // notificationByLanguage({
      //   message: response?.data?.message,
      //   type: "success",
      //   language:this.language
      // });
      MessageComponent({
        typeMessage: 'success',
        content: response?.data?.message,
        language:this.language
      })
    }
    const convertedData = convert(response.data?.data);
    return Promise.resolve(convertedData);
  }

  private handleError(error, showError) {
    let status = error.response?.status;

    switch (status) {
      case 400: {
        if (showError) {
          // notificationByLanguage({
          //   message: error.response?.data?.message,
          //   type: "error",
          //   language: this.language
          // });
          MessageComponent({
            typeMessage: 'error',
            content: error.response?.data?.message,
            language:this.language
          })
        }
        break;
      }
      case 401: {
        store.dispatch(removeProfile())
        window.location.href = `/#/login`;
        break;
      }
      case 500: {
        MessageComponent({
          typeMessage: 'error',
          content: "Backend 500 !",
          language:this.language
        })
        break;
      }
      default: {
        break;
      }
    }
    return Promise.reject(error);
  }

  private preparePrivateHeaderConfig() {
    if (this.token == null || this.token == "") {

      return {}
    }
    return {
      Authorization: `Bearer ${this.token.accessToken}`,
    };
  }

  private getDefaultConfig({ isPrivate, isFormData }: any = {}) {
    const config = {
      headers: {},
    };

    if (isPrivate) {
      const privateHeaderConfig = this.preparePrivateHeaderConfig();
      Object.assign(config.headers, privateHeaderConfig);
    }

    if (isFormData) {
      Object.assign(config.headers, {
        "Content-Type": "multipart/form-data",
      });
    }

    return config;
  }

  async execute({
    method = "get",
    path = "",
    payload,
    config = {},
    params,
    showSuccess = true,
    showError = true,
    convert = (res) => res,
  }: IParamsHTTP) {
    let arg: Array<any>;
    const { isPrivate = true, isFormData = false } = config;

    switch (method) {
      case "get": {
        if (params) {
          arg = [
            path,
            {
              ...this.getDefaultConfig({ isPrivate }),
              params,
            },
          ];
        } else {
          arg = [path, this.getDefaultConfig({ isPrivate })];
        }
        break;
      }
      case "delete": {
        arg = [
          path,
          {
            ...this.getDefaultConfig({ isPrivate }),
            ...payload,
            params: params ? params : null
          },
        ];
        break;
      }

      case "post":
      case "put": {
        arg = [path, payload, this.getDefaultConfig({ isPrivate, isFormData })];
        break;
      }

      default:
        break;
    }

    return await this.service[method](...arg)
      .then((response) => this.handleSuccess(response, convert, showSuccess))
      .catch((error) => this.handleError(error, showError));
  }
}

const httpRepository = new HTTPRepository();

export default httpRepository;
