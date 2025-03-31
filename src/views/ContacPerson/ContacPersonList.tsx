import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {ContacPersonController} from '../../controllers/ContacPersonController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const ContacPersonList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlContacPerson = new ContacPersonController();
    const { pathname, push,replace } = useRouter(); 
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const [val, setVal] = useState("");
    let count = 0;
    const fn=async ()=>{
        await  ctlContacPerson.getContacPersonAll(fhevent).then(data =>{
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
            //  }, 100);
             fn(); 
        }, []);


    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
 
        // setTimeout(()=>{
        //     console.info('0000:');
        //     fn(); 
        //  }, 100);
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
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/contacperson/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlContacPerson.removeContacPerson([item["id"]]).then(()=>{});
                }
                const mynanoid: string = nanoid();
                //props.FHonChange(mynanoid);
                setVal(mynanoid);
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
                    //  }, 100);
                    //  fn(); 
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
                //    setTimeout(()=>{
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


                            <Column header={t('contacPerson.name')} field="name" sortable  key={2}></Column>,
                            <Column header ={t("contacPerson.email")}  field = "email" sortable key =  {10005}  ></Column>,
                            <Column header ={t("contacPerson.jobTitle")}  field = "jobTitle" sortable key =  {10009}  ></Column>,
                            <Column header ={t("contacPerson.client")}  field = "client" sortable key =  {100010}  ></Column>,

                            <Column header={t('contacPerson.isactived')}  field="isactived"  body={(rowData) => {
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
                          

                            <Column header={t('contacPerson.updatedAt')} field="updatedAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            } sortable  sortField="updatedAt" key={6}></Column>,                             
                 
 
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '14rem'}} style={{ width: '14rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                      <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}} className="p-button-sm p-button-info"  onClick={()=>{replace("/contacperson/"+rowData.id+"/2");}}></Button>
                                                                          
                                      <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/contacperson/"+rowData.id+"/1");}} />
                                       
                                     <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlContacPerson.removeContacPerson([rowData.id]).then(()=>{
                                            //  replace("/contacperson");
                                            });
                                            const mynanoid: string = nanoid();
                                            //props.FHonChange(mynanoid);
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
                 
