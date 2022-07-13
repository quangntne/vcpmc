import * as moment from "moment";

const sortFunction = (a, b) => {
    var dateA = a.mediaCategoryCreatedAt;
    var dateB = b.mediaCategoryCreatedAt;
    return dateA < dateB ? 1 : -1;
};

class MediaCategoriesEntity {
    mediaCategoryId: string;
    mediaCategoryName: string;
    mediaCategoryDescription: string;
    mediaCategoryCreatedAt: any;

    constructor(mediacategories?) {
        this.mediaCategoryCreatedAt = moment(mediacategories?.authorizedContractEnd);
        Object.assign(this, mediacategories);
    }

    static createListMediaCategories(listMediaCategories) {
        if (!Array.isArray(listMediaCategories)) return [];
        listMediaCategories.sort(sortFunction);
        return listMediaCategories.map((mediacategories) => new MediaCategoriesEntity(mediacategories));
    }
}

export default MediaCategoriesEntity;
