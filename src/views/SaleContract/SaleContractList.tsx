import React,{useState} from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { SaleContractController } from '../../controllers/SaleContractController';
import { TimesController } from '../../utils/TimesController';
import { Button } from 'primereact/button';
import { MyDataTable } from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const SaleContractList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [FHids, setFHids] = useState(null);
     const [FHcount, setcount] = useState(0);
    let [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const ctlSaleContract = new SaleContractController();
    const ctlTiems=new TimesController();
    const { pathname, push,replace } = useRouter();
    const [val, setVal] = useState("");
    var fhcount=0;
    const fn=async (fhevent)=>{
        await   ctlSaleContract.getSaleContractAll(fhevent).then(data =>{

             ctlSaleContract.getSaleContractAll_count(fhevent).then(dataok =>{
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
           
     
          fn(fhevent);
           
        }, [fhevent,val]);
    

    React.useEffect(() => {
          
            fn(fhevent);
       
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
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/salecontract/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlSaleContract.removeSaleContract([item.id]).then(()=>{
                     fn(fhevent);
                    });
                }
                //replace("/pages/saleContract");
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
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,

                            <Column header ={t("saleContract.fhname")}  field = "fhname" sortable key =  {10005}  ></Column>,
                            <Column header ={t("saleContract.releaseTime")}  field = "releaseTime" sortable key =  {10006}  ></Column>,
                            <Column header ={t("saleContract.project")}  field = "project" sortable key =  {10007}  ></Column>,
                            <Column header ={t("saleContract.version")}  field = "version" sortable key =  {10008}  ></Column>,
                            <Column header ={t("saleContract.custom")}  field = "custom" sortable key =  {10009}  ></Column>,
                          
                          <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                return(
                                    <React.Fragment>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/pages/saleContract/"+rowData.id+"/2");}}></Button>
                                     <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/pages/saleContract/"+rowData.id+"/1");}} />
                                     <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlSaleContract.removeSaleContract([rowData.id]).then(()=>{
                                              //fn(fhevent);
                                            });
                                            const mynanoid: string = nanoid();
                                            // props.FHonChange(mynanoid);
                                            setVal(mynanoid);    
                                         }}  />
                                    </React.Fragment>
                                );
                            }
                            }   key={1}></Column>,

                        ]
                    }

                    >
            </MyDataTable>
            </div>
        </div>
    );
}
