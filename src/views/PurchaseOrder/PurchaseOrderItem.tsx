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
import { Column } from 'primereact/column';
import { MyDataTable } from '../../components/myDataTable/DataTable';
import { Dialog } from 'primereact/dialog';
import { UserController } from '../../controllers/UserController';
import { PurchaseOrderController } from '../../controllers/PurchaseOrderController';
import { TaxesController } from '../../controllers/TaxesController';
import { CurrencyController } from '../../controllers/CurrencyController';
import { TermConditionController } from '../../controllers/TermConditionController';
import { QuotationController } from '../../controllers/QuotationController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
import { PurchaseItemList } from '../PurchaseItem/PurchaseItemList';
const { nanoid } = require('nanoid');
export type PurchaseOrderItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function PurchaseOrderItem({ Id, Mode }: PurchaseOrderItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <PurchaseOrderItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <PurchaseOrderItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <PurchaseOrderItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <PurchaseOrderItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const PurchaseOrderItemAdd =({ Id, Mode }: PurchaseOrderItemProps) => {
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
  const[currency, setcurrency] = useState(null);
  const[taxes, settaxes] = useState(null);
  const[contact, setcontact] = useState(null);
  const[paymentTerms, setpaymentTerms] = useState('');
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlPurchaseOrder=new PurchaseOrderController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');


  const[currencys, setcurrencys] = useState([]);
  const[taxs, settaxs] = useState([]);
  const[termConditions, settermConditions] = useState([]);
  const[client, setclient] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlQuotation = new QuotationController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;

    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    async function getTaxes()
    {
        const ctlCountry=new TaxesController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }

    async function getCurrencys()
    {
        const ctlCountry=new CurrencyController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }
    
    async function getTermConditions()
    {
        const ctlTermCondition=new TermConditionController();
        const fhojts = await ctlTermCondition.getAllView();
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
 
    useEffect(() => {

      getTaxes().then((data)=>{
        console.log('Country_data:'+JSON.stringify(data));
        settaxs(data);
      }); 

        getCurrencys().then((data)=>{
              console.log('Country_data:'+JSON.stringify(data));
            
              setcurrencys(data);
        }); 
        getTermConditions().then((data)=>{
          console.log('Country_data:'+JSON.stringify(data));
        
          settermConditions(data);
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
          <td colSpan={4}> 
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>
          <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("purchaseOrder.name")}</label>
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
          </tr>
          {/* <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("purchaseOrder.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr> */}
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("purchaseOrder.refNumber")}</label>
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
                       <label htmlFor="firstname1">{t("purchaseOrder.currency")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="currency"
                      value={currency}
                      options={currencys} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcurrency(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("purchaseOrder.taxes")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="taxes"
                    value={taxes}
                    options={taxs} 
                    optionLabel="name" 
                    optionValue="code"  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settaxes(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("purchaseOrder.contact")}</label>
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
                  <td colSpan={4}>
                      <div className="p-field p-col-12 p-md-12">
                      <label htmlFor="firstname1">{t("purchaseOrder.paymentTerms")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="paymentTerms"
                      value={paymentTerms}
                      options={termConditions} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setpaymentTerms(e.value);
                      }}
                      />
                      </div>
                  </td>
                </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("purchaseOrder.remark")}</label>
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
                <label htmlFor="firstname1">{t("purchaseOrder.isactived")}</label>
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
                }}  placeholder={t("purchaseOrder.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.islocked")}</label>
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
                }}  placeholder={t("purchaseOrder.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("purchaseOrder.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("purchaseOrder.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("purchaseOrder.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("purchaseOrder.createUid")}</label>
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
                }}  placeholder={t("purchaseOrder.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.updatedUid")}</label>
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
                }}  placeholder={t("purchaseOrder.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="产品信息">
                    <PurchaseItemList mid={FHid}></PurchaseItemList>
                    </TabPanel>
                   
                </TabView>
             
            </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/purchaseorder");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlPurchaseOrder.createPurchaseOrder({
                        id:FHid,
                        name:name,
                        
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,  
                        refNumber:refNumber,
                        currency:currency,
                        taxes:taxes,
                        contact:contact,
                        paymentTerms:paymentTerms,
                        remark:remark,                      
                      });
                      replace("/purchaseorder");
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

