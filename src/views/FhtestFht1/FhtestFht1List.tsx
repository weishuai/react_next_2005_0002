import React,{useState} from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { FhtestFht1Controller } from '../../controllers/FhtestFht1Controller';
import { TimesController } from '../../utils/TimesController';
import { Button } from 'primereact/button';
import { MyDataTable } from '../../components/myDataTable/DataTable';
export const FhtestFht1List = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [FHids, setFHids] = useState(null);
    const ctlFhtestFht1 = new FhtestFht1Controller();
    const ctlTiems=new TimesController();
    const { pathname, push,replace } = useRouter();
    const [FHcount, setcount] = useState(0);
    let [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    var fhcount=0;
    const fn=async (fhevent)=>{
        await     ctlFhtestFht1.getFhtestFht1All(fhevent).then(data =>{

             ctlFhtestFht1.getFhtestFht1All_count(fhevent).then(dataok =>{
                console.log('mylist:'+data["fhok"]);
                if(data["fhok"]!="")
                {
                var list=eval('(' + data["fhok"] + ')');
                var list_count=eval('(' + dataok["fhok"] + ')');
                // console.log('mylist:'+list);
                // console.log('mycount:'+list_count);
                setCustomers(list);
                setcount(list_count);
                                    
               }
               else
               {
                setCustomers([]);
                setcount(0);               
               }

            });

        }); 
        }


    React.useEffect(() => {
        if(fhcount==0)
        {
            fhcount=fhcount+1;
            fn(fhevent);
        }
        
    }, []);

    //1.数据过滤代码:

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
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/fhtestfht1/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlFhtestFht1.removeFhtestFht1([item.id]).then(()=>{
                        fn(fhevent);  
                    });
                }
                //fn();
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
                            fn(event);                         
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
                        fhevent={'first':0,'rows':10,'page':0,'search':'','sort':''};
                        fhevent["search"]=e;
                        setfhevent(fhevent);
                        fn(fhevent);
                      }}  
                    fhHeight={'800px'}
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,

                            <Column header ={t("fhtestFht1.fhname")}  field = "fhname" sortable={false} key =  {10005}  ></Column>,
                            <Column header ={t("fhtestFht1.fhF1")} field = "fhF1" sortable={false}  key =  {10006}  ></Column>,
                            <Column header ={t("fhtestFht1.fhF2")} field = "fhF2" sortable={false}  key =  {10007}  ></Column>,
                            <Column header ={t("fhtestFht1.fhF3")} field = "fhF3" sortable={false}  key =  {10008}  ></Column>,
       

                            <Column   header={t('dataTable.Info')} field="id"  sortable={false}  alignHeader="center" headerStyle={{minWidth: '16rem'}} style={{ width: '16rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/fhtestfht1/"+rowData.id+"/2");}}></Button>                                        
                                     <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/fhtestfht1/"+rowData.id+"/1");}} />
                                     <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlFhtestFht1.removeFhtestFht1([rowData.id]).then(()=>{
                                             fn();
                                            });
                                         }}  />
                                   </div>
                                );
                            }
                            }  sortField="id" key={7}></Column>,


                        ]
                    }

                    >
            </MyDataTable>
        
            </div>
        </div>
    );
}
