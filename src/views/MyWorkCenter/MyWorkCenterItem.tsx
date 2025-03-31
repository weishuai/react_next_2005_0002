import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
import { Image } from 'primereact/image';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { UserController } from '../../controllers/UserController';

import { MyWorkCenterController } from '../../controllers/myworkCenterController';
import { globalStorage } from '../../utils/Globalstorage';


const { nanoid } = require('nanoid');
export type MyWorkCenterItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function MyWorkCenterItem({ Id, Mode }: MyWorkCenterItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <MyWorkCenterItemAdd  Id={Id} Mode={Mode}/>;
    }
    else if(Mode == '1')
    {
      return <MyWorkCenterItemEdit Id={Id} Mode={Mode} />;
    }
    else if(Mode == '2')
    {
      return <MyWorkCenterItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <MyWorkCenterItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const MyWorkCenterItemAdd =({ Id, Mode }: MyWorkCenterItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[workcenter, setworkcenter] = useState(null);
  const[code, setcode] = useState(null);
  const[title, settitle] = useState(null);
  const[workingHours, setworkingHours] = useState(null);
  const[fhreplace, setfhreplace] = useState(null);
  const[timeEfficiency, settimeEfficiency] = useState(null);
  const[capacity, setcapacity] = useState(null);
  const[oee, setoee] = useState(null);
  const[setTime, setsetTime] = useState(null);
  const[cleaningTime, setcleaningTime] = useState(null);
  const[hourlyCost, sethourlyCost] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlMyWorkCenter=new MyWorkCenterController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    const FHnans = [
      { name: 'Ok', code: '0' },
      { name: 'No', code: '1' },
    ];

    const fhitems = [
      { name: 'Ok', code: '0' },
      { name: 'No', code: '1' },
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
                    <label htmlFor="firstname1">{t("myworkCenter.workcenter")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="workcenter"
                    value={workcenter}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setworkcenter(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("myworkCenter.code")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="code"
                    value={code}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("myworkCenter.title")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="title"
                          value={title}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settitle(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.workingHours")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="workingHours"
                          value={workingHours}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setworkingHours(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.fhreplace")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="fhreplace"
                        value={fhreplace}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setfhreplace(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.timeEfficiency")}</label>
                          <div style={{height:10}}> </div>
                          <Calendar 
                          id="timeEfficiency"
                          value={timeEfficiency}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settimeEfficiency(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.capacity")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="capacity"
                        value={capacity}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setcapacity(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("myworkCenter.oee")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="oee"
                    value={oee}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setoee(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.setTime")}</label>
                        <div style={{height:10}}> </div>
                        <InputNumber 
                        id="setTime"
                        value={setTime}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setsetTime(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.cleaningTime")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="cleaningTime"
                          value={cleaningTime}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcleaningTime(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("myworkCenter.hourlyCost")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="hourlyCost"
                          value={hourlyCost}
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           sethourlyCost(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
                    <td  width="46%">
        
                    </td>
                    </tr> 


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.isactived")}</label>
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
                }}  placeholder={t("myworkCenter.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.islocked")}</label>
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
                }}  placeholder={t("myworkCenter.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}

                  placeholder={t("myworkCenter.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("myworkCenter.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}

                  placeholder={t("myworkCenter.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("myworkCenter.createUid")}</label>
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
                }}  placeholder={t("myworkCenter.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.updatedUid")}</label>
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
                }}  placeholder={t("myworkCenter.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/myworkcenter");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => {
                      ctlMyWorkCenter.createMyWorkCenter({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,
                      });
                      push("/myworkcenter");
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

export const MyWorkCenterItemEdit =({ Id, Mode }: MyWorkCenterItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[workcenter, setworkcenter] = useState(null);
  const[code, setcode] = useState(null);
  const[title, settitle] = useState(null);
  const[workingHours, setworkingHours] = useState(null);
  const[fhreplace, setfhreplace] = useState(null);
  const[timeEfficiency, settimeEfficiency] = useState(null);
  const[capacity, setcapacity] = useState(null);
  const[oee, setoee] = useState(null);
  const[setTime, setsetTime] = useState(null);
  const[cleaningTime, setcleaningTime] = useState(null);
  const[hourlyCost, sethourlyCost] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlMyWorkCenter=new MyWorkCenterController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }


    const fhitems = [
      { name: 'Ok', code: '0' },
      { name: 'No', code: '1' },
    ];

    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setUpdatedUid(userID);
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlMyWorkCenter.getMyWorkCenterById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("myworkCenter.workcenter")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="workcenter"
                    value={workcenter}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setworkcenter(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("myworkCenter.code")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="code"
                    value={code}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("myworkCenter.title")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="title"
                          value={title}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settitle(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.workingHours")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="workingHours"
                          value={workingHours}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setworkingHours(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.fhreplace")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="fhreplace"
                        value={fhreplace}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setfhreplace(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.timeEfficiency")}</label>
                          <div style={{height:10}}> </div>
                          <Calendar 
                          id="timeEfficiency"
                          value={timeEfficiency}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settimeEfficiency(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.capacity")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="capacity"
                        value={capacity}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setcapacity(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("myworkCenter.oee")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="oee"
                    value={oee}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setoee(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.setTime")}</label>
                        <div style={{height:10}}> </div>
                        <InputNumber 
                        id="setTime"
                        value={setTime}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setsetTime(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.cleaningTime")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="cleaningTime"
                          value={cleaningTime}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcleaningTime(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("myworkCenter.hourlyCost")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="hourlyCost"
                          value={hourlyCost}
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           sethourlyCost(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
                    <td  width="46%">
        
                    </td>
                    </tr> 


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.isactived")}</label>
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
                }}  placeholder={t("myworkCenter.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.islocked")}</label>
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
                }}  placeholder={t("myworkCenter.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("myworkCenter.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("myworkCenter.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("myworkCenter.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("myworkCenter.createUid")}</label>
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
                }}  placeholder={t("myworkCenter.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.updatedUid")}</label>
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
                }}  placeholder={t("myworkCenter.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/myworkcenter");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlMyWorkCenter.updateMyWorkCenterv2({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,
                      },Id,userID);
                      push("/myworkcenter");
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


export const MyWorkCenterItemView =({ Id, Mode }: MyWorkCenterItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[workcenter, setworkcenter] = useState(null);
  const[code, setcode] = useState(null);
  const[title, settitle] = useState(null);
  const[workingHours, setworkingHours] = useState(null);
  const[fhreplace, setfhreplace] = useState(null);
  const[timeEfficiency, settimeEfficiency] = useState(null);
  const[capacity, setcapacity] = useState(null);
  const[oee, setoee] = useState(null);
  const[setTime, setsetTime] = useState(null);
  const[cleaningTime, setcleaningTime] = useState(null);
  const[hourlyCost, sethourlyCost] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlMyWorkCenter=new MyWorkCenterController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }


    const fhitems = [
      { name: 'Ok', code: '0' },
      { name: 'No', code: '1' },
    ];

    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);


      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlMyWorkCenter.getMyWorkCenterById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("myworkCenter.workcenter")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="workcenter"
                    value={workcenter}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setworkcenter(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("myworkCenter.code")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="code"
                    value={code}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("myworkCenter.title")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="title"
                          value={title}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settitle(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.workingHours")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="workingHours"
                          value={workingHours}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setworkingHours(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.fhreplace")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="fhreplace"
                        value={fhreplace}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setfhreplace(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.timeEfficiency")}</label>
                          <div style={{height:10}}> </div>
                          <Calendar 
                          id="timeEfficiency"
                          value={timeEfficiency}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settimeEfficiency(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.capacity")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="capacity"
                        value={capacity}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setcapacity(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("myworkCenter.oee")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="oee"
                    value={oee}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setoee(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("myworkCenter.setTime")}</label>
                        <div style={{height:10}}> </div>
                        <InputNumber 
                        id="setTime"
                        value={setTime}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setsetTime(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("myworkCenter.cleaningTime")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="cleaningTime"
                          value={cleaningTime}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcleaningTime(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("myworkCenter.hourlyCost")}</label>
                          <div style={{height:10}}> </div>
                          <InputNumber 
                          id="hourlyCost"
                          value={hourlyCost}
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           sethourlyCost(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
                    <td  width="46%">
        
                    </td>
                    </tr> 

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.isactived")}</label>
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
                }}  placeholder={t("myworkCenter.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.islocked")}</label>
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
                }}  placeholder={t("myworkCenter.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("myworkCenter.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("myworkCenter.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("myworkCenter.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("myworkCenter.createUid")}</label>
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
                }}  placeholder={t("myworkCenter.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("myworkCenter.updatedUid")}</label>
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
                }}  placeholder={t("myworkCenter.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/myworkcenter");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/myworkcenter");}}
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

