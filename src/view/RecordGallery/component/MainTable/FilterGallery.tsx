import { RootState } from '@modules/core/store/redux';
import MediaCategoriesEntity from '@modules/mediaCategories/entity';
import { IFilterGallerySelect, listFilterGallerySelect } from '@view/RecordGallery/interface';
import SelectAndLabelComponent, { ISelectData } from '@view/shared/components/SelectAndLabelConponent';
import React from 'react'
import { useSelector } from 'react-redux';

const FilterGallery = ({ onChangeSelect, isApprove }) => {
  const settingStore = useSelector((state: RootState) => state.settingStore)

  const renderFilter = () => {
    let listFilter = [];
    if (!isApprove) {
      listFilter.push(listFilterGallerySelect[0]);
      listFilter.push(listFilterGallerySelect[1]);
    } else {
      listFilter.push(...listFilterGallerySelect);
    }
    return listFilter.map((select: IFilterGallerySelect) => {
      let dataString: ISelectData[] = select.option;
      if (select?.store) {
        const newdataString = settingStore[select.store].map((item: MediaCategoriesEntity) => {
          if (select?.store == "mediaFormat") return item;
          return { value: item.mediaCategoryId, name: item.mediaCategoryName }
        })
        dataString.push(...newdataString);
      }
      return (
        <div className="gallery-filter--item mt-3">
          <SelectAndLabelComponent
            textLabel={select.label}
            dataString={dataString}
            defaultValue={select.defaultValue}
            lang={"recordGalleryTranslateKey"}
            onChange={(valueOnChange ) => {
              return onChangeSelect(valueOnChange, select.paramToCallApi);
            }}
          />
        </div>
      );
    });
  }
  return <>{renderFilter()}</>;
}

export default FilterGallery;
