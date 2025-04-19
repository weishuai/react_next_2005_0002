
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import {useNavigate,useParams} from "react-router-dom";
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {InvoicePaymentController} from '../../controllers/InvoicePaymentController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/FHDataTable';
const { nanoid } = require('nanoid');

export const InvoicePaymentList = (props: any) => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlInvoicePayment = new InvoicePaymentController();
    const pathnameurl = usePathname();
    const { pathname, push,replace } = useRouter(); 
    let Id ="0";
    let Mode ="0";
    let Mainid ="0";
    var result =pathnameurl; 
    let strSplitVal=result.split("/");
    console.info('strSplitVal:'+strSplitVal.toString());
    Id =strSplitVal[2];
    // Mode =strSplitVal[4];
    Mainid=Id;
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const [val, setVal] = useState("");
    let count = 0; 
    const fn=async ()=>{
        fhevent.mid=Id.toString();
        await ctlInvoicePayment.getInvoicePaymentAll(fhevent).then(data =>{
          setCustomers(data.raws);
          setcount(data.count);
        //   count++;
        //   setVal(count);
         }); 
        }

        React.useEffect(() => {
            console.info('2222:'+val.toString()); 
     
            // setTimeout(()=>{
            //     console.info('0000:');
            //     fn(); 
            //    }, 100); 
            fn(); 
        }, []);

    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
 
        // setTimeout(()=>{
        //     console.info('0000:');
        //     fn(); 
        //    }, 100); 
        fn(); 
    }, [fhevent,val]);
 
    //1.数据过滤代码:
   




    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       <div >
          <hr></hr>
         <span className="p-buttonset">
           
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/invoicePayment/0/0/"+Mainid);}} style={{backgroundColor:'#4682B4'}}  />
           
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    // ctlInvoicePayment.removeInvoicePayment([item.id]).then(()=>{});
                }
                replace("/invoicedetails/"+Mainid+"/1");
                }}   />
                  <span style={{width:650}}></span>
            {/* <span style={{width:100}}></span>
            <Button label={t('dataTable.Import')} icon="pi pi-sign-in"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Export')} icon="pi pi-sign-out"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Report')} icon="pi pi-file-pdf" />  */}
                   
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
                    //    const fn=async ()=>{
                    //     await ctlInvoicePayment.getInvoicePaymentAll(fhevent).then(data =>{
                    //       setCustomers(data.raws);
                    //       setcount(data.count);
                    //      }); 
                    //     }
                    //     fn();                   
                       }
                     }}                      
                   fhHeight={'800px'}                  
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header={t('invoicePayment.name')} field="name" sortable  key={2}></Column>,
                            <Column header ={t("invoicePayment.date")} field = "date" sortable key =  {10005}  ></Column>,
                            // <Column header ={t("invoicePayment.method")}  field = "method" sortable key =  {10006}  ></Column>,
                            <Column header ={t("invoicePayment.refNo")}  field = "refNo" sortable key =  {10007}  ></Column>,
                            // <Column header ={t("invoicePayment.photo")}  field = "photo" sortable key =  {10008}  ></Column>,
  
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '16rem'}} style={{ width: '16rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                        <Button label={t('dataTable.HeadInfo')} style={{height:30,width:65}} className="p-button-sm p-button-info"  onClick={()=>{replace("/invoicePayment/"+rowData.id+"/2/"+props.mid);}}></Button>
                                                                           
                                        <Button label={t('dataTable.Edit')}  style={{height:30,width:65}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/invoicePayment/"+rowData.id+"/1/"+props.mid);}} />

                                        <Button label={t('dataTable.Delete')}  style={{height:30,width:65}}  className="p-button-sm p-button-danger" onClick={() => {
                                           ctlInvoicePayment.removeInvoicePayment([rowData.id]).then(()=>{
                                           
                                            });
                                            //fn();
                                           //replace("/invoicedetails/"+props.mid+"/1");
                                           const mynanoid: string = nanoid();
                                           //setMainid(nanoidstr.substring(0, 10));
                                           props.FHonChange(mynanoid);
                                           setVal(mynanoid);
                                         }}  />                                   
                                   </div>
                                ); 
                            }             
                            } sortable sortField="id" key={9}></Column>, 
                        ]  
                    } 

                    >
            </MyDataTable>
            </div>
        </div>
    );
}
                 
