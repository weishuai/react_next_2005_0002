import React, {useCallback,useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {CampaignController} from '../../controllers/CampaignController';
import { UserController } from '../../controllers/UserController';
import { DatetiemController } from '../../controllers/DatetiemController';
import { parseParams } from '../../utils/parseParams';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
import {Repeat} from '../../components/myData/Repeat';
import { urlToHttpOptions } from 'url';
const { nanoid } = require('nanoid');
export const CampaignList = (props) => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState(null);
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const [FHsearch, setFHsearch] = useState("");
    const [FHtime, setFHtime] = useState(null)
    const ctlCampaign = new CampaignController();
    const { pathname, query,push,replace } = useRouter(); 
    const ctlUser=new UserController();
    const ctltiem=new DatetiemController();
    const [firstLoad, setFirstLoad] = useState(true);
    const [val, setVal] = useState("");
    let count = 0;
    let getCustomers = (data) => {
        return [...data || []].map(d => {
            d["key"] = new Date();
            return d;
        });
    }
    ///let fh1:any=null;
    // function getData() {
    //     setTimeout(()=>{
    //         console.info('0000:');
    //         count++;  
    //         setVal(count); 
    //     }, 1000);
        
    //   };
//    function fhclearTimeout() {
//         if(count>3)
//         {
//          ///clearTimeout(fh1);
//         }
//       };
    
const fn=async ()=>{
    console.info('3333:'+val.toString());
    ctlCampaign.getCampaignAll(fhevent).then(data =>{
        setCustomers(data.raws);
        setcount(data.count);
        // count++; 
        // setVal(count);
    }); 
    }

    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
        // if(val<2)
        // {
        //     fn();
        // }
        fn();
    }, []); 
  


    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
        // if(val<2)
        // {
        //     fn();
        // }
        fn();
    }, [fhevent,val]); 
  

 
   /*
    React.useEffect(
        
        useCallback(() => {
        ///getData();
        console.info('加载数据1:');
        if (firstLoad) {
            console.info('加载数据21:');  
           
                 ctlCampaign.getCampaignAll(fhevent).then(data =>{
                    setCustomers(getCustomers(data.raws));
                    setcount(data.count);
                  }); 
           

  

       }
        else
        {
            console.info('加载数据22:');  
        }
        return () => {
          console.info('加载数据3:');
          setFirstLoad(false);
     
        };
      }, [fhevent,query,firstLoad,setFirstLoad]),[fhevent,query,firstLoad,setFirstLoad]); 
   
     */
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
       <div >
          <hr></hr>
         <span className="p-buttonset">
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/campaign/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlCampaign.removeCampaign([item.id]).then(()=>{});
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
                    ///FHfilters={FHfilters}
                    fhvalue={customers}
                    totalRecords={FHcount}
                    onCustomPage = {(event) => {
                        console.info('FHevent:'+event);
                        if(1==1)
                        {
                         
                            // ctlCampaign.getCampaignAll(event).then(data =>{
                            //     setCustomers(data.raws);
                            //     setcount(data.count);
                            //   });
                            setfhevent(event);
                           
                        }

                    }
                    }                     
                    FHonChange={(e) => {
                        console.log('e_ok:' +JSON.stringify(e));
                        setFHids(e);
                      }}
                    SearchonChange={(e) => {
                        console.log('fhevent["search"]:' +JSON.stringify(e));
                        console.log('fhevent1:' +JSON.stringify(fhevent));
                        if(1==1)
                        {
                        fhevent["search"]=e;
                        setfhevent(fhevent);
                        console.log('fhevent2:' +JSON.stringify(fhevent));
                       
                        ctlCampaign.getCampaignAll(fhevent).then(data =>{
                            setCustomers(data.raws);
                            setcount(data.count);
                          });
                        
                        }
                      }}                      
                    fhHeight={'800px'}                   
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
                            <Column header={t('campaign.name')} field="name" headerStyle={{minWidth: '1rem'}}   style={{ minWidth: '1rem' }}    key={2}></Column>,
                            <Column header ={t("campaign.starts")} field = "starts"   headerStyle={{minWidth: '4rem'}}  style={{ minWidth: '4rem' }}   key =  {10006}   body={(rowData) => {
                                const fhstarts= ctltiem.getListDate(rowData.starts);

                                return(
                                    <React.Fragment>
                                       <span className="image-text">{fhstarts.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            } ></Column>,
                            // <Column header ={t("campaign.owner")}   key =  {10008}   body={(rowData) => {
                                
                            //   const fhid= rowData.owner; 
                            //     // return(
                            //     //     <Repeat id={fhid}> </Repeat>
                                  
                            //     // )
                                
                            // }             
                            // }></Column>,
                            <Column header ={t("campaign.budget")} field = "budget" headerStyle={{minWidth: '2rem'}}   style={{ minWidth: '2rem' }}  key =  {10009} ></Column>,
                            <Column header ={t("campaign.status")} field = "status" headerStyle={{minWidth: '2rem'}}   style={{ minWidth: '2rem' }}  key =  {100010} body={(rowData) => {
                                let fhtxt="";
                                if(rowData.status=="0")
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
                            } ></Column>,
  
                          

                            <Column header={t('campaign.updatedAt')} field="updatedAt"   alignHeader="center" headerStyle={{width: '12.5rem'}}  style={{ width: '12.5rem' }}  body={(rowData) => {
                               const fhupdatedAt= ctltiem.getListDatetime(rowData.updatedAt);
                               
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{fhupdatedAt}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            }  sortField="updatedAt" key={6}></Column>,                             
                 
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '16rem'}} style={{ width: '16rem'}}  body={(rowData) => {
                                return(
                                    <React.Fragment>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25,width:60}} className="p-button-sm p-button-info"  onClick={()=>{replace("/campaign/"+rowData.id+"/2");}}></Button>

                                     <Button label={t('dataTable.Edit')}  style={{height:25,width:60}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/campaign/"+rowData.id+"/1");}} />
                                    
                                     <Button label={t('dataTable.Delete')}  style={{height:25,width:60}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlCampaign.removeCampaign([rowData.id]).then(()=>{
                                             //replace("/campaign");
                                            });
                                            const mynanoid: string = nanoid();
                                            //props.FHonChange(mynanoid);
                                            setVal(mynanoid);
                                         }}  />
                                    
                                    
                                    </React.Fragment>
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
                 
