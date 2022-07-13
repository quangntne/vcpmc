import { CURRENT_LANGUAGE, flagMTC } from "@config/index";
import { common, serverTranslateKey } from "../translateKey";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { useMemo } from "react";
import queryString from "query-string";
import { RootState } from "@modules/core/store/redux";
import { useSelector } from "react-redux";
import { translate } from '../hook/useTranslate';
import lodash from 'lodash';

export const indexOfArrayObject = (array, key: string, value) => {
  if (!Array.isArray(array)) return;
  let index: number;
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item[key] == value) {
      index = i;
      break;
    }
  }
  return index;
};

export const correctEmail = (value) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }
  return false;
};

export const checkNumberPhone = (number) => {
  if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number)) {
    return true;
  }
  return false;
};

export const debounce = (callback, delay) => {
  return lodash.debounce(callback,delay);
};

export const onScrollBottom = (callBack) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      callBack(event);
    }
  };
};

export const translateConfirm = (text) => {
	return translate("serverTranslateKey",text);
};

export const keyPressOnlyNumber = (evt) => {
  var theEvent = evt || window.event;
  // Handle paste
  if (theEvent.type === "paste") {
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
};

export const checkValidSpaces = (
  _: any,
  value,
  _label,
  _message?,
  _regex = /^\S.*$/
) => {
  const lang = "USA";
  let label = _label;
  if (_label) label = _label.toLowerCase();
  const message =
    _message ||
    (lang == "USA"
      ? "Please input your " + label + "!"
      : "Vui lòng nhập một " + label + " hợp lệ!");
  if (_regex.test(value)) {
    return Promise.resolve();
  }
  if (!value) {
    return Promise.resolve();
  }
  return Promise.reject(message);
};
export function roundToTwo(num) {
  return Math.round(num * 1e2) * 1e-2;
}

export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export const spliceArray = (arr: Array<any>, start: number, end: number) => {
  return [...arr].splice(start, end);
};

export const validateMessages = () => {
  const language = useSelector(
		(state: RootState) => state.translateStore.currentLanguage
	);
	return {
    required: common.VALIDATE_REQUIRE[language] + " ${label}!",
    whitespace: common.WHITE_SPACE[language],
    types: {
      email: "${label} " + common.IS_UNVALID_EMAIL[language],
    },
  };
};
export const checkFlag = (MTCDATA, VCPMCDATA) => {
  if (flagMTC) {
    return MTCDATA;
  }
  return VCPMCDATA;
};

// hàm định dạng tiền việt nam
// export function formatMoneyVND(num) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
// }
export const FormatNumber = (money, separator = ",") => {
  if (!money) return "0";
  return (money + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator);
};
export const formatNumberDec = (
  nStr: string,
  decSeparate: string,
  groupSeparate: string
) => {
  nStr += "";
  let x = nStr.split(decSeparate);
  let x1 = x[0];
  let x2 = x.length > 1 ? "." + x[1] : "";
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + groupSeparate + "$2");
  }
  return x1 + x2;
};
// hàm định dạng tiền việt nam

export function formatMoneyVND(num: number | string) {
  if (typeof num == "number") {
    num = Math.floor(num);
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} VND`;
  } else if (typeof num == "string") {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} VND`;
  }
}

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  if (decodedCookie == null || decodedCookie == "") {
    return "";
  }
  const cookieValue = decodedCookie
    .split("; ")
    .find((row) => row.startsWith(name))
    .split("=")[1];
  return cookieValue || "";
};

export function formatNumberInput(value,  separator = ',') {
	value += '';
	const list = value.split('.');
	const prefix = list[0].charAt(0) === '-' ? '-' : '';
	let num = prefix ? list[0].slice(1) : list[0];
	let result = '';
	while (num.length > 3) {
		result = `${separator}${num.slice(-3)}${result}`;
		num = num.slice(0, num.length - 3);
	}
	if (num) {
		result = num + result;
	}
	return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export const toFirstUpperCase = (string:string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const toFirstLowerCase = (string:string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};