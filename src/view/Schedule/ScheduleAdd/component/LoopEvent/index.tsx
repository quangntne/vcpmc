import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { useMemo } from "react";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export interface IEvent {
  title: string;
  id: string | number;
  parent_id?: string | number;
  start?: Date;
  end?: Date;
  time_start: string;
  time_end: string;
  loop: number[];
  resourceId?: string;
  date_start: string;
  date_end: string;
}

interface ILoopEvent {
  arrEvents: IEvent[];
  onEventDrop: (index:number,event: any) => boolean;
  onDropFromOutside: (event: any) => void;
  onSelectEvent: (event: any) => void;
  onCloseEvent: (index:number) => void;
  schedule:{ startDate?: string; endDate?: string }|undefined;
}

const rand = () => {
  return Math.floor(Math.random() * 10000) + 1;
};
const now=moment().format("YYYYMMDD")

const header=(props)=>{
  
  const common = useTranslate('common')
  const {localizer, date}= props;
  const header = useMemo(()=>{
    const time=localizer.format(date, 'weekdayFormat');
    return common[time]||time;
  },[localizer,date,common])
  const today = useMemo(()=>{
    return moment(date).format("YYYYMMDD")==now;
  },[date])
  return <>
  <span className={'label-header'} style={{color: today?"#7879F1":"#ffac69"}}>{header}</span><br/>
  {today&&<span className={'label-header-today'}>{common.TODAY}</span>}
  </>
}


const eventTimeRangeFormat=({start,end}:{start:Date,end:Date})=>{
  const __start=moment(start);
  const __end = moment(end);
  return __start.format("HH:mm:ss")+" - "+ __end.format("HH:mm:ss");
}

const overlap=(e1:IEvent,e2:IEvent)=>{
  if(e1.start!=null && e1.start>= e2.start && e1.start<=e2.end){ // 1-4 || 0->3 === 1->4 || 0->5
    return true;
  }

  if(e1.end !=null && e1.end >=e2.start && e1.end<=e2.end){ // 1-4|| 2->5
    return true;
  }

  if(e1.start!=null && e1.end!=null && e1.start<= e2.start && e2.end<=e1.end){ // 1->4 || 2->3
    return true;
  }

  return false;
}

const list_overlap= (events:IEvent[], event:IEvent, ignore:number=-1)=>{
  return events.some((e:IEvent,index)=>ignore!=index && overlap(event,e))
}

const LoopEvent = (props: ILoopEvent) => {
  const { arrEvents,schedule } = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const _arrEvents = arrEvents.reduce((p: IEvent[], e: IEvent) => {
      const moment_start = moment(e.date_start + " " + e.time_start);
      const moment_end = moment(e.date_end + " " + e.time_end);
      const week_day = moment_start.isoWeekday();
      const __events = e.loop.map((l) => {
        const m_date_start = moment_start.clone().add(l - week_day, "days");
        const m_date_end = moment_end.clone().add(l - week_day, "days");
        const start = m_date_start.toDate();
        const end = m_date_end.toDate();
        const date_start= m_date_start.format("YYYY-MM-DD")
        return {
          ...e,
          start,
          end,
          date_start,
          parent_id:e.id,
          id:rand()
        };
      });
      p.push(...__events)
      return p;
    }, []);
    setEvents(_arrEvents)
  }, [arrEvents]);

  const _onSelectEvent=(event)=>{
    const index=arrEvents.findIndex(ee=>ee.id==event.parent_id);
    if(index>=0){
      props.onSelectEvent&&props.onSelectEvent(arrEvents[index]);
    }
  }

  const onEventDrop=(value)=>{
    const str_date_start= moment(value.start).format("YYYY-MM-DD");
    if(value.event.loop.length>1 && str_date_start!=value.event.date_start){
      return;
    }
    
    const __index= events.findIndex(ee=>ee.id==value.event.id)
    if(__index<0){
      return;
    }
    const tempEvent={...value.event,start:value.start,end:value.end};
    if(list_overlap(events,tempEvent,__index)){
      return;
    }
    const index=arrEvents.findIndex(ee=>ee.id==value.event.parent_id);
    if(index>=0){
      if(!props.onEventDrop(index,value)){
        return;
      }
    }
    const __events=[...events];
    __events[__index]=tempEvent
    setEvents(__events);
  }

  const _onCloseEvent=(event:IEvent)=>{
    const index=arrEvents.findIndex(ee=>ee.id==event.parent_id);
    if(index>=0){
      props.onCloseEvent&&props.onCloseEvent(index);
    }
  }

  return (
    <DnDCalendar
      onDropFromOutside={props.onDropFromOutside}
      views={['week']}
      components={{week:{header}}}
      onEventDrop={onEventDrop}
      onSelectEvent={_onSelectEvent}
      onCloseEvent={_onCloseEvent}
      events={events}
      localizer={localizer}
      defaultView="week"
      culture={"vi"}
      resizable={false}
      toolbar={false}
      formats={{eventTimeRangeFormat}}
      selectable
      step={10}
      dayLayoutAlgorithm={'no-overlap'}
    />
  );
};

export default LoopEvent;
