import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {FHcrmTable1Controller} from '../../controllers/FHcrmTable1Controller';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';

export const FHcrmTable1List = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState(null);
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const ctlFHcrmTable1 = new FHcrmTable1Controller();
    const { pathname, push,replace } = useRouter(); 
    const [val, setVal] = useState("");
    let count = 0;


    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
        if(val<2)
        {
            console.info('3333:'+val.toString());
            ctlFHcrmTable1.getFHcrmTable1All(fhevent).then(data =>{
                setCustomers(data.raws);
                setcount(data.count);
                count++; 
                setVal(count);
            }); 
       }
    }, [fhevent,val]);
    //1.数据过滤代码:
   
    const filters={
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };

    const [FHfilters, setFHfilters] = useState(filters);



    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       <div >
          <hr></hr>
         <span className="p-buttonset">
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/fhcrmtable1/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlFHcrmTable1.removeFHcrmTable1([item.id]).then(()=>{});
                }
                replace("/fhcrmtable1");
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
                    FHfilters={FHfilters}
                    fhvalue={customers}
                    totalRecords={FHcount}
                    onCustomPage = {(event) => {
                        console.info('FHevent:'+event);
                        if(1==1)
                        {
                            ctlFHcrmTable1.getFHcrmTable1All(fhevent).then(data =>{
                                setCustomers(data.raws);
                                setcount(data.count);
                              });
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
                        ctlFHcrmTable1.getFHcrmTable1All(fhevent).then(data =>{
                            setCustomers(data.raws);
                            setcount(data.count);
                          });
                        }
                      }} 
                    fhHeight={'800px'}                   
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,

                            <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                return(
                                    <React.Fragment>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/fhcrmtable1/"+rowData.id+"/2");}}></Button>
                                    </React.Fragment>
                                ); 
                            }             
                            }  sortable key={1}></Column>,
                            <Column header={t('fhcrmTable1.name')} field="name" sortable  key={2}></Column>,
                            <Column header={t('fhcrmTable1.description')}   field="description"  body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.description}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            }    key={3}></Column>,  
                            <Column header={t('fhcrmTable1.isactived')}  field="isactived"  body={(rowData) => {
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
                          
                            <Column header={t('fhcrmTable1.createdAt')} field="createdAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            }
                            sortable sortField="createdAt"  key={5}></Column>,
                            <Column header={t('fhcrmTable1.updatedAt')} field="updatedAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.updatedAt.substring(0, 10)}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            } sortable  sortField="updatedAt" key={6}></Column>,                             
                 
                            <Column  header={t('dataTable.Edit')}  field="id"   body={(rowData) => {
                                return(
                                    <React.Fragment>
                                     <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/fhcrmtable1/"+rowData.id+"/1");}} />

                                    </React.Fragment>
                                ); 
                            }             
                            } sortable sortField="id" key={7}></Column>,      
                            <Column  header={t('dataTable.Delete')}  field="id"   body={(rowData) => {
                                return(
                                    <React.Fragment>

                                     <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlFHcrmTable1.removeFHcrmTable1([rowData.id]).then(()=>{
                                             replace("/fhcrmtable1");
                                            });
                                         }}  />
                                    </React.Fragment>
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
                 