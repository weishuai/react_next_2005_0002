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
import { TabView, TabPanel } from 'primereact/tabview';
import { Image } from 'primereact/image';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { UserController } from '../../controllers/UserController';

import { QuotationController } from '../../controllers/QuotationController';
import { globalStorage } from '../../utils/Globalstorage';

import {QuotationItemList } from '../QuotationItem/QuotationItemList';
const { nanoid } = require('nanoid');
export type QuotationItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function QuotationItem({ Id, Mode }: QuotationItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <QuotationItemAdd  Id={Id} Mode={Mode}/>;
    }
    else if(Mode == '1')
    {
      return <QuotationItemEdit Id={Id} Mode={Mode} />;
    }
    else if(Mode == '2')
    {
      return <QuotationItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <QuotationItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const QuotationItemAdd =({ Id, Mode }: QuotationItemProps) => {
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[ref_number, setref_number] = useState('');
  const[opportunity_id, setopportunity_id] = useState('');
  const[quotation_name, setquotation_name] = useState('');
  const[sales_person, setsales_person] = useState('');
  const[payment_terms, setpayment_terms] = useState('');
  const[contact, setcontact] = useState('');
  const[taxes, settaxes] = useState('');
  const[currency, setcurrency] = useState('');
  const[cat, setcat] = useState(null);
  const[status, setstatus] = useState('');
  const[amount, setamount] = useState(null);
  const[percentage, setpercentage] = useState(null);
  const[discount_type, setdiscount_type] = useState('');
  const[discount, setdiscount] = useState(null);
  const[total_discount, settotal_discount] = useState(null);
  const[test1, settest1] = useState('');
  const[test2, settest2] = useState('');
  const[additional_field3, setadditional_field3] = useState('');
  const[additional_field4, setadditional_field4] = useState('');
  const[terms_conditions, setterms_conditions] = useState('');
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlQuotation=new QuotationController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    const FHnans = [];

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
      <td>
      <label htmlFor="name">{t("AccountTag.name")}</label>
             </td>     
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
            <td width="10%">
            <label htmlFor="firstname1">{t("quotation.ref_number")}</label>
            </td>
              <td  width="40%">
          
                    <InputText 
                    id="ref_number"
                    value={ref_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref_number(e.target.value);
                    }}
                    />
                    
              </td>
              <td width="10%">   <label htmlFor="firstname1">{t("quotation.opportunity_id")}</label>

              </td>
               <td  width="40%">
                     
                          <Dropdown 
                          id="opportunity_id"
                          value={opportunity_id}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setopportunity_id(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.quotation_name")}</label>
            </td>
                    <td  >
                        
                          <Dropdown 
                          id="quotation_name"
                          value={quotation_name}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setquotation_name(e.value);
                          }}
                          />
                      
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.sales_person")}</label>
                    </td>
                    <td >
                    
                          <Dropdown 
                          id="sales_person"
                          value={sales_person}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setsales_person(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
                <tr>
                  <td>
                  <label htmlFor="firstname1">{t("quotation.payment_terms")}</label>
                  </td>
                    <td  >
                      
                          <Dropdown 
                          id="payment_terms"
                          value={payment_terms}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setpayment_terms(e.value);
                          }}
                          />
                         
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.contact")}</label>
                    </td>
                   <td  >
                       
                          <Dropdown 
                          id="contact"
                          value={contact}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcontact(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
             <tr>
                  <td>
                  <label htmlFor="firstname1">{t("quotation.taxes")}</label>
                  </td>
                    <td>
                         
                          <Dropdown 
                          id="taxes"
                          value={taxes}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settaxes(e.value);
                          }}
                          />
                         
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.currency")}</label>
                    </td>
          <td >
                        
                          <Dropdown 
                          id="currency"
                          value={currency}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcurrency(e.value);
                          }}
                          />
                        
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.cat")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="cat"
                    value={cat}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcat(e.target.value);
                    }}
                    />
                  
              </td>
              <td > <label htmlFor="firstname1">{t("quotation.status")}</label></td>
          <td >
                       
                          <Dropdown 
                          id="status"
                          value={status}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setstatus(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.amount")}</label>
            </td>
              <td >
                   
                    <InputText 
                    id="amount"
                    value={amount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setamount(e.target.value);
                    }}
                    />
                 
              </td>
              <td >
              <label htmlFor="firstname1">{t("quotation.percentage")}</label>
              </td>
          <td  >
                   
                    <InputText 
                    id="percentage"
                    value={percentage}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpercentage(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.discount_type")}</label>
            </td>
                    <td >
                          
                          <Dropdown 
                          id="discount_type"
                          value={discount_type}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setdiscount_type(e.value);
                          }}
                          />
                     
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.discount")}</label>
                    </td>
          <td >
                 
                    <InputText 
                    id="discount"
                    value={discount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdiscount(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.total_discount")}</label>
            </td>
              <td  >
                  
                    <InputText 
                    id="total_discount"
                    value={total_discount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settotal_discount(e.target.value);
                    }}
                    />
                    
              </td>
              <td >
              <label htmlFor="firstname1">{t("quotation.test1")}</label>
              </td>
          <td  >
                    
                    <InputText 
                    id="test1"
                    value={test1}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settest1(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.test2")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="test2"
                    value={test2}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settest2(e.target.value);
                    }}
                    />
                   
              </td>
              <td>  <label htmlFor="firstname1">{t("quotation.additional_field3")}</label></td>
          <td  >
                    
                    <InputText 
                    id="additional_field3"
                    value={additional_field3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field3(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.additional_field4")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="additional_field4"
                    value={additional_field4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field4(e.target.value);
                    }}
                    />
                    
              </td>
              <td >  <label htmlFor="firstname1">{t("quotation.terms_conditions")}</label></td>
          <td >
                       
                          <Dropdown 
                          id="terms_conditions"
                          value={terms_conditions}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setterms_conditions(e.value);
                          }}
                          />
                          
                    </td>
                    </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.remark")}</label>
            </td>
                <td colSpan={3}>
                    
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                 
                </td>
              </tr>


          <tr>
            <td>  <label htmlFor="firstname1">{t("quotation.isactived")}</label></td>
          <td  >
        
                <Dropdown
                value={isactived}
                disabled={true}
                options={fhitems}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("quotation.isactived")} />
               
          </td>
          <td > <label htmlFor="firstname1">{t("quotation.islocked")}</label></td>
          <td  >
              
                <Dropdown
                value={islocked}
                disabled={true}
                options={fhitems}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("quotation.islocked")} />
              
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.createdAt")}</label>
            </td>
          <td >
           
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("quotation.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td ><label htmlFor="firstname1">{t("quotation.updatedAt")}</label></td>
          <td >
                
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("quotation.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("quotation.createUid")}</label>
            </td>
          <td >
          
                <Dropdown
                value={createUid}
                disabled={true}
                options={FHUsers}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("quotation.createUid")} />

               
          </td>
          <td >
          <label htmlFor="firstname1">{t("quotation.updatedUid")}</label>
          </td>
          <td >
            
                <Dropdown
                value={updatedUid}
                disabled={true}
                options={FHUsers}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("quotation.updatedUid")} />
        
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="跟踪信息">
                    <QuotationItemList mid={FHid} /> 
                    </TabPanel>
                   
                </TabView>
             
            </td>
          </tr>         
          <tr>
          <td  colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/quotation/");}} style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
         
          <td colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button
                      label="提交"
                      onClick={(e) => {
                        ctlQuotation.createQuotation({
                          id:FHid,
                          name:name,
                          isactived:isactived,
                          islocked:islocked,
                          createdAt:createAt,
                          updatedAt:updatedAt,
                          createUid:createUid,
                          updatedUid:updatedUid,
                        });
                        push("/quotation/"+Id+"/1");
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

export const QuotationItemEdit =({ Id, Mode }: QuotationItemProps) => {
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[ref_number, setref_number] = useState('');
  const[opportunity_id, setopportunity_id] = useState('');
  const[quotation_name, setquotation_name] = useState('');
  const[sales_person, setsales_person] = useState('');
  const[payment_terms, setpayment_terms] = useState('');
  const[contact, setcontact] = useState('');
  const[taxes, settaxes] = useState('');
  const[currency, setcurrency] = useState('');
  const[cat, setcat] = useState(null);
  const[status, setstatus] = useState('');
  const[amount, setamount] = useState(null);
  const[percentage, setpercentage] = useState(null);
  const[discount_type, setdiscount_type] = useState('');
  const[discount, setdiscount] = useState(null);
  const[total_discount, settotal_discount] = useState(null);
  const[test1, settest1] = useState('');
  const[test2, settest2] = useState('');
  const[additional_field3, setadditional_field3] = useState('');
  const[additional_field4, setadditional_field4] = useState('');
  const[terms_conditions, setterms_conditions] = useState('');
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlQuotation=new QuotationController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }

    const FHnans = [];
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
          ctlQuotation.getQuotationById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            // setdDescription(data.description);
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
      <td>
      <label htmlFor="name">{t("AccountTag.name")}</label>
             </td>     
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
            <td width="10%">
            <label htmlFor="firstname1">{t("quotation.ref_number")}</label>
            </td>
              <td  width="40%">
          
                    <InputText 
                    id="ref_number"
                    value={ref_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref_number(e.target.value);
                    }}
                    />
                    
              </td>
              <td width="10%">   <label htmlFor="firstname1">{t("quotation.opportunity_id")}</label>

              </td>
               <td  width="40%">
                     
                          <Dropdown 
                          id="opportunity_id"
                          value={opportunity_id}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setopportunity_id(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.quotation_name")}</label>
            </td>
                    <td  >
                        
                          <Dropdown 
                          id="quotation_name"
                          value={quotation_name}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setquotation_name(e.value);
                          }}
                          />
                      
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.sales_person")}</label>
                    </td>
                    <td >
                    
                          <Dropdown 
                          id="sales_person"
                          value={sales_person}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setsales_person(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
                <tr>
                  <td>
                  <label htmlFor="firstname1">{t("quotation.payment_terms")}</label>
                  </td>
                    <td  >
                      
                          <Dropdown 
                          id="payment_terms"
                          value={payment_terms}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setpayment_terms(e.value);
                          }}
                          />
                         
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.contact")}</label>
                    </td>
                   <td  >
                       
                          <Dropdown 
                          id="contact"
                          value={contact}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcontact(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
             <tr>
                  <td>
                  <label htmlFor="firstname1">{t("quotation.taxes")}</label>
                  </td>
                    <td>
                         
                          <Dropdown 
                          id="taxes"
                          value={taxes}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settaxes(e.value);
                          }}
                          />
                         
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.currency")}</label>
                    </td>
          <td >
                        
                          <Dropdown 
                          id="currency"
                          value={currency}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcurrency(e.value);
                          }}
                          />
                        
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.cat")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="cat"
                    value={cat}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcat(e.target.value);
                    }}
                    />
                  
              </td>
              <td > <label htmlFor="firstname1">{t("quotation.status")}</label></td>
          <td >
                       
                          <Dropdown 
                          id="status"
                          value={status}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setstatus(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.amount")}</label>
            </td>
              <td >
                   
                    <InputText 
                    id="amount"
                    value={amount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setamount(e.target.value);
                    }}
                    />
                 
              </td>
              <td >
              <label htmlFor="firstname1">{t("quotation.percentage")}</label>
              </td>
          <td  >
                   
                    <InputText 
                    id="percentage"
                    value={percentage}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpercentage(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.discount_type")}</label>
            </td>
                    <td >
                          
                          <Dropdown 
                          id="discount_type"
                          value={discount_type}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setdiscount_type(e.value);
                          }}
                          />
                     
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.discount")}</label>
                    </td>
          <td >
                 
                    <InputText 
                    id="discount"
                    value={discount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdiscount(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.total_discount")}</label>
            </td>
              <td  >
                  
                    <InputText 
                    id="total_discount"
                    value={total_discount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settotal_discount(e.target.value);
                    }}
                    />
                    
              </td>
              <td >
              <label htmlFor="firstname1">{t("quotation.test1")}</label>
              </td>
          <td  >
                    
                    <InputText 
                    id="test1"
                    value={test1}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settest1(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.test2")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="test2"
                    value={test2}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settest2(e.target.value);
                    }}
                    />
                   
              </td>
              <td>  <label htmlFor="firstname1">{t("quotation.additional_field3")}</label></td>
          <td  >
                    
                    <InputText 
                    id="additional_field3"
                    value={additional_field3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field3(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.additional_field4")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="additional_field4"
                    value={additional_field4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field4(e.target.value);
                    }}
                    />
                    
              </td>
              <td >  <label htmlFor="firstname1">{t("quotation.terms_conditions")}</label></td>
          <td >
                       
                          <Dropdown 
                          id="terms_conditions"
                          value={terms_conditions}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setterms_conditions(e.value);
                          }}
                          />
                          
                    </td>
                    </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.remark")}</label>
            </td>
                <td colSpan={3}>
                    
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                 
                </td>
              </tr>


          <tr>
            <td>  <label htmlFor="firstname1">{t("quotation.isactived")}</label></td>
          <td  >
        
                <Dropdown
                value={isactived}
                disabled={true}
                options={fhitems}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("quotation.isactived")} />
               
          </td>
          <td > <label htmlFor="firstname1">{t("quotation.islocked")}</label></td>
          <td  >
              
                <Dropdown
                value={islocked}
                disabled={true}
                options={fhitems}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("quotation.islocked")} />
              
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.createdAt")}</label>
            </td>
          <td >
           
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("quotation.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td ><label htmlFor="firstname1">{t("quotation.updatedAt")}</label></td>
          <td >
                
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("quotation.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("quotation.createUid")}</label>
            </td>
          <td >
          
                <Dropdown
                value={createUid}
                disabled={true}
                options={FHUsers}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("quotation.createUid")} />

               
          </td>
          <td >
          <label htmlFor="firstname1">{t("quotation.updatedUid")}</label>
          </td>
          <td >
            
                <Dropdown
                value={updatedUid}
                disabled={true}
                options={FHUsers}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("quotation.updatedUid")} />
        
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="跟踪信息">
                    <QuotationItemList mid={FHid} /> 
                    </TabPanel>
                   
                </TabView>
             
            </td>
          </tr>         
          <tr>
          <td  colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/quotation/");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlQuotation.updateQuotationv2({
                        id:FHid,
                        name:name,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,
                      },Id,userID);
                      push("/quotation/"+Id+"/1");
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


