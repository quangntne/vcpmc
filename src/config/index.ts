import { usaIcon, vnmIcon } from "@assets/icon";
import { useTranslate } from "@view/shared/hook/useTranslate";
export const LANGUAGE = [{ code: "USA", title: "English", icon: usaIcon }, { code: "VNM", icon: vnmIcon, title: "Tiếng Việt" }];
export const CURRENT_LANGUAGE = "__INIT__CURRENT_LANGUAGE__";
//https://vcpmc-api.dev-altamedia.com
const CONFIG = {
  API_BASE_URL: "https://vcpmc-api.dev-altamedia.com",
  TOKEN_FEILD: "MTC_TOKEN",
};

export const MEDIA_TYPE = {
  video: ["video/mp4", "link"],
  image: ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  show: [
    "video/mp4",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "link",
    "image/gif",
  ],
  hidden: [""],
};
export const flagMTC = false;

export const MONTH = [
  {
    value: 1,
    USA: "January",
    VNM: "Tháng 1",
  },
  {
    value: 2,
    USA: "February",
    VNM: "Tháng 2",
  },
  {
    value: 3,
    USA: "March",
    VNM: "Tháng 3",
  },
  {
    value: 4,
    USA: "April",
    VNM: "Tháng 4",
  },
  {
    value: 5,
    USA: "May",
    VNM: "Tháng 5",
  },
  {
    value: 6,
    USA: "June",
    VNM: "Tháng 6",
  },
  {
    value: 7,
    USA: "July",
    VNM: "Tháng 7",
  },
  {
    value: 8,
    USA: "August",
    VNM: "Tháng 8",
  },
  {
    value: 9,
    USA: "September",
    VNM: "Tháng 9",
  },
  {
    value: 10,
    USA: "October",
    VNM: "Tháng 10",
  },
  {
    value: 11,
    USA: "November",
    VNM: "Tháng 11",
  },
  {
    value: 12,
    USA: "December",
    VNM: "Tháng 12",
  },
];

export const NEWMONTH = [
  {
    value: 0,
    USA: "January",
    VNM: "Tháng 1",
  },
  {
    value: 1,
    USA: "February",
    VNM: "Tháng 2",
  },
  {
    value: 2,
    USA: "March",
    VNM: "Tháng 3",
  },
  {
    value: 3,
    USA: "April",
    VNM: "Tháng 4",
  },
  {
    value: 4,
    USA: "May",
    VNM: "Tháng 5",
  },
  {
    value: 5,
    USA: "June",
    VNM: "Tháng 6",
  },
  {
    value: 6,
    USA: "July",
    VNM: "Tháng 7",
  },
  {
    value: 7,
    USA: "August",
    VNM: "Tháng 8",
  },
  {
    value: 8,
    USA: "September",
    VNM: "Tháng 9",
  },
  {
    value: 9,
    USA: "October",
    VNM: "Tháng 10",
  },
  {
    value: 10,
    USA: "November",
    VNM: "Tháng 11",
  },
  {
    value: 11,
    USA: "December",
    VNM: "Tháng 12",
  },
];

export const NEWPRECIOUS = [
  {
    value: 0,
    USA: "Quarter 1",
    VNM: "Quý 1",
  },
  {
    value: 1,
    USA: "Quarter 2",
    VNM: "Quý 2",
  },
  {
    value: 2,
    USA: "Quarter 3",
    VNM: "Quý 3",
  },
  {
    value: 3,
    USA: "Quarter 4",
    VNM: "Quý 4",
  }
];

export default CONFIG;
