import React,{useState} from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { FhservicetbController } from '../../controllers/FhservicetbController';
import { TimesController } from '../../utils/TimesController';
import { Button } from 'primereact/button';
import { MyDataTable } from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const FhservicetbList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [FHids, setFHids] = useState(null);
     const [FHcount, setcount] = useState(0);
    let [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const ctlFhservicetb = new FhservicetbController();
    const ctlTiems=new TimesController();
    const { pathname, push,replace } = useRouter();
    const [val, setVal] = useState("");
    var fhcount=0;
    const fn=async (fhevent)=>{
        await   ctlFhservicetb.getFhservicetbAll(fhevent).then(data =>{

             ctlFhservicetb.getFhservicetbAll_count(fhevent).then(dataok =>{
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
        
            fhcount=fhcount+1;
            fn(fhevent);
       
    }, [fhevent,val]);

    React.useEffect(() => {
        
            fhcount=fhcount+1;
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
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/pages/fhservicetb/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlFhservicetb.removeFhservicetb([item.id]).then(()=>{
                     fn(fhevent);
                    });
                }
                //replace("/pages/fhservicetb");
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
                            // fn(event);
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
                        // fn(fhevent);
                      }}
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,


                            <Column header="Name" field="name" sortable  key={2}></Column>,

                            <Column header ={t("fhservicetb.fhname")}  field = "fhname" sortable key =  {10005}  ></Column>,
                            <Column header ={t("fhservicetb.fhF0")} field = "fhF0" sortable key =  {10006}  ></Column>,
                            <Column header ={t("fhservicetb.fhF1")} field = "fhF1" sortable key =  {10007}  ></Column>,
                            <Column header ={t("fhservicetb.fhF2")} field = "fhF2" sortable key =  {10008}  ></Column>,
                            <Column header ={t("fhservicetb.fhF3")}  field = "fhF3" sortable key =  {10009}  ></Column>,
                            <Column header ={t("fhservicetb.fhF4")} field = "fhF4" sortable key =  {100010}  ></Column>,
                            <Column header ={t("fhservicetb.fhF5")} field = "fhF5" sortable key =  {100011}  ></Column>,
                            <Column header ={t("fhservicetb.fhF6")}  field = "fhF6" sortable key =  {100012}  ></Column>,
                            <Column header ={t("fhservicetb.fhF7")}  field = "fhF7" sortable key =  {100013}  ></Column>,
                            <Column header ={t("fhservicetb.fhF8")}  field = "fhF8" sortable key =  {100014}   ></Column>,

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
                            }   sortField="updatedAt" key={6}></Column>,
                          <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                return(
                                    <React.Fragment>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/pages/fhservicetb/"+rowData.id+"/2");}}></Button>
                                     <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/pages/fhservicetb/"+rowData.id+"/1");}} />
                                     <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlFhservicetb.removeFhservicetb([rowData.id]).then(()=>{
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
