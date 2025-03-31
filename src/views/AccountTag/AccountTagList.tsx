import { useRouter } from 'next/navigation';
import React,{useState} from 'react';
import { useTranslation } from 'react-i18next'
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
//import { CustomerService } from '../../controllers/customerController';
import { AccountTagController } from '../../controllers/AccountTagController';
import { TimesController } from '../../utils/TimesController';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { MyDataTable } from '../../components/myDataTable/DataTable';
import { Dialog } from 'primereact/dialog';
const { nanoid } = require('nanoid');
export const AccountTagList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [FHids, setFHids] = useState(null);
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const ctlAccountTag = new AccountTagController();
    const ctlTiems=new TimesController();
    const { pathname, push,replace } = useRouter(); 
    const [val, setVal] = useState("");
    let count = 0;

    const fn=async ()=>{
        await       ctlAccountTag.getAccountTagAll(fhevent).then(data =>{
            setCustomers(data.raws);
            setcount(data.count);
            count++; 
            setVal(count);
        }); 
        }
    React.useEffect(() => {
    fn();
    }, [fhevent,val]); 

    //1.数据过滤代码:
   

    React.useEffect(() => {

    
        fn();
        }, []); 

    const filters={
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };

    const [FHfilters, setFHfilters] = useState(filters);

    //2.弹出窗体
    const openDialog = () => {
        setDialogVisible(true);
    }

    const closeDialog = () => {
        setDialogVisible(false);
    }

    const dialogFooterTemplate = () => {
        return (
            <div>
                <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  style={{backgroundColor:'#4682B4'}}/>
                &nbsp;&nbsp;&nbsp;
                <Button label={t('dataTable.Submit')} icon="pi pi-check" onClick={closeDialog}  autoFocus  style={{backgroundColor:'#4682B4'}}/>
            </div>
        );       
    }

    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       <div >
          <hr></hr>
         <span className="p-buttonset">
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/account/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlAccountTag.removeAccountTag([item.id]).then(()=>{
                    });
                }
                ctlAccountTag.getAccountTagAll(fhevent).then(data =>{
                    setCustomers(data.raws);
                    setcount(data.count);
                }); 
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
                    onCustomPage = {async (event) => {
                        console.info('FHevent:'+event);
                        if(1==1)
                        {
                            await ctlAccountTag.getAccountTagAll(event).then(data =>{
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
                    SearchonChange={async (e) => {
                        console.log('fhevent["search"]:' +JSON.stringify(e));
                        console.log('fhevent1:' +JSON.stringify(fhevent));
                        if(1==1)
                        {
                        fhevent["search"]=e;
                        setfhevent(fhevent);
                        console.log('fhevent2:' +JSON.stringify(fhevent));
                        await ctlAccountTag.getAccountTagAll(fhevent).then(data =>{
                            setCustomers(data.raws);
                            setcount(data.count);
                          });
                        }
                      }} 

                    fhHeight={'800px'}                   
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header="Name" field="name" sortable  key={2}></Column>, 
                            <Column header="Description"   field="description"  body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{rowData.description}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            }    key={3}></Column>,  
                            <Column header="Isactived"  field="isactived"  body={(rowData) => {
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
                          
                            <Column header="CreateAt" field="createdAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{ctlTiems.getTimesFormatShort(new Date(rowData.createdAt))}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            }
                            sortable sortField="createdAt"  key={5}></Column>,  
                            <Column header="UpdatedAt" field="updatedAt" body={(rowData) => {
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{ctlTiems.getTimesFormatShort(new Date(rowData.updatedAt))}</span>
                                    </React.Fragment>
                                )
                                
                            }             
                            } sortable  sortField="updatedAt" key={6}></Column>,                             
                 
                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '14rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25,width:60}} className="p-button-sm p-button-info"  onClick={()=>{replace("/account/"+rowData.id+"/2");}}></Button>
                                     <Button label={t('dataTable.Edit')} style={{height:25,width:60}}  className="p-button-sm p-button-secondary"  onClick={()=>{
                                        replace("/account/"+rowData.id+"/1");
                                        }} />                                   
                                    <Button label={t('dataTable.Delete')}  style={{height:25,width:60}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlAccountTag.removeAccountTag([rowData.id]).then(()=>{
                                             
                                            ctlAccountTag.getAccountTagAll(fhevent).then(data =>{
                                                setCustomers(data.raws);
                                                setcount(data.count);
                                            }); 

                                            });
                                            const mynanoid: string = nanoid();
                                            // props.FHonChange(mynanoid);
                                            setVal(mynanoid);     
                                         }}  />                                   
                                   </div>
                                ); 
                            }             
                            }  sortable key={1}></Column>
                        ]  
                    } 

                    >
            </MyDataTable>
            </div>
        </div>
    );
}
                 
