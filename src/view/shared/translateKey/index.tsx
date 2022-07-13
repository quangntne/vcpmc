export const common = require('./common.json');
export const groupList = require('./groupUserKey.json');
export const serverTranslateKey = require('./serverTranslateKey.json');
export const templateKey = require('./templateKey.json');
export const scheduleTranslateKey = require('./scheduleTranslateKey.json');
export const mediaTranslateKey = require('./mediaTranslateKey.json');
export const artworkTranslateKey = require('./artworkTranslateKey.json');
export const deviceTranslateKey = require('./deviceTranslateKey.json');
export const playlistTranslateKey = require('./playlistTranslateKey.json');
export const customerTranslateKey = require('./customer.json');
export const revenueDistribution = require('./revenueDistribution.json');
export const aucontractTranslateKey = require('./aucontractTranslateKey.json');
export const sideBarTranslateKey = require('./sidebarTranslateKey.json');
export const settingTranslateKey = require('./settingTranslateKey.json');
export const businessContractTranslateKey = require('./businessContractTranslateKey.json');
export const roleTranslateKey = require('./roleTranslateKey.json');
export const revenueByExploitingContractTranslateKey = require('./revenueByExploitingContractTranslateKey.json');
export const latchTranslateKey = require('./latchTranslateKey.json');
export const representativeTranslateKey = require('./representativeTranslateKey.json');
export const basicInforTranslateKey = require('./basicInforKey.json');
export const reportRevenueTranslateKey = require('./reportRevenueTranslateKey.json');
export const recordGalleryTranslateKey = require('./recordGalleryTranslateKey.json');
type Lang = {
	[key: string]: { [key2: string]: string };
};

export type LangType = {
	common: Lang;
	groupList: Lang;
	serverTranslateKey: Lang;
	templateKey: Lang;
	scheduleTranslateKey: Lang;
	mediaTranslateKey: Lang;
	artworkTranslateKey: Lang;
	deviceTranslateKey: Lang;
	playlistTranslateKey: Lang;
	sideBarTranslateKey: Lang;
	roleTranslateKey: Lang;
	revenueDistribution: Lang;
	basicInforTranslateKey: Lang;
	aucontractTranslateKey: Lang;
	businessContractTranslateKey: Lang;
	representativeTranslateKey: Lang;
	latchTranslateKey: Lang;
	revenueByExploitingContractTranslateKey: Lang;
	settingTranslateKey: Lang;
	customerTranslateKey: Lang;
	reportRevenueTranslateKey: Lang;
	recordGalleryTranslateKey: Lang;
};

const langs: LangType = {
	common,
	groupList,
	serverTranslateKey,
	templateKey,
	scheduleTranslateKey,
	mediaTranslateKey,
	artworkTranslateKey,
	deviceTranslateKey,
	playlistTranslateKey,
	sideBarTranslateKey,
	settingTranslateKey,
	roleTranslateKey,
	businessContractTranslateKey,
	revenueByExploitingContractTranslateKey,
	latchTranslateKey,
	representativeTranslateKey,
	basicInforTranslateKey,
	revenueDistribution,
	aucontractTranslateKey,
	customerTranslateKey,
	reportRevenueTranslateKey,
	recordGalleryTranslateKey
};

export default langs;
