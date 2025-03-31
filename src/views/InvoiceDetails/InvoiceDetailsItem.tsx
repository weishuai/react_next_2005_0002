import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
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
import { InvoiceDetailsController } from '../../controllers/InvoiceDetailsController';

import { TaxesController } from '../../controllers/TaxesController';
import { CurrencyController } from '../../controllers/CurrencyController';
import { QuotationController } from '../../controllers/QuotationController';

import { globalStorage } from '../../utils/Globalstorage';

import { InvoiceItemList } from '../InvoiceItem/InvoiceItemList';
import { InvoicePaymentList } from '../InvoicePayment/InvoicePaymentList';
const { nanoid } = require('nanoid');
export type InvoiceDetailsItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function InvoiceDetailsItem({ Id, Mode }: InvoiceDetailsItemProps) {
  //const {Id, Mode} = useParams();
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <InvoiceDetailsItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <InvoiceDetailsItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <InvoiceDetailsItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <InvoiceDetailsItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const InvoiceDetailsItemAdd =({ Id, Mode }: InvoiceDetailsItemProps) => {
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
  const[ref_number, setref_number] = useState("");
  const[linked_uotation, setlinked_uotation] = useState("");
  const[invoice_number, setinvoice_number] = useState("");
  const[invoice_status, setinvoice_status] = useState(null);
  const[invoice_name, setinvoice_name] = useState("");
  const[account, setaccount] = useState(null);
  const[sales_person, setsales_person] = useState(null);
  const[client_contact, setclient_contact] = useState(null);
  const[client_po_number, setclient_po_number] = useState("");
  const[currency, setcurrency] = useState(null);
  const[tax, settax] = useState(null);
  const[invoice_date, setinvoice_date] = useState(null);
  const[due_date, setdue_date] = useState(null);
  const[over_date, setover_date] = useState(null);
  const[is_alert, setis_alert] = useState(null);
  const[total_amount, settotal_amount] = useState(0);
  const[paid_amount, setpaid_amount] = useState(0);
  const[outstanding_amount, setoutstanding_amount] = useState(null);
  const[tech_name, settech_name] = useState("");
  const[tracking_no, settracking_no] = useState("");
  const[additional_field3, setadditional_field3] = useState("");
  const[additional_field4, setadditional_field4] = useState("");
  const[remark, setremark] = useState('');
  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 

  const ctl=new UserController();
  const ctlInvoiceDetails=new InvoiceDetailsController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const[currencys, setcurrencys] = useState([]);
  const[taxs, settaxs] = useState([]);
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
      await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
        setCustomers(data.raws);
        setcount(data.count);
        count++;
        setVal(count);
       }); 
      };
    useEffect(() => {

      getTaxes().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            settaxs(data);
      }); 

      getCurrencys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
           
            setcurrencys(data);
      }); 


      const fhnew=new Date();
      setCreateAt(fhnew);
      setUpdatedAt(fhnew);

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      // const nanoidstr: string = nanoid();
      //setFHid(nanoidstr.substring(0, 10));
      setFHid(Id);
      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
      });

      fn();
    }, []);
    const openDialog = () => {
      setfhevent({'first':0,'rows':10,'page':0,'search':'','sort':''});
      fn();
      setDialogVisible(true);
      
  }
    const closeDialog = () => {
      // setfhevent({'first':0,'rows':10,'page':0,'search':'','sort':''});
      console.info("FHids:"+JSON.stringify(FHids));
      if(FHids.length>0)
      {
        // console.info("FHids.name:"+FHids[0].name)
        // ///setName(FHids[0].name);
        setlinked_uotation(FHids[0].name);
        setclient(FHids[0].id);
      }
      setDialogVisible(false);
  }

  const dialogFooterTemplate = () => {
      return (
          <div>
              <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  style={{backgroundColor:'#4682B4'}}/>
              &nbsp;&nbsp;&nbsp;
              <Button label={t('dataTable.Submit')} 
              icon="pi pi-check" 
              onClick={closeDialog}  autoFocus  style={{backgroundColor:'#4682B4'}}/>
          </div>
      );       
  }

  return (
  <Card> 
<Dialog header={t('dataTable.Search')} visible={dialogVisible} style={{ width: '80vw' }} maximizable modal
                contentStyle={{ height: '600px' }} 
                onHide={closeDialog} 
                footer={dialogFooterTemplate}>
                <MyDataTable                        
                       
                        fhvalue={customers} 
                        totalRecords={FHcount}
                        onCustomPage = {async (event:any) => {
                            console.info('FHevent:'+event);
                            if(1==1)
                            {
                               

                                  // const fn=async ()=>{
                                  //   await  ctlQuotation.getQuotationAll(event).then(data =>{
                                  //     setCustomers(data.raws);
                                  //     setcount(data.count);
                                  //    }); 
                                  //   }
                                  //   fn(); 
                                  
                                  await  ctlQuotation.getQuotationAll(event).then(data =>{
                                    setCustomers(data.raws);
                                    setcount(data.count);
                                   }); 
                                setfhevent(event);
                            }
    
                        }
                        }                     
                        FHonChange={(e:any) => {
                            console.log('e_ok:' +JSON.stringify(e));
                            setFHids(e);
                            
                          }}
                        SearchonChange={async (e:any) => {
                            console.log('fhevent["search"]:' +JSON.stringify(e));
                            console.log('fhevent1:' +JSON.stringify(fhevent));
                            if(1==1)
                            {
                            fhevent["search"]=e;
                            setfhevent(fhevent);
                            console.log('fhevent2:' +JSON.stringify(fhevent));
                          

                              // const fn=async ()=>{
                              //   await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
                              //     setCustomers(data.raws);
                              //     setcount(data.count);
                              //    }); 
                              //   }
                              // fn(); 
                              await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                setCustomers(data.raws);
                                setcount(data.count);
                               }); 

                            }
                          }}                    
                        FHColumns={
                            [
                                <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
    
                                <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                         <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/quotation/"+rowData.id+"/2");}}></Button>
                                        </React.Fragment>
                                    ); 
                                }             
                                }  sortable key={1}></Column>,
                                <Column header="Name" field="name" sortable  key={2}></Column>, 
                                <Column header="Description"   field="description"  body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                           <span className="image-text">{rowData.description}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }    key={3}></Column>,  
                                <Column header="Isactived"  field="isactived"  body={(rowData) => {
                                    let fhtxt="";
                                    if(rowData.isactived=="0")
                                    {
                                        fhtxt="启用";
                                    }
                                    else
                                    {
                                        fhtxt="禁用";
                                    }
                                    return(
                                        <React.Fragment>
                                           <span className="image-text">{fhtxt}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }   key={4}></Column>,  
                              
                                // <Column header="CreateAt" field="createdAt" body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //            <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                //         </React.Fragment>
                                //     )
                                    
                                // }             
                                // }
                                // sortable sortField="createdAt"  key={5}></Column>,  
                                // <Column header="UpdatedAt" field="updatedAt" body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //            <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                //         </React.Fragment>
                                //     )
                                    
                                // }             
                                // } sortable  sortField="updatedAt" key={6}></Column>,                             
                     
                                // <Column  header={t('dataTable.Edit')}  field="id"   body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //          <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/quotation/"+rowData.id+"/1");}} />
    
                                //         </React.Fragment>
                                //     ); 
                                // }             
                                // } sortable sortField="id" key={7}></Column>,      
                                // <Column  header={t('dataTable.Delete')}  field="id"   body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
    
                                //          <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                //              ctlQuotation.removeQuotation([rowData.id]).then(()=>{
                                //                  replace("/quotation");
                                //                 });
                                //              }}  />
                                //         </React.Fragment>
                                //     ); 
                                // }             
                                // } sortable sortField="id" key={8}></Column>,  
    
                            ]  
                        }  
                    

                        >
                </MyDataTable>
