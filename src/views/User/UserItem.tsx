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
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
const { nanoid } = require('nanoid');
export type UserItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function UserItem({ Id, Mode }: UserItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <UserItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <UserItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <UserItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <UserItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const UserItemAdd =({ Id, Mode }: UserItemProps) => {
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
  const[email, setemail] = useState("");
  const[userName, setuserName] = useState("");
  const[app, setapp] = useState("");
  const[timezone, settimezone] = useState("");
  const[mobileCountryCode, setmobileCountryCode] = useState("");
  const[mobileCallingCountryCode, setmobileCallingCountryCode] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[avatar, setavatar] = useState("");
  const[isLocked, setisLocked] = useState("");
  const[createdAt, setcreatedAt] = useState("");
  const[lastSignIn, setlastSignIn] = useState("");
  const[hasPassword, sethasPassword] = useState("");
  const[password, setpassword] = useState("");

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlUser=new UserController();
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
                    <label htmlFor="firstname1">{t("user.email")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="email"
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.userName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="userName"
                    value={userName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setuserName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.app")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="app"
                    value={app}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setapp(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.timezone")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="timezone"
                    value={timezone}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settimezone(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.mobileCountryCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileCountryCode"
                    value={mobileCountryCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileCountryCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.mobileCallingCountryCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileCallingCountryCode"
                    value={mobileCallingCountryCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileCallingCountryCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.mobileNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.avatar")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="avatar"
                    value={avatar}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setavatar(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.isLocked")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="isLocked"
                    value={isLocked}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setisLocked(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.createdAt")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="createdAt"
                    value={createdAt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcreatedAt(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.lastSignIn")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="lastSignIn"
                    value={lastSignIn}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlastSignIn(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.hasPassword")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="hasPassword"
                    value={hasPassword}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     sethasPassword(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                   <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.password")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="password"
                    value={password}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpassword(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
              <td  width="46%">
                
              </td>
              </tr> 



          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/user");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlUser.createUser({
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
                      replace("/user");
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

export const UserItemEdit =({ Id, Mode }: UserItemProps) => {
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
  const[email, setemail] = useState("");
  const[userName, setuserName] = useState("");
  const[app, setapp] = useState("");
  const[timezone, settimezone] = useState("");
  const[mobileCountryCode, setmobileCountryCode] = useState("");
  const[mobileCallingCountryCode, setmobileCallingCountryCode] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[avatar, setavatar] = useState("");
  const[isLocked, setisLocked] = useState("");
  const[createdAt, setcreatedAt] = useState("");
  const[lastSignIn, setlastSignIn] = useState("");
  const[hasPassword, sethasPassword] = useState("");
  const[password, setpassword] = useState("");

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlUser=new UserController();
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
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlUser.getUserById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("user.email")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="email"
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.userName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="userName"
                    value={userName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setuserName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.app")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="app"
                    value={app}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setapp(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.timezone")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="timezone"
                    value={timezone}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settimezone(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.mobileCountryCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileCountryCode"
                    value={mobileCountryCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileCountryCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.mobileCallingCountryCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileCallingCountryCode"
                    value={mobileCallingCountryCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileCallingCountryCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.mobileNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.avatar")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="avatar"
                    value={avatar}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setavatar(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.isLocked")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="isLocked"
                    value={isLocked}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setisLocked(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.createdAt")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="createdAt"
                    value={createdAt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcreatedAt(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.lastSignIn")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="lastSignIn"
                    value={lastSignIn}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlastSignIn(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.hasPassword")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="hasPassword"
                    value={hasPassword}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     sethasPassword(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                   <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.password")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="password"
                    value={password}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpassword(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
              <td  width="46%">
                
              </td>
              </tr> 


  
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/user");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlUser.updateUserv2({
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
                      replace("/user");
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


export const UserItemView =({ Id, Mode }: UserItemProps) => {
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
  const[email, setemail] = useState("");
  const[userName, setuserName] = useState("");
  const[app, setapp] = useState("");
  const[timezone, settimezone] = useState("");
  const[mobileCountryCode, setmobileCountryCode] = useState("");
  const[mobileCallingCountryCode, setmobileCallingCountryCode] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[avatar, setavatar] = useState("");
  const[isLocked, setisLocked] = useState("");
  const[createdAt, setcreatedAt] = useState("");
  const[lastSignIn, setlastSignIn] = useState("");
  const[hasPassword, sethasPassword] = useState("");
  const[password, setpassword] = useState("");

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlUser=new UserController();
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
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlUser.getUserById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("user.email")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="email"
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.userName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="userName"
                    value={userName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setuserName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.app")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="app"
                    value={app}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setapp(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.timezone")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="timezone"
                    value={timezone}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settimezone(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.mobileCountryCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileCountryCode"
                    value={mobileCountryCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileCountryCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.mobileCallingCountryCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileCallingCountryCode"
                    value={mobileCallingCountryCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileCallingCountryCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.mobileNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.avatar")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="avatar"
                    value={avatar}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setavatar(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.isLocked")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="isLocked"
                    value={isLocked}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setisLocked(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.createdAt")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="createdAt"
                    value={createdAt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcreatedAt(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.lastSignIn")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="lastSignIn"
                    value={lastSignIn}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlastSignIn(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("user.hasPassword")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="hasPassword"
                    value={hasPassword}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     sethasPassword(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                   <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("user.password")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="password"
                    value={password}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpassword(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
              <td  width="46%">
                
              </td>
              </tr> 


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/user");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/user");}}
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
