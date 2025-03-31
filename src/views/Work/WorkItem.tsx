import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { ToggleButton } from 'primereact/togglebutton';
import { TabView, TabPanel } from 'primereact/tabview';
import { Image } from 'primereact/image';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';

import { Column } from 'primereact/column';
import { MyDataTable } from '../../components/myDataTable/DataTable';
import { Dialog } from 'primereact/dialog';

import { UserController } from '../../controllers/UserController';
import { WorkController } from '../../controllers/WorkController';

import { TermsController } from '../../controllers/TermsController';
import {ClientController} from '../../controllers/ClientController';
import {ContacPersonController} from '../../controllers/ContacPersonController';
import { QuotationController } from '../../controllers/QuotationController';
import {JobController} from '../../controllers/JobController';

import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
import { WorkItemList } from '../WorkItem/WorkItemList';
import { WorkNoteList } from '../WorkNote/WorkNoteList';
const { nanoid } = require('nanoid');
export type WorkItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function WorkItem({ Id, Mode }: WorkItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <WorkItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <WorkItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <WorkItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <WorkItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const WorkItemAdd =({ Id, Mode }: WorkItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState<null | string | Date | Date[]>(null);
  const [updatedAt, setUpdatedAt] = useState<null | string | Date | Date[]>(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[quote, setquote] = useState("");
  const[title, settitle] = useState("");
  const[terms_id, setterms_id] = useState(null);
  const[priority, setpriority] = useState(null);
  const[states, setstates] = useState(null);
  const[qty, setqty] = useState(0);
  const[work_type, setwork_type] = useState(null);
  const[room, setroom] = useState("");
  const[client, setclient] = useState(null);
  const[contact, setcontact] = useState(null);
  const[work_instructions, setwork_instructions] = useState(null);
  const[assign_to, setassign_to] = useState("");
  const[start_date, setstart_date] = useState<null | string | Date | Date[]>(null);
  const[end_date, setend_date] = useState<null | string | Date | Date[]>(null);
  const[remark, setremark] = useState('');
  const[reedback, setreedback] = useState('');
  const[sign_below_txt, setsign_below_txt] = useState('');
  const[sign_below_photo, setsign_below_photo] = useState(null);
  const[sign_below_userid, setsign_below_userid] = useState("");
  const[sign_below_time, setsign_below_time] = useState<null | string | Date | Date[]>(null);
  const[full_address, setfull_address] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlWork=new WorkController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const [Terms, setTerms] = useState([]);
  const [Clients, setClients] = useState([]);
  const [ContacPersons, setContacPersons] = useState([]);
  const [Jobs, setJobs] = useState([]);
  
  const[QuotationID, setQuotationID] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlQuotation = new QuotationController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;

    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    
    async function getTerms()
    {
        const ctlTerms=new TermsController();
        const fhojts = await ctlTerms.getAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }
        
    }

    async function getClients()
    {
        const ctlClient=new ClientController();
        const fhojts = await  ctlClient.getClientAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
  
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.regNumber }))
        }


    }

    async function getContacPersons()
    {
        const ctlContacPerson=new ContacPersonController();
        const fhojts = await ctlContacPerson.getContacPersonAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }


    }

    async function getJobs()
    {
        const ctlJobn=new JobController();
        const fhojts = await ctlJobn.getJobAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }


    }

    const items = [
      {label: '草稿'},
      {label: '提交'},
      {label: '驳回'},
      {label: '通过'}
  ];
    const fhitems = [
      { name: '是', code: '0' },
      { name: '否', code: '1' },
    ];
    
    const fhWorkTypeitems = [
      { name: '一般', code: '0' },
      { name: '加急', code: '1' },
    ]; 
    const fhPriorityItems = [
      { name: '1', code: '0' },
      { name: '2', code: '1' },
      { name: '3', code: '2' },
      { name: '4', code: '3' },
      { name: '5', code: '4' },

    ];


 
    useEffect(() => {
      getTerms().then((data)=>{
            console.log('Country_data2:'+JSON.stringify(data));
            setTerms(data);
      });

      getClients().then((data)=>{
            console.log('Country_data2:'+JSON.stringify(data));
            setClients(data);
      });

      getContacPersons().then((data)=>{
            console.log('Country_data2:'+JSON.stringify(data));
            setContacPersons(data);
      });

      getJobs().then((data)=>{
            console.log('Country_data2:'+JSON.stringify(data));
            setJobs(data);
      });

      


      const fhnew=new Date();
      setCreateAt(fhnew);
      setUpdatedAt(fhnew);

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      const nanoidstr: string = nanoid();
      setFHid(nanoidstr.substring(0, 10));

      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
      });
      const fn=async ()=>{
            await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
              setCustomers(data.raws);
              setcount(data.count);
              count++;
              setVal(count);
             }); 
            }
            if(count<1)
            {
            fn();
            }




    }, []);
    const openDialog = () => {
      setDialogVisible(true);
  }
    const closeDialog = () => {
      console.info("FHids:"+JSON.stringify(FHids));
      if(FHids.length>0)
      {
        // console.info("FHids.name:"+FHids[0].name)
        // ///setName(FHids[0].name);
        setquote(FHids[0].name);
        setQuotationID(FHids[0].id);
      }
      setDialogVisible(false);
  }

  const dialogFooterTemplate = () => {
      return (
          <div>
              <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  />
              &nbsp;&nbsp;&nbsp;
              <Button label={t('dataTable.Submit')} 
              icon="pi pi-check" 
              onClick={closeDialog}  autoFocus  />
          </div>
      );       
  }
  return (
  <Card>  

<Dialog header={t('dataTable.Search')} visible={dialogVisible} style={{ width: '80vw' }} maximizable modal
                contentStyle={{ height: '600px' }} 
                onHide={closeDialog} 
                footer={dialogFooterTemplate}>
                <MyDataTable                        
                       
                        fhvalue={customers} 
                        totalRecords={FHcount}
                        onCustomPage = {(event:any) => {
                            console.info('FHevent:'+event);
                            if(1==1)
                            {
                               

                                  const fn=async ()=>{
                                    await  ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                      setCustomers(data.raws);
                                      setcount(data.count);
                                     }); 
                                    }
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
                          

                              const fn=async ()=>{
                                await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                  setCustomers(data.raws);
                                  setcount(data.count);
                                 }); 
                                }
                              fn(); 


                            }
                          }}                    
                        FHColumns={
                            [
                                <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
    
                                <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                         <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/quotation/"+rowData.id+"/2");}}></Button>
                                        </React.Fragment>
                                    ); 
                                }             
                                }  sortable key={1}></Column>,
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
                                           <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }
                                sortable sortField="createdAt"  key={5}></Column>,  
                                <Column header="UpdatedAt" field="updatedAt" body={(rowData) => {
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
                                         <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/quotation/"+rowData.id+"/1");}} />
    
                                        </React.Fragment>
                                    ); 
                                }             
                                } sortable sortField="id" key={7}></Column>,      
                                <Column  header={t('dataTable.Delete')}  field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
    
                                         <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                             ctlQuotation.removeQuotation([rowData.id]).then(()=>{
                                                 replace("/quotation");
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
</Dialog>  

      <div className="p-fluid p-formgrid p-grid">
      
      <table width="98%">
      <thead>
      </thead>
      <tbody>
          <tr>
          <td colSpan={4}> 
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>

         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.quote")}</label>
                    <div style={{height:10}}> </div>
            

                <table width="100%">
                  <tr>
                   <td width="75%">



                    <InputText 
                    id="quote"
                    value={quote}
                      onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setquote(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>


                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.title")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="title"
                    value={title}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settitle(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.terms_id")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="terms_id"
                    value={terms_id}
                    options={Terms} 
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setterms_id(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.priority")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="priority"
                      value={priority}
                      options={fhPriorityItems} 
                      optionLabel="name" 
                      optionValue="code"                     
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setpriority(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.states")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="states"
                    value={states}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"                     
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstates(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.qty")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="qty"
                      value={qty}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setqty(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.work_type")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="work_type"
                    value={work_type}
                    options={fhWorkTypeitems} 
                    optionLabel="name" 
                    optionValue="code"                    
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setwork_type(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.room")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="room"
                    value={room}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setroom(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.client")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="client"
                    value={client}
                    options={Clients} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setclient(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.contact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="contact"
                      value={contact}
                      options={ContacPersons} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcontact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.work_instructions")}</label>
                    <div style={{height:10}}> </div>
                    <MultiSelect 
                    id="work_instructions"
                    // value={work_instructions}
                    options={Jobs} 
                      optionLabel="name" 
                      optionValue="code"                    
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setwork_instructions(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.assign_to")}</label>
                      <div style={{height:10}}> </div>
                      <MultiSelect 
                      id="assign_to"
                      // value={assign_to}
                      options={FHUsers}
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setassign_to(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.start_date")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="start_date"
                    value={start_date}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstart_date(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.end_date")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      id="end_date"
                      value={end_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setend_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    // value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.reedback")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="reedback"
                    // value={reedback}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setreedback(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.sign_below_txt")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="sign_below_txt"
                    // value={sign_below_txt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsign_below_txt(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.sign_below_photo")}</label>
                    <div style={{height:10}}> </div>
                    <Image 
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.sign_below_userid")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="sign_below_userid"
                    value={sign_below_userid}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsign_below_userid(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.sign_below_time")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="sign_below_time"
                    value={sign_below_time}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsign_below_time(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.full_address")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="full_address"
                    value={full_address}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfull_address(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.isactived")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("work.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.islocked")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("work.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("work.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("work.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.createUid")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("work.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.updatedUid")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("work.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="产品信息">
                    <WorkItemList mid={FHid}></WorkItemList>
                    </TabPanel>
                    <TabPanel header="工序信息">
                    <WorkNoteList mid={FHid}></WorkNoteList>
                    </TabPanel>            
                </TabView>
             
            </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/work");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 

                      let work_instructions_sql="";
                      if(work_instructions!=null)
                      {
                       work_instructions_sql=work_instructions.join();
                       console.log(' work_instructions_sql:'+ work_instructions_sql);
                      }
                 
                      let assign_to_sql="";
                      if(assign_to!=null)
                      {
                       assign_to_sql=assign_to.join();
                       console.log(' assign_to_sql:'+assign_to_sql);
                      }


                      ctlWork.createWork({
                        id:FHid,
                        quote:quote,
                        title:title,
                        priority:priority,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        states:states,
                        termsId:terms_id,
                        qty:qty,
                        workType:work_type,
                        room:room,
                        client:client,
                        contact:contact,
                        workInstructions:work_instructions_sql,
                        assignTo:assign_to_sql,
                        //startDate:new Date(start_date),
                        //endDate:new Date(end_date),
                        remark:remark,
                        reedback:reedback,
                        signBelowTxt:sign_below_txt,
                        signBelowPhoto:sign_below_photo,
                        signBelowUserid:sign_below_userid,
                        signBelowTime:sign_below_time,
                        fullAddress:full_address,                       
                      });
                      replace("/work");
                    }}
                    style={{backgroundColor:'#4682B4'}}
                  />
                </div>
          </td>
          </tr>
          </tbody>
          </table>
      </div>
    </Card>
  );
};

export const WorkItemEdit =({ Id, Mode }: WorkItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState<null | string | Date | Date[]>(null);
  const [updatedAt, setUpdatedAt] = useState<null | string | Date | Date[]>(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[quote, setquote] = useState("");
  const[title, settitle] = useState("");
  const[terms_id, setterms_id] = useState(null);
  const[priority, setpriority] = useState(null);
  const[states, setstates] = useState(null);
  const[qty, setqty] = useState(0);
  const[work_type, setwork_type] = useState(null);
  const[room, setroom] = useState("");
  const[client, setclient] = useState(null);
  const[contact, setcontact] = useState(null);
  const[work_instructions, setwork_instructions] = useState([]);
  const[assign_to, setassign_to] = useState([]);
  const[start_date, setstart_date] = useState<null | string | Date | Date[]>(null);
  const[end_date, setend_date] = useState<null | string | Date | Date[]>(null);
  const[remark, setremark] = useState('');
  const[reedback, setreedback] = useState('');
  const[sign_below_txt, setsign_below_txt] = useState('');
  const[sign_below_photo, setsign_below_photo] = useState(null);
  const[sign_below_userid, setsign_below_userid] = useState("");
  const[sign_below_time, setsign_below_time] = useState<null | string | Date | Date[]>(null);
  const[full_address, setfull_address] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlWork=new WorkController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const [Terms, setTerms] = useState([]);
  const [Clients, setClients] = useState([]);
  const [ContacPersons, setContacPersons] = useState([]);
  const [Jobs, setJobs] = useState([]);
  
  const[QuotationID, setQuotationID] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlQuotation = new QuotationController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;

    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    
    async function getTerms()
    {
        const ctlTerms=new TermsController();
        const fhojts = await ctlTerms.getAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }
        
    }

    async function getClients()
    {
        const ctlClient=new ClientController();
        const fhojts = await  ctlClient.getClientAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
  
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }


    }

    async function getContacPersons()
    {
        const ctlContacPerson=new ContacPersonController();
        const fhojts = await ctlContacPerson.getContacPersonAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }


    }

    async function getJobs()
    {
        const ctlJobn=new JobController();
        const fhojts = await ctlJobn.getJobAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }


    };
    const fn=async ()=>{
      await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
        setCustomers(data.raws);
        setcount(data.count);
        // count++;
        // setVal(count);
       }); 
      };



async function myfn()
{

  getTerms().then((data)=>{
          console.log('Country_data2:'+JSON.stringify(data));
          setTerms(data);
    });
  
    getClients().then((data)=>{
          console.log('Country_data2:'+JSON.stringify(data));
          setClients(data);
    });
  
    getContacPersons().then((data)=>{
          console.log('Country_data2:'+JSON.stringify(data));
          setContacPersons(data);
    });
  
    getJobs().then((data)=>{
          console.log('Country_data2:'+JSON.stringify(data));
          setJobs(data);
    });
  
  
  
        const userID=globalStorage.get("userID");
        console.log('userID:'+userID);
  
        setUpdatedUid(userID);
  
        
        getFHusers().then((data)=>{
          console.log('data:'+JSON.stringify(data));

          
          setFHUsers(data);
            ctlWork.getWorkById(Id).then((data)=>{
              console.log('data:ok1'+JSON.stringify(data));
              console.log('data.workInstructions:'+data.workInstructions); 
              
              const jsonString = data.workInstructions; // 给定的JSON字符串
              
              // let  jsonString = '{"GNJ4lNNC2B","P0nOmtQGDP"}';
              // // jsonString =  jsonString.replace('{"', "")
              // // jsonString =  jsonString.replace('}"', "")
              // let jsonArray  =eval('[' + jsonString + ']');
              // çç
              // 输出: ["GNJ4lNNC2B", "P0nOmtQGDP"]
              // 将JSON字符串解析为数组          

              //const jsonArray =["GNJ4lNNC2B","P0nOmtQGDP"];
              setIslocked(data.islocked);
              setIsactived(data.isactived);
              setCreateUid(data.createUid);
              setUpdatedUid(data.updatedUid);
              setCreateAt(new Date(data.createdAt));
              setUpdatedAt(new Date(data.updatedAt));
              setName(data.name);
              setdDescription(data.description);
              setFHid(data.id);
              setquote(data.quote);
              settitle(data.title);
              setterms_id(data.termsId);
              setpriority(data.priority);
              setstates(data.states);
              setqty(data.qty);
              setwork_type(data.workType);
              setroom(data.room);
              setclient(data.client);
              setcontact(data.contact);
              console.log('myworkInstructions1'+data.workInstructions);
              //注意NULL和“”的情况
             if(data.workInstructions!=null && data.workInstructions!="" )
             {
              data.workInstructions = data.workInstructions.replace(/^,+/g, '');
              //const fhworkInstructions="Z8NUy3rAt9,x7rC9nl57i";
              const fhworkInstructions=data.workInstructions;
              const myworkInstructions= fhworkInstructions.split(',');
              setwork_instructions(myworkInstructions);

             }  

            else{

              setwork_instructions([]);
            }
             if(data.assignTo!=null && data.assignTo!="" )
              {
               //const fhworkInstructions="Z8NUy3rAt9,x7rC9nl57i";
               data.assignTo = data.assignTo.replace(/^,+/g, '');
               const fhassignTo=data.assignTo;
               const myfhassignTo=fhassignTo.split(',');
               console.log('myworkInstructions1'+fhassignTo);
               setassign_to(myfhassignTo);
 
              }  

              else{

                setassign_to([]);
              }
              //setassign_to(["1"]);
              //setwork_instructions(jsonArray);
              setstart_date(new Date(data.startDate));
              setend_date(new Date(data.endDate));
              setremark(data.remark);
              setreedback(data.reedback);
              setsign_below_txt(data.signBelowTxt);
              setsign_below_photo(data.signBelowPhoto);
              setsign_below_userid(data.signBelowUserid);
              setsign_below_time(new Date(data.signBelowTime));
              setfull_address(data.fullAddress);
            });
  
            // setSelectedItems1(['PRS','IST','LDN']);
        });
  

          // if(count<1)
          // {
          // fn();
          // }
          fn();
  
      }



    const items = [
      {label: '草稿'},
      {label: '提交'},
      {label: '驳回'},
      {label: '通过'}
  ];
    const fhitems = [
      { name: '是', code: '0' },
      { name: '否', code: '1' },
    ];
    
    const fhWorkTypeitems = [
      { name: '一般', code: '0' },
      { name: '加急', code: '1' },
    ]; 
    const fhPriorityItems = [
      { name: '1', code: '0' },
      { name: '2', code: '1' },
      { name: '3', code: '2' },
      { name: '4', code: '3' },
      { name: '5', code: '4' },

    ];
 
    useEffect(() => {

      myfn();

    }, []);

    const  mfhitems = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

  const openDialog = () => {
    setDialogVisible(true);
}
  const closeDialog = () => {
    console.info("FHids:"+JSON.stringify(FHids));
    if(FHids.length>0)
    {
      // console.info("FHids.name:"+FHids[0].name)
      // ///setName(FHids[0].name);
      setquote(FHids[0].name);
      setQuotationID(FHids[0].id);
    }
    setDialogVisible(false);
}

const dialogFooterTemplate = () => {
    return (
        <div>
            <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  />
            &nbsp;&nbsp;&nbsp;
            <Button label={t('dataTable.Submit')} 
            icon="pi pi-check" 
            onClick={closeDialog}  autoFocus  />
        </div>
    );       
}

  return (
  <Card>     
  <Dialog header={t('dataTable.Search')} visible={dialogVisible} style={{ width: '80vw' }} maximizable modal
                contentStyle={{ height: '600px' }} 
                onHide={closeDialog} 
                footer={dialogFooterTemplate}>
                <MyDataTable                        
                       
                        fhvalue={customers} 
                        totalRecords={FHcount}
                        onCustomPage = {(event:any) => {
                            console.info('FHevent:'+event);
                            if(1==1)
                            {
                               

                                  const fn=async ()=>{
                                    await  ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                      setCustomers(data.raws);
                                      setcount(data.count);
                                     }); 
                                    }
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
                          

                              const fn=async ()=>{
                                await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                  setCustomers(data.raws);
                                  setcount(data.count);
                                 }); 
                                }
                              fn(); 


                            }
                          }}                    
                        FHColumns={
                            [
                                <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
    
                                <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                         <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/quotation/"+rowData.id+"/2");}}></Button>
                                        </React.Fragment>
                                    ); 
                                }             
                                }  sortable key={1}></Column>,
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
                                           <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }
                                sortable sortField="createdAt"  key={5}></Column>,  
                                <Column header="UpdatedAt" field="updatedAt" body={(rowData) => {
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
                                         <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/quotation/"+rowData.id+"/1");}} />
    
                                        </React.Fragment>
                                    ); 
                                }             
                                } sortable sortField="id" key={7}></Column>,      
                                <Column  header={t('dataTable.Delete')}  field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
    
                                         <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                             ctlQuotation.removeQuotation([rowData.id]).then(()=>{
                                                 replace("/quotation");
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
</Dialog>  

      <div className="p-fluid p-formgrid p-grid">
      
      <table width="98%">
      <thead>
      </thead>
      <tbody>
          <tr>
          <td colSpan={4}> 
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>

         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.quote")}</label>
                    <div style={{height:10}}> </div>
            

                <table width="100%">
                  <tr>
                   <td width="75%">



                    <InputText 
                    id="quote"
                    value={quote}
                      onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setquote(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>


                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.title")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="title"
                    value={title}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settitle(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.terms_id")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="terms_id"
                    value={terms_id}
                    options={Terms} 
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setterms_id(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.priority")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="priority"
                      value={priority}
                      options={fhPriorityItems} 
                      optionLabel="name" 
                      optionValue="code"                     
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setpriority(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.states")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="states"
                    value={states}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"                     
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstates(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.qty")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="qty"
                      value={qty}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setqty(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.work_type")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="work_type"
                    value={work_type}
                    options={fhWorkTypeitems} 
                    optionLabel="name" 
                    optionValue="code"                    
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setwork_type(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.room")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="room"
                    value={room}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setroom(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.client")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="client"
                    value={client}
                    options={Clients} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setclient(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.contact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="contact"
                      value={contact}
                      options={ContacPersons} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcontact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.work_instructions")}</label>
                    <div style={{height:10}}> </div>
                    <MultiSelect 
                    id="work_instructions"
                    value={work_instructions}
                    options={Jobs} 
                    optionLabel="name" 
                    optionValue="code"                    
                    onChange={(e)=>{
                      console.info('mye.value:'+JSON.stringify(e.value));
                    //  const selectedCodes = e.value.map(option => option);
                    //  console.log(selectedCodes);
                    setwork_instructions(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.assign_to")}</label>
                      <div style={{height:10}}> </div>
                      <MultiSelect 
                      id="assign_to"
                      value={assign_to}
                      options={FHUsers}
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('mye.value:'+JSON.stringify(e.value));
                       setassign_to(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.start_date")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="start_date"
                    value={start_date}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstart_date(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.end_date")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      id="end_date"
                      value={end_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setend_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    // value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.reedback")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="reedback"
                    // value={reedback}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setreedback(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.sign_below_txt")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="sign_below_txt"
                    // value={sign_below_txt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsign_below_txt(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.sign_below_photo")}</label>
                    <div style={{height:10}}> </div>
                    <Image 
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.sign_below_userid")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="sign_below_userid"
                    value={sign_below_userid}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsign_below_userid(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.sign_below_time")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="sign_below_time"
                    value={sign_below_time}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsign_below_time(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.full_address")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="full_address"
                    value={full_address}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfull_address(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.isactived")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("work.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.islocked")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("work.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("work.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("work.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.createUid")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("work.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.updatedUid")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("work.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="产品信息">
                    <WorkItemList mid={FHid}
                     FHonChange={(e:any) => {
                      setVal(e);
                    }}> 
                    </WorkItemList>
                    </TabPanel>
                    <TabPanel header="工序信息">
                    <WorkNoteList mid={FHid}
                      FHonChange={(e:any) => {
                      setVal(e);
                    }}
                    
                    ></WorkNoteList>
                    </TabPanel>            
                </TabView>
             
            </td>
          </tr>

          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/work");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      const fhnew=new Date();
                      const userID=globalStorage.get("userID");
                      console.log('userID:'+userID);

                      // console.log('work_instructions0902:'+work_instructions);
                      // const mywork_instructions=work_instructions?.toString();
                      // const output = mywork_instructions.replace(/^$/, '{').replace(/$$/, '}');

                     let work_instructions_sql="";
                     if(work_instructions!=null)
                     {
                      work_instructions_sql=work_instructions.join();
                      console.log(' work_instructions_sql:'+ work_instructions_sql);
                     }
                
                     let assign_to_sql="";
                     if(assign_to!=null)
                     {
                      assign_to_sql=assign_to.join();
                      console.log(' assign_to_sql:'+assign_to_sql);
                     }

                      ctlWork.updateWorkv2({
                        id:FHid,
                        quote:quote,
                        title:title,
                        priority:priority,
                        isactived:"0",
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        states:states,
                        termsId:terms_id,
                        qty:qty,
                        workType:work_type,
                        room:room,
                        client:client,
                        contact:contact,
                        workInstructions:work_instructions_sql,
                        assignTo:assign_to_sql,
                        //startDate:new Date(start_date),
                        //endDate:new Date(end_date),
                        remark:remark,
                        reedback:reedback,
                        signBelowTxt:sign_below_txt,
                        signBelowPhoto:sign_below_photo,
                        signBelowUserid:sign_below_userid,
                        signBelowTime:sign_below_time,
                        fullAddress:full_address,        
                      },Id,userID);
                      const mynanoid: string = nanoid();
                      setVal(mynanoid);
                    }}
                    style={{backgroundColor:'#4682B4'}}
                  />
                </div>
          </td>
          </tr>
          </tbody>
          </table>
      </div>
    </Card>
  );
};


export const WorkItemView =({ Id, Mode }: WorkItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState<null | string | Date | Date[]>(null);
  const [updatedAt, setUpdatedAt] = useState<null | string | Date | Date[]>(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[quote, setquote] = useState("");
  const[title, settitle] = useState("");
  const[terms_id, setterms_id] = useState(null);
  const[priority, setpriority] = useState(null);
  const[states, setstates] = useState(null);
  const[qty, setqty] = useState(0);
  const[work_type, setwork_type] = useState(null);
  const[room, setroom] = useState("");
  const[client, setclient] = useState(null);
  const[contact, setcontact] = useState(null);
  const[work_instructions, setwork_instructions] = useState(null);
  const[assign_to, setassign_to] = useState("");
  const[start_date, setstart_date] = useState<null | string | Date | Date[]>(null);
  const[end_date, setend_date] = useState<null | string | Date | Date[]>(null);
  const[remark, setremark] = useState('');
  const[reedback, setreedback] = useState('');
  const[sign_below_txt, setsign_below_txt] = useState('');
  const[sign_below_photo, setsign_below_photo] = useState(null);
  const[sign_below_userid, setsign_below_userid] = useState("");
  const[sign_below_time, setsign_below_time] = useState<null | string | Date | Date[]>(null);
  const[full_address, setfull_address] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlWork=new WorkController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const [Terms, setTerms] = useState([]);
  const [Clients, setClients] = useState([]);
  const [ContacPersons, setContacPersons] = useState([]);
  const [Jobs, setJobs] = useState([]);
  
  const[QuotationID, setQuotationID] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlQuotation = new QuotationController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;

    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
    
    async function getTerms()
    {
        const ctlTerms=new TermsController();
        const fhojts = await ctlTerms.getAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }
        
    }

    async function getClients()
    {
        const ctlClient=new ClientController();
        const fhojts = await  ctlClient.getClientAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
  
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.regNumber }))
        }


    }

    async function getContacPersons()
    {
        const ctlContacPerson=new ContacPersonController();
        const fhojts = await ctlContacPerson.getContacPersonAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }


    }

    async function getJobs()
    {
        const ctlJobn=new JobController();
        const fhojts = await ctlJobn.getJobAllView();
        ///console.log('Country_data:'+JSON.stringify(fhojts));
        ///console.log(typeof(fhojts));
        const fhojtsStr= JSON.stringify(fhojts["fhok"]).toString();
        console.log("fhojtsStr:"+fhojtsStr);
        if(fhojtsStr!="undefined")
        {
            console.log('Country_data:ok');
            ///JSON.parse(fhojts["fhok"]);
            return JSON.parse(fhojtsStr).map((d:any) => ({ code: d.id, name: d.name }))
        }


    }

    const items = [
      {label: '草稿'},
      {label: '提交'},
      {label: '驳回'},
      {label: '通过'}
  ];
    const fhitems = [
      { name: '是', code: '0' },
      { name: '否', code: '1' },
    ];
    
    const fhWorkTypeitems = [
      { name: '一般', code: '0' },
      { name: '加急', code: '1' },
    ]; 
    const fhPriorityItems = [
      { name: '1', code: '0' },
      { name: '2', code: '1' },
      { name: '3', code: '2' },
      { name: '4', code: '3' },
      { name: '5', code: '4' },

    ];
 
    useEffect(() => {

 getTerms().then((data)=>{
        console.log('Country_data2:'+JSON.stringify(data));
        setTerms(data);
  });

  getClients().then((data)=>{
        console.log('Country_data2:'+JSON.stringify(data));
        setClients(data);
  });

  getContacPersons().then((data)=>{
        console.log('Country_data2:'+JSON.stringify(data));
        setContacPersons(data);
  });

  getJobs().then((data)=>{
        console.log('Country_data2:'+JSON.stringify(data));
        setJobs(data);
  });


      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlWork.getWorkById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setdDescription(data.description);
            setFHid(data.id);
            setquote(data.quote);
            settitle(data.title);
            setterms_id(data.termsId);
            setpriority(data.priority);
            setstates(data.states);
            setqty(data.qty);
            setwork_type(data.workType);
            setroom(data.room);
            setclient(data.client);
            setcontact(data.contact);
            if(data.workInstructions!=null)
              {
               //const fhworkInstructions="Z8NUy3rAt9,x7rC9nl57i";
               const fhworkInstructions=data.workInstructions;
               const myworkInstructions= fhworkInstructions.split(',');
               console.log('myworkInstructions1'+myworkInstructions);
               setwork_instructions(myworkInstructions);
 
              }  
 
              if(data.assignTo!=null)
               {
                //const fhworkInstructions="Z8NUy3rAt9,x7rC9nl57i";
                const fhassignTo=data.assignTo;
                const myfhassignTo=fhassignTo.split(',');
                console.log('myworkInstructions1'+fhassignTo);
                setassign_to(myfhassignTo);
  
               }  
 
            setstart_date(new Date(data.startDate));
            setend_date(new Date(data.endDate));
            setremark(data.remark);
            setreedback(data.reedback);
            setsign_below_txt(data.signBelowTxt);
            setsign_below_photo(data.signBelowPhoto);
            setsign_below_userid(data.signBelowUserid);
            setsign_below_time(new Date(data.signBelowTime));
            setfull_address(data.fullAddress);
          });
      });
      const fn=async ()=>{
        await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
          setCustomers(data.raws);
          setcount(data.count);
          count++;
          setVal(count);
         }); 
        }
        if(count<1)
        {
        fn();
        }



    }, []);
    const openDialog = () => {
      setDialogVisible(true);
  }
    const closeDialog = () => {
      console.info("FHids:"+JSON.stringify(FHids));
      if(FHids.length>0)
      {
        // console.info("FHids.name:"+FHids[0].name)
        // ///setName(FHids[0].name);
        // setquote(FHids[0].name);
        // setQuotationID(FHids[0].id);
      }
      setDialogVisible(false);
  }

  const dialogFooterTemplate = () => {
      return (
          <div>
              <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  />
              &nbsp;&nbsp;&nbsp;
              <Button label={t('dataTable.Submit')} 
              icon="pi pi-check" 
              onClick={closeDialog}  autoFocus  />
          </div>
      );       
  }
  return (
  <Card>     
    <Dialog header={t('dataTable.Search')} visible={dialogVisible} style={{ width: '80vw' }} maximizable modal
                contentStyle={{ height: '600px' }} 
                onHide={closeDialog} 
                footer={dialogFooterTemplate}>
                <MyDataTable                        
                       
                        fhvalue={customers} 
                        totalRecords={FHcount}
                        onCustomPage = {(event:any) => {
                            console.info('FHevent:'+event);
                            if(1==1)
                            {
                               

                                  const fn=async ()=>{
                                    await  ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                      setCustomers(data.raws);
                                      setcount(data.count);
                                     }); 
                                    }
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
                          

                              const fn=async ()=>{
                                await   ctlQuotation.getQuotationAll(fhevent).then(data =>{
                                  setCustomers(data.raws);
                                  setcount(data.count);
                                 }); 
                                }
                              fn(); 


                            }
                          }}                    
                        FHColumns={
                            [
                                <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
    
                                <Column  header={t('dataTable.Info')} field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
                                         <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/quotation/"+rowData.id+"/2");}}></Button>
                                        </React.Fragment>
                                    ); 
                                }             
                                }  sortable key={1}></Column>,
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
                                           <span className="image-text">{rowData.createdAt.substring(0, 10)}</span>
                                        </React.Fragment>
                                    )
                                    
                                }             
                                }
                                sortable sortField="createdAt"  key={5}></Column>,  
                                <Column header="UpdatedAt" field="updatedAt" body={(rowData) => {
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
                                         <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/quotation/"+rowData.id+"/1");}} />
    
                                        </React.Fragment>
                                    ); 
                                }             
                                } sortable sortField="id" key={7}></Column>,      
                                <Column  header={t('dataTable.Delete')}  field="id"   body={(rowData) => {
                                    return(
                                        <React.Fragment>
    
                                         <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                             ctlQuotation.removeQuotation([rowData.id]).then(()=>{
                                                 replace("/quotation");
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
</Dialog>  

      <div className="p-fluid p-formgrid p-grid">
      
      <table width="98%">
      <thead>
      </thead>
      <tbody>
          <tr>
          <td colSpan={4}> 
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>

         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.quote")}</label>
                    <div style={{height:10}}> </div>
            

                <table width="100%">
                  <tr>
                   <td width="75%">



                    <InputText 
                    id="quote"
                    value={quote}
                      onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setquote(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>


                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.title")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="title"
                    value={title}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     settitle(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.terms_id")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="terms_id"
                    value={terms_id}
                    options={Terms} 
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setterms_id(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.priority")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="priority"
                      value={priority}
                      options={fhPriorityItems} 
                      optionLabel="name" 
                      optionValue="code"                     
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setpriority(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.states")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="states"
                    value={states}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"                     
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstates(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.qty")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="qty"
                      value={qty}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setqty(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.work_type")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="work_type"
                    value={work_type}
                    options={fhWorkTypeitems} 
                    optionLabel="name" 
                    optionValue="code"                    
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setwork_type(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.room")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="room"
                    value={room}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setroom(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.client")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="client"
                    value={client}
                    options={Clients} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setclient(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.contact")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="contact"
                      value={contact}
                      options={ContacPersons} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcontact(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.work_instructions")}</label>
                    <div style={{height:10}}> </div>
                    <MultiSelect 
                    id="work_instructions"
                    value={work_instructions}
                    options={Jobs} 
                      optionLabel="name" 
                      optionValue="code"                    
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setwork_instructions(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.assign_to")}</label>
                      <div style={{height:10}}> </div>
                      <MultiSelect 
                      id="assign_to"
                      value={assign_to}
                      options={FHUsers}
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setassign_to(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.start_date")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="start_date"
                    value={start_date}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstart_date(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("work.end_date")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      id="end_date"
                      value={end_date}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setend_date(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    // value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.reedback")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="reedback"
                    // value={reedback}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setreedback(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("work.sign_below_txt")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="sign_below_txt"
                    // value={sign_below_txt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsign_below_txt(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.sign_below_photo")}</label>
                    <div style={{height:10}}> </div>
                    <Image 
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.sign_below_userid")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="sign_below_userid"
                    value={sign_below_userid}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsign_below_userid(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("work.sign_below_time")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="sign_below_time"
                    value={sign_below_time}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setsign_below_time(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("work.full_address")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="full_address"
                    value={full_address}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfull_address(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.isactived")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("work.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.islocked")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("work.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("work.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("work.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.createUid")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("work.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("work.updatedUid")}</label>
                <div style={{height:10}}> </div>
                <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("work.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="产品信息">
                    <WorkItemList mid={FHid}></WorkItemList>
                    </TabPanel>
                    <TabPanel header="工序信息">
                    <WorkNoteList mid={FHid}></WorkNoteList>
                    </TabPanel>            
                </TabView>
             
            </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/work");}}   style={{backgroundColor:'#4682B4'}} />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/work");}}
                    style={{backgroundColor:'#4682B4'}}
                  />
                </div>
          </td>
          </tr>
          </tbody>
          </table>
      </div>
    </Card>
  );
};
