import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {ProductController} from '../../controllers/ProductController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const ProductList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlProduct = new ProductController();
    const { pathname, push,replace } = useRouter();
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''}); 
    const [val, setVal] = useState("");
    const [FHcount, setcount] = useState(0);
    let count = 0;

    const fn=async ()=>{
        await   ctlProduct.getProductAll(fhevent).then(data =>{
          setCustomers(data.raws);
          setcount(data.count);
          count++;
          setVal(count);
         }); 
        }
    React.useEffect(() => {
      fn(); 
  
    }, [fhevent,val]); 
  

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
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/product/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    // ctlProduct.removeProduct([item.id]).then(()=>{});
                }
                replace("/product");
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
                        fn(); 
                        }
                      }}                      
                    fhHeight={'800px'}                  
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
                        
                            <Column header ={t("product.product_name")}  field = "productName" sortable key =  {10005}  ></Column>,
                            <Column header ={t("product.photo")} 
                            body={(rowData) => {
                               const photo =rowData.id;
                               const url ="http://127.0.0.1:85/xHbqW9XRdb.jpg";
                                return (
                                    <React.Fragment>
                                    <>
                                    <img alt="flag" 
                                     src={url}
                                     width={60} />
                                    </>
                                    </React.Fragment>
                                );
                               }} 
                            
                            sortable key =  {10006}  ></Column>,
                            <Column header ={t("product.manufacturer")} field = "manufacturer" sortable key =  {10007}  ></Column>,
                            <Column header ={t("product.category")} field = "category" sortable key =  {10008}  ></Column>,
                            <Column header ={t("product.unit")} field = "unit" sortable key =  {10009}  ></Column>,
                            <Column header ={t("product.currency")} field = "currency" sortable key =  {100010}  ></Column>,
                            <Column header ={t("product.list_price")} field = "listPrice" sortable key =  {100011}  ></Column>,
                            <Column header ={t("product.cost")} field = "cost" sortable key =  {100012}  ></Column>,
 
                            <Column header={t('product.isactived')}  field="isactived"  body={(rowData) => {
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
                          
                            <Column header={t('product.updatedAt')} field="updatedAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            } sortable  sortField="updatedAt" key={6}></Column>,                             
                 

                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '14rem'}} style={{ width: '14rem'}}  body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}}  disabled={false} className="p-button-sm p-button-info"  
                                     onClick={()=>{replace("/product/"+rowData.id+"/2");}}
                                     ></Button>

                                     <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  disabled={false} className="p-button-sm p-button-secondary" 
                                      onClick={()=>{replace("/product/"+rowData.id+"/1");}}
                                       />
                                    
                                     <Button label={t('dataTable.Delete')}  style={{height:25,width:51}} disabled={false}  className="p-button-sm p-button-danger" onClick={() => {
                                          ctlProduct.removeProduct([rowData.id]).then(()=>{
                                            // replace("/campaign");
                                            });
                                            const mynanoid: string = nanoid();
                                            // props.FHonChange(mynanoid);
                                            setVal(mynanoid);    
                                         }}  />
                                   </div>
                                ); 
                            }             
                            }  key={1}></Column>,                            

                        ]  
                    } 

                    >
            </MyDataTable>
            </div>
        </div>
    );
}
                 
