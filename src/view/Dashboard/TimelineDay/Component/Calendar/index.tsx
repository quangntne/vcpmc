import React, {useEffect, useRef, useState} from "react"
import useClickOutside from "@hook/useClickOutside"
import "./style.scss"
import {useHistory} from "react-router"
import {useSelector} from "react-redux"
import {RootState} from "@modules/core/store/redux"
import {getTotalDayInMonth} from "@modules/schedule/helper"
import moment from "moment"

const Calendar = (props) => {
    const {dataDash} = props;
    let playlistRef: { current } = useRef()
    const history = useHistory()
    const {listDevice: listDeviceCalendar, currentMonth} = useSelector((state: RootState) => state.deviceCalendar)
    const totalDayInMonth = getTotalDayInMonth(currentMonth).totalDay;
    const {listDevice: ListDeviceCalendar} = useSelector((state: RootState) => state.deviceCalendar)
    const [listDataDash, setListDataDash] = useState({schedule: [], playlist: [], device: ""});


    useClickOutside([playlistRef], (event) => {
        playlistRef.current.style.display = "none";

    })

    const isPlaylistOverflowY = (clientY: number) => {
        return document.body.clientHeight <= 232 + clientY
    }

    const isPlaylistOverflowX = (clientX: number) => {
        return document.body.clientWidth <= 260 + clientX
    }

    const onContextMenu = (data, e) => {
        // console.log(data,"e.target=======")
        let arrPlayList = [];
        let arrListSchedule = [];

        const index = dataDash.findIndex(item=>item?.device?.deviceId == data?.device?.deviceId);

        if(dataDash?.length > 0 && index != -1){

           // console.log(dataDash[index],"index=====")
            dataDash[index]?.listSchedule.map(item => {
                //listSchedule scheduleName
                //playListId: "9c4c7620-68fd-4338-8eb4-b8618d70e147"
                // playListLoop: 0
                // playListName: "test hoa ca hai"
                arrPlayList.push({
                    playListId: item?.playList?.playListId,
                    playListName: item?.playList?.playListName
                });
                arrListSchedule.push({
                    scheduleName: item?.scheduleName,
                    scheduleId: item?.scheduleId
                });
                // [...arrListSchedule].concat(item?.listSchedule)
            });
            setListDataDash({schedule:arrListSchedule, device: dataDash[index]?.device?.deviceName, playlist: arrPlayList })
        }

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        playlistRef.current.style.display = "inline-block"
        playlistRef.current.style.left = e.clientX + "px"
        playlistRef.current.style.top = e.clientY + "px"

        if (isPlaylistOverflowY(e.clientY)) {
            playlistRef.current.style.top = e.clientY - 232 + "px"
        }

        if (isPlaylistOverflowX(e.clientX)) {
            playlistRef.current.style.left = e.clientX - 260 + "px"
        }
    };


    return (
        <>
            <div className="device-calendar">

                <div ref={playlistRef} className="playlists-in-device item-bg">
                    <div className="device-title">
                        <span>Device {listDataDash?.device}</span>
                        <i className="fas fa-info"/>
                    </div>
                    <div className="item-bg">
                        <div className="device-list pt-2">
                            <div className="playlist-list">
                                <div className="text-center">
                                    <span className="list-title ">Play List</span>
                                </div>
                                <div>
                                    {
                                        listDataDash?.playlist?.length > 0 && listDataDash?.playlist?.map((item, index) => {
                                            return <div key={index} className="wrap-playlist-item"
                                                        onClick={()=>history.push(`/edit-playlist/${item?.playListId}`)}
                                            >
                                                <div className={`playlist-item ${listDataDash?.playlist?.length >= 2 && index < listDataDash?.playlist?.length - 1 ? "playlist-item-line":""}`}>
                                                    <span>{item?.playListName}</span>
                                                </div>
                                            </div>

                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="schedule-list pt-2">
                            <div className="text-center">
                                <span className="list-title ">Schedule List</span>
                            </div>
                            {
                                listDataDash?.schedule?.length > 0 && listDataDash?.schedule?.map((item, index) => {
                                    return <div key={index} className="wrap-schedule-item "
                                                onClick={() => history.push({pathname: "/schedule-edit", search:`?key=${item?.scheduleId}`})}>
                                        <div className={`schedule-item ${listDataDash?.schedule?.length >= 2 && index < listDataDash?.schedule?.length - 1 ? "schedule-item-line":""}`}>
                                            <span>{item?.scheduleName}</span>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    listDeviceCalendar.map((deviceCalendar) => {
                        // console.log(deviceCalendar,'deviceCalendar====')
                        return <>
                            <div className="device-row d-flex">
                            {
                                deviceCalendar.calendar.map((calendar, index) => {
                                    const prevCalendar = deviceCalendar.calendar[index - 1]
                                    const nextCalendar = deviceCalendar.calendar[index + 1]

                                    const hasSchedule = (calendar) => {
                                        if (!calendar) return
                                        return calendar.listSchedule.length != 0
                                    }

                                    const isStartDay = (() => {
                                        if (calendar.day.date() == 1) return true
                                        if (!hasSchedule(prevCalendar)) return true
                                        return false
                                    })()

                                    const isEndDay = (() => {
                                        if (calendar.day.date() == totalDayInMonth) return true
                                        if (!hasSchedule(nextCalendar)) return true
                                        return false
                                    })()

                                    const activeColor = (() => {
                                        const currentDay = moment()
                                        if (currentDay.isSame(calendar.day, 'day')) return "#00B2CA"
                                        if (currentDay.isAfter(calendar.day)) return "#E15554"
                                        if (currentDay.isBefore(calendar.day)) return "#707070"
                                    })();

                                    return <span
                                        id="day-schedule"
                                        key={calendar.day.format('YYYY-MM-DD')}
                                        style={{borderColor: hasSchedule(calendar) && !isEndDay && activeColor}}
                                        className={`day`}
                                        onContextMenu={()=>onContextMenu(deviceCalendar, event)}
                                        data-index-number={deviceCalendar?.device?.deviceId}
                                        // data-original={deviceCalendar}
                                        onClick={() => {
                                            if (hasSchedule(calendar)) {
                                                // console.log(deviceCalendar,"deviceCalendar======aaaa");
                                                history.push(`/timeline-time/?deviceId=${deviceCalendar.device.deviceId}&activeDay=${calendar.day.format("YYYY-MM-DD")}`)
                                            }
                                        }}
                                    >
                                        {
                                            hasSchedule(calendar) &&
                                            <div className={`
                                                ${isStartDay && "start-day"}
                                                ${isEndDay && "end-day"}
                                                active-day`}
                                                 style={{backgroundColor: activeColor}}
                                            >
                                            </div>
                                        }
                                    </span>
                                })
                            }
                        </div>
                    </>
                    })
                }
            </div>
        </>
    )
};

export default Calendar