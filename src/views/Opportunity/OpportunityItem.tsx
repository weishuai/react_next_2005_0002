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
import { OpportunityController } from '../../controllers/OpportunityController';
import {ClientController} from '../../controllers/ClientController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';

import { OpportunityCommentsList } from '../OpportunityComments/OpportunityCommentsList';
const { nanoid } = require('nanoid');
export type OpportunityItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function OpportunityItem({ Id, Mode }: OpportunityItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <OpportunityItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <OpportunityItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <OpportunityItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <OpportunityItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const OpportunityItemAdd =({ Id, Mode }: OpportunityItemProps) => {
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
  const[refNumber, setrefNumber] = useState("");
  const[opportunityName, setopportunityName] = useState("");
  const[account, setaccount] = useState("");
  const[opportunityOwner, setopportunityOwner] = useState("");
  const[expiryDate, setexpiryDate] = useState<null | string | Date | Date[]>(null);
  const[stageName, setstageName] = useState("");
  const[probability, setprobability] = useState("");
  const[stage, setstage] = useState("");
  const[priority, setpriority] = useState("");
  const[dealAge, setdealAge] = useState("");
  const[closeProbability, setcloseProbability] = useState("");
  const[forecastValue, setforecastValue] = useState("0");
  const[expectedCloseDate, setexpectedCloseDate] = useState<null | string | Date | Date[]>(null);
  const[currency, setcurrency] = useState("0");
  const[salesValue, setsalesValue] = useState("0");
  const[cost, setcost] = useState("0");
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlOpportunity=new OpportunityController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const[client, setclient] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlClient = new ClientController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;


    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
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
 
    
    const FHProbabilitysItems = [
      { name: '1', code: '0' },
      { name: '2', code: '1' },
      { name: '3', code: '2' },
      { name: '4', code: '3' },
      { name: '5', code: '4' },

    ];

    useEffect(() => {
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
        await   ctlClient.getClientAll(fhevent).then(data =>{
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
        setaccount(FHids[0].name);
        // setclient(FHids[0].id);
      }
      setDialogVisible(false);
  }

  const dialogFooterTemplate = () => {
      return (
          <div>
              <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  style={{backgroundColor:'#4682B4'}}/>
              &nbsp;&nbsp;&nbsp;
              <Button label={t('dataTable.Submit')} 
              icon="pi pi-check" 
              onClick={closeDialog}  autoFocus  style={{backgroundColor:'#4682B4'}}/>
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
                                    await  ctlClient.getClientAll(fhevent).then(data =>{
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
                                await   ctlClient.getClientAll(fhevent).then(data =>{
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
                                             ctlClient.removeClient([rowData.id]).then(()=>{
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
                    <label htmlFor="firstname1">{t("opportunity.refNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="refNumber"
                    value={refNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrefNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.opportunityName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="opportunityName"
                    value={opportunityName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setopportunityName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.account")}</label>
                    <div style={{height:10}}> </div>
               <table width="100%">
                 <tr>
                   <td width="75%">
                    <InputText 
                    id="account"
                    value={account}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
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
                       <label htmlFor="firstname1">{t("opportunity.opportunityOwner")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="opportunityOwner"
                      value={opportunityOwner}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setopportunityOwner(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.expiryDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setexpiryDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.stageName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="stageName"
                    value={stageName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstageName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.probability")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="probability"
                    value={probability}

                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setprobability(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.stag")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="stage"
                    value={stage}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstage(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.priority")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="priority"
                    value={priority}
                    options={FHProbabilitysItems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setpriority(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.dealAge")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="dealAge"
                    value={dealAge}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdealAge(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.closeProbability")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="closeProbability"
                    value={closeProbability}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcloseProbability(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.forecastValue")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="forecastValue"
                    value={forecastValue}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setforecastValue(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.expectedCloseDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="expectedCloseDate"
                    value={expectedCloseDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setexpectedCloseDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.currency")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="currency"
                    value={currency}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcurrency(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.salesValue")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="salesValue"
                    value={salesValue}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsalesValue(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.cost")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="cost"
                    value={cost}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcost(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("opportunity.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.isactived")}</label>
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
                }}  placeholder={t("opportunity.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.islocked")}</label>
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
                }}  placeholder={t("opportunity.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("opportunity.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("opportunity.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("opportunity.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("opportunity.createUid")}</label>
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
                }}  placeholder={t("opportunity.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.updatedUid")}</label>
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
                }}  placeholder={t("opportunity.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="跟踪信息">
                    <OpportunityCommentsList mid={FHid} /> 
                    </TabPanel>
                   
                </TabView>
             
            </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/opportunity");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlOpportunity.createOpportunity({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,  
                        refNumber:refNumber,
                        opportunityName:opportunityName,
                        account:account,
                        opportunityOwner:opportunityOwner,
                        expiryDate:expiryDate,
                        stageName:stageName, 
                        probability:probability,
                        stage:stage,
                        priority:priority,
                        dealAge:dealAge,
                       // closeProbability:closeProbability,
                        forecastValue:forecastValue,
                        expectedCloseDate:expectedCloseDate,
                        currency:currency,
                        salesValue:salesValue,
                        cost:cost,
                        remark:remark                    
                      });
                      replace("/opportunity");
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

export const OpportunityItemEdit =({ Id, Mode }: OpportunityItemProps) => {
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
  const[refNumber, setrefNumber] = useState("");
  const[opportunityName, setopportunityName] = useState("");
  const[account, setaccount] = useState("");
  const[opportunityOwner, setopportunityOwner] = useState("");
  const[expiryDate, setexpiryDate] = useState<null | string | Date | Date[]>(null);
  const[stageName, setstageName] = useState("");
  const[probability, setprobability] = useState("");
  const[stage, setstage] = useState("");
  const[priority, setpriority] = useState("");
  const[dealAge, setdealAge] = useState("");
  const[closeProbability, setcloseProbability] = useState("");
  const[forecastValue, setforecastValue] = useState("0");
  const[expectedCloseDate, setexpectedCloseDate] = useState<null | string | Date | Date[]>(null);
  const[currency, setcurrency] = useState("0");
  const[salesValue, setsalesValue] = useState("0");
  const[cost, setcost] = useState("0");
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlOpportunity=new OpportunityController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const[client, setclient] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlClient = new ClientController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;


    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
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
 
    
    const FHProbabilitysItems = [
      { name: '1', code: '0' },
      { name: '2', code: '1' },
      { name: '3', code: '2' },
      { name: '4', code: '3' },
      { name: '5', code: '4' },

    ];
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlOpportunity.getOpportunityById(Id).then((data)=>{
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
            console.log('FHid:'+FHid);

            setrefNumber(data.refNumber);
            setopportunityName(data.opportunityName);
            setaccount(data.account);
            setopportunityOwner(data.opportunityOwner);
            setexpiryDate(new Date(data.expiryDate));
            setstageName(data.stageName);
            setprobability(data.probability);
            setstage(data.stage);
            setpriority(data.priority);
            setdealAge(data.dealAge);
            setcloseProbability(data.closeProbability);
            setforecastValue(data.forecastValue);
            setexpectedCloseDate(new Date(data.expectedCloseDate));
            setcurrency(data.currency);
            setsalesValue(data.salesValue);
            setcost(data.cost);
            setremark(data.remark);
          });
      });

      
      const fn=async ()=>{
        await   ctlClient.getClientAll(fhevent).then(data =>{
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
        setaccount(FHids[0].name);
        // setclient(FHids[0].id);
      }
      setDialogVisible(false);
  }

  const dialogFooterTemplate = () => {
      return (
          <div>
              <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  style={{backgroundColor:'#4682B4'}}/>
              &nbsp;&nbsp;&nbsp;
              <Button label={t('dataTable.Submit')} 
              icon="pi pi-check" 
              onClick={closeDialog}  autoFocus  style={{backgroundColor:'#4682B4'}}/>
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
                                    await  ctlClient.getClientAll(fhevent).then(data =>{
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
                                await   ctlClient.getClientAll(fhevent).then(data =>{
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
                                             ctlClient.removeClient([rowData.id]).then(()=>{
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
                    <label htmlFor="firstname1">{t("opportunity.refNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="refNumber"
                    value={refNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrefNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.opportunityName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="opportunityName"
                    value={opportunityName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setopportunityName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.account")}</label>
                    <div style={{height:10}}> </div>
               <table width="100%">
                 <tr>
                   <td width="75%">
                    <InputText 
                    id="account"
                    value={account}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
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
                       <label htmlFor="firstname1">{t("opportunity.opportunityOwner")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="opportunityOwner"
                      value={opportunityOwner}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setopportunityOwner(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.expiryDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setexpiryDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.stageName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="stageName"
                    value={stageName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstageName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.probability")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="probability"
                    value={probability}

                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setprobability(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.stag")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="stag"
                    value={stage}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstage(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.priority")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="priority"
                    value={priority}
                    options={FHProbabilitysItems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setpriority(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.dealAge")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="dealAge"
                    value={dealAge}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdealAge(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.closeProbability")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="closeProbability"
                    value={closeProbability}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcloseProbability(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.forecastValue")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="forecastValue"
                    value={forecastValue}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setforecastValue(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.expectedCloseDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="expectedCloseDate"
                    value={expectedCloseDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setexpectedCloseDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.currency")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="currency"
                    value={currency}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcurrency(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.salesValue")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="salesValue"
                    value={salesValue}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsalesValue(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.cost")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="cost"
                    value={cost}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcost(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("opportunity.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.isactived")}</label>
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
                }}  placeholder={t("opportunity.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.islocked")}</label>
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
                }}  placeholder={t("opportunity.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("opportunity.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("opportunity.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("opportunity.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("opportunity.createUid")}</label>
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
                }}  placeholder={t("opportunity.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.updatedUid")}</label>
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
                }}  placeholder={t("opportunity.updatedUid")} />
               </div>  
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
            <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="跟踪信息">
                    <OpportunityCommentsList mid={Id} 
                      FHonChange={(e:any) => {
                      setVal(e);
                    }}                   
                    
                    /> 
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/opportunity");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlOpportunity.updateOpportunityv2({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:"0",
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,
                        refNumber:refNumber,
                        opportunityName:opportunityName,
                        account:account,
                        opportunityOwner:opportunityOwner,
                        expiryDate:expiryDate,
                        stageName:stageName, 
                        probability:probability,
                        stage:stage,
                        priority:priority,
                        dealAge:dealAge,
                        //closeProbability:closeProbability,
                        forecastValue:forecastValue,
                        expectedCloseDate:expectedCloseDate,
                        currency:currency,
                        salesValue:salesValue,
                        cost:cost,
                        remark:remark                        
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


export const OpportunityItemView =({ Id, Mode }: OpportunityItemProps) => {
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
  const[refNumber, setrefNumber] = useState("");
  const[opportunityName, setopportunityName] = useState("");
  const[account, setaccount] = useState("");
  const[opportunityOwner, setopportunityOwner] = useState("");
  const[expiryDate, setexpiryDate] = useState<null | string | Date | Date[]>(null);
  const[stageName, setstageName] = useState("");
  const[probability, setprobability] = useState("");
  const[stage, setstage] = useState("");
  const[priority, setpriority] = useState("");
  const[dealAge, setdealAge] = useState("");
  const[closeProbability, setcloseProbability] = useState("");
  const[forecastValue, setforecastValue] = useState("0");
  const[expectedCloseDate, setexpectedCloseDate] = useState<null | string | Date | Date[]>(null);
  const[currency, setcurrency] = useState("0");
  const[salesValue, setsalesValue] = useState("0");
  const[cost, setcost] = useState("0");
  const[remark, setremark] = useState('');

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlOpportunity=new OpportunityController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');

  const[client, setclient] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [FHids, setFHids] = useState([]);
  const [FHcount, setcount] = useState(0);
  const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
  const ctlClient = new ClientController();
  const [customers, setCustomers] = React.useState(null);
  const [val, setVal] = useState("");
  let count = 0;


    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
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
 
    
    const FHProbabilitysItems = [
      { name: '1', code: '0' },
      { name: '2', code: '1' },
      { name: '3', code: '2' },
      { name: '4', code: '3' },
      { name: '5', code: '4' },

    ];
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlOpportunity.getOpportunityById(Id).then((data)=>{
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
            console.log('FHid:'+FHid);
            setrefNumber(data.refNumber);
            setopportunityName(data.opportunityName);
            setaccount(data.account);
            setopportunityOwner(data.opportunityOwner);
            setexpiryDate(new Date(data.expiryDate));
            setstageName(data.stageName);
            setprobability(data.probability);
            setstage(data.stage);
            setpriority(data.priority);
            setdealAge(data.dealAge);
            setcloseProbability(data.closeProbability);
            setforecastValue(data.forecastValue);
            setexpectedCloseDate(new Date(data.expectedCloseDate));
            setcurrency(data.currency);
            setsalesValue(data.salesValue);
            setcost(data.cost);
            setremark(data.remark);
          });
      });

       const fn=async ()=>{
        await   ctlClient.getClientAll(fhevent).then(data =>{
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
        // setaccount(FHids[0].name);
        // setclient(FHids[0].id);
      }
      setDialogVisible(false);
  }

  const dialogFooterTemplate = () => {
      return (
          <div>
              <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  style={{backgroundColor:'#4682B4'}}/>
              &nbsp;&nbsp;&nbsp;
              <Button label={t('dataTable.Submit')} 
              icon="pi pi-check" 
              onClick={closeDialog}  autoFocus  style={{backgroundColor:'#4682B4'}}/>
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
                                    await  ctlClient.getClientAll(fhevent).then(data =>{
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
                                await   ctlClient.getClientAll(fhevent).then(data =>{
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
                                             ctlClient.removeClient([rowData.id]).then(()=>{
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
                    <label htmlFor="firstname1">{t("opportunity.refNumber")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="refNumber"
                    value={refNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrefNumber(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.opportunityName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="opportunityName"
                    value={opportunityName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setopportunityName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.account")}</label>
                    <div style={{height:10}}> </div>
               <table width="100%">
                 <tr>
                   <td width="75%">
                    <InputText 
                    id="account"
                    value={account}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="25%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
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
                       <label htmlFor="firstname1">{t("opportunity.opportunityOwner")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="opportunityOwner"
                      value={opportunityOwner}
                      options={FHUsers} 
                      optionLabel="name" 
                      optionValue="code"
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setopportunityOwner(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.expiryDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setexpiryDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.stageName")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="stageName"
                    value={stageName}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstageName(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.probability")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="probability"
                    value={probability}

                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setprobability(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.stag")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="stag"
                    value={stage}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstage(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.priority")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="priority"
                    value={priority}
                    options={FHProbabilitysItems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setpriority(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.dealAge")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="dealAge"
                    value={dealAge}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdealAge(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.closeProbability")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="closeProbability"
                    value={closeProbability}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcloseProbability(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.forecastValue")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="forecastValue"
                    value={forecastValue}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setforecastValue(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.expectedCloseDate")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="expectedCloseDate"
                    value={expectedCloseDate}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setexpectedCloseDate(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.currency")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="currency"
                    value={currency}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcurrency(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("opportunity.salesValue")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="salesValue"
                    value={salesValue}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsalesValue(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("opportunity.cost")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="cost"
                    value={cost}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcost(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("opportunity.remark")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="remark"
                    value={remark}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setremark(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.isactived")}</label>
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
                }}  placeholder={t("opportunity.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.islocked")}</label>
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
                }}  placeholder={t("opportunity.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("opportunity.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("opportunity.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("opportunity.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("opportunity.createUid")}</label>
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
                }}  placeholder={t("opportunity.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("opportunity.updatedUid")}</label>
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
                }}  placeholder={t("opportunity.updatedUid")} />
               </div>  
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
             <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="跟踪信息">
                    <OpportunityCommentsList mid={Id} /> 
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>

          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/opportunity");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/opportunity");}}
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
