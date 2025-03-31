import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { ToggleButton } from 'primereact/togglebutton';
import { TabView, TabPanel } from 'primereact/tabview';
import { Image } from 'primereact/image';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { UserController } from '../../controllers/UserController';
import { ActivityController } from '../../controllers/ActivityController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
const { nanoid } = require('nanoid');
export type ActivityItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function ActivityItem({ Id, Mode }: ActivityItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <ActivityItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <ActivityItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <ActivityItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <ActivityItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const ActivityItemAdd =({ Id, Mode }: ActivityItemProps) => {
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
  const { pathname, push,replace } = useRouter(); 
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
    }, []);
  
  return (
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
                <Button label="取消" onClick={(e) => {replace("/activity");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlActivity.createActivity({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,  
                        subject:subject,
                        types:types,
                        starts:starts,
                        ends:ends,
                        allDayEvent:allDayEvent,
                        attendees1:attendees1,
                        attendees2:attendees2,
                        relatedType:relatedType,
                        relatedTo:relatedTo,
                        eventType:eventType,
                        location:location,
                        collaborate1:collaborate1,
                        collaborate2:collaborate2,
                        priority:priority,
                        status:status,
                        attachment:attachment,
                        emailTo:emailTo,
                        cc:cc,
                        sendMine:sendMine,
                        contact:contact,
                        senderNumber:senderNumber,
                        receiverNumber:receiverNumber,                        
                      });
                      replace("/activity");
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
  );
};

export const ActivityItemEdit =({ Id, Mode }: ActivityItemProps) => {
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
  ///const[caller, setcaller] = useState(null);
  const[senderNumber, setsenderNumber] = useState("");
  const[receiverNumber, setreceiverNumber] = useState("");

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
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

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlActivity.getActivityById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setdDescription(data.description);
            setFHid(data.id);
            settypes(data.types);
            setsubject(data.subject);
            setstarts(new Date(data.starts));
            setends(new Date(data.ends));
            setallDayEvent(data.allDayEvent);
            setattendees1(data.attendees1);
            setattendees2(data.attendees2);
            setrelatedType(data.relatedType);
            setrelatedTo(data.relatedTo);
            seteventType(data.eventType);
            setlocation(data.location);
            setcollaborate1(data.collaborate1);
            setcollaborate2(data.collaborate2);
            setpriority(data.priority);
            setstatus(data.status);
            setattachment(data.attachment);
            setemailTo(data.emailTo);
            setcc(data.cc);
            setsendMine(data.sendMine);
            setcontact(data.contact);
            setsenderNumber(data.senderNumber);
            setreceiverNumber(data.receiverNumber);           
          });
      });
    }, []);
  
  return (
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
                    onChange={(e:any)=>{
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
                     ///setcaller(e.value);
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
                <Button label="取消" onClick={(e) => {replace("/activity");}} style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      const fhnew=new Date();
                      const userID=globalStorage.get("userID");
                      console.log('userID:'+userID);
                      ctlActivity.updateActivityv2({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,
                        subject:subject,
                        types:types,
                        starts:starts,
                        ends:ends,
                        allDayEvent:allDayEvent,
                        attendees1:attendees1,
                        attendees2:attendees2,
                        relatedType:relatedType,
                        relatedTo:relatedTo,
                        eventType:eventType,
                        location:location,
                        collaborate1:collaborate1,
                        collaborate2:collaborate2,
                        priority:priority,
                        status:status,
                        attachment:attachment,
                        emailTo:emailTo,
                        cc:cc,
                        sendMine:sendMine,
                        contact:contact,
                        senderNumber:senderNumber,
                        receiverNumber:receiverNumber,
                      },Id,userID);
                      replace("/activity");
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
  );
};


export const ActivityItemView =({ Id, Mode }: ActivityItemProps) => {
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
  const[subject, setsubject] = useState("");
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
  ///const[caller, setcaller] = useState(null);
  const[senderNumber, setsenderNumber] = useState("");
  const[receiverNumber, setreceiverNumber] = useState("");

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
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

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlActivity.getActivityById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setdDescription(data.description);
            setFHid(data.id);
            settypes(data.types);
            setsubject(data.subject);

            setstarts(new Date(data.starts));
            setends(new Date(data.ends));

            setallDayEvent(data.allDayEvent);
            setattendees1(data.attendees1);
            setattendees2(data.attendees2);
            setrelatedType(data.relatedType);
            setrelatedTo(data.relatedTo);
            seteventType(data.eventType);
            setlocation(data.location);
            setcollaborate1(data.collaborate1);
            setcollaborate2(data.collaborate2);
            setpriority(data.priority);
            setstatus(data.status);
            setattachment(data.attachment);
            setemailTo(data.emailTo);
            setcc(data.cc);
            setsendMine(data.sendMine);
            setcontact(data.contact);
            setsenderNumber(data.senderNumber);
            setreceiverNumber(data.receiverNumber);
          });
      });
    }, []);
  
  return (
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
                <Button label="取消" onClick={(e) => {replace("/activity");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/activity");}}
                    style={{backgroundColor:'#4682B4'}}
                  />
                </div>
          </td>
          </tr>
          </tbody>
          </table>
      </div>
    </Card>
  );
};
