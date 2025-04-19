import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
// import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {OpportunityCommentsController} from '../../controllers/OpportunityCommentsController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/FHDataTable';
const { nanoid } = require('nanoid');
export const OpportunityCommentsList = (props: any) => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlOpportunityComments = new OpportunityCommentsController();
    const { pathname, push,replace } = useRouter(); 
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','mid':'0','sort':''}); 
    const [val, setVal] = useState("");
    const [FHcount, setcount] = useState(0);
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
        await  ctlOpportunityComments.getOpportunityCommentsAll(fhevent).then(data =>{
          setCustomers(data.raws);
          setcount(data.count);
        //   count++;
        //   setVal(count);
         }); 
        }

        React.useEffect(() => {
            const fhmid=props.mid;
            console.info('fhmid:'+fhmid); 
            console.info('2222:'+val.toString()); 
            if(1==1)
            {
                // console.info('3333:'+val.toString());
                // setTimeout(()=>{
                //     console.info('0000:');
                //     fn(); 
                //    }, 100); 
            
                   fn(); 
           }
        }, []);       
     React.useEffect(() => {
        const fhmid=props.mid;
        console.info('fhmid:'+fhmid); 
        console.info('2222:'+val.toString()); 
        if(1==1)
        {
            // console.info('3333:'+val.toString());
            // setTimeout(()=>{
            //     console.info('0000:');
            //     fn(); 
            //    }, 100); 
        
               fn(); 
       }
    }, [fhevent,val]); 


    //1.数据过滤代码:
   /*
    const filters={
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };

    const [FHfilters, setFHfilters] = useState(filters);

  */   

    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       {/* <div >
          <hr></hr> */}
         <span className="p-buttonset">
           
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/opportunitycomments/0/0/"+Mainid);}} style={{backgroundColor:'#4682B4'}}  />
            
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlOpportunityComments.removeOpportunityComments([item.id]).then(()=>{});
                }
                const mynanoid: string = nanoid();
                props.FHonChange(mynanoid);
                setVal(mynanoid);
                }}   />
            <span style={{width:650}}></span>
            {/* <Button label={t('dataTable.Import')} icon="pi pi-sign-in"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Export')} icon="pi pi-sign-out"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Report')} icon="pi pi-file-pdf" />  */}
                   
        </span>
        {/* <hr></hr> */}
        {/* </div> */}
       
            {/* <div className="card" > */}
            <MyDataTable 
                   
                   fhHeight="500px"

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
                       
             
                        // setTimeout(()=>{
                        //     console.info('0000:');
                        //     fn(); 
                        //    }, 100); 
                        //    fn();                    
                        }
                      }}                      
                                      
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header ={t("opportunityComments.name")}  field = "name" sortable key =  {10006}  ></Column>,
                            <Column header ={t("opportunityComments.description")}  field = "description" sortable key =  {10007}  ></Column>,
  
                            <Column header={t('opportunityComments.isactived')}  field="isactived"  body={(rowData) => {
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
                          
                            <Column header={t('opportunityComments.createdAt')} field="createdAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            }
                            sortable sortField="createdAt"  key={5}></Column>,
                            <Column header={t('opportunityComments.updatedAt')} field="updatedAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            } sortable  sortField="updatedAt" key={6}></Column>,                             
 
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '10rem'}} style={{ width: '10rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                    {/* <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}} className="p-button-sm p-button-info"  onClick={()=>{replace("/opportunitycomments/"+rowData.id+"/2/"+props.mid);}}></Button>
                                                                            */}
                                    <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/opportunitycomments/"+rowData.id+"/1/"+props.mid);}} />

                                    <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlOpportunityComments.removeOpportunityComments([rowData.id]).then(()=>{
                                             //replace("/opportunitycomments");
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
            {/* </div> */}
        </div>
    );
}
                 
export const OpportunityCommentsListShow = (props: any) => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState([]);
    const ctlOpportunityComments = new OpportunityCommentsController();
    const { pathname, push,replace } = useRouter(); 
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','mid':'0','sort':''}); 
    const [val, setVal] = useState("");
    const [FHcount, setcount] = useState(0);
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
        await  ctlOpportunityComments.getOpportunityCommentsAll(fhevent).then(data =>{
          setCustomers(data.raws);
          setcount(data.count);
        //   count++;
        //   setVal(count);
         }); 
        }

        React.useEffect(() => {
            const fhmid=props.mid;
            console.info('fhmid:'+fhmid); 
            console.info('2222:'+val.toString()); 
            if(1==1)
            {
                // console.info('3333:'+val.toString());
                // setTimeout(()=>{
                //     console.info('0000:');
                //     fn(); 
                //    }, 100); 
            
                   fn(); 
           }
        }, []);       
     React.useEffect(() => {
        const fhmid=props.mid;
        console.info('fhmid:'+fhmid); 
        console.info('2222:'+val.toString()); 
        if(1==1)
        {
            // console.info('3333:'+val.toString());
            // setTimeout(()=>{
            //     console.info('0000:');
            //     fn(); 
            //    }, 100); 
        
               fn(); 
       }
    }, [fhevent,val]); 


    //1.数据过滤代码:
   /*
    const filters={
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };

    const [FHfilters, setFHfilters] = useState(filters);

  */   

    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       {/* <div >
          <hr></hr> */}
         <span className="p-buttonset">
           
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/opportunitycomments/0/0/"+Mainid);}} style={{backgroundColor:'#4682B4'}}  />
            
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlOpportunityComments.removeOpportunityComments([item.id]).then(()=>{});
                }
                const mynanoid: string = nanoid();
                props.FHonChange(mynanoid);
                setVal(mynanoid);
                }}   />
            <span style={{width:650}}></span>
            {/* <Button label={t('dataTable.Import')} icon="pi pi-sign-in"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Export')} icon="pi pi-sign-out"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Report')} icon="pi pi-file-pdf" />  */}
                   
        </span>
        {/* <hr></hr> */}
        {/* </div> */}
       
            {/* <div className="card" > */}
            <MyDataTable 
                   
                   fhHeight="500px"

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
                       
             
                        // setTimeout(()=>{
                        //     console.info('0000:');
                        //     fn(); 
                        //    }, 100); 
                        //    fn();                    
                        }
                      }}                      
                                      
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header ={t("opportunityComments.name")}  field = "name" sortable key =  {10006}  ></Column>,
                            <Column header ={t("opportunityComments.description")}  field = "description" sortable key =  {10007}  ></Column>,
  
                            <Column header={t('opportunityComments.isactived')}  field="isactived"  body={(rowData) => {
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
                          
                            <Column header={t('opportunityComments.createdAt')} field="createdAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            }
                            sortable sortField="createdAt"  key={5}></Column>,
                            <Column header={t('opportunityComments.updatedAt')} field="updatedAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            } sortable  sortField="updatedAt" key={6}></Column>,                             
 
                            // <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '14rem'}} style={{ width: '14rem'}}   body={(rowData) => {
                            //     return(
                            //         <div style={{textAlign:'center',flex:1}}>
                            //         <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}} className="p-button-sm p-button-info"  onClick={()=>{replace("/opportunitycomments/"+rowData.id+"/2/"+props.mid);}}></Button>
                                                                           
                            //         <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/opportunitycomments/"+rowData.id+"/1/"+props.mid);}} />

                            //         <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                            //              ctlOpportunityComments.removeOpportunityComments([rowData.id]).then(()=>{
                            //                  //replace("/opportunitycomments");
                            //                 });
                            //                 const mynanoid: string = nanoid();
                            //                 props.FHonChange(mynanoid);
                            //                 setVal(mynanoid);
                            //              }}  />
                                    
                            //        </div>
                            //     ); 
                            // }             
                            // } sortable sortField="id" key={8}></Column>, 
                        ]  
                    } 

                    >
            </MyDataTable>
            {/* </div> */}
        </div>
    );
}
      