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
import { ClientController } from '../../controllers/ClientController';
import { CountryController } from '../../controllers/CountryController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
const { nanoid } = require('nanoid');
export type ClientItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function ClientItem({ Id, Mode }: ClientItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <ClientItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <ClientItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <ClientItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <ClientItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const ClientItemAdd =({ Id, Mode }: ClientItemProps) => {
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
  const[client, setclient] = useState(null);
  const[clientState, setclientState] = useState(null);
  const[type, settype] = useState(null);
  const[accountOwner, setaccountOwner] = useState(null);
  const[regNumber, setregNumber] = useState("");
  const[industry, setindustry] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[website, setwebsite] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState("");
  const[don, setdon] = useState("");
  const[ref, setref] = useState("");
  const[additionalField4, setadditionalField4] = useState("");
  const[additionalField5, setadditionalField5] = useState("");

  const [FHUsers, setFHUsers] = useState([]);
  const [Countrys, setCountrys] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlClient=new ClientController();
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

    const fhitemType = [
      { name: t("client.fhitemType1"), code: '0' },
      { name: t("client.fhitemType2"), code: '1' },
    ];
    useEffect(() => {

      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      });

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
                    <label htmlFor="firstname1">{t("client.client")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="name"
                    value={name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.clientState")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown
                    id="clientState"
                    options={fhStatusItems} 
                    optionLabel="name" 
                    optionValue="code"
                    value={clientState}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setclientState(e.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.type")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown
                    id="type"
                    options={fhitemType} 
                    value={type}
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settype(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("client.accountOwner")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                        id="accountOwner"
                        value={accountOwner}
                        options={FHUsers} 
                        optionLabel="name" 
                        optionValue="code"
                        onChange={(e: { value: any}) => {
                        console.info('e.value:'+JSON.stringify(e.value));
                        setaccountOwner(e.value);
                        }}  />  
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.regNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="regNumber"
                    value={regNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setregNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.industry")}</label>
                    <div style={{height:10}}></div>
                    <InputText 
                    id="industry"
                    value={industry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setindustry(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.phoneNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.website")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="website"
                    value={website}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setwebsite(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.faxNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.street")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="street"
                    value={street}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstreet(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.city")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="city"
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.state")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="state"
                    value={state}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstate(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.postCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="postCode"
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("client.country")}</label>
                      <div style={{height:10}}> </div>
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
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.don")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="don"
                    value={don}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdon(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.ref")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="ref"
                    value={ref}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.additionalField4")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additionalField4"
                    value={additionalField4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField4(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.additionalField5")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additionalField5"
                    value={additionalField5}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField5(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.isactived")}</label>
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
                }}  placeholder={t("client.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.islocked")}</label>
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
                }}  placeholder={t("client.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("client.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("client.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("client.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("client.createUid")}</label>
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
                }}  placeholder={t("client.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.updatedUid")}</label>
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
                }}  placeholder={t("client.updatedUid")} />
               </div>  
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/client");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlClient.createClient({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,  
                        clientState:clientState,
                        type:type,
                        accountOwner:accountOwner,
                        regNumber:regNumber,
                        industry:industry,
                        phoneNumber:phoneNumber,
                        website:website,
                        faxNumber:faxNumber,
                        street:street,
                        city:city,
                        state:state,
                        postCode:postCode,
                        country:country,
                        don:don,
                        ref:ref,
                        additionalField4:additionalField4,
                        additionalField5:additionalField5                       
                      });
                      replace("/client");
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

export const ClientItemEdit =({ Id, Mode }: ClientItemProps) => {
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
  const[client, setclient] = useState(null);
  const[clientState, setclientState] = useState(null);
  const[type, settype] = useState(null);
  const[accountOwner, setaccountOwner] = useState(null);
  const[regNumber, setregNumber] = useState("");
  const[industry, setindustry] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[website, setwebsite] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState("");
  const[don, setdon] = useState("");
  const[ref, setref] = useState("");
  const[additionalField4, setadditionalField4] = useState("");
  const[additionalField5, setadditionalField5] = useState("");

  const [FHUsers, setFHUsers] = useState([]);
  const [Countrys, setCountrys] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlClient=new ClientController();
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
    const fhitemType = [
      { name: t("client.fhitemType1"), code: '0' },
      { name: t("client.fhitemType2"), code: '1' },
    ];
    const fhStatusItems = [
      { name: 'Track', code: '0' },
      { name: 'Stop it', code: '1' },
    ];


    useEffect(() => {
      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      });
      
      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlClient.getClientById(Id).then((data)=>{
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
            setclientState(data.clientState);
            settype(data.type);
            setaccountOwner(data.accountOwner);
            setregNumber(data.regNumber);
            setindustry(data.industry);
            setphoneNumber(data.phoneNumber);
            setwebsite(data.website);
            setfaxNumber(data.faxNumber);
            setstreet(data.street);
            setcity(data.city);
            setstate(data.state);
            setpostCode(data.postCode);
            setcountry(data.country);
            setdon(data.don);
            setref(data.ref);
            setadditionalField4(data.additionalField4);
            setadditionalField5(data.additionalField5);

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
                    <label htmlFor="firstname1">{t("client.client")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="name"
                    value={name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.clientState")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown

                    id="clientState"
                    value={clientState}
                    options={fhStatusItems} 
                    optionLabel="name" 
                    optionValue="code"                   
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setclientState(e.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.type")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown
                    id="type"
                    value={type}
                    options={fhitemType}
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settype(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("client.accountOwner")}</label>
                      <div style={{height:10}}> </div>
                        <Dropdown 
                        id="accountOwner"
                        value={accountOwner}
                        options={FHUsers} 
                        optionLabel="name" 
                        optionValue="code"
                        onChange={(e: { value: any}) => {
                        console.info('e.value:'+JSON.stringify(e.value));
                        setaccountOwner(e.value);
                        }}  />            
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.regNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="regNumber"
                    value={regNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setregNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.industry")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="industry"
                    value={industry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setindustry(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.phoneNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.website")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="website"
                    value={website}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setwebsite(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.faxNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.street")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="street"
                    value={street}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstreet(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.city")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="city"
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.state")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="state"
                    value={state}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstate(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.postCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="postCode"
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("client.country")}</label>
                      <div style={{height:10}}> </div>
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
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.don")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="don"
                    value={don}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdon(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.ref")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="ref"
                    value={ref}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.additionalField4")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additionalField4"
                    value={additionalField4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField4(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.additionalField5")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additionalField5"
                    value={additionalField5}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField5(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.isactived")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 

                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("client.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.islocked")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 

                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("client.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("client.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("client.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("client.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("client.createUid")}</label>
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
                }}  placeholder={t("client.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.updatedUid")}</label>
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
                }}  placeholder={t("client.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/client");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlClient.updateClientv2({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        clientState:clientState,
                        type:type,
                        accountOwner:accountOwner,
                        regNumber:regNumber,
                        industry:industry,
                        phoneNumber:phoneNumber,
                        website:website,
                        faxNumber:faxNumber,
                        street:street,
                        city:city,
                        state:state,
                        postCode:postCode,
                        country:country,
                        don:don,
                        ref:ref,
                        additionalField4:additionalField4,
                        additionalField5:additionalField5                      
                      },Id,userID);
                      replace("/client");
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


export const ClientItemView =({ Id, Mode }: ClientItemProps) => {
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
  const[client, setclient] = useState(null);
  const[clientState, setclientState] = useState(null);
  const[type, settype] = useState(null);
  const[accountOwner, setaccountOwner] = useState(null);
  const[regNumber, setregNumber] = useState("");
  const[industry, setindustry] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[website, setwebsite] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState("");
  const[don, setdon] = useState("");
  const[ref, setref] = useState("");
  const[additionalField4, setadditionalField4] = useState("");
  const[additionalField5, setadditionalField5] = useState("");

  const [FHUsers, setFHUsers] = useState([]);
  const [Countrys, setCountrys] = useState([]);
  
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlClient=new ClientController();
  
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
    const fhitemType = [
      { name: t("client.fhitemType1"), code: '0' },
      { name: t("client.fhitemType2"), code: '1' },
    ];
    useEffect(() => {
      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      });
      
      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);
      getCountrys().then((data)=>{
            setCountrys(data);
      });
      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlClient.getClientById(Id).then((data)=>{
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
            setclientState(data.clientState);
            settype(data.type);
            setaccountOwner(data.accountOwner);
            setregNumber(data.regNumber);
            setindustry(data.industry);
            setphoneNumber(data.phoneNumber);
            setwebsite(data.website);
            setfaxNumber(data.faxNumber);
            setstreet(data.street);
            setcity(data.city);
            setstate(data.state);
            setpostCode(data.postCode);
            setcountry(data.country);
            setdon(data.don);
            setref(data.ref);
            setadditionalField4(data.additionalField4);
            setadditionalField5(data.additionalField5);

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
                    <label htmlFor="firstname1">{t("client.client")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="name"
                    value={name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.clientState")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown
                    id="clientState"
                    value={clientState}
                    options={fhStatusItems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setclientState(e.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.type")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    options={fhitemType}
                    id="type"
                    value={type}
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settype(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("client.accountOwner")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                        id="accountOwner"
                        value={accountOwner}
                        options={FHUsers} 
                        optionLabel="name" 
                        optionValue="code"
                        onChange={(e: { value: any}) => {
                        console.info('e.value:'+JSON.stringify(e.value));
                        setaccountOwner(e.value);
                        }}  />  
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.regNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="regNumber"
                    value={regNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setregNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.industry")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="industry"
                    value={industry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setindustry(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.phoneNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.website")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="website"
                    value={website}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setwebsite(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.faxNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.street")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="street"
                    value={street}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstreet(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.city")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="city"
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.state")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="state"
                    value={state}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstate(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.postCode")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="postCode"
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("client.country")}</label>
                      <div style={{height:10}}> </div>
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
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.don")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="don"
                    value={don}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdon(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.ref")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="ref"
                    value={ref}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("client.additionalField4")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additionalField4"
                    value={additionalField4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField4(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("client.additionalField5")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additionalField5"
                    value={additionalField5}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField5(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.isactived")}</label>
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
                }}  placeholder={t("client.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.islocked")}</label>
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
                }}  placeholder={t("client.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("client.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("client.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("client.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("client.createUid")}</label>
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
                }}  placeholder={t("client.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("client.updatedUid")}</label>
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
                }}  placeholder={t("client.updatedUid")} />
               </div>  
          </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/client");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/client");}}
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
