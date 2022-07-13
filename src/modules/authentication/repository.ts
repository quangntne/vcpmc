import CONFIG from "@config/index";
import { decode } from "jsonwebtoken";
import httpRepository, { HTTPRepository } from "@modules/core/repository/http";
import User from "@modules/user/entity";
import moment from "moment";

const register = async (payload) => {
  return await httpRepository.execute({
    path: "/auth/register",
    method: "post",
    payload,
    config: { isPrivate: false },
  });
};
const forgotPass = async (payload) => {
  return await httpRepository.execute({
    path: `api/Users/PasswordRecovery?UserName=${payload.email}`,
    method: "get",
    // payload,
    config: { isPrivate: false },
  });
};

const checkOtb = async (payload) => {
  return await httpRepository.execute({
    path: `api/Users/CheckRecoveryToken?recoveryToken=${payload}`,
    method: "get",
    // payload,
    showSuccess: false,
    showError: false,
    config: { isPrivate: false },
  });
};

const updatePass = async (payload) => {
  return await httpRepository.execute({
    path: `/api/Users/ChangePassword`,
    method: "put",
    payload,
    showSuccess: false,
    showError: false,
    config: { isPrivate: true },
  });
};

export interface ILoginDTO {
  userName: string;
  userPassword: string
}

const login = async (payload: ILoginDTO) => {
  return await httpRepository.execute({
    path: "/api/Users/Login",
    method: "post",
    payload,
    showSuccess: true,
    showError: true,
    config: { isPrivate: false },
  });
};
const logout = async () => {
  return await httpRepository.execute({
    path: "/api/Users/logout",
    method: "get",
    showSuccess: false,
    config: { isPrivate: true },
  });
};
const resetPass = async (value, otp) => {
  return await httpRepository.execute({
    path: `/api/Users/resetForgotPassword/key=${otp}`,
    method: "put",
    payload: value,
    config: { isPrivate: false },
  });
};



const getToken = () => {
  const token: string = localStorage.getItem(CONFIG.TOKEN_FEILD);
  return token;
};

const removeToken = () => {
  localStorage.removeItem(CONFIG.TOKEN_FEILD);
};

const getInfoFromToken = (token: string) => {
  const decodeToken: any = decode(token);
  const userInfo = {
    ...decodeToken,
    userId: decodeToken?.user_id,
  };
  return userInfo;
};

const getUserNameFromUserId = async () => {
  return await httpRepository.execute({
    path: "/api/Users/Profile",
    showSuccess: false,
    convert: (res) => {
      return new User(res);
    },
  });
};

const uploadAvatar = async (payload) => {
  return await httpRepository.execute({
    path: "api/Users",
    method: "put",
    payload,
  });
};

const updatePersonalInfor = async (payload) => {
  const formData = new FormData();
  formData.append("UserDayOfBirth", moment(payload.UserDayOfBirth).format("YYYY-MM-DD"));
  formData.append("UserAvatar", payload.UserAvatar);
  formData.append("UserFullName", payload.UserFullName);
  formData.append("UserPhoneNumber", payload.UserPhoneNumber);
  const response = await httpRepository.execute({
    path: "api/Users/Profile",
    method: "put",
    payload: formData,
    config: { isPrivate: true },
  });
  return response;
}

export default {
  register,
  login,
  logout,
  resetPass,
  getToken,
  forgotPass,
  checkOtb,
  removeToken,
  updatePass,
  getInfoFromToken,
  getUserNameFromUserId,
  uploadAvatar,
  updatePersonalInfor
};
