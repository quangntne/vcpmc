import store, { RootState } from "@store/redux";
import lodash from 'lodash';
import langs, { LangType } from '@translateKey/index';
import { useSelector } from "react-redux";

const dataLang = lodash.memoize((objKey: string | keyof LangType, lang: string) => {
  const obj: { [key: string]: string } = {};
  const langData = lodash.get(langs, objKey, {});
  Object.keys(langData).map((key) => {
    obj[key] = langData[key][lang];
  });
  return obj;
}, (objKey: string | keyof LangType, lang: string) => {
  return objKey + ":" + lang
})

export const translate = (objKey: keyof LangType, key: string, lang?: string) => {
  if (lang == null) {
    lang = store.getState().translateStore.currentLanguage
  }
  const data = dataLang(objKey, lang);
  return lodash.get(data, key, key)
}

export const useTranslate = (...objKeys: Array<keyof LangType>) => {
  const { currentLanguage } = useSelector(
    (state: RootState) => state.translateStore
  );
  const data = objKeys.reduce((p: any, objKey: keyof LangType) => {
    Object.assign(p, dataLang(objKey, currentLanguage));
    return p;
  }, {});
  return data;
};
