import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {InvoiceDetailsController} from '../../controllers/InvoiceDetailsController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const InvoiceDetailsList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const [Mainid, setMainid] = useState([]);
    const [createAt, setCreateAt] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);
    const ctlInvoiceDetails = new InvoiceDetailsController();

    const { pathname, push,replace } = useRouter(); 
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const [val, setVal] = useState("");
    let count = 0;
    const fn=async ()=>{
        await   ctlInvoiceDetails.getInvoiceDetailsAll(fhevent).then(data =>{
          console.log('FHdata:'+JSON.stringify(data.raws));
          setCustomers(data.raws);
          setcount(data.count);
          count++;
          setVal(count);
         }); 
        }
    React.useEffect(() => {
        // console.info('2222:'+val.toString()); 
        // if(val<2)
        // {
        // const nanoidstr: string = nanoid();
        // setMainid(nanoidstr.substring(0, 10));
        // const fhnew=new Date();
        // setCreateAt(fhnew);
        // setUpdatedAt(fhnew);
      
        //  fn(); 
      
        // }


        console.info('2222:'+val.toString()); 
    
        const nanoidstr: string = nanoid();
        setMainid(nanoidstr.substring(0, 10));
        const fhnew=new Date();
        setCreateAt(fhnew);
        setUpdatedAt(fhnew);
        fn(); 
    }, [fhevent,val]);
  
    //1.数据过滤代码:
   
    React.useEffect(() => {
        // console.info('2222:'+val.toString()); 
        // if(val<2)
        // {
        // const nanoidstr: string = nanoid();
        // setMainid(nanoidstr.substring(0, 10));
        // const fhnew=new Date();
        // setCreateAt(fhnew);
        // setUpdatedAt(fhnew);
      
        //  fn(); 
      
        // }


        console.info('2222:'+val.toString()); 
    
        const nanoidstr: string = nanoid();
        setMainid(nanoidstr.substring(0, 10));
        const fhnew=new Date();
        setCreateAt(fhnew);
        setUpdatedAt(fhnew);
        fn(); 
    }, []);


    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       <div >
          <hr></hr>
         <span className="p-buttonset">
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{

            var InvoiceDetails={
                "id":Mainid,
                "name": "",
                "description": "",
                "isactived": "-1",
                "islocked": "0",
                "createdAt": createAt,
                "updatedAt": updatedAt,
                "createUid": null,
                "updatedUid": null,
                "refNumber": "",
                "linkedUotation": "",
                "invoiceNumber": "",
                "invoiceStatus": null,
                "invoiceName": "",
                "account": null,
                "salesPerson": null,
                "clientContact": null,
                "clientPoNumber": "",
                "currency": null,
                "tax": null,
                "invoiceDate": null,
                "dueDate": null,
                "overDate": null,
                "isAlert": null,
                "totalAmount": 0,
                "paidAmount": 0,
                "outstandingAmount": null,
                "techName": "",
                "trackingNo": "",
                "additionalField3": "",
                "additionalField4": "",
                "remark": ""
            };

            ctlInvoiceDetails.createInvoiceDetails(InvoiceDetails);
             replace("/invoicedetails/"+Mainid+"/1");
              }} 
             style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                   ctlInvoiceDetails.removeInvoiceDetails([item.id]).then(()=>{});
                }
                fn();
                }}   />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Import')} icon="pi pi-sign-in"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Export')} icon="pi pi-sign-out"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Report')} icon="pi pi-file-pdf" /> 
                   
        </span>
        <hr></hr>
        </div>
       
            <div className="card" >
            <MyDataTable 
                  
                  fhvalue={customers}
                  totalRecords={FHcount}
                  onCustomPage = {(event:any) => {
                      console.info('FHevent:'+event);
                      if(1==1)
                      {
                        // setTimeout(()=>{
                        //     console.info('0000:');
                        //     fn(); 
                        //    }, 100); 
                        //    fn(); 
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
                    //   if(1==1)
                    //   {
                    //   fhevent["search"]=e;
                    //   setfhevent(fhevent);
                    //   setTimeout(()=>{
                    //     console.info('0000:');
                    //     fn(); 
                    //    }, 100);                
                    //   }
                      fhevent["search"]=e;
                      setfhevent(fhevent);
                      fn();
                    }}                      
                  fhHeight={'800px'}                   
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header ={t("invoiceDetails.ref_number")}  field = "refNumber" sortable key =  {10005}  ></Column>,
                            <Column header ={t("invoiceDetails.linked_uotation")}  field = "linkedUotation" sortable key =  {10006}  ></Column>,
                            <Column header ={t("invoiceDetails.invoice_number")}  field = "invoiceNumber" sortable key =  {10007}  ></Column>,
                            <Column header ={t("invoiceDetails.sales_person")}  field = "salesPerson" sortable key =  {100011}  ></Column>,
                            <Column header ={t("invoiceDetails.client_contact")}  field = "clientContact" sortable key =  {100012}  ></Column>,
 
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '16rem'}} style={{ width: '16rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:30,width:65}} className="p-button-sm p-button-info"  onClick={()=>{replace("/invoicedetails/"+rowData.id+"/2");}}></Button>
                                    
                                     <Button label={t('dataTable.Edit')}  style={{height:30,width:65}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/invoicedetails/"+rowData.id+"/1");}} />

                                        <Button label={t('dataTable.Delete')}  style={{height:30,width:65}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlInvoiceDetails.removeInvoiceDetails([rowData.id]).then(()=>{
       

                                            // const temps =globalStorage.get("temps");
                                            // temps.push({id:"5555", name: "kenny", sex: "m", age: "25" });
                                            // console.log("temps");
                                            // console.log(temps);  

                                            // replace("/invoicedetails");
                                            });
                                            const mynanoid: string = nanoid();
                                            // props.FHonChange(mynanoid);
                                            setVal(mynanoid);    

                                         }}  />
                                    
                                   </div>
                                ); 
                            }             
                            } sortable sortField="id" key={8}></Column>, 
                        ]  
                    } 

                    >
            </MyDataTable>
            </div>
        </div>
    );
}
                 