export const QuotationItemView =({ Id, Mode }: QuotationItemProps) => {
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[ref_number, setref_number] = useState('');
  const[opportunity_id, setopportunity_id] = useState('');
  const[quotation_name, setquotation_name] = useState('');
  const[sales_person, setsales_person] = useState('');
  const[payment_terms, setpayment_terms] = useState('');
  const[contact, setcontact] = useState('');
  const[taxes, settaxes] = useState('');
  const[currency, setcurrency] = useState('');
  const[cat, setcat] = useState(null);
  const[status, setstatus] = useState('');
  const[amount, setamount] = useState(null);
  const[percentage, setpercentage] = useState(null);
  const[discount_type, setdiscount_type] = useState('');
  const[discount, setdiscount] = useState(null);
  const[total_discount, settotal_discount] = useState(null);
  const[test1, settest1] = useState('');
  const[test2, settest2] = useState('');
  const[additional_field3, setadditional_field3] = useState('');
  const[additional_field4, setadditional_field4] = useState('');
  const[terms_conditions, setterms_conditions] = useState('');
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlQuotation=new QuotationController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    const FHnans = [];

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
          ctlQuotation.getQuotationById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            // setdDescription(data.description);
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
      <td>
      <label htmlFor="name">{t("AccountTag.name")}</label>
             </td>     
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
            <td width="10%">
            <label htmlFor="firstname1">{t("quotation.ref_number")}</label>
            </td>
              <td  width="40%">
          
                    <InputText 
                    id="ref_number"
                    value={ref_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref_number(e.target.value);
                    }}
                    />
                    
              </td>
              <td width="10%">   <label htmlFor="firstname1">{t("quotation.opportunity_id")}</label>

              </td>
               <td  width="40%">
                     
                          <Dropdown 
                          id="opportunity_id"
                          value={opportunity_id}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setopportunity_id(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.quotation_name")}</label>
            </td>
                    <td  >
                        
                          <Dropdown 
                          id="quotation_name"
                          value={quotation_name}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setquotation_name(e.value);
                          }}
                          />
                      
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.sales_person")}</label>
                    </td>
                    <td >
                    
                          <Dropdown 
                          id="sales_person"
                          value={sales_person}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setsales_person(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
                <tr>
                  <td>
                  <label htmlFor="firstname1">{t("quotation.payment_terms")}</label>
                  </td>
                    <td  >
                      
                          <Dropdown 
                          id="payment_terms"
                          value={payment_terms}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setpayment_terms(e.value);
                          }}
                          />
                         
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.contact")}</label>
                    </td>
                   <td  >
                       
                          <Dropdown 
                          id="contact"
                          value={contact}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcontact(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
             <tr>
                  <td>
                  <label htmlFor="firstname1">{t("quotation.taxes")}</label>
                  </td>
                    <td>
                         
                          <Dropdown 
                          id="taxes"
                          value={taxes}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           settaxes(e.value);
                          }}
                          />
                         
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.currency")}</label>
                    </td>
          <td >
                        
                          <Dropdown 
                          id="currency"
                          value={currency}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setcurrency(e.value);
                          }}
                          />
                        
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.cat")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="cat"
                    value={cat}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcat(e.target.value);
                    }}
                    />
                  
              </td>
              <td > <label htmlFor="firstname1">{t("quotation.status")}</label></td>
          <td >
                       
                          <Dropdown 
                          id="status"
                          value={status}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setstatus(e.value);
                          }}
                          />
                         
                    </td>
                    </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.amount")}</label>
            </td>
              <td >
                   
                    <InputText 
                    id="amount"
                    value={amount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setamount(e.target.value);
                    }}
                    />
                 
              </td>
              <td >
              <label htmlFor="firstname1">{t("quotation.percentage")}</label>
              </td>
          <td  >
                   
                    <InputText 
                    id="percentage"
                    value={percentage}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpercentage(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.discount_type")}</label>
            </td>
                    <td >
                          
                          <Dropdown 
                          id="discount_type"
                          value={discount_type}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setdiscount_type(e.value);
                          }}
                          />
                     
                    </td>
                    <td >
                    <label htmlFor="firstname1">{t("quotation.discount")}</label>
                    </td>
          <td >
                 
                    <InputText 
                    id="discount"
                    value={discount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdiscount(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.total_discount")}</label>
            </td>
              <td  >
                  
                    <InputText 
                    id="total_discount"
                    value={total_discount}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settotal_discount(e.target.value);
                    }}
                    />
                    
              </td>
              <td >
              <label htmlFor="firstname1">{t("quotation.test1")}</label>
              </td>
          <td  >
                    
                    <InputText 
                    id="test1"
                    value={test1}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settest1(e.target.value);
                    }}
                    />
                   
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.test2")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="test2"
                    value={test2}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settest2(e.target.value);
                    }}
                    />
                   
              </td>
              <td>  <label htmlFor="firstname1">{t("quotation.additional_field3")}</label></td>
          <td  >
                    
                    <InputText 
                    id="additional_field3"
                    value={additional_field3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field3(e.target.value);
                    }}
                    />
                    
              </td>
              </tr>
         <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.additional_field4")}</label>
            </td>
              <td  >
                   
                    <InputText 
                    id="additional_field4"
                    value={additional_field4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field4(e.target.value);
                    }}
                    />
                    
              </td>
              <td >  <label htmlFor="firstname1">{t("quotation.terms_conditions")}</label></td>
          <td >
                       
                          <Dropdown 
                          id="terms_conditions"
                          value={terms_conditions}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setterms_conditions(e.value);
                          }}
                          />
                          
                    </td>
                    </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.remark")}</label>
            </td>
                <td colSpan={3}>
                    
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                 
                </td>
              </tr>


          <tr>
            <td>  <label htmlFor="firstname1">{t("quotation.isactived")}</label></td>
          <td  >
        
                <Dropdown
                value={isactived}
                disabled={true}
                options={fhitems}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("quotation.isactived")} />
               
          </td>
          <td > <label htmlFor="firstname1">{t("quotation.islocked")}</label></td>
          <td  >
              
                <Dropdown
                value={islocked}
                disabled={true}
                options={fhitems}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("quotation.islocked")} />
              
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("quotation.createdAt")}</label>
            </td>
          <td >
           
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("quotation.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td ><label htmlFor="firstname1">{t("quotation.updatedAt")}</label></td>
          <td >
                
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("quotation.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("quotation.createUid")}</label>
            </td>
          <td >
          
                <Dropdown
                value={createUid}
                disabled={true}
                options={FHUsers}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("quotation.createUid")} />

               
          </td>
          <td >
          <label htmlFor="firstname1">{t("quotation.updatedUid")}</label>
          </td>
          <td >
            
                <Dropdown
                value={updatedUid}
                disabled={true}
                options={FHUsers}
                optionLabel="name"
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("quotation.updatedUid")} />
        
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="跟踪信息">
                    <QuotationItemList mid={FHid} /> 
                    </TabPanel>
                   
                </TabView>
             
            </td>
          </tr>         
          <tr>
          <td  colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/quotation/");}} style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
         
          <td colSpan={2}>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button
                     label="确认"
                     onClick={(e) => {replace("/quotation/"+Id+"/1");}}
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

