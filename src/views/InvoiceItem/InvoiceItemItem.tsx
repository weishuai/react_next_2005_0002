import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import {useNavigate,useParams} from "react-router-dom";
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
import { InvoiceItemController } from '../../controllers/InvoiceItemController';
import { UnitController } from '../../controllers/UnitController';
import { globalStorage } from '../../utils/Globalstorage';

const { nanoid } = require('nanoid');
export type InvoiceItemItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
  mid: string;
};
export function InvoiceItemItem({ Id, Mode,mid }: InvoiceItemItemProps) {
  // let {Id, Mode,Mainid} = useParams();
    console.log('mymid:'+ mid);
    if (Mode == '0') {
      return <InvoiceItemItemAdd  Id={Id} Mode={Mode} mid={mid}/>;
    } 
    else if(Mode == '1')
    {
      return <InvoiceItemItemEdit Id={Id} Mode={Mode}  mid={mid}/>;
    } 
    else if(Mode == '2')
    {
      return <InvoiceItemItemView Id={Id} Mode={Mode}  mid={mid}/>;
    }
    else
    {
      return <InvoiceItemItemAdd  Id={Id} Mode={Mode} mid={mid}/>;
    }

}

export const InvoiceItemItemAdd =({ Id, Mode,mid }: InvoiceItemItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[qty, setqty] = useState(0);
  const[unit, setunit] = useState(0);
  const[unitPrice, setunitPrice] = useState(0);
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlunit=new UnitController();
  const ctlInvoiceItem=new InvoiceItemController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  const [fh_unit_items, setfh_unit_items] = useState([]);
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    
    // const fh_unit_items=[]
    async function getFHunits()
    {
        const ctlunit=new UnitController();
        const fhojts = await ctlunit.getAllView();
        console.log('fhojts:'+JSON.stringify(fhojts["fhok"]));
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));
        //return[]
    }

    const items = [
      {label: '草稿'},
      {label: '准备就绪'},
      {label: '驳回'},
      {label: '确认'}
  ];
    const fhitems = [
      { name: '使用', code: '0' },
      { name: '禁用', code: '1' },
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

      getFHunits().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setfh_unit_items(data);
      });


      console.log('mymid2:'+ mid);
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
                <label htmlFor="name">{t("invoiceItem.name")}</label>
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
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("invoiceItem.description")}</label>
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
          </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceItem.qty")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="qty"
                    showButtons
                    value={qty}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setqty(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                  <div className="p-field p-col-12 p-md-6">
                      <label htmlFor="firstname1">{t("invoiceItem.unitPrice")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="unitPrice"
                      showButtons
                      value={unitPrice}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setunitPrice(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
          <tr>
                     <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceItem.unit")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="unit"

                      options={fh_unit_items} 
                      optionLabel="name" 
                      optionValue="code"

                      value={unit}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setunit(e.value);
                      }}
                      />
                      </div>

                </td>
                <td width="2%"></td>
                <td  width="46%">
    
                </td>
                </tr> 
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("invoiceItem.remark")}</label>
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
                <label htmlFor="firstname1">{t("invoiceItem.isactived")}</label>
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
                }}  placeholder={t("invoiceItem.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.islocked")}</label>
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
                }}  placeholder={t("invoiceItem.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("invoiceItem.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceItem.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("invoiceItem.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceItem.createUid")}</label>
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
                }}  placeholder={t("invoiceItem.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.updatedUid")}</label>
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
                }}  placeholder={t("invoiceItem.updatedUid")} />
               </div>  
          </td>
          </tr>

 


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/invoicedetails/"+mid+"/1");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      console.log("qty");
                      console.log(qty);
                      ctlInvoiceItem.createInvoiceItem({
                        id:FHid,
                        name:name,
                        description:description,
                        unit:unit,
                        qty:qty,
                        unitPrice:unitPrice,
                        remark:remark,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        mid:mid                      
                      });
                      
                      // const[qty, setqty] = useState(0);
                      // const[unit, setunit] = useState(0);
                      // const[unitPrice, setunitPrice] = useState(0);
                      // const[remark, setremark] = useState('');
                      // let temps =globalStorage.get("temps");
                      // console.log("temps0:"); 
                      // console.log(temps); 
                      // if(temps==null)
                      // {
                      //   temps=[{id:"7777", name: "kenny", sex: "m", age: "25" }];
                      // }
                      // else{
                      //   temps.push({id:"7777", name: "kenny", sex: "m", age: "25" });
                      // }
                      
                      // console.log("temps");
                      // console.log(temps); 
                      // globalStorage.set("temps",temps);

                      // console.log("props.mid:"); 
                      // console.log(mid); 
                      replace("/invoicedetails/"+mid+"/1");
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