</Dialog>


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
                    <label htmlFor="firstname1">{t("invoiceDetails.ref_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="ref_number"
                    value={ref_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.linked_uotation")}</label>
                      <div style={{height:10}}> </div>
           

                  <table width="100%">
                  <tr>
                   <td width="75%">



                    <InputText 
                      id="linked_uotation"
                      value={linked_uotation}
                      onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>



                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.invoice_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText  
                    id="invoice_number"
                    value={invoice_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinvoice_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.invoice_status")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="invoice_status"
                      value={invoice_status}
                      options={fhitems} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setinvoice_status(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.invoice_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="invoice_name"
                    value={invoice_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinvoice_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.account")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="account"
                      value={account}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setaccount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.sales_person")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="sales_person"
                    value={sales_person}
                    options={FHUsers} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsales_person(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.client_contact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="client_contact"
                      value={client_contact}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclient_contact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.client_po_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="client_po_number"
                    value={client_po_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setclient_po_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.currency")}</label>
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
                    <label htmlFor="firstname1">{t("invoiceDetails.tax")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="tax"
                    value={tax}
                    options={taxs} 
                    optionLabel="name" 
                    optionValue="code"                  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settax(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.invoice_date")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      id="invoice_date"
                      value={invoice_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setinvoice_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.due_date")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="due_date"
                    value={due_date}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setdue_date(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.over_date")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      showButtons
                      id="over_date"
                      value={over_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setover_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.is_alert")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="is_alert"
                    value={is_alert}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setis_alert(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.total_amount")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="total_amount"
                      
                      value={total_amount}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       settotal_amount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.paid_amount")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    showButtons
                    id="paid_amount"
                    value={paid_amount}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setpaid_amount(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.outstanding_amount")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="outstanding_amount"
                      showButtons
                      value={outstanding_amount}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setoutstanding_amount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.tech_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="tech_name"
                    value={tech_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settech_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("invoiceDetails.tracking_no")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="tracking_no"
                    value={tracking_no}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settracking_no(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.additional_field3")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additional_field3"
                    value={additional_field3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field3(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("invoiceDetails.additional_field4")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additional_field4"
                    value={additional_field4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field4(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("invoiceDetails.remark")}</label>
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
                <label htmlFor="firstname1">{t("invoiceDetails.isactived")}</label>
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
                }}  placeholder={t("invoiceDetails.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.islocked")}</label>
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
                }}  placeholder={t("invoiceDetails.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("invoiceDetails.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceDetails.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("invoiceDetails.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceDetails.createUid")}</label>
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
                }}  placeholder={t("invoiceDetails.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.updatedUid")}</label>
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
                }}  placeholder={t("invoiceDetails.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="支付信息">
                    <InvoiceItemList mid={FHid} /> 
                    </TabPanel>
                    <TabPanel header="产品信息">
                    <InvoicePaymentList mid={FHid} /> 
                    </TabPanel>            
                </TabView>
             
            </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/invoicedetails");}}  style={{backgroundColor:'#4682B4'}}  />
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
                        ctlInvoiceDetails.updateInvoiceDetailsv2({
                          id:FHid,
                          name:name,
                          description:description,
                          isactived:"0",
                          islocked:islocked,
                          createdAt:createAt,
                          updatedAt:fhnew,
                          createUid:createUid,
                          updatedUid:updatedUid,
                          refNumber:ref_number,
                          linkedUotation:linked_uotation,
                          invoiceNumber:invoice_number,
                          invoiceStatus:invoice_status,
                          invoiceName:invoice_name,
                          account:account,
                          salesPerson:sales_person,
                          clientContact:client_contact,
                          clientPoNumber:client_po_number,
                          currency:currency,
                          tax:tax,
                          invoiceDate:invoice_date,
                          dueDate:due_date,
                          overDate:over_date,
                          isAlert:is_alert,
                          totalAmount:total_amount,
                          paidAmount:paid_amount,
                          outstandingAmount:outstanding_amount,
                          techName:tech_name,
                          trackingNo:tracking_no,
                          additionalField3:additional_field3,
                          additionalField4:additional_field4,
                          remark:remark,                   
                        },Id,userID);

                      console.log("temps_list");


                      replace("/invoicedetails");
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

export const InvoiceDetailsItemEdit =({ Id, Mode }: InvoiceDetailsItemProps) => {
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
  const[ref_number, setref_number] = useState("");
  const[linked_uotation, setlinked_uotation] = useState("");
  const[invoice_number, setinvoice_number] = useState("");
  const[invoice_status, setinvoice_status] = useState(null);
  const[invoice_name, setinvoice_name] = useState("");
  const[account, setaccount] = useState(null);
  const[sales_person, setsales_person] = useState(null);
  const[client_contact, setclient_contact] = useState(null);
  const[client_po_number, setclient_po_number] = useState("");
  const[currency, setcurrency] = useState(null);
  const[tax, settax] = useState(null);
  const[invoice_date, setinvoice_date] = useState(null);
  const[due_date, setdue_date] = useState(null);
  const[over_date, setover_date] = useState(null);
  const[is_alert, setis_alert] = useState(null);
  const[total_amount, settotal_amount] = useState(0);
  const[paid_amount, setpaid_amount] = useState(0);
  const[outstanding_amount, setoutstanding_amount] = useState(null);
  const[tech_name, settech_name] = useState("");
  const[tracking_no, settracking_no] = useState("");
  const[additional_field3, setadditional_field3] = useState("");
  const[additional_field4, setadditional_field4] = useState("");
  const[remark, setremark] = useState('');



  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlInvoiceDetails=new InvoiceDetailsController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const[currencys, setcurrencys] = useState([]);
  const[taxs, settaxs] = useState([]);
  const[client, setclient] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  let [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
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
      fhevent= {'first':0,'rows':10,'page':0,'search':'','sort':''};
      await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
        setCustomers(data.raws);
        setcount(data.count);
        // count++;
        // setVal(count);
       }); 
      };
      useEffect(() => {
        getTaxes().then((data)=>{
              console.log('Country_data:'+JSON.stringify(data));
              settaxs(data);
        }); 
  
        getCurrencys().then((data)=>{
              console.log('Country_data:'+JSON.stringify(data));
             
              setcurrencys(data);
        }); 
  
        const userID=globalStorage.get("userID");
        console.log('userID:'+userID);
  
        setUpdatedUid(userID);
  
        
        getFHusers().then((data)=>{
          console.log('data:'+JSON.stringify(data));
          setFHUsers(data);
            ctlInvoiceDetails.getInvoiceDetailsById(Id).then((data)=>{
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
              setref_number(data.refNumber);
              setlinked_uotation(data.linkedUotation);
              setinvoice_number(data.invoiceNumber);
              setinvoice_status(data.invoiceStatus);
              setinvoice_name(data.invoiceName);
              setaccount(data.account);
              setsales_person(data.salesPerson);
              setclient_contact(data.clientContact);
              setclient_po_number(data.clientPoNumber);
              setcurrency(data.currency);
              settax(data.tax);
              setinvoice_date(new Date(data.invoiceDate));
              setdue_date(new Date(data.dueDate));
              setover_date(data.overDate);
              setis_alert(data.isAlert);
              settotal_amount(data.totalAmount);
              setpaid_amount(data.paidAmount);
              setoutstanding_amount(data.outstandingAmount);
              settech_name(data.techName);
              settracking_no(data.trackingNo);
              setadditional_field3(data.additionalField3);
              setadditional_field4(data.additionalField4);
              setremark(data.remark);
            });
        });
  
        fn();  
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

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlInvoiceDetails.getInvoiceDetailsById(Id).then((data)=>{
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
            setref_number(data.refNumber);
            setlinked_uotation(data.linkedUotation);
            setinvoice_number(data.invoiceNumber);
            setinvoice_status(data.invoiceStatus);
            setinvoice_name(data.invoiceName);
            setaccount(data.account);
            setsales_person(data.salesPerson);
            setclient_contact(data.clientContact);
            setclient_po_number(data.clientPoNumber);
            setcurrency(data.currency);
            settax(data.tax);
            setinvoice_date(new Date(data.invoiceDate));
            setdue_date(new Date(data.dueDate));
            setover_date(data.overDate);
            setis_alert(data.isAlert);
            settotal_amount(data.totalAmount);
            setpaid_amount(data.paidAmount);
            setoutstanding_amount(data.outstandingAmount);
            settech_name(data.techName);
            settracking_no(data.trackingNo);
            setadditional_field3(data.additionalField3);
            setadditional_field4(data.additionalField4);
            setremark(data.remark);
          });
      });

      fn();  
    }, [val]);
    const openDialog = () => {
      setfhevent({'first':0,'rows':10,'page':0,'search':'','sort':''});
      fn(); 
      setDialogVisible(true);
  }
    const closeDialog = () => {
      
      console.info("FHids:"+JSON.stringify(FHids));
      if(FHids.length>0)
      {
        // console.info("FHids.name:"+FHids[0].name)
        // ///setName(FHids[0].name);
        setlinked_uotation(FHids[0].name);
        setclient(FHids[0].id);
      }
      setDialogVisible(false);
  }

  const dialogFooterTemplate = () => {
      return (
          <div>
              <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  style={{backgroundColor:'#4682B4'}}/>
              &nbsp;&nbsp;&nbsp;
              <Button label={t('dataTable.Submit')} 
              icon="pi pi-check" 
              onClick={closeDialog}  autoFocus  style={{backgroundColor:'#4682B4'}}/>
          </div>
      );       
  }

  return (
  <Card>     
  <Dialog header={t('dataTable.Search')} visible={dialogVisible} style={{ width: '80vw' }} maximizable modal
                contentStyle={{ height: '600px' }} 
                onHide={closeDialog} 
                footer={dialogFooterTemplate}>
                <MyDataTable                        
                       
                        fhvalue={customers} 
                        totalRecords={FHcount}
                        onCustomPage = {async (event:any) => {
                            // console.info('FHevent:'+event);
                            // if(1==1)
                            // {
                               

                            //       const fn=async ()=>{
                            //         await  ctlQuotation.getQuotationAll(event).then(data =>{
                            //           setCustomers(data.raws);
                            //           setcount(data.count);
                            //          }); 
                            //         }
                            //         fn(); 
                                  

                            //     setfhevent(event);
                            // }
                            await  ctlQuotation.getQuotationAll(event).then(data =>{
                              setCustomers(data.raws);
                              setcount(data.count);
                             }); 
                             setfhevent(event);

    
                        }
                        }                     
                        FHonChange={(e:any) => {
                            console.log('e_ok:' +JSON.stringify(e));
                            setFHids(e);
                            
                          }}
                        SearchonChange={async (e:any) => {
                            console.log('fhevent["search"]:' +JSON.stringify(e));
                            console.log('fhevent1:' +JSON.stringify(fhevent));
                            if(1==1)
                            {
                            fhevent["search"]=e;
                            setfhevent(fhevent);
                            console.log('fhevent2:' +JSON.stringify(fhevent));
                          

                              // const fn=async ()=>{
                              //   await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
                              //     setCustomers(data.raws);
                              //     setcount(data.count);
                              //    }); 
                              //   }
                              // fn(); 
                              await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                setCustomers(data.raws);
                                setcount(data.count);
                               }); 

                            }
                          }}                    
                        FHColumns={
                            [
                                <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
    
                                <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                         <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/quotation/"+rowData.id+"/2");}}></Button>
                                        </React.Fragment>
                                    ); 
                                }             
                                }  sortable key={1}></Column>,
                                <Column header="Name" field="name" sortable  key={2}></Column>, 
                                <Column header="Description"   field="description"  body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                           <span className="image-text">{rowData.description}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }    key={3}></Column>,  
                                <Column header="Isactived"  field="isactived"  body={(rowData) => {
                                    let fhtxt="";
                                    if(rowData.isactived=="0")
                                    {
                                        fhtxt="启用";
                                    }
                                    else
                                    {
                                        fhtxt="禁用";
                                    }
                                    return(
                                        <React.Fragment>
                                           <span className="image-text">{fhtxt}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }   key={4}></Column>,  
                              
                                // <Column header="CreateAt" field="createdAt" body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //            <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                //         </React.Fragment>
                                //     )
                                    
                                // }             
                                // }
                                // sortable sortField="createdAt"  key={5}></Column>,  
                                // <Column header="UpdatedAt" field="updatedAt" body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //            <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                //         </React.Fragment>
                                //     )
                                    
                                // }             
                                // } sortable  sortField="updatedAt" key={6}></Column>,                             
                     
                                // <Column  header={t('dataTable.Edit')}  field="id"   body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //          <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/quotation/"+rowData.id+"/1");}} />
    
                                //         </React.Fragment>
                                //     ); 
                                // }             
                                // } sortable sortField="id" key={7}></Column>,      
                                // <Column  header={t('dataTable.Delete')}  field="id"   body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
    
                                //          <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                //              ctlQuotation.removeQuotation([rowData.id]).then(()=>{
                                //                  replace("/quotation");
                                //                 });
                                //              }}  />
                                //         </React.Fragment>
                                //     ); 
                                // }             
                                // } sortable sortField="id" key={8}></Column>,  
    
                            ]  
                        }  
                    

                        >
                </MyDataTable>
</Dialog>


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
                    <label htmlFor="firstname1">{t("invoiceDetails.ref_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="ref_number"
                    value={ref_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.linked_uotation")}</label>
                      <div style={{height:10}}> </div>
           

                  <table width="100%">
                  <tr>
                   <td width="75%">



                    <InputText 
                      id="linked_uotation"
                      value={linked_uotation}
                      onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>



                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.invoice_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText  
                    id="invoice_number"
                    value={invoice_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinvoice_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.invoice_status")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="invoice_status"
                      value={invoice_status}
                      options={fhitems} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setinvoice_status(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.invoice_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="invoice_name"
                    value={invoice_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinvoice_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.account")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="account"
                      value={account}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setaccount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.sales_person")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="sales_person"
                    value={sales_person}
                    options={FHUsers} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsales_person(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.client_contact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="client_contact"
                      value={client_contact}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclient_contact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.client_po_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="client_po_number"
                    value={client_po_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setclient_po_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.currency")}</label>
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
                    <label htmlFor="firstname1">{t("invoiceDetails.tax")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="tax"
                    value={tax}
                    options={taxs} 
                    optionLabel="name" 
                    optionValue="code"                  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settax(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.invoice_date")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      id="invoice_date"
                      value={invoice_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setinvoice_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.due_date")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="due_date"
                    value={due_date}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setdue_date(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.over_date")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="over_date"
                      value={over_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setover_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.is_alert")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="is_alert"
                    value={is_alert}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setis_alert(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.total_amount")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="total_amount"
                     
                      value={total_amount}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       settotal_amount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.paid_amount")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="paid_amount"
                    showButtons
                    value={paid_amount}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setpaid_amount(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.outstanding_amount")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="outstanding_amount"
                      showButtons
                      value={outstanding_amount}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setoutstanding_amount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.tech_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="tech_name"
                    value={tech_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settech_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("invoiceDetails.tracking_no")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="tracking_no"
                    value={tracking_no}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settracking_no(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.additional_field3")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additional_field3"
                    value={additional_field3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field3(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("invoiceDetails.additional_field4")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additional_field4"
                    value={additional_field4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field4(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("invoiceDetails.remark")}</label>
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
                <label htmlFor="firstname1">{t("invoiceDetails.isactived")}</label>
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
                }}  placeholder={t("invoiceDetails.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.islocked")}</label>
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
                }}  placeholder={t("invoiceDetails.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("invoiceDetails.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceDetails.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("invoiceDetails.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceDetails.createUid")}</label>
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
                }}  placeholder={t("invoiceDetails.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.updatedUid")}</label>
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
                }}  placeholder={t("invoiceDetails.updatedUid")} />
               </div>  
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="支付信息">
                    <InvoiceItemList mid={FHid}                 
                     FHonChange={(e:any) => {
                      setVal(e);
                    }}/> 
                    </TabPanel>
                    <TabPanel header="产品信息">
                    <InvoicePaymentList mid={FHid}                      
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
                <Button label="取消" onClick={(e) => {replace("/invoicedetails");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlInvoiceDetails.updateInvoiceDetailsv2({
                        id:FHid,
                        name:name,
                        description:description,
                         isactived:"0",
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,
                        refNumber:ref_number,
                        linkedUotation:linked_uotation,
                        invoiceNumber:invoice_number,
                        invoiceStatus:invoice_status,
                        invoiceName:invoice_name,
                        account:account,
                        salesPerson:sales_person,
                        clientContact:client_contact,
                        clientPoNumber:client_po_number,
                        currency:currency,
                        tax:tax,
                        invoiceDate:invoice_date,
                        dueDate:due_date,
                        overDate:over_date,
                        isAlert:is_alert,
                        totalAmount:total_amount,
                        paidAmount:paid_amount,
                        outstandingAmount:outstanding_amount,
                        techName:tech_name,
                        trackingNo:tracking_no,
                        additionalField3:additional_field3,
                        additionalField4:additional_field4,
                        remark:remark,                   
                      },Id,userID);

                     
                      console.log("重大发现:"); 
                      // const temp =globalStorage.get("temp");
                      // console.log(temp);  
                      // const temps =globalStorage.get("temps");
                      // console.log(temps); 
                      // globalStorage.set("temps",null);
                      //replace("/invoicedetails/"+Id+"/1");
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


export const InvoiceDetailsItemView =({ Id, Mode }: InvoiceDetailsItemProps) => {
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
  const[ref_number, setref_number] = useState("");
  const[linked_uotation, setlinked_uotation] = useState("");
  const[invoice_number, setinvoice_number] = useState("");
  const[invoice_status, setinvoice_status] = useState(null);
  const[invoice_name, setinvoice_name] = useState("");
  const[account, setaccount] = useState(null);
  const[sales_person, setsales_person] = useState(null);
  const[client_contact, setclient_contact] = useState(null);
  const[client_po_number, setclient_po_number] = useState("");
  const[currency, setcurrency] = useState(null);
  const[tax, settax] = useState(null);
  const[invoice_date, setinvoice_date] = useState(null);
  const[due_date, setdue_date] = useState(null);
  const[over_date, setover_date] = useState(null);
  const[is_alert, setis_alert] = useState(null);
  const[total_amount, settotal_amount] = useState(0);
  const[paid_amount, setpaid_amount] = useState(0);
  const[outstanding_amount, setoutstanding_amount] = useState(null);
  const[tech_name, settech_name] = useState("");
  const[tracking_no, settracking_no] = useState("");
  const[additional_field3, setadditional_field3] = useState("");
  const[additional_field4, setadditional_field4] = useState("");
  const[remark, setremark] = useState('');



  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlInvoiceDetails=new InvoiceDetailsController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const[currencys, setcurrencys] = useState([]);
  const[taxs, settaxs] = useState([]);
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
      getTaxes().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            settaxs(data);
      }); 

      getCurrencys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
           
            setcurrencys(data);
      }); 

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlInvoiceDetails.getInvoiceDetailsById(Id).then((data)=>{
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
            setref_number(data.refNumber);
            setlinked_uotation(data.linkedUotation);
            setinvoice_number(data.invoiceNumber);
            setinvoice_status(data.invoiceStatus);
            setinvoice_name(data.invoiceName);
            setaccount(data.account);
            setsales_person(data.salesPerson);
            setclient_contact(data.clientContact);
            setclient_po_number(data.clientPoNumber);
            setcurrency(data.currency);
            settax(data.tax);
            setinvoice_date(new Date(data.invoiceDate));
            setdue_date(new Date(data.dueDate));
            setover_date(data.overDate);
            setis_alert(data.isAlert);
            settotal_amount(data.totalAmount);
            setpaid_amount(data.paidAmount);
            setoutstanding_amount(data.outstandingAmount);
            settech_name(data.techName);
            settracking_no(data.trackingNo);
            setadditional_field3(data.additionalField3);
            setadditional_field4(data.additionalField4);
            setremark(data.remark);
          });
      });

      const fn=async ()=>{
            await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
              setCustomers(data.raws);
              setcount(data.count);
              count++;
              setVal(count);
             }); 
            }
            if(count<1)
            {
            fn();
            }

    }, []);
    const openDialog = () => {
      //setfhevent({'first':0,'rows':10,'page':0,'search':'','sort':''});
      setDialogVisible(true);
  }
    const closeDialog = () => {
      console.info("FHids:"+JSON.stringify(FHids));
      if(FHids.length>0)
      {
        // console.info("FHids.name:"+FHids[0].name)
        // ///setName(FHids[0].name);
        setlinked_uotation(FHids[0].name);
        setclient(FHids[0].id);
      }
      setDialogVisible(false);
  }

  const dialogFooterTemplate = () => {
      return (
          <div>
              <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  style={{backgroundColor:'#4682B4'}}/>
              &nbsp;&nbsp;&nbsp;
              <Button label={t('dataTable.Submit')} 
              icon="pi pi-check" 
              onClick={closeDialog}  autoFocus  style={{backgroundColor:'#4682B4'}}/>
          </div>
      );       
  }

  return (
  <Card>     
 <Dialog header={t('dataTable.Search')} visible={dialogVisible} style={{ width: '80vw' }} maximizable modal
                contentStyle={{ height: '600px' }} 
                onHide={closeDialog} 
                footer={dialogFooterTemplate}>
                <MyDataTable                        
                       
                        fhvalue={customers} 
                        totalRecords={FHcount}
                        onCustomPage = {(event:any) => {
                            console.info('FHevent:'+event);
                            if(1==1)
                            {
                               

                                  const fn=async ()=>{
                                    await  ctlQuotation.getQuotationAll(event).then(data =>{
                                      setCustomers(data.raws);
                                      setcount(data.count);
                                     }); 
                                    }
                                    fn(); 
                                  

                                setfhevent(event);
                            }
    
                        }
                        }                     
                        FHonChange={(e:any) => {
                            console.log('e_ok:' +JSON.stringify(e));
                            setFHids(e);
                            
                          }}
                        SearchonChange={(e:any) => {
                            console.log('fhevent["search"]:' +JSON.stringify(e));
                            console.log('fhevent1:' +JSON.stringify(fhevent));
                            if(1==1)
                            {
                            fhevent["search"]=e;
                            setfhevent(fhevent);
                            console.log('fhevent2:' +JSON.stringify(fhevent));
                          

                              const fn=async ()=>{
                                await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                  setCustomers(data.raws);
                                  setcount(data.count);
                                 }); 
                                }
                              fn(); 


                            }
                          }}                    
                        FHColumns={
                            [
                                <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
    
                                <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                         <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/quotation/"+rowData.id+"/2");}}></Button>
                                        </React.Fragment>
                                    ); 
                                }             
                                }  sortable key={1}></Column>,
                                <Column header="Name" field="name" sortable  key={2}></Column>, 
                                <Column header="Description"   field="description"  body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                           <span className="image-text">{rowData.description}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }    key={3}></Column>,  
                                <Column header="Isactived"  field="isactived"  body={(rowData) => {
                                    let fhtxt="";
                                    if(rowData.isactived=="0")
                                    {
                                        fhtxt="启用";
                                    }
                                    else
                                    {
                                        fhtxt="禁用";
                                    }
                                    return(
                                        <React.Fragment>
                                           <span className="image-text">{fhtxt}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }   key={4}></Column>,  
                              
                                // <Column header="CreateAt" field="createdAt" body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //            <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                //         </React.Fragment>
                                //     )
                                    
                                // }             
                                // }
                                // sortable sortField="createdAt"  key={5}></Column>,  
                                // <Column header="UpdatedAt" field="updatedAt" body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //            <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                //         </React.Fragment>
                                //     )
                                    
                                // }             
                                // } sortable  sortField="updatedAt" key={6}></Column>,                             
                     
                                // <Column  header={t('dataTable.Edit')}  field="id"   body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
                                //          <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/quotation/"+rowData.id+"/1");}} />
    
                                //         </React.Fragment>
                                //     ); 
                                // }             
                                // } sortable sortField="id" key={7}></Column>,      
                                // <Column  header={t('dataTable.Delete')}  field="id"   body={(rowData) => {
                                //     return(
                                //         <React.Fragment>
    
                                //          <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                //              ctlQuotation.removeQuotation([rowData.id]).then(()=>{
                                //                  replace("/quotation");
                                //                 });
                                //              }}  />
                                //         </React.Fragment>
                                //     ); 
                                // }             
                                // } sortable sortField="id" key={8}></Column>,  
    
                            ]  
                        }  
                    

                        >
                </MyDataTable>
</Dialog>


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
                    <label htmlFor="firstname1">{t("invoiceDetails.ref_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="ref_number"
                    value={ref_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setref_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.linked_uotation")}</label>
                      <div style={{height:10}}> </div>
           

                  <table width="100%">
                  <tr>
                   <td width="75%">



                    <InputText 
                      id="linked_uotation"
                      value={linked_uotation}
                      onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>



                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.invoice_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText  
                    id="invoice_number"
                    value={invoice_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinvoice_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.invoice_status")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="invoice_status"
                      value={invoice_status}
                      options={fhitems} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setinvoice_status(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.invoice_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="invoice_name"
                    value={invoice_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinvoice_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.account")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="account"
                      value={account}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setaccount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.sales_person")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="sales_person"
                    value={sales_person}
                    options={FHUsers} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsales_person(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.client_contact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="client_contact"
                      value={client_contact}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setclient_contact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.client_po_number")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="client_po_number"
                    value={client_po_number}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setclient_po_number(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.currency")}</label>
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
                    <label htmlFor="firstname1">{t("invoiceDetails.tax")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="tax"
                    value={tax}
                    options={taxs} 
                    optionLabel="name" 
                    optionValue="code"                  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     settax(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.invoice_date")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      id="invoice_date"
                      value={invoice_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setinvoice_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.due_date")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="due_date"
                    value={due_date}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setdue_date(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.over_date")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="over_date"
                      showButtons
                      value={over_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setover_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.is_alert")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="is_alert"
                    
                    value={is_alert}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setis_alert(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.total_amount")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="total_amount"
                     
                      value={total_amount}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       settotal_amount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.paid_amount")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="paid_amount"
                    showButtons
                    value={paid_amount}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setpaid_amount(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("invoiceDetails.outstanding_amount")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="outstanding_amount"
                      showButtons
                      value={outstanding_amount}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setoutstanding_amount(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.tech_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="tech_name"
                    value={tech_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settech_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("invoiceDetails.tracking_no")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="tracking_no"
                    value={tracking_no}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settracking_no(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("invoiceDetails.additional_field3")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additional_field3"
                    value={additional_field3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field3(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("invoiceDetails.additional_field4")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="additional_field4"
                    value={additional_field4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditional_field4(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("invoiceDetails.remark")}</label>
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
                <label htmlFor="firstname1">{t("invoiceDetails.isactived")}</label>
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
                }}  placeholder={t("invoiceDetails.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.islocked")}</label>
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
                }}  placeholder={t("invoiceDetails.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("invoiceDetails.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceDetails.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("invoiceDetails.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("invoiceDetails.createUid")}</label>
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
                }}  placeholder={t("invoiceDetails.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("invoiceDetails.updatedUid")}</label>
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
                }}  placeholder={t("invoiceDetails.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="支付信息">
                    <InvoiceItemList mid={FHid} /> 
                    </TabPanel>
                    <TabPanel header="产品信息">
                    <InvoicePaymentList mid={FHid} /> 
                    </TabPanel>            
                </TabView>
             
            </td>
          </tr>

          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/invoicedetails");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {
                      //replace("/invoicedetails/"+Id+"/0");
                      replace("/invoicedetails");
                    
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
