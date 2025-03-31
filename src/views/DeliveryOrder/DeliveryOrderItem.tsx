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
import { DeliveryOrderController } from '../../controllers/DeliveryOrderController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
import { DeliveryItemList } from '../DeliveryItem/DeliveryItemList';

import { ClientController } from '../../controllers/ClientController';
import { CountryController } from '../../controllers/CountryController';
import { InvoiceDetailsController } from '../../controllers/InvoiceDetailsController';

const { nanoid } = require('nanoid');
export type DeliveryOrderItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function DeliveryOrderItem({ Id, Mode }: DeliveryOrderItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <DeliveryOrderItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <DeliveryOrderItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <DeliveryOrderItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <DeliveryOrderItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const DeliveryOrderItemAdd =({ Id, Mode }: DeliveryOrderItemProps) => {
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
  const[refNumber, setrefNumber] = useState("");
  const[linkedInvoice, setlinkedInvoice] = useState([]);
  const[deliveryName, setdeliveryName] = useState("");
  const[clientCompany, setclientCompany] = useState("");
  const[deliveryDate, setdeliveryDate] = useState(null);
  const[clientContact, setclientContact] = useState(null);
  const[creator, setcreator] = useState(null);
  const[postCode, setpostCode] = useState("");
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[country, setcountry] = useState(null);
  const[termsConditions, settermsConditions] = useState('');
  const[remark, setremark] = useState('');
  const [Countrys, setCountrys] = useState([]);
  const [clientCompanys, setclientCompanys] = useState([]);
  const [InvoiceDetails, setInvoiceDetails] = useState([]);
  


  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlDeliveryOrder=new DeliveryOrderController();
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

    async function getclientCompanys()
    {
        const ctlCountry=new ClientController();
        const fhojts = await ctlCountry.getClientAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }  
    async function getInvoiceDetails()
    {
        const ctlCountry=new InvoiceDetailsController();
        const fhojts = await ctlCountry.getInvoiceDetailsAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.refNumber }));;
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

   getCountrys().then((data)=>{
        console.log('Country_data:'+JSON.stringify(data));
        setCountrys(data);
     });

     getclientCompanys().then((data)=>{
      console.log('Country_data:'+JSON.stringify(data));
      setclientCompanys(data);
   });

   
   getInvoiceDetails().then((data)=>{
    console.log('Country_data:'+JSON.stringify(data));
    setInvoiceDetails(data);
   });

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
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>

         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.refNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="refNumber"
                    value={refNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrefNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.linkedInvoice")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="linkedInvoice"
                      value={linkedInvoice}
                      options={InvoiceDetails} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setlinkedInvoice(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.deliveryName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="deliveryName"
                    value={deliveryName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdeliveryName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.clientCompany")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="clientCompany"
                      value={clientCompany}
                      
                      options={clientCompanys} 
                      optionLabel="name" 
                      optionValue="code"
                      
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclientCompany(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.deliveryDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="deliveryDate"
                    value={deliveryDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setdeliveryDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.clientContact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="clientContact"
                      value={clientContact}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclientContact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.creator")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="creator"
                    value={creator}
                    options={FHUsers} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setcreator(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("deliveryOrder.postCode")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.street")}</label>
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
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("deliveryOrder.city")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.state")}</label>
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
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.country")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="country"
                      options={Countrys} 
                      optionLabel="name" 
                      optionValue="code"
                      value={country}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcountry(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("deliveryOrder.termsConditions")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="termsConditions"
                    value={termsConditions}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settermsConditions(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("deliveryOrder.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.isactived")}</label>
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
                }}  placeholder={t("deliveryOrder.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.islocked")}</label>
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
                }}  placeholder={t("deliveryOrder.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("deliveryOrder.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("deliveryOrder.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("deliveryOrder.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("deliveryOrder.createUid")}</label>
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
                }}  placeholder={t("deliveryOrder.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.updatedUid")}</label>
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
                }}  placeholder={t("deliveryOrder.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="详细信息">
                    <DeliveryItemList mid={FHid}></DeliveryItemList>
                    </TabPanel>
                   
                </TabView>
             
            </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/deliveryorder");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlDeliveryOrder.createDeliveryOrder({
                        id:FHid,
                        name:name,
                       
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        refNumber:refNumber,
                        linkedInvoice:linkedInvoice,
                        deliveryName:deliveryName,
                        clientCompany:clientCompany,
                        deliveryDate:deliveryDate,
                        clientContact:clientContact,
                        creator:creator,
                        postCode:postCode,
                        street:street,
                        city:city,
                        state:state,
                        country:country,
                        termsConditions:termsConditions,
                        remark:remark                        
                      });
                      replace("/deliveryorder");
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

export const DeliveryOrderItemEdit =({ Id, Mode }: DeliveryOrderItemProps) => {
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
  const[refNumber, setrefNumber] = useState("");
  const[linkedInvoice, setlinkedInvoice] = useState([]);
  const[deliveryName, setdeliveryName] = useState("");
  const[clientCompany, setclientCompany] = useState("");
  const[deliveryDate, setdeliveryDate] = useState<null | string | Date | Date[]>(null);
  const[clientContact, setclientContact] = useState(null);
  const[creator, setcreator] = useState(null);
  const[postCode, setpostCode] = useState("");
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[country, setcountry] = useState(null);
  const[termsConditions, settermsConditions] = useState('');
  const[remark, setremark] = useState('');
  const [Countrys, setCountrys] = useState([]);
  const [clientCompanys, setclientCompanys] = useState([]);
  const [InvoiceDetails, setInvoiceDetails] = useState([]);
  


  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlDeliveryOrder=new DeliveryOrderController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  const [val, setVal] = useState("");
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

    async function getclientCompanys()
    {
        const ctlCountry=new ClientController();
        const fhojts = await ctlCountry.getClientAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }  
    async function getInvoiceDetails()
    {
        const ctlCountry=new InvoiceDetailsController();
        const fhojts = await ctlCountry.getInvoiceDetailsAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.refNumber }));;
    }  
    async function fn()
    {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      getCountrys().then((data)=>{
        console.log('Country_data:'+JSON.stringify(data));
        setCountrys(data);
     });

     getclientCompanys().then((data)=>{
      console.log('Country_data:'+JSON.stringify(data));
      setclientCompanys(data);
   });

   
   getInvoiceDetails().then((data)=>{
    console.log('Country_data:'+JSON.stringify(data));
    setInvoiceDetails(data);
   });   
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlDeliveryOrder.getDeliveryOrderById(Id).then((data)=>{
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
            setrefNumber(data.refNumber);
            setlinkedInvoice(data.linkedInvoice);
            setdeliveryName(data.deliveryName);
            setclientCompany(data.clientCompany);
            setdeliveryDate(new Date(data.deliveryDate));
            setclientContact(data.clientContact);
            setcreator(data.creator);
            setpostCode(data.postCode);
            setstreet(data.street);
            setcity(data.city);
            setstate(data.state);
            setcountry(data.country);
            settermsConditions(data.termsConditions);
            setremark(data.remark);
          });
      });
    };

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
      fn();
    }, []);
    useEffect(() => {
      fn();
    }, [val]);
  return (
  <Card>     
      <div className="p-fluid p-formgrid p-grid">
     <table width="98%">
      <thead>
      </thead>
      <tbody>

          <tr>
          <td colSpan={4}> 
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>  



          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.refNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="refNumber"
                    value={refNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrefNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.linkedInvoice")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="linkedInvoice"
                      value={linkedInvoice}
                      options={InvoiceDetails} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setlinkedInvoice(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.deliveryName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="deliveryName"
                    value={deliveryName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdeliveryName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.clientCompany")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="clientCompany"
                      value={clientCompany}
                      options={clientCompanys} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclientCompany(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.deliveryDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="deliveryDate"
                    value={deliveryDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setdeliveryDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.clientContact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="clientContact"
                      value={clientContact}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclientContact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.creator")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="creator"
                    value={creator}
                    options={FHUsers} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setcreator(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("deliveryOrder.postCode")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.street")}</label>
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
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("deliveryOrder.city")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.state")}</label>
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
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.country")}</label>
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
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("deliveryOrder.termsConditions")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="termsConditions"
                    value={termsConditions}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settermsConditions(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("deliveryOrder.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.isactived")}</label>
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
                }}  placeholder={t("deliveryOrder.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.islocked")}</label>
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
                }}  placeholder={t("deliveryOrder.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("deliveryOrder.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("deliveryOrder.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("deliveryOrder.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("deliveryOrder.createUid")}</label>
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
                }}  placeholder={t("deliveryOrder.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.updatedUid")}</label>
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
                }}  placeholder={t("deliveryOrder.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
               <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="详细信息">
                    <DeliveryItemList mid={FHid}
                      FHonChange={(e:any) => {
                        setVal(e);
                      }}                   
                    ></DeliveryItemList>
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/deliveryorder");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlDeliveryOrder.updateDeliveryOrderv2({
                        id:FHid,
                        name:name,
                        isactived:"0",
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,
                        refNumber:refNumber,
                        linkedInvoice:linkedInvoice,
                        deliveryName:deliveryName,
                        clientCompany:clientCompany,
                        deliveryDate:new Date(deliveryDate),
                        clientContact:clientContact,
                        creator:creator,
                        postCode:postCode,
                        street:street,
                        city:city,
                        state:state,
                        country:country,
                        termsConditions:termsConditions,
                        remark:remark                       
                      },Id,userID);
                      const mynanoid: string = nanoid();
                      setVal(mynanoid);
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


export const DeliveryOrderItemView =({ Id, Mode }: DeliveryOrderItemProps) => {
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
  const[refNumber, setrefNumber] = useState("");
  const[linkedInvoice, setlinkedInvoice] = useState([]);
  const[deliveryName, setdeliveryName] = useState("");
  const[clientCompany, setclientCompany] = useState("");
  const[deliveryDate, setdeliveryDate] = useState<null | string | Date | Date[]>(null);
  const[clientContact, setclientContact] = useState(null);
  const[creator, setcreator] = useState(null);
  const[postCode, setpostCode] = useState("");
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[country, setcountry] = useState(null);
  const[termsConditions, settermsConditions] = useState('');
  const[remark, setremark] = useState('');
  const [Countrys, setCountrys] = useState([]);
  const [clientCompanys, setclientCompanys] = useState([]);
  const [InvoiceDetails, setInvoiceDetails] = useState([]);
  


  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlDeliveryOrder=new DeliveryOrderController();
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

    async function getclientCompanys()
    {
        const ctlCountry=new ClientController();
        const fhojts = await ctlCountry.getClientAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }  
    async function getInvoiceDetails()
    {
        const ctlCountry=new InvoiceDetailsController();
        const fhojts = await ctlCountry.getInvoiceDetailsAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.refNumber }));;
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

      getCountrys().then((data)=>{
        console.log('Country_data:'+JSON.stringify(data));
        setCountrys(data);
     });

     getclientCompanys().then((data)=>{
      console.log('Country_data:'+JSON.stringify(data));
      setclientCompanys(data);
   });

   
   getInvoiceDetails().then((data)=>{
    console.log('Country_data:'+JSON.stringify(data));
    setInvoiceDetails(data);
   });
      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlDeliveryOrder.getDeliveryOrderById(Id).then((data)=>{
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
            setrefNumber(data.refNumber);
            setlinkedInvoice(data.linkedInvoice);
            setdeliveryName(data.deliveryName);
            setclientCompany(data.clientCompany);
            setdeliveryDate(new Date(data.deliveryDate));
            setclientContact(data.clientContact);
            setcreator(data.creator);
            setpostCode(data.postCode);
            setstreet(data.street);
            setcity(data.city);
            setstate(data.state);
            setcountry(data.country);
            settermsConditions(data.termsConditions);
            setremark(data.remark);
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
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>      


          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.refNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="refNumber"
                    value={refNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrefNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.linkedInvoice")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="linkedInvoice"
                      value={linkedInvoice}
                      options={InvoiceDetails} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setlinkedInvoice(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.deliveryName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="deliveryName"
                    value={deliveryName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdeliveryName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.clientCompany")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="clientCompany"
                      value={clientCompany}
                      options={clientCompanys} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclientCompany(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.deliveryDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="deliveryDate"
                    value={deliveryDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setdeliveryDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.clientContact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="clientContact"
                      value={clientContact}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclientContact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.creator")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="creator"
                    value={creator}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setcreator(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("deliveryOrder.postCode")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.street")}</label>
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
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("deliveryOrder.city")}</label>
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
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("deliveryOrder.state")}</label>
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
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("deliveryOrder.country")}</label>
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
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("deliveryOrder.termsConditions")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="termsConditions"
                    value={termsConditions}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settermsConditions(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("deliveryOrder.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.isactived")}</label>
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
                }}  placeholder={t("deliveryOrder.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.islocked")}</label>
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
                }}  placeholder={t("deliveryOrder.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("deliveryOrder.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("deliveryOrder.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("deliveryOrder.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("deliveryOrder.createUid")}</label>
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
                }}  placeholder={t("deliveryOrder.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("deliveryOrder.updatedUid")}</label>
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
                }}  placeholder={t("deliveryOrder.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="详细信息">
                    <DeliveryItemList mid={FHid}></DeliveryItemList>
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>

          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/deliveryorder");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/deliveryorder");}}
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
