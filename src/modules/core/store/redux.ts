import profileStore from "@modules/authentication/profileStore";
import deviceCalendarStore from "@modules/schedule/deviceCalendarStore";
import timeCalendarStore from "@modules/schedule/timeCalendarStore";
import translateStore from "@modules/translation/translateStore";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

import playlistStore from "@modules/playlist/playlistStore";
import timeScheduleStore from "@modules/schedule/timeScheduleStore";
import listDevicesStore from "@modules/devices/listDevicesStore";

import businessContractStore from "@modules/businessContract/businessContractStore";
import auContractStore from "@modules/aucontract/auContractStore";
import roleStore from "@modules/roles/roleStore";
import { reportContractStore } from "@modules/report/reportContractStore";
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {createWhitelistFilter} from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import settingStore from "@modules/setting/settingStore";
import recordGalleryStore from "@modules/recordGallery/recordGalleryStore";
import userStore from '@modules/user/userStore';
import permissionStore from '@modules/permission/permissionStore'

const appReducer = combineReducers({
  profile: profileStore.reducer,
  deviceCalendar: deviceCalendarStore.reducer,
  timeCalendar: timeCalendarStore.reducer,
  translateStore: translateStore.reducer,
  playlistStore: playlistStore.reducer,
  timeSchedule: timeScheduleStore.reducer,
  listDevices: listDevicesStore.reducer,
  businessContractStore: businessContractStore.reducer,
  roleStore: roleStore.reducer,
  auContractStore: auContractStore.reducer,
  recordGalleryStore: recordGalleryStore.reducer,
  reportContractStore: reportContractStore.reducer,
  settingStore: settingStore.reducer,
  userStore: userStore.reducer,
  permissionStore: permissionStore.reducer,
});

console.log('role', roleStore)

const profile = createWhitelistFilter('profile', ['token',"remember"]);
const translate= createWhitelistFilter('translateStore',['currentLanguage'])

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
  transforms: [profile,translate],
}

const persistedReducer = persistReducer(persistConfig, appReducer)

const defaultMiddleware=getDefaultMiddleware({
  serializableCheck: false,
});
export type RootState = ReturnType<typeof appReducer>;
const store= createStore(persistedReducer,applyMiddleware(...defaultMiddleware,logger));
export const persistor = persistStore(store)

export default store;

