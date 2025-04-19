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
import { LeadsController } from '../../controllers/LeadsController';
import { ClientController } from '../../controllers/ClientController';
import { CountryController } from '../../controllers/CountryController';
import {LeadPoolsController} from '../../controllers/LeadPoolsController';
import {ActivityController} from '../../controllers/ActivityController';

import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
const { nanoid } = require('nanoid');
export type LeadsItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function LeadsItem({ Id, Mode }: LeadsItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <LeadsItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <LeadsItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <LeadsItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <LeadsItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const LeadsItemAdd =({ Id, Mode }: LeadsItemProps) => {
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
  const[jobTitle, setjobTitle] = useState("");
  const[company, setcompany] = useState("");
  const[industry, setindustry] = useState("");
  const[website, setwebsite] = useState("");
  const[email, setemail] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[remark, setremark] = useState('');
  const[leadOwner, setleadOwner] = useState(null);
  const[leadPool, setleadPool] = useState(null);
  const[campaign, setcampaign] = useState(null);
  const[source, setsource] = useState(null);
  const[streetRoad, setstreetRoad] = useState("");
  const[city, setcity] = useState("");
  const[ctate, setctate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState(null);
  const[satus, setsatus] = useState(null);
  const[linkedIn, setlinkedIn] = useState("");

  const [FHUsers, setFHUsers] = useState([]);

  const [Countrys, setCountrys] = useState([]);
  const [Clients, setClients] = useState([]);

  const [Activitys, setActivitys] = useState([]);
  const [LeadPools, setLeadPools] = useState([]);

  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlLeads=new LeadsController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    
    async function getCountrys()
    {
        const ctlCountry=new CountryController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }   
    async function getClients()
    {
        const ctlCountry=new ClientController();
        const fhojts = await ctlCountry.getClientAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    } 



    async function getLeadPools()
    {
        const ctlCountry=new LeadPoolsController();
        const fhojts = await ctlCountry.getLeadPoolsAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    } 

    async function getActivitys()
    {
        const ctlCountry=new ActivityController();
        const fhojts = await ctlCountry.getActivityAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.subject }));;
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
 
    const fhStatusItems = [
      { name: 'Track', code: '0' },
      { name: 'Stop it', code: '1' },
    ];

    
    const fhsourceItems = [
      { name: 'Track', code: '0' },
      { name: 'Stop it', code: '1' },
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

      getClients().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setClients(data);
      });
   
      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      }); 

      getActivitys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setActivitys(data);
      });  

      getLeadPools().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setLeadPools(data);
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
          <td><label htmlFor="name">{t("leads.name")}</label></td>
          <td colSpan={3}>      
               
                
             
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.description")}</label>  
            </td>
            <td colSpan={3}>
               
              
              
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
             
            </td>
          </tr>

          <tr>
            <td style={{  width: '10%' }}>
            <label htmlFor="firstname1">{t("leads.jobTitle")}</label>
            </td>
              <td  style={{  width: '40%' }}>
                    <InputText 
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setjobTitle(e.target.value);
                    }}
                    />
                   
              </td>
              <td  style={{  width: '10%' }}>
              <label htmlFor="firstname1">{t("leads.company")}</label>
              </td>
          <td  style={{  width: '40%' }}>
                     
                      
                  
                      <Dropdown 
                      id="company"
                      value={company}
                      options={Clients} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcompany(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.industry")}</label>  
            </td>
              <td  >
                 
                    <InputText 
                    id="industry"
                    value={industry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setindustry(e.target.value);
                    }}
                    />
                    
              </td>
              <td ><label htmlFor="firstname1">{t("leads.website")}</label></td>
          <td  >
                   
                 
                    <InputText 
                    id="website"
                    value={website}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setwebsite(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.email")}</label>
            </td>
              <td >
                    <InputText 
                    id="email"
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
                  
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.phoneNumber")}</label>
              </td>
          <td >
                  
                   
                   
                    <InputText 
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.mobileNumber")}</label>
            </td>
              <td  >
                    <InputText 
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.faxNumber")}</label>
              </td>
          <td >
                
                    
                  
                    <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.remark")}</label>
            </td>
              <td >
                 
                   
               
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.leadOwner")}</label>
              </td>
          <td >
                 
                     
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="leadOwner"
                      value={leadOwner}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setleadOwner(e.value);
                      }}
                      />
                    
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.leadPool")}</label>
            </td>
              <td  >
     
                    <Dropdown 
                    id="leadPool"
                    value={leadPool}
                    options={LeadPools}
                    optionLabel="name" 
                    optionValue="code"                
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setleadPool(e.value);
                    }}
                    />
                   
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.campaign")}</label>
              </td>
          <td >
                   
                       
                     
                      <Dropdown 
                      id="campaign"
                      value={campaign}
                      options={Activitys}
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcampaign(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.source")}</label>
            </td>
              <td  >
             
                    <Dropdown 
                    id="source"
                    value={source}
                    options={fhsourceItems}
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsource(e.value);
                    }}
                    />
                    
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.streetRoad")}</label>
              </td>
          <td >
                     
                      <InputText 
                      id="streetRoad"
                      value={streetRoad}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.target.value));
                       setstreetRoad(e.target.value);
                      }}
                      />
                      
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.city")}</label>
            </td>
              <td  >
               
                    <InputText 
                    id="city"
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.ctate")}</label>
              </td>
          <td >
               
                    <InputText 
                    id="ctate"
                    value={ctate}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setctate(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.postCode")}</label>
            </td>
              <td >
                    
                    <InputText 
                    id="postCode"
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
                    
              </td>
              <td>  <label htmlFor="firstname1">{t("leads.country")}</label></td>
          <td>
                   
                      <Dropdown 
                      id="country"
                      value={country}
                      options={Countrys}
                      optionLabel="name" 
                      optionValue="code"                   
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcountry(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.linkedIn")}</label>
            </td>
              <td >
                  
                    <InputText 
                    id="linkedIn"
                    value={linkedIn}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlinkedIn(e.target.value);
                    }}
                    />
                  
              </td>
              <td> <label htmlFor="firstname1">{t("leads.satus")}</label></td>
          <td  >
                    
                      <Dropdown 
                      id="satus"
                      options={fhStatusItems}
                      value={satus}
                      optionLabel="name" 
                      optionValue="code"                    
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setsatus(e.value);
                      }}
                      />
                    
                </td>
                </tr>
   


          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.isactived")}</label>
            </td>
          <td >
               
                <Dropdown 
                value={isactived} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 ///setIsactived(e.value);
                }}  placeholder={t("leads.isactived")} />
            
          </td>
          <td > <label htmlFor="firstname1">{t("leads.islocked")}</label></td> 
          <td  >
                
               
             
                <Dropdown 
                value={islocked} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("leads.islocked")} />
              
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.createdAt")}</label>
            </td>
            <td >
         
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  placeholder={t("leads.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td >
          <label htmlFor="firstname1">{t("leads.updatedAt")}</label>
          </td>
          <td >
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  placeholder={t("leads.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                />
                
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.createUid")}</label>
            </td>
          <td >
             
                <Dropdown 
                value={createUid} 
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("leads.createUid")} />
              
                
          </td>
          <td ><label htmlFor="firstname1">{t("leads.updatedUid")}</label></td>
          <td >
       
          <Dropdown 
                value={updatedUid} 
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("leads.updatedUid")} />
              
          </td>
          </tr>



          <tr>
          <td colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/leads");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
        
          <td colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlLeads.createLeads({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        jobTitle:jobTitle,
                        company:company,
                        industry:industry,
                        website:website,
                        email:email,
                        phoneNumber:phoneNumber,
                        mobileNumber:mobileNumber,
                        faxNumber:faxNumber, 
                        remark:remark, 
                        leadOwner:leadOwner,
                        leadPool:leadPool, 
                        campaign:campaign, 
                        source:source,
                        streetRoad:streetRoad, 
                        city:city, 
                        ctate:ctate, 
                        postCode:postCode, 
                        country:country,
                        satus:satus,
                        linkedIn:linkedIn,                      
                      });
                      replace("/leads");
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

export const LeadsItemEdit =({ Id, Mode }: LeadsItemProps) => {
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
  const[jobTitle, setjobTitle] = useState("");
  const[company, setcompany] = useState("");
  const[industry, setindustry] = useState("");
  const[website, setwebsite] = useState("");
  const[email, setemail] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[remark, setremark] = useState('');
  const[leadOwner, setleadOwner] = useState(null);
  const[leadPool, setleadPool] = useState(null);
  const[campaign, setcampaign] = useState(null);
  const[source, setsource] = useState(null);
  const[streetRoad, setstreetRoad] = useState("");
  const[city, setcity] = useState("");
  const[ctate, setctate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState(null);
  const[satus, setsatus] = useState(null);
  const[linkedIn, setlinkedIn] = useState("");

  const [FHUsers, setFHUsers] = useState([]);

  const [Countrys, setCountrys] = useState([]);
  const [Clients, setClients] = useState([]);

  const [Activitys, setActivitys] = useState([]);
  const [LeadPools, setLeadPools] = useState([]);

  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlLeads=new LeadsController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
 
    async function getCountrys()
    {
        const ctlCountry=new CountryController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }   
    async function getClients()
    {
        const ctlCountry=new ClientController();
        const fhojts = await ctlCountry.getClientAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    } 



    async function getLeadPools()
    {
        const ctlCountry=new LeadPoolsController();
        const fhojts = await ctlCountry.getLeadPoolsAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    } 

    async function getActivitys()
    {
        const ctlCountry=new ActivityController();
        const fhojts = await ctlCountry.getActivityAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.subject }));;
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
 
    const fhStatusItems = [
      { name: 'Track', code: '0' },
      { name: 'Stop it', code: '1' },
    ];

    
    const fhsourceItems = [
      { name: 'Track', code: '0' },
      { name: 'Stop it', code: '1' },
    ];



    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      getClients().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setClients(data);
      });
   
      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      }); 

      getActivitys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setActivitys(data);
      });  

      getLeadPools().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setLeadPools(data);
      });       

      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlLeads.getLeadsById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
     
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);

            setFHid(data.id);
            setjobTitle(data.jobTitle);
            setcompany(data.company);
            setindustry(data.industry);
            setwebsite(data.website);
            setemail(data.email);
            setphoneNumber(data.phoneNumber);
            setmobileNumber(data.mobileNumber);
            setfaxNumber(data.faxNumber);
            setremark(data.remark);
            setleadOwner(data.leadOwner);
            setleadPool(data.leadPool);
            setcampaign(data.campaign);
            setsource(data.source);
            setstreetRoad(data.streetRoad);
            setcity(data.city);
            setctate(data.ctate);
            setpostCode(data.postCode);
            setcountry(data.country);
            //setisactived(data.isactived);
            setsatus(data.satus);
            setlinkedIn(data.linkedIn);

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
          <td><label htmlFor="name">{t("leads.name")}</label></td>
          <td colSpan={3}>      
               
                
             
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.description")}</label>  
            </td>
            <td colSpan={3}>
               
              
              
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
             
            </td>
          </tr>

          <tr>
            <td style={{  width: '10%' }}>
            <label htmlFor="firstname1">{t("leads.jobTitle")}</label>
            </td>
              <td style={{  width: '40%' }}>
                    <InputText 
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setjobTitle(e.target.value);
                    }}
                    />
                   
              </td>
              <td style={{  width: '10%' }}>
              <label htmlFor="firstname1">{t("leads.company")}</label>
              </td>
          <td style={{  width: '40%' }}>
                     
                      
                  
                      <Dropdown 
                      id="company"
                      value={company}
                      options={Clients} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcompany(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.industry")}</label>  
            </td>
              <td  >
                 
                    <InputText 
                    id="industry"
                    value={industry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setindustry(e.target.value);
                    }}
                    />
                    
              </td>
              <td ><label htmlFor="firstname1">{t("leads.website")}</label></td>
          <td  >
                   
                 
                    <InputText 
                    id="website"
                    value={website}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setwebsite(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.email")}</label>
            </td>
              <td >
                    <InputText 
                    id="email"
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
                  
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.phoneNumber")}</label>
              </td>
          <td >
                  
                   
                   
                    <InputText 
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.mobileNumber")}</label>
            </td>
              <td  >
                    <InputText 
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.faxNumber")}</label>
              </td>
          <td >
                
                    
                  
                    <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.remark")}</label>
            </td>
              <td >
                 
                   
               
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.leadOwner")}</label>
              </td>
          <td >
                 
                     
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="leadOwner"
                      value={leadOwner}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setleadOwner(e.value);
                      }}
                      />
                    
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.leadPool")}</label>
            </td>
              <td  >
     
                    <Dropdown 
                    id="leadPool"
                    value={leadPool}
                    options={LeadPools}
                    optionLabel="name" 
                    optionValue="code"                
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setleadPool(e.value);
                    }}
                    />
                   
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.campaign")}</label>
              </td>
          <td >
                   
                       
                     
                      <Dropdown 
                      id="campaign"
                      value={campaign}
                      options={Activitys}
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcampaign(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.source")}</label>
            </td>
              <td  >
             
                    <Dropdown 
                    id="source"
                    value={source}
                    options={fhsourceItems}
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsource(e.value);
                    }}
                    />
                    
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.streetRoad")}</label>
              </td>
          <td >
                     
                      <InputText 
                      id="streetRoad"
                      value={streetRoad}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.target.value));
                       setstreetRoad(e.target.value);
                      }}
                      />
                      
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.city")}</label>
            </td>
              <td  >
               
                    <InputText 
                    id="city"
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.ctate")}</label>
              </td>
          <td >
               
                    <InputText 
                    id="ctate"
                    value={ctate}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setctate(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.postCode")}</label>
            </td>
              <td >
                    
                    <InputText 
                    id="postCode"
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
                    
              </td>
              <td>  <label htmlFor="firstname1">{t("leads.country")}</label></td>
          <td>
                   
                      <Dropdown 
                      id="country"
                      value={country}
                      options={Countrys}
                      optionLabel="name" 
                      optionValue="code"                   
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcountry(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.linkedIn")}</label>
            </td>
              <td >
                  
                    <InputText 
                    id="linkedIn"
                    value={linkedIn}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlinkedIn(e.target.value);
                    }}
                    />
                  
              </td>
              <td> <label htmlFor="firstname1">{t("leads.satus")}</label></td>
          <td  >
                    
                      <Dropdown 
                      id="satus"
                      options={fhStatusItems}
                      value={satus}
                      optionLabel="name" 
                      optionValue="code"                    
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setsatus(e.value);
                      }}
                      />
                    
                </td>
                </tr>
   


          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.isactived")}</label>
            </td>
          <td >
               
                <Dropdown 
                value={isactived} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 ///setIsactived(e.value);
                }}  placeholder={t("leads.isactived")} />
            
          </td>
          <td > <label htmlFor="firstname1">{t("leads.islocked")}</label></td> 
          <td  >
                
               
             
                <Dropdown 
                value={islocked} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("leads.islocked")} />
              
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.createdAt")}</label>
            </td>
            <td >
         
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  placeholder={t("leads.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td >
          <label htmlFor="firstname1">{t("leads.updatedAt")}</label>
          </td>
          <td >
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  placeholder={t("leads.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                />
                
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.createUid")}</label>
            </td>
          <td >
             
                <Dropdown 
                value={createUid} 
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("leads.createUid")} />
              
                
          </td>
          <td ><label htmlFor="firstname1">{t("leads.updatedUid")}</label></td>
          <td >
       
          <Dropdown 
                value={updatedUid} 
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("leads.updatedUid")} />
              
          </td>
          </tr>



          <tr>
          <td colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/leads");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
        
          <td colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      const fhnew=new Date();
                      const userID=globalStorage.get("userID");
                      console.log('userID:'+userID);
                      ctlLeads.updateLeadsv2({
                        id:FHid,
                        name:name,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        jobTitle:jobTitle,
                        company:company,
                        industry:industry,
                        website:website,
                        email:email,
                        phoneNumber:phoneNumber,
                        mobileNumber:mobileNumber,
                        faxNumber:faxNumber, 
                        remark:remark, 
                        leadOwner:leadOwner,
                        leadPool:leadPool, 
                        campaign:campaign, 
                        source:source,
                        streetRoad:streetRoad, 
                        city:city, 
                        ctate:ctate, 
                        postCode:postCode, 
                        country:country,
                        satus:satus,
                        linkedIn:linkedIn,                                              
                      },Id,userID);
                      replace("/leads");
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


export const LeadsItemView =({ Id, Mode }: LeadsItemProps) => {
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
  const[jobTitle, setjobTitle] = useState("");
  const[company, setcompany] = useState("");
  const[industry, setindustry] = useState("");
  const[website, setwebsite] = useState("");
  const[email, setemail] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[remark, setremark] = useState('');
  const[leadOwner, setleadOwner] = useState(null);
  const[leadPool, setleadPool] = useState(null);
  const[campaign, setcampaign] = useState(null);
  const[source, setsource] = useState(null);
  const[streetRoad, setstreetRoad] = useState("");
  const[city, setcity] = useState("");
  const[ctate, setctate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState(null);
  const[satus, setsatus] = useState(null);
  const[linkedIn, setlinkedIn] = useState("");

  const [FHUsers, setFHUsers] = useState([]);

  const [Countrys, setCountrys] = useState([]);
  const [Clients, setClients] = useState([]);

  const [Activitys, setActivitys] = useState([]);
  const [LeadPools, setLeadPools] = useState([]);

  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlLeads=new LeadsController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    async function getCountrys()
    {
        const ctlCountry=new CountryController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }   
    async function getClients()
    {
        const ctlCountry=new ClientController();
        const fhojts = await ctlCountry.getClientAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    } 



    async function getLeadPools()
    {
        const ctlCountry=new LeadPoolsController();
        const fhojts = await ctlCountry.getLeadPoolsAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    } 

    async function getActivitys()
    {
        const ctlCountry=new ActivityController();
        const fhojts = await ctlCountry.getActivityAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.subject }));;
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
 
    const fhStatusItems = [
      { name: 'Track', code: '0' },
      { name: 'Stop it', code: '1' },
    ];

    
    const fhsourceItems = [
      { name: 'Track', code: '0' },
      { name: 'Stop it', code: '1' },
    ];



    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);
      getClients().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setClients(data);
      });
   
      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      }); 

      getActivitys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setActivitys(data);
      });  

      getLeadPools().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setLeadPools(data);
      }); 
      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlLeads.getLeadsById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setFHid(data.id);
            setjobTitle(data.jobTitle);
            setcompany(data.company);
            setindustry(data.industry);
            setwebsite(data.website);
            setemail(data.email);
            setphoneNumber(data.phoneNumber);
            setmobileNumber(data.mobileNumber);
            setfaxNumber(data.faxNumber);
            setremark(data.remark);
            setleadOwner(data.leadOwner);
            setleadPool(data.leadPool);
            setcampaign(data.campaign);
            setsource(data.source);
            setstreetRoad(data.streetRoad);
            setcity(data.city);
            setctate(data.ctate);
            setpostCode(data.postCode);
            setcountry(data.country);
            //setisactived(data.isactived);
            setsatus(data.satus);
            setlinkedIn(data.linkedIn);

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
          <td><label htmlFor="name">{t("leads.name")}</label></td>
          <td colSpan={3}>      
               
                
             
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.description")}</label>  
            </td>
            <td colSpan={3}>
               
              
              
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
             
            </td>
          </tr>

          <tr>
            <td style={{  width: '10%' }}>  
            <label htmlFor="firstname1">{t("leads.jobTitle")}</label>
            </td>
              <td  style={{  width: '40%' }}>
                    <InputText 
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setjobTitle(e.target.value);
                    }}
                    />
                   
              </td>
              <td style={{  width: '10%' }}>
              <label htmlFor="firstname1">{t("leads.company")}</label>
              </td>
          <td style={{  width: '40%' }}>
                     
                      
                  
                      <Dropdown 
                      id="company"
                      value={company}
                      options={Clients} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcompany(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.industry")}</label>  
            </td>
              <td  >
                 
                    <InputText 
                    id="industry"
                    value={industry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setindustry(e.target.value);
                    }}
                    />
                    
              </td>
              <td ><label htmlFor="firstname1">{t("leads.website")}</label></td>
          <td  >
                   
                 
                    <InputText 
                    id="website"
                    value={website}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setwebsite(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.email")}</label>
            </td>
              <td >
                    <InputText 
                    id="email"
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
                  
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.phoneNumber")}</label>
              </td>
          <td >
                  
                   
                   
                    <InputText 
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.mobileNumber")}</label>
            </td>
              <td  >
                    <InputText 
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.faxNumber")}</label>
              </td>
          <td >
                
                    
                  
                    <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.remark")}</label>
            </td>
              <td >
                 
                   
               
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.leadOwner")}</label>
              </td>
          <td >
                 
                     
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="leadOwner"
                      value={leadOwner}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setleadOwner(e.value);
                      }}
                      />
                    
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.leadPool")}</label>
            </td>
              <td  >
     
                    <Dropdown 
                    id="leadPool"
                    value={leadPool}
                    options={LeadPools}
                    optionLabel="name" 
                    optionValue="code"                
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setleadPool(e.value);
                    }}
                    />
                   
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.campaign")}</label>
              </td>
          <td >
                   
                       
                     
                      <Dropdown 
                      id="campaign"
                      value={campaign}
                      options={Activitys}
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcampaign(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.source")}</label>
            </td>
              <td  >
             
                    <Dropdown 
                    id="source"
                    value={source}
                    options={fhsourceItems}
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsource(e.value);
                    }}
                    />
                    
              </td>
              <td>
              <label htmlFor="firstname1">{t("leads.streetRoad")}</label>
              </td>
          <td >
                     
                      <InputText 
                      id="streetRoad"
                      value={streetRoad}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.target.value));
                       setstreetRoad(e.target.value);
                      }}
                      />
                      
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.city")}</label>
            </td>
              <td  >
               
                    <InputText 
                    id="city"
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
                   
              </td>
              <td >
              <label htmlFor="firstname1">{t("leads.ctate")}</label>
              </td>
          <td >
               
                    <InputText 
                    id="ctate"
                    value={ctate}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setctate(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.postCode")}</label>
            </td>
              <td >
                    
                    <InputText 
                    id="postCode"
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
                    
              </td>
              <td>  <label htmlFor="firstname1">{t("leads.country")}</label></td>
          <td>
                   
                      <Dropdown 
                      id="country"
                      value={country}
                      options={Countrys}
                      optionLabel="name" 
                      optionValue="code"                   
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcountry(e.value);
                      }}
                      />
                     
                </td>
                </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.linkedIn")}</label>
            </td>
              <td >
                  
                    <InputText 
                    id="linkedIn"
                    value={linkedIn}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlinkedIn(e.target.value);
                    }}
                    />
                  
              </td>
              <td> <label htmlFor="firstname1">{t("leads.satus")}</label></td>
          <td  >
                    
                      <Dropdown 
                      id="satus"
                      options={fhStatusItems}
                      value={satus}
                      optionLabel="name" 
                      optionValue="code"                    
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setsatus(e.value);
                      }}
                      />
                    
                </td>
                </tr>
   


          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.isactived")}</label>
            </td>
          <td >
               
                <Dropdown 
                value={isactived} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 ///setIsactived(e.value);
                }}  placeholder={t("leads.isactived")} />
            
          </td>
          <td > <label htmlFor="firstname1">{t("leads.islocked")}</label></td> 
          <td  >
                
               
             
                <Dropdown 
                value={islocked} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("leads.islocked")} />
              
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.createdAt")}</label>
            </td>
            <td >
         
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  placeholder={t("leads.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td >
          <label htmlFor="firstname1">{t("leads.updatedAt")}</label>
          </td>
          <td >
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  placeholder={t("leads.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                />
                
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("leads.createUid")}</label>
            </td>
          <td >
             
                <Dropdown 
                value={createUid} 
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("leads.createUid")} />
              
                
          </td>
          <td ><label htmlFor="firstname1">{t("leads.updatedUid")}</label></td>
          <td >
       
          <Dropdown 
                value={updatedUid} 
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("leads.updatedUid")} />
              
          </td>
          </tr>



          <tr>
          <td colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/leads");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
        
          <td colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/leads");}}
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