export const PurchaseOrderItemEdit =({ Id, Mode }: PurchaseOrderItemProps) => {
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
  const[currency, setcurrency] = useState(null);
  const[taxes, settaxes] = useState(null);
  const[contact, setcontact] = useState(null);
  const[paymentTerms, setpaymentTerms] = useState('');
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlPurchaseOrder=new PurchaseOrderController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');


  const[currencys, setcurrencys] = useState([]);
  const[taxs, settaxs] = useState([]);
  const[termConditions, settermConditions] = useState([]);
  const[client, setclient] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlQuotation = new QuotationController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;

    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    async function getTaxes()
    {
        const ctlCountry=new TaxesController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }

    async function getCurrencys()
    {
        const ctlCountry=new CurrencyController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }
    
    async function getTermConditions()
    {
        const ctlTermCondition=new TermConditionController();
        const fhojts = await ctlTermCondition.getAllView();
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
 
    useEffect(() => {
      getTaxes().then((data)=>{
        console.log('Country_data:'+JSON.stringify(data));
        settaxs(data);
      }); 

        getCurrencys().then((data)=>{
              console.log('Country_data:'+JSON.stringify(data));
            
              setcurrencys(data);
        }); 
        getTermConditions().then((data)=>{
          console.log('Country_data:'+JSON.stringify(data));
        
          settermConditions(data);
       }); 



      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlPurchaseOrder.getPurchaseOrderById(Id).then((data)=>{
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
            setcurrency(data.currency);
            settaxes(data.taxes);
            setcontact(data.contact);
            setpaymentTerms(data.paymentTerms);
            setremark(data.remark);
          });
      });
    }, []);
    useEffect(() => {
      getTaxes().then((data)=>{
        console.log('Country_data:'+JSON.stringify(data));
        settaxs(data);
      }); 

        getCurrencys().then((data)=>{
              console.log('Country_data:'+JSON.stringify(data));
            
              setcurrencys(data);
        }); 
        getTermConditions().then((data)=>{
          console.log('Country_data:'+JSON.stringify(data));
        
          settermConditions(data);
       }); 



      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlPurchaseOrder.getPurchaseOrderById(Id).then((data)=>{
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
            setcurrency(data.currency);
            settaxes(data.taxes);
            setcontact(data.contact);
            setpaymentTerms(data.paymentTerms);
            setremark(data.remark);
          });
      });
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
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("purchaseOrder.name")}</label>
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
          </tr>
          {/* <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("purchaseOrder.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr> */}
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("purchaseOrder.refNumber")}</label>
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
                       <label htmlFor="firstname1">{t("purchaseOrder.currency")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="currency"
                      value={currency}
                      options={currencys} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcurrency(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("purchaseOrder.taxes")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="taxes"
                    value={taxes}
                    options={taxs} 
                    optionLabel="name" 
                    optionValue="code"  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settaxes(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("purchaseOrder.contact")}</label>
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
                  <td colSpan={4}>
                      <div className="p-field p-col-12 p-md-12">
                      <label htmlFor="firstname1">{t("purchaseOrder.paymentTerms")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="paymentTerms"
                      value={paymentTerms}
                      options={termConditions} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setpaymentTerms(e.value);
                      }}
                      />
                      </div>
                  </td>
                </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("purchaseOrder.remark")}</label>
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
                <label htmlFor="firstname1">{t("purchaseOrder.isactived")}</label>
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
                }}  placeholder={t("purchaseOrder.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.islocked")}</label>
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
                }}  placeholder={t("purchaseOrder.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("purchaseOrder.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("purchaseOrder.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("purchaseOrder.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("purchaseOrder.createUid")}</label>
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
                }}  placeholder={t("purchaseOrder.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.updatedUid")}</label>
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
                }}  placeholder={t("purchaseOrder.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
                <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="产品信息">
                    <PurchaseItemList mid={FHid}
                        FHonChange={(e:any) => {
                          setVal(e);
                        }}/> 
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/purchaseorder");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlPurchaseOrder.updatePurchaseOrderv2({
                        id:FHid,
                        name:name,
                        isactived:"0",
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        refNumber:refNumber,
                        currency:currency,
                        taxes:taxes,
                        contact:contact,
                        paymentTerms:paymentTerms,
                        remark:remark,                        
                      },Id,userID);
                      replace("/purchaseorder");
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


