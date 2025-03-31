import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {QuotationItemController} from '../../controllers/QuotationItemController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const QuotationItemList = (props: any) => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlQuotationItem = new QuotationItemController();
    const { pathname, push,replace } = useRouter(); 
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const [val, setVal] = useState("");

    const pathnameurl = usePathname();
    let Id ="0";
    let Mode ="0";
    let Mainid ="0";
    var result =pathnameurl; 
    let strSplitVal=result.split("/");
    console.info('strSplitVal:'+strSplitVal.toString());
    Id =strSplitVal[2];
    Mainid=Id;


    let count = 0;
    const fn=async ()=>{
        await ctlQuotationItem.getQuotationItemAll(fhevent).then(data =>{
          setCustomers(data.raws);
          setcount(data.count);
          count++;
          setVal(count);
         }); 
        }
    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
 

     
            fn(); 
       

    }, [fhevent,val]);
 
    //1.数据过滤代码:

    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
 

       
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
            
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/quotationitem/0/0/"+Mainid);}} style={{backgroundColor:'#4682B4'}}  />
          
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    // ctlQuotationItem.removeQuotationItem([item.id]).then(()=>{});
                }
                replace("/quotationitem");
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
                    // setTimeout(()=>{
                    //     console.info('0000:');
                    //     fn(); 
                    //    }, 100);                      
                    }
                  }}                      
                fhHeight={'800px'}                   
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header ={t("quotationItem.productname")}  field = "productname" sortable key =  {10005}  ></Column>,
                            <Column header ={t("quotationItem.direct_price")} field = "direct_price" sortable key =  {10009}  ></Column>,
                            <Column header ={t("quotationItem.qty")} field = "qty" sortable key =  {100011}  ></Column>,
                            <Column header ={t("quotationItem.unit")}  field = "unit" sortable key =  {100012}  ></Column>,
                            <Column header ={t("quotationItem.unit_price")} field = "unit_price" sortable key =  {100013}  ></Column>,
                            <Column header ={t("quotationItem.unit_cost")} field = "unit_cost" sortable key =  {100014}  ></Column>,                            
                            
 
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '14rem'}} style={{ width: '14rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}} className="p-button-sm p-button-info"  onClick={()=>{replace("/quotationitem/"+rowData.id+"/2/"+Mainid);}}></Button>
                                    
                                    <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/quotationitem/"+rowData.id+"/1/"+Mainid);}} />

                                    <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                                            ctlQuotationItem.removeQuotationItem([rowData.id]).then(()=>{
                                             //replace("/quotationitem");
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
                 
