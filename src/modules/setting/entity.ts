export class SettingValueEntity {
  id: string = "";
  value: string = "";

  constructor(settingValue) {
    if (!settingValue) return;
    Object.keys(this).forEach((key) => {
      if (settingValue[key]) {
        this[key] = settingValue[key] || this[key];
      }
    });
  }

  static createListSettingValueEntity(listSettingValue) {
    if (!Array.isArray(listSettingValue)) return [];
    return listSettingValue.map((settingValue) => {
      return new SettingValueEntity(settingValue);
    });
  }
}

class SettingEntity {
  settingId: string = "";
  settingKey: string = "";
  settingValue: SettingValueEntity[] = [];

  constructor(setting) {
    if (!setting) return;
    Object.keys(this).forEach((key) => {
      switch (key) {
        case "settingValue":
          this[
            "settingValue"
          ] = SettingValueEntity.createListSettingValueEntity(
            setting.settingValue || []
          );
          break;
        default:
          this[key] = setting[key] || this[key];
          break;
      }
    });
  }

  static createListSettingEntity(listSetting) {
    if (!Array.isArray(listSetting)) return [];
    return listSetting.map((setting) => {
      return new SettingEntity(setting);
    });
  }
}

export default SettingEntity;
