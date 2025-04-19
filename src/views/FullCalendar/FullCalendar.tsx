import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next'
// import '@fullcalendar/common/main.css'
// import '@fullcalendar/daygrid/main.css'
// import '@fullcalendar/timegrid/main.css'
import FullCalendar from '@fullcalendar/react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { Calendar } from 'primereact/calendar';

import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { UserController } from '../../controllers/UserController';
import { ActivityController } from '../../controllers/ActivityController';

import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
import interactionPlugin from '@fullcalendar/interaction'
import daygridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { globalStorage } from '../../utils/Globalstorage';
const { nanoid } = require('nanoid');
const FHFullCalendar=() => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDialog, setEventDialog] = useState<boolean>(false);
  const [add_eventDialog, setadd_EventDialog] = useState<boolean>(false);
  let fhlocaleok= "zh-cn";
  let buttonText={today: '今天',month: '月',week: '周', day: '日'}
  const fhlocale=globalStorage.get("locale")
  const [changedEvent, setChangedEvent] = useState<any>({ id: 0, title: '', start: null, end: null, allDay: null, fhtype: '' });
  const [clickedEvent, setClickedEvent] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState<null | string | Date | Date[]>(null);
  const [updatedAt, setUpdatedAt] = useState<null | string | Date | Date[]>(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[types, settypes] = useState(null);
  const[subject, setsubject] =useState("");
  const[starts, setstarts] = useState<string | Date | Date[] | null>(null);
  const[ends, setends] = useState<string | Date | Date[] | null>(null);
  const[allDayEvent, setallDayEvent] = useState(null);
  const[attendees1, setattendees1] = useState(null);
  const[attendees2, setattendees2] = useState(null);
  const[relatedType, setrelatedType] = useState(null);
  const[relatedTo, setrelatedTo] = useState(null);
  const[eventType, seteventType] = useState(null);
  const[location, setlocation] = useState("");
  const[collaborate1, setcollaborate1] = useState("");
  const[collaborate2, setcollaborate2] = useState("");
  const[priority, setpriority] = useState(null);
  const[status, setstatus] = useState(null);
  const[attachment, setattachment] = useState("");
  const[emailTo, setemailTo] = useState("");
  const[cc, setcc] = useState("");
  const[sendMine, setsendMine] = useState(null);
  const[contact, setcontact] = useState(null);
  const[senderNumber, setsenderNumber] = useState("");
  const[receiverNumber, setreceiverNumber] = useState("");
  const [FHUsers, setFHUsers] = useState([]);
  const { push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlActivity=new ActivityController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    
    const items = [
      {label: '草稿'},
      {label: '提交'},
      {label: '驳回'},
      {label: '通过'}
  ];
    const fhitems = [
      { name: '是', code: '0' },
      { name: '否', code: '1' },
    ];
 
    const fhTypesItems = [
      { name: 'Event', code: '0' },
      { name: 'Task', code: '1' },
      { name: 'Note', code: '2' },
      { name: 'Email', code: '3' },
      { name: 'Call Log', code: '4' },
      { name: 'SMS', code: '5' },
    ];
    const fhAllDayEventItems = [
      { name: 'Yes', code: '0' },
      { name: 'No', code: '1' },
    ];
    const fhPriorityItems = [
      { name: '0', code: '0' },
      { name: '1', code: '1' },
      { name: '2', code: '2' },
      { name: '3', code: '3' },
      { name: '4', code: '4' },
      { name: '5', code: '5' },
    ];
    
    
    const fhStatusItems = [
      { name: 'Track', code: '0' },
      { name: 'Stop it', code: '1' },
    ];


    const fhSendMineItems = [
      { name: 'Yes', code: '0' },
      { name: 'No', code: '1' },
    ];

    const fhrelatedTypeItems = [
      { name: 'None', code: '0' },
      { name: 'Lead', code: '1' },
      { name: 'Account', code: '2' },
      { name: 'Contact', code: '3' },
      { name: 'Opportunity', code: '4' },
      { name: 'Quotation', code: '5' },
      { name: 'Invoice', code: '6' },
      { name: 'Contract', code: '7' },     
    ];


    useEffect(() => {
      const fhnew=new Date();
      setCreateAt(fhnew);
      setUpdatedAt(fhnew);

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      const nanoidstr: string = nanoid();
      setFHid(nanoidstr.substring(0, 10));

      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
      });
      // setsubject("1009");
    }, []);
  
    useEffect(() => {
      //加载数据写出代码段
      if(selectedEvent!=null)
      {
        setsubject(selectedEvent.id);
      }
     
    }, [selectedEvent]);


  if(fhlocale=="cn")
  {
   fhlocaleok= "zh-cn";
   //fhlocaleok= "zh-cn";
   buttonText={today: '今天',month: '月',week: '周', day: '日'}
  }
  else
  {
    fhlocaleok= "en";
    buttonText={today: 'today',month: 'month',week: 'wee', day: 'day'}
  }
  const events = [
    {
      id: 'Event1',
      title: '工作安排001',
      start: '2025-04-25'
    },
    {
      id: 'Event2',
      title: '工作安排002',
      start: '2025-04-26'
    }];

    const handleEventClick = (clickInfo) => {
      setSelectedEvent(clickInfo.event);
      console.log('clickInfo.event:' +clickInfo.event.id);
      setEventDialog(true);
      console.log('data:'+JSON.stringify(selectedEvent));
      // if(selectedEvent!=null)
      // {
      //   setsubject(selectedEvent.id);
      // }

      //setsubject("8009");
    };

    const setUrl = () => {
      setEventDialog(true);
      //setChangedEvent({ id: 0, title: '', start: null, end: '', allDay: null, fhtype: '' });
      setSelectedEvent({ id: 0, title: '无', start: null, end: '', allDay: null});
    };
    // const save = () => {
    //   setEventDialog(false);
    //   console.log('data:'+JSON.stringify(selectedEvent));
    //   // clickedEvent.setId(changedEvent.id);
    //   // clickedEvent.setProp('title', changedEvent.title);
    //   // clickedEvent.setStart(changedEvent.start);
    //   // clickedEvent.setEnd(changedEvent.end);
    //   // clickedEvent.setAllDay(changedEvent.allDay);
    //   // //clickedEvent.setfhtypey(changedEvent.fhtype);
    //   // clickedEvent.setProp('fhtype', changedEvent.fhtype);
  
    //  // setChangedEvent({ id: 0, title: '', start: null, end: '', allDay: null, fhtype: '' });
    // };
  
    // const reset = () => {
    //   // const { id, title, start, end, allDay, fhtype } = clickedEvent;
    //   // setChangedEvent({ id, title, start, end, allDay: null, fhtype });
    // };


    return(<>
    <Button type="button" label="新增" icon="pi pi-plus" className="p-button p-component p-button-success p-mr-2 p-mb-2" onClick={setUrl} />
    <div style={{ width: '800px',height: "5px" }}></div>
    
    <FullCalendar
        plugins={[daygridPlugin,interactionPlugin, timeGridPlugin]}
        locale= {fhlocaleok}
        buttonText={buttonText}
        headerToolbar={{
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        allDaySlot={false}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={true}
        events={events}
        eventClick={handleEventClick}
        initialEvents={[
          { title: 'nice event',id:"111", start: new Date() }
        ]}
      />


     <Dialog visible={eventDialog} style={{ width: '1000px',height: "550px" }} header="日历详细" modal closable onHide={() => setEventDialog(false)}>
      {/* <Button type="button" label="保存" icon="pi pi-check" className="p-button-text" onClick={save} />
      <Button type="button" label="取消" icon="pi pi-refresh" className="p-button-text" onClick={reset} /> */}
      
      {/* {selectedEvent ? (
              <div>ID-{selectedEvent.id}/-{selectedEvent.title}</div>
            ) : (
              <div>数据暂无</div>
            )} */}
  <Card>     
      <div className="p-fluid p-formgrid p-grid">
      
      <table width="98%">
      <thead>
      </thead>
      <tbody>


  
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.subject")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="subject"
                    value={subject}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsubject(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.types")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="types"
                    options={fhTypesItems} 
                    value={types}
                    optionLabel="name" 
                    optionValue="code"                   
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settypes(e.value);
                    }}
                    />


                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.starts")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="starts"
                    value={starts}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstarts(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("activity.ends")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      id="ends"
                      value={ends}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setends(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.allDayEvent")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="allDayEvent"
                    value={allDayEvent}
                    options={fhAllDayEventItems} 
                    optionLabel="name" 
                    optionValue="code"  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setallDayEvent(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("activity.attendees1")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="attendees1"
                      value={attendees1}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"                     
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setattendees1(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.attendees2")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="attendees2"
                    value={attendees2}
                    options={FHUsers} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setattendees2(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("activity.relatedType")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="relatedType"
                      value={relatedType}
                      options={fhrelatedTypeItems} 
                      optionLabel="name" 
                      optionValue="code"                      
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setrelatedType(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  colSpan={4}>
                    <div className="p-field">
                    <label htmlFor="firstname1">{t("activity.relatedTo")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="relatedTo"
                    value={relatedTo}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setrelatedTo(e.value);
                    }}
                    />
                    </div>
              </td>
 
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.location")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="location"
                    value={location}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlocation(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("activity.collaborate1")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="collaborate1"
                    value={collaborate1}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcollaborate1(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.collaborate2")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="collaborate2"
                    value={collaborate2}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcollaborate2(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("activity.priority")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="priority"
                      value={priority}
                      options={fhPriorityItems} 
                      optionLabel="name" 
                      optionValue="code"                     
                      
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setpriority(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.status")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="status"
                    options={fhStatusItems} 
                    optionLabel="name" 
                    optionValue="code"
                    value={status}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstatus(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("activity.attachment")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="attachment"
                    value={attachment}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setattachment(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.emailTo")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="emailTo"
                    value={emailTo}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemailTo(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("activity.cc")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="cc"
                    value={cc}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcc(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.sendMine")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="sendMine"
                    value={sendMine}
                    options={fhSendMineItems} 
                    optionLabel="name" 
                    optionValue="code"                     
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsendMine(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("activity.contact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="contact"
                      value={contact}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcontact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("activity.caller")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="caller"
                    options={FHUsers} 
                    optionLabel="name" 
                    optionValue="code"
                   /// value={caller}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                    /// setcaller(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("activity.senderNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="senderNumber"
                    value={senderNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsenderNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>

          <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="firstname1">{t("activity.receiverNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="receiverNumber"
                    value={receiverNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setreceiverNumber(e.target.value);
                    }}
                    />
                </div>
          </td>
          </tr>



          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("activity.isactived")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("activity.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("activity.islocked")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("activity.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("activity.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("activity.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("activity.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("activity.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("activity.createUid")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("activity.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("activity.updatedUid")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("activity.updatedUid")} />
               </div>  
          </td>
          </tr>



          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {
                  //replace("/activity");
                  setEventDialog(false);
                  }}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      setEventDialog(false);
                      console.info('e.value:'+JSON.stringify(selectedEvent));
                    }}
                    style={{backgroundColor:'#4682B4'}}
                  />
                </div>
          </td>
          </tr>
          </tbody>
          </table>
      </div>
  </Card>                    
     </Dialog>  
      </>  
    )
}

export default FHFullCalendar;