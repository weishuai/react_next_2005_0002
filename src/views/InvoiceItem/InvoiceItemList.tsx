import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import {useNavigate,useParams} from "react-router-dom";
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {InvoiceItemController} from '../../controllers/InvoiceItemController';
import {Button} from 'primereact/button';
import { globalStorage } from '../../utils/Globalstorage';
import {MyDataTable} from '../../components/myDataTable/FHDataTable';
const { nanoid } = require('nanoid');
export const InvoiceItemList = (props: any) => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlInvoiceItem = new InvoiceItemController();
    const { pathname, push,replace } = useRouter(); 
    const [FHcount, setcount] = useState(0);
    let [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','mid':'0','sort':''});
    const [val, setVal] = useState("");
    let count = 0;
    const pathnameurl = usePathname();
    let Id ="0";
    let Mode ="0";
    let Mainid ="0";
    var result =pathnameurl; 
    let strSplitVal=result.split("/");
    console.info('strSplitVal:'+strSplitVal.toString());
    Id =strSplitVal[2];
    Mainid=Id;
    console.info(' Maini:'+ Mainid);

    
    const fn=async ()=>{
        // console.info('search_Id111:'+Id.toString());
        // console.info('search_Id222:'+Id.toString());
        fhevent.mid=Id.toString();
        // console.info('search_Id333:'+Id.toString());
        // console.info('fhevent:'+JSON.stringify(fhevent)); 
        await   ctlInvoiceItem.getInvoiceItemAll(fhevent).then(data =>{
          setCustomers(data.raws);
          setcount(data.count);
        //   count++;
        //   setVal(count);
         }); 
        }
    React.useEffect(() => {
        //console.info('2222:'+val.toString()); 
        //console.info('2222:'+count.toString()); 
        //console.info('2222:'); 
        // setTimeout(()=>{
        //     console.info('0000:');
        //     fn(); 
        //    }, 5000); 
      
        fn();
       

    }, []); 
    React.useEffect(() => {
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
           
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/invoiceitem/0/0/"+Mainid);}} style={{backgroundColor:'#4682B4'}}  />
           
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlInvoiceItem.removeInvoiceItem([item.id]).then(()=>{});
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
                           
                        // fn(); 
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
                    fhevent["mid"]=Id.toString();
                    setfhevent(fhevent);
                    console.log('fhevent2:' +JSON.stringify(fhevent));
                   
                    // const fn=async ()=>{
                    //     await   ctlInvoiceItem.getInvoiceItemAll(fhevent).then(data =>{
                    //       setCustomers(data.raws);
                    //       setcount(data.count);
                    //      }); 
                    //     }
                        // fn();                    
                    }
                  }}                      
                fhHeight={'800px'}                   
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header={t('invoiceItem.name')} field="name" sortable  key={2}></Column>,
                            <Column header ={t("invoiceItem.qty")} field = "qty" sortable key =  {10005}  ></Column>,
                            <Column header ={t("invoiceItem.unit")}  field = "unit" sortable key =  {10006}  ></Column>,
                            <Column header ={t("invoiceItem.unitPrice")}  field = "unitPrice" sortable key =  {10007}  ></Column>,
    
                            <Column header={t('invoiceItem.updatedAt')} field="updatedAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            } sortable  sortField="updatedAt" key={6}></Column>,                             
                 
 
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '16rem'}} style={{ width: '16rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                      <Button label={t('dataTable.HeadInfo')} style={{height:30,width:65}} className="p-button-sm p-button-info"  onClick={()=>{replace("/invoiceitem/"+rowData.id+"/2/"+props.mid);}}></Button>                                       
                                      <Button label={t('dataTable.Edit')}  style={{height:30,width:65}}  className="p-button-sm p-button-secondary"  onClick={()=>{
                                        replace("/invoiceitem/"+rowData.id+"/1/"+props.mid);
                                        //  //子表处理   
                                        //  let temps =globalStorage.get("temps");
                                        //  console.info('temps999:');
                                        //  console.info(temps);
                                        //  if(temps!=null)
                                        //  {
                                        //      temps.push({id:"6666", name: "kenny", sex: "m", age: "25" });
                                        //  } 
                                        //  else
                                        //  {
                                        //      temps=[{id:"6666", name: "kenny", sex: "m", age: "25" }];
                             
                                        //  } 
                                        //  globalStorage.set("temps",temps);                                        
                                        }} />
                                       
                                     <Button label={t('dataTable.Delete')}  style={{height:30,width:65}}  className="p-button-sm p-button-danger" onClick={() => {
                                          ctlInvoiceItem.removeInvoiceItem([rowData.id]).then(()=>{
                                            //replace("/invoiceitem/"+rowData.id+"/1/"+props.mid);

                                           
                                            });
                                            //fn();
                                            ///replace("/invoicedetails/"+props.mid+"/1");
                                           // replace("/invoicedetails");
                                           const mynanoid: string = nanoid();
                                           //setMainid(nanoidstr.substring(0, 10));
                                           props.FHonChange(mynanoid);
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
                 
