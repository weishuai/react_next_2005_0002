import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {OpportunityController} from '../../controllers/OpportunityController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const OpportunityList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);

    const [Mainid, setMainid] = useState([]);
    const [createAt, setCreateAt] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);


    const ctlOpportunity = new OpportunityController();
    const { pathname, push,replace } = useRouter(); 
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''}); 
    const [val, setVal] = useState("");
    const [FHcount, setcount] = useState(0);
    let count = 0;
    const fn=async ()=>{
        await   ctlOpportunity.getOpportunityAll(fhevent).then(data =>{
          setCustomers(data.raws);
          setcount(data.count);
        //   count++;
        //   setVal(count);
         }); 
        }

        React.useEffect(() => {

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

        // setTimeout(()=>{
        //     console.info('0000:');
        //     fn(); 
        //    }, 100); 
   fn(); 
    }, [fhevent,val]); 
    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       <div >
          <hr></hr>
         <span className="p-buttonset">
            <span style={{width:100}}></span>
            {/* <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/opportunity/0/0");}} style={{backgroundColor:'#4682B4'}}  /> */}
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
                    "refNumber": null,
                    "opportunityName": null,
                    "account": null,
                    "opportunityOwner": null,
                    "expiryDate": createAt,
                    "stageName": null,
                    "probability": null,
                    "stage": null,
                    "priority": null,
                    "dealAge": null,
                    "forecastValue": null,
                    "expectedCloseDate":createAt,
                    "currency": null,
                    "salesValue": null,
                    "cost": null,
                    "remark": null,
                };

                ctlOpportunity.createOpportunity(InvoiceDetails);
                replace("/opportunity/"+Mainid+"/1");
                }} 
                style={{backgroundColor:'#4682B4'}}  />



                <span style={{width:100}}></span>          
            
            
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlOpportunity.removeOpportunity([item.id]).then(()=>{});
                }
                //replace("/opportunity");
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
                        setfhevent(fhevent);
                        console.log('fhevent2:' +JSON.stringify(fhevent));
                       
                        // const fn=async ()=>{
                        //     await   ctlOpportunity.getOpportunityAll(fhevent).then(data =>{
                        //       setCustomers(data.raws);
                        //       setcount(data.count);
                        //      }); 
                        //     }
                            fn(); 
                           
                        
                        }
                      }}                      
                    fhHeight={'800px'}                      
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>, 
                            <Column header ={t("opportunity.refNumber")}  field = "refNumber" sortable key =  {10005}  ></Column>,
                            <Column header ={t("opportunity.opportunityName")}  field = "opportunityName" sortable key =  {10006}  ></Column>,
                            <Column header ={t("opportunity.account")} field = "account" sortable key =  {10007}  ></Column>,
                            <Column header ={t("opportunity.opportunityOwner")} field = "opportunityOwner" sortable key =  {10008}  ></Column>,
                            <Column header={t('opportunity.updatedAt')} field="updatedAt"   body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                               }
                             }    sortable  sortField="updatedAt" key={6}></Column>,                             

                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '14rem'}} style={{ width: '14rem'}}  body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}}  disabled={false} className="p-button-sm p-button-info"  onClick={()=>{replace("/opportunity/"+rowData.id+"/2");}}></Button>

                                     <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/opportunity/"+rowData.id+"/1");}} />
                                    
                                     <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlOpportunity.removeOpportunity([rowData.id]).then(()=>{
                                             //replace("/opportunity");
                                            });
                                            const mynanoid: string = nanoid();
                                            //props.FHonChange(mynanoid);
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
                 
