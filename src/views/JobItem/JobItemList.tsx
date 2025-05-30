import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
// import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {JobItemController} from '../../controllers/JobItemController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/FHDataTable';
const { nanoid } = require('nanoid');
export const JobItemList = (props: any) => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlJobItem = new JobItemController();
    const { pathname, push,replace } = useRouter(); 
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','mid':'0','sort':''});
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
        fhevent.mid=Id.toString();
        await   ctlJobItem.getJobItemAll(fhevent).then(data =>{
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
          
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/jobitem/0/0/"+Mainid);}} style={{backgroundColor:'#4682B4'}}  />
           
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlJobItem.removeJobItem([item.id]).then(()=>{});
                }
                // replace("/jobitem");
                const mynanoid: string = nanoid();
                props.FHonChange(mynanoid);
                setVal(mynanoid);
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
                        await   ctlJobItem.getJobItemAll(fhevent).then(data =>{
                          setCustomers(data.raws);
                          setcount(data.count);
                         }); 
                        }
                        fn();                     
                     }
                   }}                      
                 fhHeight={'800px'}                  
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            // <Column header={t('jobItem.name')} field="name" sortable  key={2}></Column>,
                            <Column header ={t("jobItem.step")} field = "step" sortable key =  {10005}  ></Column>,
                            <Column header ={t("jobItem.title")}  field = "title" sortable key =  {10006}  ></Column>,
                            
                            <Column header ={t("jobItem.read")}  field = "read" sortable key =  {100061}  ></Column>,  
                            
                            
                            <Column header ={t("jobItem.template")}  field = "template" sortable key =  {10007}  ></Column>,
                            <Column header ={t("jobItem.require")}  field = "require" sortable key =  {10008}  ></Column>,
                            <Column header ={t("jobItem.photo")}  field = "photo" sortable key =  {10009}  ></Column>,                            
  
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '14rem'}} style={{ width: '14rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                      <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}} className="p-button-sm p-button-info"  onClick={()=>{replace("/jobitem/"+rowData.id+"/2/"+props.mid);}}></Button>
                                                                          
                                      <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/jobitem/"+rowData.id+"/1/"+props.mid);}} />
                                       
                                      <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlJobItem.removeJobItem([rowData.id]).then(()=>{
                                            // replace("/jobitem");
                                            });
                                            const mynanoid: string = nanoid();
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
                 
