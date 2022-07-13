import { NEWMONTH, NEWPRECIOUS } from '@config/index';
import { RootState } from '@modules/core/store/redux';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lodash from "lodash";

const FilterReport = () => {
    const sortBy = useSelector((state: RootState) => state.reportContractStore.sortBy);
    const detailSort = useSelector((state: RootState) => state.reportContractStore.detailSort);
    const translate = useSelector((state: RootState) => state.translateStore.currentLanguage)
    //state
    const [arrSortBy, setArrSortBy] = useState<Array<any>>();
    const [detailMonPre, setDetailMonPre] = useState<any>();
    
    useEffect(() => {
        if (sortBy == 0) {
            setArrSortBy(NEWMONTH)
        } else {
            setArrSortBy(NEWPRECIOUS)
        }
    }, [sortBy, detailSort])

    useEffect(() => {
        setDetailMonPre(lodash.find(arrSortBy, item => item.value === detailSort))
    }, [arrSortBy, detailSort])

    return (
        <>
            {translate === "VNM" ? detailMonPre?.VNM : detailMonPre?.USA}
        </>
    )
}

export default FilterReport
