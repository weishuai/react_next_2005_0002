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

import { TbmatchingController } from '../../controllers/TbmatchingController';
import { globalStorage } from '../../utils/Globalstorage';


const { nanoid } = require('nanoid');
export type TbmatchingItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function TbmatchingItem({ Id, Mode }: TbmatchingItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <TbmatchingItemAdd  Id={Id} Mode={Mode}/>;
    }
    else if(Mode == '1')
    {
      return <TbmatchingItemEdit Id={Id} Mode={Mode} />;
    }
    else if(Mode == '2')
    {
      return <TbmatchingItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <TbmatchingItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const TbmatchingItemAdd =({ Id, Mode }: TbmatchingItemProps) => {
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

  const ctlTbmatching=new TbmatchingController();
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
                    <label htmlFor="firstname1">{t("tbmatching.fhname")}</label>
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
                           <label htmlFor="firstname1">{t("tbmatching.fhdate")}</label>
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
                        <label htmlFor="firstname1">{t("tbmatching.sampleDate")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.documentNumber")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.customerCode")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.customerName")}</label>
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
                          <label htmlFor="firstname1">{t("tbmatching.sampleName")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.numbe")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.component")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.appearanceStyle")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.requirements")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.technology")}</label>
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
                          <label htmlFor="firstname1">{t("tbmatching.mycheck")}</label>
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
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbmatching.registration")}</label>
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
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbmatching.quotation")}</label>
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
                           <label htmlFor="firstname1">{t("tbmatching.manufacturingOrders")}</label>
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
                <label htmlFor="firstname1">{t("tbmatching.isactived")}</label>
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
                }}  placeholder={t("tbmatching.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.islocked")}</label>
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
                }}  placeholder={t("tbmatching.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}

                  placeholder={t("tbmatching.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbmatching.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}

                  placeholder={t("tbmatching.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbmatching.createUid")}</label>
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
                }}  placeholder={t("tbmatching.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.updatedUid")}</label>
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
                }}  placeholder={t("tbmatching.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/tbmatching");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => {
                      ctlTbmatching.createTbmatching({
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
                      push("/tbmatching");
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

export const TbmatchingItemEdit =({ Id, Mode }: TbmatchingItemProps) => {
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

  const ctlTbmatching=new TbmatchingController();
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
          ctlTbmatching.getTbmatchingById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("tbmatching.fhname")}</label>
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
                           <label htmlFor="firstname1">{t("tbmatching.fhdate")}</label>
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
                        <label htmlFor="firstname1">{t("tbmatching.sampleDate")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.documentNumber")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.customerCode")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.customerName")}</label>
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
                          <label htmlFor="firstname1">{t("tbmatching.sampleName")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.numbe")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.component")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.appearanceStyle")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.requirements")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.technology")}</label>
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
                          <label htmlFor="firstname1">{t("tbmatching.mycheck")}</label>
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
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbmatching.registration")}</label>
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
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbmatching.quotation")}</label>
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
                           <label htmlFor="firstname1">{t("tbmatching.manufacturingOrders")}</label>
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
                <label htmlFor="firstname1">{t("tbmatching.isactived")}</label>
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
                }}  placeholder={t("tbmatching.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.islocked")}</label>
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
                }}  placeholder={t("tbmatching.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("tbmatching.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbmatching.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("tbmatching.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbmatching.createUid")}</label>
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
                }}  placeholder={t("tbmatching.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.updatedUid")}</label>
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
                }}  placeholder={t("tbmatching.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/tbmatching");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlTbmatching.updateTbmatchingv2({
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
                      push("/tbmatching");
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


export const TbmatchingItemView =({ Id, Mode }: TbmatchingItemProps) => {
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

  const ctlTbmatching=new TbmatchingController();
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
          ctlTbmatching.getTbmatchingById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("tbmatching.fhname")}</label>
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
                           <label htmlFor="firstname1">{t("tbmatching.fhdate")}</label>
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
                        <label htmlFor="firstname1">{t("tbmatching.sampleDate")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.documentNumber")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.customerCode")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.customerName")}</label>
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
                          <label htmlFor="firstname1">{t("tbmatching.sampleName")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.numbe")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.component")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.appearanceStyle")}</label>
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
                    <label htmlFor="firstname1">{t("tbmatching.requirements")}</label>
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
                     <label htmlFor="firstname1">{t("tbmatching.technology")}</label>
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
                          <label htmlFor="firstname1">{t("tbmatching.mycheck")}</label>
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
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbmatching.registration")}</label>
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
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbmatching.quotation")}</label>
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
                           <label htmlFor="firstname1">{t("tbmatching.manufacturingOrders")}</label>
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
                <label htmlFor="firstname1">{t("tbmatching.isactived")}</label>
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
                }}  placeholder={t("tbmatching.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.islocked")}</label>
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
                }}  placeholder={t("tbmatching.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("tbmatching.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbmatching.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("tbmatching.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbmatching.createUid")}</label>
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
                }}  placeholder={t("tbmatching.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbmatching.updatedUid")}</label>
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
                }}  placeholder={t("tbmatching.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/tbmatching");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/tbmatching");}}
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