export const PurchaseOrderItemView =({ Id, Mode }: PurchaseOrderItemProps) => {
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
  const[currency, setcurrency] = useState(null);
  const[taxes, settaxes] = useState(null);
  const[contact, setcontact] = useState(null);
  const[paymentTerms, setpaymentTerms] = useState('');
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlPurchaseOrder=new PurchaseOrderController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');


  const[currencys, setcurrencys] = useState([]);
  const[taxs, settaxs] = useState([]);
  const[termConditions, settermConditions] = useState([]);
  const[client, setclient] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlQuotation = new QuotationController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;

    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    async function getTaxes()
    {
        const ctlCountry=new TaxesController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }

    async function getCurrencys()
    {
        const ctlCountry=new CurrencyController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }
    
    async function getTermConditions()
    {
        const ctlTermCondition=new TermConditionController();
        const fhojts = await ctlTermCondition.getAllView();
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
 
    useEffect(() => {
      getTaxes().then((data)=>{
        console.log('Country_data:'+JSON.stringify(data));
        settaxs(data);
      }); 

        getCurrencys().then((data)=>{
              console.log('Country_data:'+JSON.stringify(data));
            
              setcurrencys(data);
        }); 
        getTermConditions().then((data)=>{
          console.log('Country_data:'+JSON.stringify(data));
        
          settermConditions(data);
       }); 
      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlPurchaseOrder.getPurchaseOrderById(Id).then((data)=>{
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
            setcurrency(data.currency);
            settaxes(data.taxes);
            setcontact(data.contact);
            setpaymentTerms(data.paymentTerms);
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
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("purchaseOrder.name")}</label>
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
          </tr>
          {/* <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("purchaseOrder.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr> */}
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("purchaseOrder.refNumber")}</label>
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
                       <label htmlFor="firstname1">{t("purchaseOrder.currency")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="currency"
                      value={currency}
                      options={currencys} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcurrency(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("purchaseOrder.taxes")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="taxes"
                    value={taxes}
                    options={taxs} 
                    optionLabel="name" 
                    optionValue="code"  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settaxes(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("purchaseOrder.contact")}</label>
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
                  <td colSpan={4}>
                      <div className="p-field p-col-12 p-md-12">
                      <label htmlFor="firstname1">{t("purchaseOrder.paymentTerms")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="paymentTerms"
                      value={paymentTerms}
                      options={termConditions} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setpaymentTerms(e.value);
                      }}
                      />
                      </div>
                  </td>
                </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("purchaseOrder.remark")}</label>
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
                <label htmlFor="firstname1">{t("purchaseOrder.isactived")}</label>
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
                }}  placeholder={t("purchaseOrder.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.islocked")}</label>
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
                }}  placeholder={t("purchaseOrder.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("purchaseOrder.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("purchaseOrder.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("purchaseOrder.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("purchaseOrder.createUid")}</label>
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
                }}  placeholder={t("purchaseOrder.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("purchaseOrder.updatedUid")}</label>
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
                }}  placeholder={t("purchaseOrder.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
               <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="产品信息">
                    <PurchaseItemList mid={FHid}></PurchaseItemList>
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>

          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/purchaseorder");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/purchaseorder");}}
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
