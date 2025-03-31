import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {WorkController} from '../../controllers/WorkController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');

export const WorkList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const [Mainid, setMainid] = useState([]);
    const [createAt, setCreateAt] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);
    const ctlWork = new WorkController();
    const { pathname, push,replace } = useRouter(); 
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const [val, setVal] = useState("");
    let count = 0;
    const fn=async ()=>{
        await  ctlWork.getWorkAll(fhevent).then(data =>{
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
            const nanoidstr: string = nanoid();
            setMainid(nanoidstr.substring(0, 10));
            const fhnew=new Date();
            setCreateAt(fhnew);
            setUpdatedAt(fhnew); 
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
            <span style={{width:100}}></span>
            {/* <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/work/0/0");}} style={{backgroundColor:'#4682B4'}}  /> */}
            
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
                "quote": null,
                "title:": null,
                "priority": null,
                "states": null,
                "termsId": null,
                "qty": null,
                "workType": null,
                "room": null,
                "client": null,
                "contact": null,
                "workInstructions": null,
                "assignTo": null,
                "remark": null,
                "reedback": null,
                "signBelowTxt": null,
                "signBelowPhoto": null,
                "signBelowUserid": null,
                "signBelowTime": null,
                "fullAddress": null,
            };

            ctlWork.createWork(InvoiceDetails);
            replace("/work/"+Mainid+"/1");
            }} 
            style={{backgroundColor:'#4682B4'}}  />           
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlWork.removeWork([item.id]).then(()=>{});
                }
                //replace("/work");
                const mynanoid: string = nanoid();
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


                            <Column header ={t("work.quote")}  field = "quote" sortable key =  {10005}  ></Column>,
                            <Column header ={t("work.title")}  field = "title" sortable key =  {10006}  ></Column>,
                            <Column header ={t("work.terms_id")}  field = "terms_id" sortable key =  {10007}  ></Column>,
                            <Column header ={t("work.priority")}  field = "priority" sortable key =  {10008}  ></Column>,
                            <Column header ={t("work.states")}  field = "states" sortable key =  {10009}  ></Column>,

                            <Column header={t('work.updatedAt')} field="updatedAt" body={(rowData) => {
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
                                      <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}} className="p-button-sm p-button-info"  onClick={()=>{replace("/work/"+rowData.id+"/2");}}></Button>
                                                                          
                                      <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/work/"+rowData.id+"/1");}} />

                                      <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlWork.removeWork([rowData.id]).then(()=>{
                                             //replace("/work");
                                            });
                                            const mynanoid: string = nanoid();
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
                 
