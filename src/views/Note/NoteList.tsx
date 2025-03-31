import React, {useState} from 'react';
import {useTranslation} from 'react-i18next'
import { useRouter } from 'next/navigation';
import {FilterMatchMode, FilterOperator} from 'primereact/api';
import {Column} from 'primereact/column';
import {NoteController} from '../../controllers/NoteController';
import {Button} from 'primereact/button';
import {MyDataTable} from '../../components/myDataTable/DataTable';
const { nanoid } = require('nanoid');
export const NoteList = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);
    const [FHids, setFHids] = useState(null);
    const [FHcount, setcount] = useState(0);
    const ctlNote = new NoteController();
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    const { pathname, push,replace } = useRouter(); 
    const [val, setVal] = useState("");
    let count = 0;

    const fn=async ()=>{
        console.info('3333:'+val.toString());
        ctlNote.getNoteAll(fhevent).then(data =>{
            setCustomers(data.raws);
            setcount(data.count);
            // count++; 
            // setVal(count);
        }); 
        }



    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
        if(1==1)
        {
            fn();
       }
    }, []);


    React.useEffect(() => {
        console.info('2222:'+val.toString()); 
        if(1==1)
        {
            fn();
       }
    }, [fhevent,val]);
    // ctlNote.getNoteAll().then(data =>{
    //    setCustomers(data);
    //  });
    //1.数据过滤代码:
   
    // const filters={
    //     'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    //     'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    //     'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    // };

    // const [FHfilters, setFHfilters] = useState(filters);



    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       <div >
          <hr></hr>
         <span className="p-buttonset">
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/note/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlNote.removeNote([item.id]).then(()=>{});
                }
                ///replace("/note");
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
                    // FHfilters={FHfilters}
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
                            fn(); 
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
                            <Column header ={t("note.subject")}  field = "subject" sortable key =  {10005}  ></Column>,
                            <Column header ={t("note.relatedType")}  field = "relatedType" 
                            body={(rowData) => {
                                let mytypes="";

                                const fhTypesItems = [
                                    { name: 'Event', code: '0' },
                                    { name: 'Task', code: '1' },
                                    { name: 'Note', code: '2' },
                                    { name: 'Email', code: '3' },
                                    { name: 'Call Log', code: '4' },
                                    { name: 'SMS', code: '5' },
                                  ];
                                for(var i=0;i<fhTypesItems.length;i++)
                                {
                                    if(rowData.relatedType==fhTypesItems[i]["code"])
                                    {
                                        mytypes=fhTypesItems[i]["name"]
                                    }
                                }
                                
                                return(
                                    <React.Fragment>
                                       <span className="image-text">{mytypes}</span>
                                    </React.Fragment>
                                )
                                
                               }
                             }                                   
                            
                            
                            sortable key =  {10006}   ></Column>,
                            <Column header ={t("note.relatedTo")} field = "relatedTo" sortable key =  {10007}  ></Column>,



                            <Column  header={t('dataTable.Info')} field="id"   alignHeader="center" headerStyle={{minWidth: '14rem'}} style={{ width: '14rem'}}  body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25,width:51}}  disabled={false} className="p-button-sm p-button-info"  onClick={()=>{replace("/note/"+rowData.id+"/2");}}></Button>

                                     <Button label={t('dataTable.Edit')}  style={{height:25,width:51}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/note/"+rowData.id+"/1");}} />
                                    
                                     <Button label={t('dataTable.Delete')}  style={{height:25,width:51}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlNote.removeNote([rowData.id]).then(()=>{
                                           /// replace("/note");
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
                 
