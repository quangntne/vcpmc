import React, { useEffect, useState } from 'react';
import {
  Col,
  DatePicker,
  Row,
  TimePicker,
  Button,
  Form,
  Select,
  Input,
} from 'antd';
import './style.scss';
import moment from 'moment';
import ListDeviceSchedule from '@view/Schedule/component/TableDevice';
import { useSelector } from 'react-redux';
import store, { RootState } from '@store/redux';
import { useAsync } from '@hook/useAsync';
import ScheduleRepository from '@modules/schedule/repository';
import DeviceRepository from '@modules/devices/repository';
import { getDayInSchedule } from '@modules/schedule/helper';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import ModalAddDevice from '@view/Schedule/component/ModalAddDevice';
import { useRouter, validateMessages } from '@helper/functions';
import timeScheduleStore from '@modules/schedule/timeScheduleStore';
import { decode } from 'jsonwebtoken';
import CONFIG from '@config/index';
import { useTranslate } from '@hook/useTranslate';
import CheckPermission from '@hoc/CheckPermission';
import ScheduleLoop from '@view/Schedule/component/ScheduleLoop';

const { Option } = Select;

const ScheduleEdit = (props) => {
  const router = useRouter();
  const idSchedule = router.query['key'];
  const {
    Name,
    Start_Date,
    End_Date,
    Start_Time,
    End_Time,
    Play_list,
    Setting,
    Loop,
    Save,
    Cancel,
    Type_loop,
    No_loop,
    Daily,
    Weekly,
    Monthly,
    Yearly,
    Add_device,
    Edit_Schedule,
    Schedule,
    Please_Input,
    Mess_Time,
    Mess_Date,
    Mess_Time_Start,
    Sequentially,
    Not_Sequentially,
  } = useTranslate("scheduleTranslateKey");
  const [form] = Form.useForm();
  const { arrayWeekly, arrayMonthly, arrayYearly } = useSelector(
    (state: RootState) => state.timeSchedule,
  );
  const [arrPlayList, setArrayPlayList] = useState({
    playList: [],
    device: [],
    sequent: [],
  });
  const [
    { execute: getPlayList },
    { execute: editSchedule, status },
  ] = useAsync(ScheduleRepository.getPlayList, ScheduleRepository.editSchedule);
  const [showModalDevice, setShowModalDevice] = useState(false);
  const [typeSchedule, setTypeSchedule] = useState({ type: 0, value: null });
  const { listTempDevice } = useSelector(
    (state: RootState) => state.listDevices,
  );

  useEffect(() => {
    getPlayList().then((res) => {
      setArrayPlayList((prev) => ({ ...prev, playList: res?.data }));
    });
    DeviceRepository.getAllDevice().then((res) => {
      setArrayPlayList((prev) => ({ ...prev, device: res?.data }));
    });
    GetDetailSchedule();
  }, [idSchedule]);

  const user = decode(localStorage.getItem(CONFIG.TOKEN_FEILD));
  const listTypeSchedule = [
    { value: 0, name: No_loop },
    { value: 1, name: Daily },
    { value: 2, name: Weekly },
    { value: 3, name: Monthly },
    { value: 4, name: Yearly },
  ];
  const GetDetailSchedule = () => {
    ScheduleRepository.getInfoSchedule(idSchedule).then((res) => {
      form.setFieldsValue({
        scheduleName: res?.scheduleName,
        playlistId: res?.playlistId,
        scheduleTimeBeginStr: moment(res?.scheduleTimeBegin, 'HH:mm:ss'),
        scheduleTimeEndStr: moment(res?.scheduleTimeEnd, 'HH:mm:ss'),
        scheduleDateTimeBeginStr: moment(
          res?.scheduleDateTimeBegin,
          'YYYY-MM-DD HH:mm:ss',
        ),
        scheduleDateTimeEndStr: moment(
          res?.scheduleDateTimeEnd,
          'YYYY-MM-DD HH:mm:ss',
        ),
        scheduleSequential: res?.scheduleSequential,
      });
      ConvertArrayRepeatValue(res);
      setTypeSchedule({
        type: res?.scheduleRepeat,
        value: res?.scheduleRepeatValueData,
      });
    });
  };

  const ConvertArrayRepeatValue = (data) => {
    switch (data?.scheduleRepeat) {
      case 2:
        return store.dispatch(
          timeScheduleStore.actions.updateTimeSchedule({
            arrayWeekly: data?.scheduleRepeatValueData,
          }),
        );
      case 3:
        data.scheduleRepeatValueData.map((item) => {
          if (item < 10) {
            return '0' + item;
          } else {
            return item;
          }
        });
        return store.dispatch(
          timeScheduleStore.actions.updateTimeSchedule({
            arrayMonthly: data?.scheduleRepeatValueData,
          }),
        );
      case 4:
        const arrMMToDD = data?.scheduleRepeatValueData.map((item) => {
          const slash = item.split('/');
          return slash[1] + '/' + slash[0];
        });
        // console.log(arrMMToDD,"arrDDToMM=====")
        const arrDate = getDayInSchedule({
          format: 'YYYY-MM-DD',
          scheduleDateTimeBegin: moment(data?.scheduleDateTimeBegin),
          scheduleDateTimeEnd: moment(data?.scheduleDateTimeEnd),
          scheduleRepeat: data?.scheduleRepeat,
          scheduleRepeatValues: arrMMToDD,
        });
        const arrConvert = arrDate.map((item: any) => new Date(item));
        // console.log(arrDate,'arrDate======');
        return store.dispatch(
          timeScheduleStore.actions.updateTimeSchedule({
            arrayYearly: arrConvert,
          }),
        );

      default:
        return '';
    }
  };

  const handleClose = (value) => {
    setShowModalDevice(false);
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  function ArrayRepeatValueSend(type, value) {
    switch (type) {
      case 2:
        return arrayWeekly;
      case 3:
        return arrayMonthly;
      case 4:
        const arrDate = getDayInSchedule({
          format: 'YYYY-MM-DD',
          scheduleDateTimeBegin: value?.scheduleDateTimeBeginStr,
          scheduleDateTimeEnd: value?.scheduleDateTimeEndStr,
          scheduleRepeat: typeSchedule.type,
          scheduleRepeatValues: arrayYearly.map((item) =>
            moment(item).format('MM-DD'),
          ),
        });

        const arrConvert = arrDate.map((item) => moment(item).format('DD/MM'));
        return arrConvert;
      default:
        return [];
    }
  }

  function onFinish(value) {
    // console.log(value, "value==============")

    // console.log(arrDate,"arrDate Convert======")
    let arrDate = [];
    if (typeSchedule.type > 1) {
      arrDate = getDayInSchedule({
        format: 'YYYY-MM-DD',
        scheduleDateTimeBegin: value?.scheduleDateTimeBeginStr,
        scheduleDateTimeEnd: value?.scheduleDateTimeEndStr,
        scheduleRepeat: typeSchedule.type,
        scheduleRepeatValues:
          typeSchedule.type == 2
            ? arrayWeekly
            : typeSchedule.type == 3
            ? arrayMonthly
            : arrayYearly.map((item) => moment(item).format('MM-DD')),
      });
    }

    // const arrConvert = arrDate.map(item => moment(item).format("DD/MM"));

    const raw = {
      scheduleDateTimeBeginStr:
        moment(value['scheduleDateTimeBeginStr']).format('YYYY-MM-DD') +
        ' 00:00:00',
      scheduleDateTimeEndStr:
        typeSchedule.type > 0
          ? moment(value['scheduleDateTimeEndStr']).format('YYYY-MM-DD') +
            ' 23:59:59'
          : moment(value['scheduleDateTimeBeginStr']).format('YYYY-MM-DD') +
            ' 23:59:59',
      scheduleTimeBeginStr: moment(value['scheduleTimeBeginStr']).format(
        'HH:mm:ss',
      ),
      scheduleTimeEndStr: moment(value['scheduleTimeEndStr']).format(
        'HH:mm:ss',
      ),
      scheduleRepeatValueDetails: typeSchedule.type > 1 ? arrDate : [],
      scheduleRepeat: typeSchedule.type,
      scheduleRepeatValues: ArrayRepeatValueSend(typeSchedule.type, value),
      scheduleName: value.scheduleName,
      playlistId: value.playlistId,
      scheduleId: idSchedule,
      userId: user['user_id'],
      deviceIds:
        listTempDevice.length > 0
          ? listTempDevice.map((item) => item.deviceId)
          : [],
    };

    editSchedule(raw).then((res) => {
      GetDetailSchedule();
    });
  }

  const handleChange = (value) => {
    setTypeSchedule((prev) => ({ ...prev, type: value }));
  };

  const handleCancel = () => {
    router.push('/schedule');
  };

  const onChangeSequent = (value) => {
    // console.log(value,"value========");
    // setArrayPlayList(prev => ({ ...prev, sequent: [] }));
    let arrTemp = [];
    // const arrClone = [...arrPlayList.playlist];
    arrPlayList.playList.map((item) => {
      // console.log(item,'item====')
      if (item?.playlistStatus == value || item?.playlistStatus == 2) {
        return arrTemp.push(item);
      }
      return arrTemp;
    });
    form.setFieldsValue({ playlistId: '' });
    setArrayPlayList((prev) => ({ ...prev, playList: arrTemp }));
  };
  return (
    <>
      <CheckPermission permissionCode={'SCH_UPDATE'}>
        <section className="edit-schedule mb-5">
          <MainTitleComponent
            breadcrumbs={[
              {
                name: Schedule
                ,
                href: '/schedule',
              },
              {
                name: Edit_Schedule,
                href: '/schedule-edit',
              },
            ]}
            title={
              Edit_Schedule +
              `${
                form.getFieldValue('scheduleName') &&
                ' - ' + form.getFieldValue('scheduleName')
              }`
            }
            classBreadcumb={null}
            classTitle={null}
          />

          <Form
            form={form}
            onFinish={onFinish}
            className="main-form"
            layout="vertical"
            validateMessages={validateMessages()}
          >
            <Row gutter={24}>
              <Col span={10}>
                <h4 className="label-header">{Setting}</h4>
                <Form.Item
                  label={Name}
                  name="scheduleName"
                  rules={[
                    { required: true, message: Please_Input },
                    { whitespace: true },
                  ]}
                >
                  <Input autoComplete={'off'} style={{ minWidth: 510 }} />
                </Form.Item>
                <Form.Item
                  label={Sequentially}
                  name="scheduleSequential"
                  rules={[{ required: true, message: Please_Input }]}
                >
                  <Select style={{ minWidth: 510 }} onChange={onChangeSequent}>
                    <Option value={1}>{Sequentially}</Option>
                    <Option value={0}>{Not_Sequentially}</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={Play_list}
                  name="playlistId"
                  rules={[{ required: true, message: Please_Input }]}
                >
                  <Select style={{ minWidth: 510 }}>
                    {arrPlayList.playList.length > 0 &&
                      arrPlayList.playList.map((item, index) => (
                        <Option value={item.playListId} key={index}>
                          {item.playListName}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label={Start_Time}
                      name="scheduleTimeBeginStr"
                      dependencies={['scheduleTimeEndStr']}
                      rules={[
                        { required: true, message: Please_Input },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              moment(
                                getFieldValue('scheduleTimeEndStr'),
                              ).isAfter(value)
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(Mess_Time));
                          },
                        }),
                      ]}
                    >
                      <TimePicker
                        // defaultValue={moment("00:00:00", "HH:mm:ss")}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    {/*<div className="ml-5"/>*/}
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={End_Time}
                      name="scheduleTimeEndStr"
                      rules={[
                        {
                          required: true,
                          message: 'Please input end time!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              moment(
                                getFieldValue('scheduleTimeBeginStr'),
                              ).isBefore(value)
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(Mess_Time));
                          },
                        }),
                      ]}
                    >
                      <TimePicker
                        // defaultValue={moment("00:00:00", "HH:mm:ss")}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label={Start_Date}
                  name="scheduleDateTimeBeginStr"
                  dependencies={['scheduleDateTimeEndStr']}
                  rules={[
                    { required: true, message: Please_Input },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (typeSchedule.type > 0) {
                          if (
                            moment(
                              getFieldValue('scheduleDateTimeEndStr'),
                            ).isAfter(value)
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(Mess_Time_Start));
                        } else {
                          return Promise.resolve();
                        }
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    format={'DD/MM/YYYY'}
                    style={{ minWidth: 510 }}
                  />
                </Form.Item>
                {typeSchedule.type != 0 && (
                  <Form.Item
                    label={End_Date}
                    name="scheduleDateTimeEndStr"
                    rules={[
                      {
                        required: true,
                        message: 'Please input end date!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            moment(
                              getFieldValue('scheduleDateTimeBeginStr'),
                            ).isBefore(value)
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(Mess_Date));
                        },
                      }),
                    ]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      format={'DD/MM/YYYY'}
                      style={{ minWidth: 510 }}
                    />
                  </Form.Item>
                )}
                <h4 className="label-header">{Loop}</h4>
                <Form.Item label={Type_loop} rules={[{ required: true }]}>
                  <Select
                    onChange={handleChange}
                    style={{ minWidth: 510 }}
                    value={typeSchedule.type}
                  >
                    {listTypeSchedule.map((item, index) => {
                      return (
                        <Option value={item.value} key={index}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <ScheduleLoop type={typeSchedule.type} />
              </Col>
              <Col span={10} offset={2}>
                {/*<Form.Item name="device">*/}
                <div className="table-list-device mt-5">
                  <div className="float-right mb-4">
                    <Button
                      className="icon-button normal-button"
                      onClick={() => setShowModalDevice(true)}
                    >
                      <i className="fa fa-plus" /> {Add_device}
                    </Button>
                  </div>
                  <ListDeviceSchedule />
                </div>
                {/*</Form.Item>*/}
              </Col>
            </Row>
            <div className="mt-3" />

            <div className="d-flex justify-content-end mt-4">
              <Button
                className="mr-5 normal-button"
                htmlType="submit"
                loading={status == 'loading'}
              >
                {' '}
                {Save}
              </Button>
              <Button className="ml-4 cancel-button" onClick={handleCancel}>
                {' '}
                {Cancel}
              </Button>
            </div>
          </Form>
        </section>
        {/*<RightMenu arrayAction={arrayActionRight}/>*/}
        <ModalAddDevice visible={showModalDevice} handleClose={handleClose} />
      </CheckPermission>
    </>
  );
};

export default ScheduleEdit;
