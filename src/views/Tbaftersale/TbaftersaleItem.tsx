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

import { TbaftersaleController } from '../../controllers/tbaftersaleController';
import { globalStorage } from '../../utils/Globalstorage';


const { nanoid } = require('nanoid');
export type TbaftersaleItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function TbaftersaleItem({ Id, Mode }: TbaftersaleItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <TbaftersaleItemAdd  Id={Id} Mode={Mode}/>;
    }
    else if(Mode == '1')
    {
      return <TbaftersaleItemEdit Id={Id} Mode={Mode} />;
    }
    else if(Mode == '2')
    {
      return <TbaftersaleItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <TbaftersaleItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const TbaftersaleItemAdd =({ Id, Mode }: TbaftersaleItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[mid, setmid] = useState(null);
  const[project, setproject] = useState(null);
  const[fhdate, setfhdate] = useState(null);
  const[location, setlocation] = useState(null);
  const[contacts, setcontacts] = useState(null);
  const[contactInformation, setcontactInformation] = useState(null);
  const[VisitDescription, setVisitDescription] = useState(null);
  const[problemHandling, setproblemHandling] = useState(null);
  const[remainingProblems, setremainingProblems] = useState(null);
  const[afterSalesType, setafterSalesType] = useState(null);
  const[annex, setannex] = useState(null);
  const[processedBy, setprocessedBy] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlTbaftersale=new TbaftersaleController();
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
                    <label htmlFor="firstname1">{t("tbaftersale.mid")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mid"
                    value={mid}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmid(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.project")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="project"
                    value={project}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproject(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("tbaftersale.fhdate")}</label>
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
                  <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.location")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.contacts")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="contacts"
                    value={contacts}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcontacts(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.contactInformation")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="contactInformation"
                    value={contactInformation}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcontactInformation(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.VisitDescription")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="VisitDescription"
                    value={VisitDescription}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setVisitDescription(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.problemHandling")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="problemHandling"
                    value={problemHandling}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproblemHandling(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbaftersale.remainingProblems")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="remainingProblems"
                          value={remainingProblems}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setremainingProblems(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("tbaftersale.afterSalesType")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="afterSalesType"
                          value={afterSalesType}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setafterSalesType(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.annex")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="annex"
                    value={annex}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setannex(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.processedBy")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="processedBy"
                    value={processedBy}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setprocessedBy(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.isactived")}</label>
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
                }}  placeholder={t("tbaftersale.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.islocked")}</label>
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
                }}  placeholder={t("tbaftersale.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}

                  placeholder={t("tbaftersale.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbaftersale.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}

                  placeholder={t("tbaftersale.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbaftersale.createUid")}</label>
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
                }}  placeholder={t("tbaftersale.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.updatedUid")}</label>
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
                }}  placeholder={t("tbaftersale.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/tbaftersale");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => {
                      ctlTbaftersale.createTbaftersale({
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
                      push("/tbaftersale");
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

export const TbaftersaleItemEdit =({ Id, Mode }: TbaftersaleItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[mid, setmid] = useState(null);
  const[project, setproject] = useState(null);
  const[fhdate, setfhdate] = useState(null);
  const[location, setlocation] = useState(null);
  const[contacts, setcontacts] = useState(null);
  const[contactInformation, setcontactInformation] = useState(null);
  const[VisitDescription, setVisitDescription] = useState(null);
  const[problemHandling, setproblemHandling] = useState(null);
  const[remainingProblems, setremainingProblems] = useState(null);
  const[afterSalesType, setafterSalesType] = useState(null);
  const[annex, setannex] = useState(null);
  const[processedBy, setprocessedBy] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlTbaftersale=new TbaftersaleController();
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
          ctlTbaftersale.getTbaftersaleById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("tbaftersale.mid")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mid"
                    value={mid}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmid(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.project")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="project"
                    value={project}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproject(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("tbaftersale.fhdate")}</label>
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
                  <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.location")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.contacts")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="contacts"
                    value={contacts}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcontacts(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.contactInformation")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="contactInformation"
                    value={contactInformation}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcontactInformation(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.VisitDescription")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="VisitDescription"
                    value={VisitDescription}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setVisitDescription(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.problemHandling")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="problemHandling"
                    value={problemHandling}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproblemHandling(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbaftersale.remainingProblems")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="remainingProblems"
                          value={remainingProblems}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setremainingProblems(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("tbaftersale.afterSalesType")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="afterSalesType"
                          value={afterSalesType}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setafterSalesType(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.annex")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="annex"
                    value={annex}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setannex(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.processedBy")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="processedBy"
                    value={processedBy}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setprocessedBy(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.isactived")}</label>
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
                }}  placeholder={t("tbaftersale.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.islocked")}</label>
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
                }}  placeholder={t("tbaftersale.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("tbaftersale.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbaftersale.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("tbaftersale.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbaftersale.createUid")}</label>
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
                }}  placeholder={t("tbaftersale.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.updatedUid")}</label>
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
                }}  placeholder={t("tbaftersale.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/tbaftersale");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlTbaftersale.updateTbaftersalev2({
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
                      push("/tbaftersale");
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


export const TbaftersaleItemView =({ Id, Mode }: TbaftersaleItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[mid, setmid] = useState(null);
  const[project, setproject] = useState(null);
  const[fhdate, setfhdate] = useState(null);
  const[location, setlocation] = useState(null);
  const[contacts, setcontacts] = useState(null);
  const[contactInformation, setcontactInformation] = useState(null);
  const[VisitDescription, setVisitDescription] = useState(null);
  const[problemHandling, setproblemHandling] = useState(null);
  const[remainingProblems, setremainingProblems] = useState(null);
  const[afterSalesType, setafterSalesType] = useState(null);
  const[annex, setannex] = useState(null);
  const[processedBy, setprocessedBy] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlTbaftersale=new TbaftersaleController();
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
          ctlTbaftersale.getTbaftersaleById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("tbaftersale.mid")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="mid"
                    value={mid}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmid(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.project")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="project"
                    value={project}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproject(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                  <td  width="46%">
                        <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname1">{t("tbaftersale.fhdate")}</label>
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
                  <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.location")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.contacts")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="contacts"
                    value={contacts}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcontacts(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.contactInformation")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="contactInformation"
                    value={contactInformation}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcontactInformation(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.VisitDescription")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="VisitDescription"
                    value={VisitDescription}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setVisitDescription(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.problemHandling")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="problemHandling"
                    value={problemHandling}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproblemHandling(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("tbaftersale.remainingProblems")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="remainingProblems"
                          value={remainingProblems}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setremainingProblems(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("tbaftersale.afterSalesType")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="afterSalesType"
                          value={afterSalesType}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setafterSalesType(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("tbaftersale.annex")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="annex"
                    value={annex}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setannex(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("tbaftersale.processedBy")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="processedBy"
                    value={processedBy}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setprocessedBy(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.isactived")}</label>
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
                }}  placeholder={t("tbaftersale.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.islocked")}</label>
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
                }}  placeholder={t("tbaftersale.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("tbaftersale.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbaftersale.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("tbaftersale.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("tbaftersale.createUid")}</label>
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
                }}  placeholder={t("tbaftersale.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("tbaftersale.updatedUid")}</label>
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
                }}  placeholder={t("tbaftersale.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/tbaftersale");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/tbaftersale");}}
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

