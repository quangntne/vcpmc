import store from "@store/redux";
import { setToken } from "./profileStore";
import authenticationRepository, { ILoginDTO } from "./repository";
import jwt from "jsonwebtoken";

const authenticationPresenter = { ...authenticationRepository };


authenticationPresenter.login = async (payload: ILoginDTO, remember = false) => {
  const token = await authenticationRepository.login(payload)
  store.dispatch(setToken({ token, remember }));
  return token;
};
authenticationPresenter.removeToken = async () => {
};

export default authenticationPresenter;
