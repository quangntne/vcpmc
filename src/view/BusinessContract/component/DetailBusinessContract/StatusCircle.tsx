import BusinessContractEntity from '@modules/businessContract/entity';
import { draftData, IFormBusinessContract } from '@view/BusinessContract/interface';
import CircleLabel from '@view/shared/components/CircleLabel';
import { useTranslate } from '@view/shared/hook/useTranslate';
import moment from 'moment';
import React, { useEffect } from 'react'

const StatusCircle = (props?) => {
  const data: BusinessContractEntity = props?.data;
  const businessContractStatus = data?.businessContractStatus;
const {NEW, AVALABLE, EXPIRED, Canceled} = useTranslate("businessContractTranslateKey");
  // back end trả 0 là hủy 1 là mới 
  const statusBS = {
    1: {
      text: NEW,
      color: 'blue'
    },
    2: {
      text: AVALABLE,
      color: 'green'
    },
    3: {
      text: EXPIRED,
      color: 'red'
    },
    0: {
      text: Canceled,
      color: 'grey'
    }
  };
  let status = 1;
  const dateNow = moment().endOf("date");
  if (businessContractStatus == 0) {
    status = 0;
  } else {
    if (dateNow < moment(data?.businessContractStart)) {
      status = 1;
    } else if (dateNow > moment(data?.businessContractStart)) {
      if (dateNow > moment(data?.businessContractEnd)) {
        status = 3;
      } else {
        status = 2;
      }
    }
  }
  return (<CircleLabel colorCode={statusBS[status]?.color} text={statusBS[status]?.text} />)
}

export default StatusCircle