export const InvoiceItemItemEdit =({ Id, Mode,mid }: InvoiceItemItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[qty, setqty] = useState(0);
  const[unit, setunit] = useState(0);
  const[unitPrice, setunitPrice] = useState(0);
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlInvoiceItem=new InvoiceItemController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  const [fh_unit_items, setfh_unit_items] = useState([]);
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
 
    async function getFHunits()
    {
        const ctlunit=new UnitController();
        const fhojts = await ctlunit.getAllView();
        console.log('fhojts:'+JSON.stringify(fhojts["fhok"]));
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));
        //return[]
    }

   const items = [
        {label: '草稿'},
        {label: '准备就绪'},
        {label: '驳回'},
        {label: '确认'}
    ];
    const fhitems = [
      { name: '使用', code: '0' },
      { name: '禁用', code: '1' },
    ];
    const fn=async ()=>{
        await getFHusers().then((data)=>{
          console.log('data:'+JSON.stringify(data));
          setFHUsers(data);
           ctlInvoiceItem.getInvoiceItemById(Id).then((data)=>{
              console.log('data:ok1'+JSON.stringify(data));
              setIslocked(data.islocked);
              setIsactived(data.isactived);
              setCreateUid(data.createUid);
              setUpdatedUid(data.updatedUid);
              setCreateAt(new Date(data.createdAt));
              setUpdatedAt(new Date(data.updatedAt));
              setName(data.name);
              setdDescription(data.description);
              setqty(data.qty);
              setunit(data.unit);
              setunitPrice(data.unitPrice);
              setremark(data.remark);
              setFHid(data.id);
            });
        });
      }
    useEffect(() => {
      getFHunits().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setfh_unit_items(data);
      });

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);
      setTimeout(()=>{
        console.info('0000:');
        fn(); 
       }, 100);
      

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
                <label htmlFor="name">{t("invoiceItem.name")}</label>
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
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("invoiceItem.description")}</label>
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
          </tr>

          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceItem.qty")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="qty"
                    showButtons
                    value={qty}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setqty(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">

          <div className="p-field p-col-12 p-md-6">
                      <label htmlFor="firstname1">{t("invoiceItem.unitPrice")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="unitPrice"
                      showButtons
                      value={unitPrice}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setunitPrice(e.value);
                      }}
                      />
                      </div>



                </td>
                </tr>
          <tr>
                     <td  width="46%">

                     <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceItem.unit")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="unit"
                      options={fh_unit_items} 
                      optionLabel="name" 
                      optionValue="code"

                      value={unit}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setunit(e.value);
                      }}
                      />
                      </div>
                </td>
                <td width="2%"></td>
                <td  width="46%">
    
                </td>
                </tr> 
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("invoiceItem.remark")}</label>
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
                <label htmlFor="firstname1">{t("invoiceItem.isactived")}</label>
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
                }}  placeholder={t("invoiceItem.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.islocked")}</label>
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
                }}  placeholder={t("invoiceItem.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("invoiceItem.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceItem.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("invoiceItem.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceItem.createUid")}</label>
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
                }}  placeholder={t("invoiceItem.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.updatedUid")}</label>
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
                }}  placeholder={t("invoiceItem.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/invoicedetails/"+mid+"/1");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlInvoiceItem.updateInvoiceItemv2({
                        id:FHid,
                        name:name,
                        description:description,
                        unit:unit,
                        qty:qty,
                        unitPrice:unitPrice,
                        remark:remark,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        mid:mid                       
                      },Id,userID);

 
                      // temp["id"]="2222";
                      // console.log("temp1");
                      // console.log(temp);
                      // temp.id="3333";
                      // console.log("temp2");
                      // console.log(temp);

                      // temps.push({id:"5555", name: "kenny", sex: "m", age: "25" });
                      // console.log("temps");
                      // console.log(temps);  


                      // const temp =globalStorage.get("temp");
                      // temp["id"]="2222";
                      // console.log("temp1");
                      // console.log(temp);
                      // temp.id="3333";
                      // console.log("temp2");
                      // console.log(temp);
                      // globalStorage.set("temp",temp);


                      // const temps =globalStorage.get("temps");
                      // if(temps!=null)
                      // {
                      //   temps.push({id:"5555", name: "kenny", sex: "m", age: "25" });
                      // }
                      // else
                      // {
                      //   temps=[{id:"5555", name: "kenny", sex: "m", age: "25" }];
                      // }
                      // console.log("temps");
                      // console.log(temps); 
                      // globalStorage.set("temps",temps);

                      // console.log("props.mid:"); 
                      // console.log(mid); 
                      replace("/invoicedetails/"+mid+"/1");
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


export const InvoiceItemItemView =({ Id, Mode,mid }: InvoiceItemItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[qty, setqty] = useState(0);
  const[unit, setunit] = useState(0);
  const[unitPrice, setunitPrice] = useState(0);
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlInvoiceItem=new InvoiceItemController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  const [fh_unit_items, setfh_unit_items] = useState([]);
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }

    async function getFHunits()
    {
        const ctlunit=new UnitController();
        const fhojts = await ctlunit.getAllView();
        console.log('fhojts:'+JSON.stringify(fhojts["fhok"]));
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));
        //return[]
    }


    const items = [
      {label: '草稿'},
      {label: '准备就绪'},
      {label: '驳回'},
      {label: '确认'}
    ];  

    const fhitems = [
      { name: '使用', code: '0' },
      { name: '禁用', code: '1' },
    ];
 
    useEffect(() => {
      getFHunits().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setfh_unit_items(data);
      });

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlInvoiceItem.getInvoiceItemById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setdDescription(data.description);
            setqty(data.unit);
            setunit(data.qty);
            setunitPrice(data.unitPrice);
            setremark(data.remark);
            // setFHid(data.id);
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
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>      
          <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("invoiceItem.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="name" 
                value={name}  
                disabled={true}
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("invoiceItem.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                disabled={true}
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>
          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceItem.qty")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="qty"
                    showButtons
                    value={qty}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setqty(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
  
          <div className="p-field p-col-12 p-md-6">
                      <label htmlFor="firstname1">{t("invoiceItem.unitPrice")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="unitPrice"
                      showButtons
                      value={unitPrice}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setunitPrice(e.value);
                      }}
                      />
                      </div>


                </td>
                </tr>
          <tr>
                     <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceItem.unit")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="unit"
                      options={fh_unit_items} 
                      optionLabel="name" 
                      optionValue="code"
                     
                      value={unit}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setunit(e.value);
                      }}
                      />
                      </div>


                </td>
                <td width="2%"></td>
                <td  width="46%">
    
                </td>
                </tr> 
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("invoiceItem.remark")}</label>
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
                <label htmlFor="firstname1">{t("invoiceItem.isactived")}</label>
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
                }}  placeholder={t("invoiceItem.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.islocked")}</label>
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
                }}  placeholder={t("invoiceItem.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("invoiceItem.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceItem.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("invoiceItem.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceItem.createUid")}</label>
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
                }}  placeholder={t("invoiceItem.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceItem.updatedUid")}</label>
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
                }}  placeholder={t("invoiceItem.updatedUid")} />
               </div>  
          </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/invoicedetails/"+mid+"/1");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {
                      console.log("props.mid:"); 
                      console.log(mid); 
                      replace("/invoicedetails/"+mid+"/1");
                    
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
