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
import { Image } from 'primereact/image';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { UserController } from '../../controllers/UserController';
import { MonthlyGoalController } from '../../controllers/MonthlyGoalController';
import { globalStorage } from '../../utils/Globalstorage';
const { nanoid } = require('nanoid');
export type ItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function Item({ Id, Mode }: ItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <ItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <ItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <ItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <ItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const ItemAdd =({ Id, Mode }: ItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const [targetNumber, settargetNumber] = useState("");
  const [type, settype] = useState("");
  const [personalId, setpersonalId] = useState("");
  const [byType, setbyType] = useState("");



  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlmain=new MonthlyGoalController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    

    const fhitems = [
      { name: '是', code: '0' },
      { name: '否', code: '1' },
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
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("AccountTag.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="targetNumber" 
                value={targetNumber}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 settargetNumber(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("AccountTag.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="type"
                value={type}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 settype(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>

          <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("AccountTag.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="personalId" 
                value={personalId}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setpersonalId(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("AccountTag.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="byType"
                value={byType}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setbyType(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.isactived")}</label>
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
                }}  placeholder={t("AccountTag.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.islocked")}</label>
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
                }}  placeholder={t("AccountTag.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("AccountTag.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("AccountTag.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("AccountTag.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("AccountTag.createUid")}</label>
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
                }}  placeholder={t("AccountTag.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.updatedUid")}</label>
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
                }}  placeholder={t("AccountTag.updatedUid")} />
               </div>  
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/monthlyGoal");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>

                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlmain.create({
                        id:FHid,
                        targetNumber:targetNumber,
                        type:type,
                        personalId:personalId,
                        byType:byType,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,                        
                      });
                      push("/monthlyGoal");
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

export const ItemEdit =({ Id, Mode }: ItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const [targetNumber, settargetNumber] = useState("");
  const [type, settype] = useState("");
  const [personalId, setpersonalId] = useState("");
  const [byType, setbyType] = useState("");

  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlmain=new MonthlyGoalController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }


    const fhitems = [
      { name: '是', code: '0' },
      { name: '否', code: '1' },
    ];
 
    useEffect(() => {
      /*
      const fhnew=new Date();
      setCreateAt(fhnew);
      setUpdatedAt(fhnew);
      */
      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      //setCreateUid(userID);
      setUpdatedUid(userID);
      /*
      const nanoidstr: string = nanoid();
      setFHid(nanoidstr.substring(0, 10));
      */
      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
        ctlmain.getById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            settargetNumber(data.targetNumber);
            settype(data.type);
            setpersonalId(data.personalId);
            setbyType(data.byType); 
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
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("AccountTag.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="targetNumber" 
                value={targetNumber}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 settargetNumber(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("AccountTag.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="type"
                value={type}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 settype(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>

          <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("AccountTag.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="personalId" 
                value={personalId}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setpersonalId(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("AccountTag.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="byType"
                value={byType}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setbyType(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>
          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.isactived")}</label>
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
                }}  placeholder={t("AccountTag.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.islocked")}</label>
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
                }}  placeholder={t("AccountTag.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("AccountTag.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("AccountTag.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("AccountTag.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("AccountTag.createUid")}</label>
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
                }}  placeholder={t("AccountTag.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.updatedUid")}</label>
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
                }}  placeholder={t("AccountTag.updatedUid")} />
               </div>  
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/monthlyGoal");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlmain.update({
                        id:FHid,
                        targetNumber:targetNumber,
                        type:type,
                        personalId:personalId,
                        byType:byType,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,                        
                      },Id,userID);
                      push("/monthlyGoal");
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


export const ItemView =({ Id, Mode }: ItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const [targetNumber, settargetNumber] = useState("");
  const [type, settype] = useState("");
  const [personalId, setpersonalId] = useState("");
  const [byType, setbyType] = useState("");

  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlmain=new MonthlyGoalController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    

    const fhitems = [
      { name: '是', code: '0' },
      { name: '否', code: '1' },
    ];
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
        ctlmain.getById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            settargetNumber(data.targetNumber);
            settype(data.type);
            setpersonalId(data.personalId);
            setbyType(data.byType);     
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
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("AccountTag.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="targetNumber" 
                value={targetNumber}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 settargetNumber(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("AccountTag.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="type"
                value={type}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 settype(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>

          <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("AccountTag.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="personalId" 
                value={personalId}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setpersonalId(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("AccountTag.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="byType"
                value={byType}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setbyType(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>
          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.isactived")}</label>
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
                }}  placeholder={t("AccountTag.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.islocked")}</label>
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
                }}  placeholder={t("AccountTag.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("AccountTag.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("AccountTag.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("AccountTag.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("AccountTag.createUid")}</label>
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
                }}  placeholder={t("AccountTag.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("AccountTag.updatedUid")}</label>
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
                }}  placeholder={t("AccountTag.updatedUid")} />
               </div>  
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/monthlyGoal");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/monthlyGoal");}}
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

