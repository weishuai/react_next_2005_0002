import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {ActivityController} from '../../controllers/ActivityController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const ActivityList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlActivity = new ActivityController();
    const { pathname, push,replace } = useRouter(); 
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const [val, setVal] = useState("");
    let count = 0;
    const fn=async ()=>{
        await   ctlActivity.getActivityAll(fhevent).then(data =>{
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
    React.useEffect(() => {
        console.info('2222:'+val.toString()); 

        fn();
    }, []);
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
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/activity/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlActivity.removeActivity([item["id"]]).then(()=>{

                        const fn=async ()=>{
                            await   ctlActivity.getActivityAll(fhevent).then(data =>{
                              setCustomers(data.raws);
                              setcount(data.count);
                             }); 
                            }
                        fn(); 

                    });
                }
               
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
                            setfhevent(event);
                            fn();                           
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
                        fn();                    
                        }
                      }}                      
                    fhHeight={'800px'}                   
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header ={t("activity.subject")}  field = "subject" sortable key =  {10006}  ></Column>,
                            <Column header ={t("activity.types")}  field = "types" 
                            body={(rowData) => {
                                let mytypes="";

                                const fhTypesItems = [
                                    { name: 'Event', code: '0' },
                                    { name: 'Task', code: '1' },
                                    { name: 'Note', code: '2' },
                                    { name: 'Email', code: '3' },
                                    { name: 'Call Log', code: '4' },
                                    { name: 'SMS', code: '5' },
                                  ];
                                for(var i=0;i<fhTypesItems.length;i++)
                                {
                                    if(rowData.types==fhTypesItems[i]["code"])
                                    {
                                        mytypes=fhTypesItems[i]["name"]
                                    }
                                }
                                
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{mytypes}</span>
                                    </React.Fragment>
                                )
                                
                               }
                             }       
                    
                            sortable key =  {10005}  ></Column>,

                            <Column header ={t("activity.starts")} field = "starts" 
                            body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.starts.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                               }
                             }             
                            sortable key =  {10007}  ></Column>,
                            <Column header ={t("activity.ends")} field = "ends"
                            body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.ends.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                               }
                             }                              
                            
                            sortable key =  {10008}  ></Column>,


                            <Column header={t('activity.updatedAt')} field="updatedAt" body={(rowData) => {
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
                                        <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}} className="p-button-sm p-button-info"  onClick={()=>{replace("/activity/"+rowData.id+"/2");}}></Button>
                                        <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/activity/"+rowData.id+"/1");}} />   
                                        <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                                        ctlActivity.removeActivity([rowData.id]).then(()=>{
                                 
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
                 
