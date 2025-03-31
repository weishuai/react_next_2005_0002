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

import { MyTbmatchingController } from '../../controllers/mytbmatchingController';
import { globalStorage } from '../../utils/Globalstorage';


const { nanoid } = require('nanoid');
export type MyTbmatchingItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function MyTbmatchingItem({ Id, Mode }: MyTbmatchingItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <MyTbmatchingItemAdd  Id={Id} Mode={Mode}/>;
    }
    else if(Mode == '1')
    {
      return <MyTbmatchingItemEdit Id={Id} Mode={Mode} />;
    }
    else if(Mode == '2')
    {
      return <MyTbmatchingItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <MyTbmatchingItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const MyTbmatchingItemAdd =({ Id, Mode }: MyTbmatchingItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[fhdate, setfhdate] = useState(null);
  const[sampleDate, setsampleDate] = useState(null);
  const[documentNumber, setdocumentNumber] = useState(null);
  const[customerCode, setcustomerCode] = useState(null);
  const[customerName, setcustomerName] = useState(null);
  const[sampleName, setsampleName] = useState(null);
  const[numbe, setnumbe] = useState(null);
  const[component, setcomponent] = useState(null);
  const[appearanceStyle, setappearanceStyle] = useState(null);
  const[requirements, setrequirements] = useState(null);
  const[technology, settechnology] = useState(null);
  const[mycheck, setmycheck] = useState(null);
  const[registration, setregistration] = useState(null);
  const[quotation, setquotation] = useState(null);
  const[manufacturingOrders, setmanufacturingOrders] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlMyTbmatching=new MyTbmatchingController();
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

      <tbody>
          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.fhname")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhname"
                    value={fhname}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhname(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("mytbmatching.fhdate")}</label>
                          <div style={{height:10}}> </div>
                          <Calendar 
                          id="fhdate"
                          value={fhdate}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhdate(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("mytbmatching.sampleDate")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="sampleDate"
                        value={sampleDate}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setsampleDate(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.documentNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="documentNumber"
                    value={documentNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdocumentNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.customerCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="customerCode"
                    value={customerCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcustomerCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.customerName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="customerName"
                    value={customerName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcustomerName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("mytbmatching.sampleName")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="sampleName"
                          value={sampleName}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setsampleName(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.numbe")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="numbe"
                    value={numbe}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setnumbe(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.component")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="component"
                    value={component}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcomponent(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.appearanceStyle")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="appearanceStyle"
                    value={appearanceStyle}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setappearanceStyle(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.requirements")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="requirements"
                    value={requirements}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrequirements(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.technology")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="technology"
                    value={technology}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settechnology(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("mytbmatching.mycheck")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="mycheck"
                          value={mycheck}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setmycheck(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("mytbmatching.registration")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="registration"
                          value={registration}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setregistration(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
        </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("mytbmatching.quotation")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="quotation"
                          value={quotation}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setquotation(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("mytbmatching.manufacturingOrders")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="manufacturingOrders"
                          value={manufacturingOrders}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setmanufacturingOrders(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("mytbmatching.isactived")}</label>
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
                }}  placeholder={t("mytbmatching.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("mytbmatching.islocked")}</label>
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
                }}  placeholder={t("mytbmatching.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("mytbmatching.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}

                  placeholder={t("mytbmatching.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("mytbmatching.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}

                  placeholder={t("mytbmatching.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("mytbmatching.createUid")}</label>
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
                }}  placeholder={t("mytbmatching.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("mytbmatching.updatedUid")}</label>
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
                }}  placeholder={t("mytbmatching.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/mytbmatching");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => {
                      ctlMyTbmatching.createMyTbmatching({
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
                      push("/mytbmatching");
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

export const MyTbmatchingItemEdit =({ Id, Mode }: MyTbmatchingItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[fhdate, setfhdate] = useState(null);
  const[sampleDate, setsampleDate] = useState(null);
  const[documentNumber, setdocumentNumber] = useState(null);
  const[customerCode, setcustomerCode] = useState(null);
  const[customerName, setcustomerName] = useState(null);
  const[sampleName, setsampleName] = useState(null);
  const[numbe, setnumbe] = useState(null);
  const[component, setcomponent] = useState(null);
  const[appearanceStyle, setappearanceStyle] = useState(null);
  const[requirements, setrequirements] = useState(null);
  const[technology, settechnology] = useState(null);
  const[mycheck, setmycheck] = useState(null);
  const[registration, setregistration] = useState(null);
  const[quotation, setquotation] = useState(null);
  const[manufacturingOrders, setmanufacturingOrders] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlMyTbmatching=new MyTbmatchingController();
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
          ctlMyTbmatching.getMyTbmatchingById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("mytbmatching.fhname")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhname"
                    value={fhname}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhname(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("mytbmatching.fhdate")}</label>
                          <div style={{height:10}}> </div>
                          <Calendar 
                          id="fhdate"
                          value={fhdate}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhdate(e.value);
                          }}
                          />
                          </div>
                    </td>
         </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("mytbmatching.sampleDate")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="sampleDate"
                        value={sampleDate}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.value));
                         setsampleDate(e.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.documentNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="documentNumber"
                    value={documentNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdocumentNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.customerCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="customerCode"
                    value={customerCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcustomerCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.customerName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="customerName"
                    value={customerName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcustomerName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("mytbmatching.sampleName")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="sampleName"
                          value={sampleName}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setsampleName(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.numbe")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="numbe"
                    value={numbe}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setnumbe(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.component")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="component"
                    value={component}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcomponent(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.appearanceStyle")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="appearanceStyle"
                    value={appearanceStyle}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setappearanceStyle(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.requirements")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="requirements"
                    value={requirements}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrequirements(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("mytbmatching.technology")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="technology"
                    value={technology}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settechnology(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("mytbmatching.mycheck")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="mycheck"
                          value={mycheck}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setmycheck(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("mytbmatching.registration")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="registration"
                          value={registration}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setregistration(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
           </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("mytbmatching.quotation")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="quotation"
                          value={quotation}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setquotation(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("mytbmatching.manufacturingOrders")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="manufacturingOrders"
                          value={manufacturingOrders}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setmanufacturingOrders(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("mytbmatching.isactived")}</label>
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
                }}  placeholder={t("mytbmatching.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("mytbmatching.islocked")}</label>
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
                }}  placeholder={t("mytbmatching.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("mytbmatching.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("mytbmatching.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("mytbmatching.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("mytbmatching.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("mytbmatching.createUid")}</label>
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
                }}  placeholder={t("mytbmatching.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("mytbmatching.updatedUid")}</label>
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
                }}  placeholder={t("mytbmatching.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/mytbmatching");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlMyTbmatching.updateMyTbmatchingv2({
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
                      push("/mytbmatching");
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


export const MyTbmatchingItemView =({ Id, Mode }: MyTbmatchingItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[fhdate, setfhdate] = useState(null);
  const[sampleDate, setsampleDate] = useState(null);
  const[documentNumber, setdocumentNumber] = useState(null);
  const[customerCode, setcustomerCode] = useState(null);
  const[customerName, setcustomerName] = useState(null);
  const[sampleName, setsampleName] = useState(null);
  const[numbe, setnumbe] = useState(null);
  const[component, setcomponent] = useState(null);
  const[appearanceStyle, setappearanceStyle] = useState(null);
  const[requirements, setrequirements] = useState(null);
  const[technology, settechnology] = useState(null);
  const[mycheck, setmycheck] = useState(null);
  const[registration, setregistration] = useState(null);
  const[quotation, setquotation] = useState(null);
  const[manufacturingOrders, setmanufacturingOrders] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlMyTbmatching=new MyTbmatchingController();
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
          ctlMyTbmatching.getMyTbmatchingById(Id).then((data)=>{
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
                        <label htmlFor="firstname1">{t("mytbmatching.fhname")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="fhname"
                        value={fhname}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setfhname(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
              <td  width="46%">
                              <div className="p-field p-col-12 p-md-6">
                               <label htmlFor="firstname1">{t("mytbmatching.fhdate")}</label>
                              <div style={{height:10}}> </div>
                              <Calendar 
                              id="fhdate"
                              value={fhdate}                    
                              onChange={(e)=>{
                               console.info('e.value:'+JSON.stringify(e.value));
                               setfhdate(e.value);
                              }}
                              />
                              </div>
                        </td>
             </tr>
             <tr>
                      <td  width="46%">
                            <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="firstname1">{t("mytbmatching.sampleDate")}</label>
                            <div style={{height:10}}> </div>
                            <Calendar 
                            id="sampleDate"
                            value={sampleDate}
                            onChange={(e)=>{
                             console.info('e.value:'+JSON.stringify(e.value));
                             setsampleDate(e.value);
                            }}
                            />
                            </div>
                      </td>
                      <td width="2%"></td>
              <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                         <label htmlFor="firstname1">{t("mytbmatching.documentNumber")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="documentNumber"
                        value={documentNumber}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setdocumentNumber(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  </tr>
             <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("mytbmatching.customerCode")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="customerCode"
                        value={customerCode}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setcustomerCode(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
              <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                         <label htmlFor="firstname1">{t("mytbmatching.customerName")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="customerName"
                        value={customerName}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setcustomerName(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  </tr>
             <tr>
                        <td  width="46%">
                              <div className="p-field p-col-12 p-md-6">
                              <label htmlFor="firstname1">{t("mytbmatching.sampleName")}</label>
                              <div style={{height:10}}> </div>
                              <Dropdown 
                              id="sampleName"
                              value={sampleName}
                              options={FHnans}
                              optionLabel="name"
                              optionValue="code"                            
                              onChange={(e)=>{
                               console.info('e.value:'+JSON.stringify(e.value));
                               setsampleName(e.value);
                              }}
                              />
                              </div>
                        </td>
                        <td width="2%"></td>
              <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                         <label htmlFor="firstname1">{t("mytbmatching.numbe")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="numbe"
                        value={numbe}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setnumbe(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  </tr>
             <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("mytbmatching.component")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="component"
                        value={component}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setcomponent(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
              <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                         <label htmlFor="firstname1">{t("mytbmatching.appearanceStyle")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="appearanceStyle"
                        value={appearanceStyle}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setappearanceStyle(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  </tr>
             <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("mytbmatching.requirements")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="requirements"
                        value={requirements}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setrequirements(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  <td width="2%"></td>
              <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                         <label htmlFor="firstname1">{t("mytbmatching.technology")}</label>
                        <div style={{height:10}}> </div>
                        <InputText 
                        id="technology"
                        value={technology}
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         settechnology(e.target.value);
                        }}
                        />
                        </div>
                  </td>
                  </tr>
             <tr>
                        <td  width="46%">
                              <div className="p-field p-col-12 p-md-6">
                              <label htmlFor="firstname1">{t("mytbmatching.mycheck")}</label>
                              <div style={{height:10}}> </div>
                              <Dropdown 
                              id="mycheck"
                              value={mycheck}
                              options={FHnans}
                              optionLabel="name"
                              optionValue="code"                            
                              onChange={(e)=>{
                               console.info('e.value:'+JSON.stringify(e.value));
                               setmycheck(e.value);
                              }}
                              />
                              </div>
                        </td>
                        <td width="2%"></td>
              </tr>
             <tr>
                        <td  width="46%">
                              <div className="p-field p-col-12 p-md-6">
                              <label htmlFor="firstname1">{t("mytbmatching.registration")}</label>
                              <div style={{height:10}}> </div>
                              <Dropdown 
                              id="registration"
                              value={registration}
                              options={FHnans}
                              optionLabel="name"
                              optionValue="code"                            
                              onChange={(e)=>{
                               console.info('e.value:'+JSON.stringify(e.value));
                               setregistration(e.value);
                              }}
                              />
                              </div>
                        </td>
                        <td width="2%"></td>
               </tr>
             <tr>
                        <td  width="46%">
                              <div className="p-field p-col-12 p-md-6">
                              <label htmlFor="firstname1">{t("mytbmatching.quotation")}</label>
                              <div style={{height:10}}> </div>
                              <Dropdown 
                              id="quotation"
                              value={quotation}
                              options={FHnans}
                              optionLabel="name"
                              optionValue="code"                            
                              onChange={(e)=>{
                               console.info('e.value:'+JSON.stringify(e.value));
                               setquotation(e.value);
                              }}
                              />
                              </div>
                        </td>
                        <td width="2%"></td>
              <td  width="46%">
                              <div className="p-field p-col-12 p-md-6">
                               <label htmlFor="firstname1">{t("mytbmatching.manufacturingOrders")}</label>
                              <div style={{height:10}}> </div>
                              <Dropdown 
                              id="manufacturingOrders"
                              value={manufacturingOrders}  
                              options={FHnans}
                              optionLabel="name"
                              optionValue="code"                                              
                              onChange={(e)=>{
                               console.info('e.value:'+JSON.stringify(e.value));
                               setmanufacturingOrders(e.value);
                              }}
                              />
                              </div>
                        </td>
                        </tr>
    
    
              <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.isactived")}</label>
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
                    }}  placeholder={t("mytbmatching.isactived")} />
                    </div>
              </td>
              <td width="2%"></td>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.islocked")}</label>
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
                    }}  placeholder={t("mytbmatching.islocked")} />
                    </div>
              </td>
              </tr>
              <tr>
              <td >
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.createdAt")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar
                      showTime
                      id="createdAt"
                      value={createAt}
                      disabled={true}
                      placeholder={t("mytbmatching.createdAtPlaceholder")}
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
                    <label htmlFor="firstname1">{t("mytbmatching.updatedAt")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar
                      showTime
                      id="updatedAt"
                      value={updatedAt}
                      disabled={true}
                      placeholder={t("mytbmatching.updatedAtPlaceholder")}
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
                    <label htmlFor="firstname1">{t("mytbmatching.createUid")}</label>
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
                    }}  placeholder={t("mytbmatching.createUid")} />
    
                    </div>
              </td>
              <td ></td>
              <td >
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("mytbmatching.updatedUid")}</label>
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
                    }}  placeholder={t("mytbmatching.updatedUid")} />
                   </div>
              </td>
              </tr>
              <tr>
              <td >
                    <div className="p-field p-col-12 p-md-6">
                    <div style={{height:10}}> </div>
                    <Button label="取消" onClick={(e) => {replace("/mytbmatching");}} style={{backgroundColor:'#4682B4'}}  />
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
                          ctlMyTbmatching.updateMyTbmatchingv2({
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
                          push("/mytbmatching");
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

