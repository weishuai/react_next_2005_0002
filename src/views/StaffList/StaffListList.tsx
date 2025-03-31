import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {StaffListController} from '../../controllers/StaffListController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const StaffListList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState(null);
    const ctlstaffList = new StaffListController();
    const { pathname, push,replace } = useRouter(); 
    const [FHcount, setcount] = useState(0);
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const [val, setVal] = useState("");
    let count = 0;

    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
       
            console.info('3333:'+val.toString());
            ctlstaffList.getStaffListAll(fhevent).then(data =>{
                setCustomers(data.raws);
                setcount(data.count);
                console.info('3333:'+JSON.stringify(data.raws));
                // count++; 
                // setVal(count);
            }); 
      
    }, []);



    React.useEffect(() => {

            ctlstaffList.getStaffListAll(fhevent).then(data =>{
                setCustomers(data.raws);
                setcount(data.count);
                // count++; 
                // setVal(count);
            }); 
      
    }, [fhevent,val]);
    //1.数据过滤代码:
 React.useEffect(() => {

        ctlstaffList.getStaffListAll(fhevent).then(data =>{
            setCustomers(data.raws);
            setcount(data.count);
            // count++; 
            // setVal(count);
        }); 
  
}, []);
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
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/stafflist/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlstaffList.removeStaffList([item.id]).then(()=>{});
                }
                //replace("/stafflist");
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


                            <Column header ={t("staffList.name")} field="name" sortable  key={2}></Column>,
                            <Column header ={t("staffList.FullName")}  field = "fullName" sortable key =  {10005}  ></Column>,
                            <Column header ={t("staffList.ContactNo")}  field = "contactNo" sortable key =  {10006}   ></Column>,
                            // <Column header ={t("staffList.Email")} field = "email" sortable key =  {10007}  ></Column>,
                            <Column header ={t("staffList.Role")} field = "role" sortable key =  {10008}  ></Column>,
                            <Column header ={t("staffList.Type")} field = "type" sortable key =  {100010}  ></Column>,                    
                           
                            <Column  header={t('dataTable.Info')} field="id"  alignHeader="center" headerStyle={{minWidth: '16rem'}} style={{ width: '16rem'}} body={(rowData) => {
                                return(
                                    <React.Fragment>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25,width:60}} className="p-button-sm p-button-info"  onClick={()=>{replace("/stafflist/"+rowData.id+"/2");}}></Button>
                                     <Button label={t('dataTable.Edit')}  style={{height:25,width:60}}    className="p-button-sm p-button-secondary"  onClick={()=>{replace("/stafflist/"+rowData.id+"/1");}} />
                                     <Button label={t('dataTable.Delete')}  style={{height:25,width:60}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlstaffList.removeStaffList([rowData.id]).then(()=>{
                                            // replace("/stafflist");
                                            });
                                            const mynanoid: string = nanoid();
                                            setVal(mynanoid);
                                         }}  />                                 
                                   
                                    </React.Fragment>
                                ); 
                            }             
                            }  sortable key={1}></Column>,                          
                        

                        ]  
                    } 

                    >
            </MyDataTable>
            </div>
        </div>
    );
}
                 
