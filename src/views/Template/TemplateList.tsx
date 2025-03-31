import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {TemplateController} from '../../controllers/TemplateController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const TemplateList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState(null);
    const ctlTemplate = new TemplateController();
    const { pathname, push,replace } = useRouter(); 
    const [val, setVal] = useState("");
    let count = 0;
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});    
    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
       
            console.info('3333:'+val.toString());
            ctlTemplate.getTemplateAll(fhevent).then(data =>{
                setCustomers(data.raws);
                setcount(data.count);
                count++; 
                setVal(count);
            }); 
      
    }, [fhevent,val]);


    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
   
            console.info('3333:'+val.toString());
            ctlTemplate.getTemplateAll(fhevent).then(data =>{
                setCustomers(data.raws);
                setcount(data.count);
                count++; 
                setVal(count);
            }); 
    
    }, []);

    //1.数据过滤代码:
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
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/template/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlTemplate.removeTemplate([item.id]).then(()=>{});
                }
                replace("/template");
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
                    FHonChange={(e) => {
                        console.log('e_ok:' +JSON.stringify(e));
                        setFHids(e);
                      }}
                    fhHeight={'800px'}                   
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,

                            <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                return(
                                    <React.Fragment>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/template/"+rowData.id+"/2");}}></Button>
                                    </React.Fragment>
                                ); 
                            }             
                            }  sortable key={1}></Column>,
                            <Column header={t('template.name')} field="name" sortable  key={2}></Column>,
                            <Column header ={t("template.templateNam")}  field = "templateNam" sortable key =  {10005}  ></Column>,
                            <Column header ={t("template.photo")}  field = "photo" sortable key =  {10006}   ></Column>,
                            <Column header ={t("template.templateType")} field = "templateType" sortable key =  {10007}  ></Column>,                            
                 
                            <Column  header={t('dataTable.Edit')}  field="id"   body={(rowData) => {
                                return(
                                    <React.Fragment>
                                     <Button label={t('dataTable.Edit')}  style={{height:25,width:60}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/template/"+rowData.id+"/1");}} />

                                    </React.Fragment>
                                ); 
                            }             
                            } sortable sortField="id" key={7}></Column>,      
                            <Column  header={t('dataTable.Delete')}  field="id"   body={(rowData) => {
                                return(
                                    <React.Fragment>

                                     <Button label={t('dataTable.Delete')}  style={{height:25,width:60}}   className="p-button-sm p-button-danger" onClick={() => {
                                         ctlTemplate.removeTemplate([rowData.id]).then(()=>{
                                             //replace("/template");
                                            });
                                            const mynanoid: string = nanoid();
                                            // props.FHonChange(mynanoid);
                                            setVal(mynanoid);    
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
                 
