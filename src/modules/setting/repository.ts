import httpRepository, { HTTPRepository } from "@modules/core/repository/http";
import SettingEntity from "./entity";
import PaginationInfo from "@modules/pagination/entity";
import CONFIG from "@config/index";

const getSetting = async () => {
  const dataSetting = await httpRepository.execute({
    path: "/api/Setting",
    method: "get",
    config: { isPrivate: true },
    showSuccess: false,
  });
  return {
    data: SettingEntity.createListSettingEntity(dataSetting.pagedData),
    info: new PaginationInfo(dataSetting.pageInfo),
  };
};
const getSettingSystem = async () => {
  const dataSetting = await httpRepository.execute({
    path: "/api/PlaylistDevices/setting",
    method: "get",
    config: { isPrivate: true },
    showSuccess: false,
  });
  return dataSetting
};
const updateSettingSystem = async (payload) => {
  const dataSetting = await httpRepository.execute({
    path: "/api/PlaylistDevices/setting",
    method: "put",
    payload,
    config: { isPrivate: true },
    // showSuccess: false,
  });
  return dataSetting
};

export default {
  getSetting,
  getSettingSystem,
  updateSettingSystem
};
