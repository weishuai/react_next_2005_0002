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
import { ContacPersonController } from '../../controllers/ContacPersonController';
import { CountryController } from '../../controllers/CountryController';
import { LanguagesController } from '../../controllers/LanguagesController';
import {ClientController} from '../../controllers/ClientController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
const { nanoid } = require('nanoid');
export type ContacPersonItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function ContacPersonItem({ Id, Mode }: ContacPersonItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <ContacPersonItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <ContacPersonItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <ContacPersonItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <ContacPersonItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const ContacPersonItemAdd =({ Id, Mode }: ContacPersonItemProps) => {
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
  const[email, setemail] = useState("");
  const[islogin, setislogin] = useState(null);
  const[isnotiﬁcation, setisnotiﬁcation] = useState(null);
  const[isemail, setisemail] = useState(null);
  const[jobTitle, setjobTitle] = useState("");
  const[client, setclient] = useState(null);
  const[account, setaccount] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[gender, setgender] = useState(null);
  const[dateofBirth, setdateofBirth] = useState<null | string | Date | Date[]>(null); 
  const[language, setlanguage] = useState(null);
  const[income, setincome] = useState("");
  const[status, setstatus] = useState("");
  const[children, setchildren] = useState(0);
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState("");
  const[emergency, setemergency] = useState("");
  const[securityCourse, setsecurityCourse] = useState("");
  const[additionalField3, setadditionalField3] = useState("");
  const[additionalField4, setadditionalField4] = useState("");
  const[additionalField5, setadditionalField5] = useState("");
  const[isAlert, setisAlert] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlContacPerson=new ContacPersonController();
  const [Countrys, setCountrys] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const { t, i18n } = useTranslation();

  const [FHid, setFHid] = useState('');

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

    
    const fhGenderitems = [
      { name: '女', code: '0' },
      { name: '男', code: '1' },
    ];
    async function getCountrys()
    {
        const ctlCountry=new CountryController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }
    async function getLanguages()
    {
        const ctlCountry=new LanguagesController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }

    



    useEffect(() => {
      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      });   
      
      getLanguages().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setLanguages(data);
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
        //setaccount(FHids[0].name);
        // setclient(FHids[0].id);
        setaccount(FHids[0].name);
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
              <td  colSpan={4}>
              <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>    
              </td>

            </tr>           
            <tr>
              <td style={{  width: '10%' }}>
              <label htmlFor="name">{t("contacPerson.name")}</label>
              </td>
              <td style={{  width: '40%' }}>
              <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />

              </td>
              <td style={{  width: '10%' }}>
              <label htmlFor="firstname1">{t("contacPerson.email")}</label>


              </td>
              <td style={{  width: '40%' }}>

              <InputText 
                    id="email"
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
              </td>
            </tr>

        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.islogin")}</label>
          </td>
          <td>
          <Dropdown 
                      id="islogin"
                      options={fhitems} 
                      value={islogin}
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setislogin(e.value);
                      }}
                      />
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.isnotiﬁcation")}</label>
          </td>
          <td>
          <Dropdown 
                    id="isnotiﬁcation"
                    value={isnotiﬁcation}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setisnotiﬁcation(e.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.isemail")}</label>
          </td>
          <td>
          <Dropdown 
                      id="isemail"
                      value={isemail}
                      options={fhitems} 
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setisemail(e.value);
                      }}
                      />           
          </td>
          <td> 
            <label htmlFor="firstname1">{t("contacPerson.jobTitle")}</label>
          </td>
          <td>
          <InputText 
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setjobTitle(e.target.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="firstname1">{t("contacPerson.phoneNumber")}</label>
          </td>
          <td>
          <InputText 
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />

          </td>
          <td>

          <label htmlFor="firstname1">{t("contacPerson.account")}</label>
          </td>
          <td>
          <table width="100%">
                 <tr>
                   <td width="85%">



                    <InputText 
                    id="account"
                    value={account}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="15%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.mobileNumber")}</label>
          </td>
          <td>
          <InputText 
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />           
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.faxNumber")}</label>

          </td>
          <td>
          <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.gender")}</label>

          </td>
          <td>
          <Dropdown 
                    id="gender"
                    options={fhGenderitems} 
                    optionLabel="name" 
                    optionValue="code"                     
                    value={gender}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setgender(e.value);
                    }}
                    />           
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.dateofBirth")}</label>
          </td>
          <td>
          <Calendar 
                      id="dateofBirth"
                      value={dateofBirth}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setdateofBirth(e.value);
                      }}
                      />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.language")}</label>

          </td>
          <td>
          <Dropdown 
                    id="language"
                    value={language}
                    options={Languages}
                    optionLabel="name" 
                    optionValue="code"               
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setlanguage(e.value);
                    }}
                    />

          </td>
          <td>

          <label htmlFor="firstname1">{t("contacPerson.income")}</label>
          </td>
          <td>
          <InputText 
                    id="income"
                    value={income}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setincome(e.target.value);
                    }}
                    />

          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="firstname1">{t("contacPerson.status")}</label>
            </td>
          <td>
          <InputText 
                    id="status"
                    value={status}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstatus(e.target.value);
                    }}
                    />
          </td>
          <td>  <label htmlFor="firstname1">{t("contacPerson.children")}</label></td>
          <td>
          <InputNumber 
                      id="children"
                      value={children}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setchildren(e.value);
                      }}
                      />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.street")}</label>
          </td>
          <td>
          <InputText 
                    id="street"
                    value={street}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstreet(e.target.value);
                    }}
                    />

          </td>
          <td> <label htmlFor="firstname1">{t("contacPerson.city")}</label></td>
          <td>
          <InputText 
                    id="city"
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
          </td>
        </tr>  

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.state")}</label>
        </td>

        <td>
        <InputText 
                    id="state"
                    value={state}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstate(e.target.value);
                    }}
                    /> 
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.postCode")}</label>
        </td>
        <td>
        <InputText 
                    id="postCode"
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
          </td>       
        </tr> 

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.country")}</label>
        </td>

        <td>
        <Dropdown 
                    id="country"
                    value={country}
                    options={Countrys}
                    optionLabel="name" 
                    optionValue="code"                   
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setcountry(e.value);
                    }}
                    />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.emergency")}</label>
       
        </td>
        <td>
        <InputText 
                    id="emergency"
                    value={emergency}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemergency(e.target.value);
                    }}
                    />
          </td>       
        </tr>
        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.securityCourse")}</label>
        </td>

        <td>
        <InputText 
                    id="securityCourse"
                    value={securityCourse}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsecurityCourse(e.target.value);
                    }}
                    />  
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField3")}</label>
        </td>
        <td>
        <InputText 
                    id="additionalField3"
                    value={additionalField3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField3(e.target.value);
                    }}
                    />
          </td>       
        </tr>

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField4")}</label>
        </td>

        <td>
        <InputText 
                    id="additionalField4"
                    value={additionalField4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField4(e.target.value);
                    }}
                    />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField5")}</label>
          
        </td>
        <td>
        <InputText 
                    id="additionalField5"
                    value={additionalField5}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField5(e.target.value);
                    }}
                    />
          </td>       
        </tr>
   

        <tr>
        <td>  
    
          
          <label htmlFor="firstname1">{t("contacPerson.description")}</label>
        </td>

        <td colSpan={3}>

                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
        </td>


          </tr>

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.isactived")}</label>
        </td>

        <td>
        <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("contacPerson.isactived")} />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.islocked")}</label>
        </td>
        <td>
        <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("contacPerson.islocked")} />
          </td>       
        </tr>

     <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.createdAt")}</label>
        </td>

        <td>
        <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("contacPerson.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.updatedAt")}</label>
        </td>
        <td>
        <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("contacPerson.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                /> 
          </td>       
        </tr>
        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.createUid")}</label>
        </td>

        <td>
        <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("contacPerson.createUid")} />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.updatedUid")}</label>
        </td>
        <td>
        <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("contacPerson.updatedUid")} />
          </td>       
        </tr>

         <tr>
        <td>

        </td>

        <td>

        </td>

        <td></td>
        <td></td>
        </tr>
        <tr>
        <td  colSpan={2}>
        <Button label="取消" onClick={(e) => {replace("/contacperson");}}  style={{backgroundColor:'#4682B4'}}  />
        </td>
        <td colSpan={2}> 
        <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlContacPerson.createContacPerson({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,
                        email:email,
                        islogin:islogin,
                        isemail:isemail,
                        jobTitle:jobTitle,
                        client:client,
                        account:account,
                        phoneNumber:phoneNumber,
                        mobileNumber:mobileNumber,
                        faxNumber:faxNumber,
                        gender:gender,
                        dateofBirth:dateofBirth,
                        language:language,
                        income:income,
                        children:children,
                        street:street,
                        city:city,
                        state:state,
                        postCode:postCode,
                        country:country,
                        emergency:emergency,
                        securityCourse:securityCourse,
                        additionalField3:additionalField3,
                        additionalField4:additionalField4,
                        additionalField5:additionalField5,
                        isAlert:isAlert,                       

                      });
                      replace("/contacperson");
                    }}
                    style={{backgroundColor:'#4682B4'}}
                  />   
        </td>       
        </tr>


              
            </tbody>
   </table>
      </div>
    </Card>
  );
};

export const ContacPersonItemEdit =({ Id, Mode }: ContacPersonItemProps) => {
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
  const[email, setemail] = useState("");
  const[islogin, setislogin] = useState(null);
  const[isnotiﬁcation, setisnotiﬁcation] = useState(null);
  const[isemail, setisemail] = useState(null);
  const[jobTitle, setjobTitle] = useState("");
  const[client, setclient] = useState(null);
  const[account, setaccount] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[gender, setgender] = useState(null);
  const[dateofBirth, setdateofBirth] = useState<null | string | Date | Date[]>(null); 
  const[language, setlanguage] = useState(null);
  const[income, setincome] = useState("");
  const[status, setstatus] = useState("");
  const[children, setchildren] = useState(0);
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState("");
  const[emergency, setemergency] = useState("");
  const[securityCourse, setsecurityCourse] = useState("");
  const[additionalField3, setadditionalField3] = useState("");
  const[additionalField4, setadditionalField4] = useState("");
  const[additionalField5, setadditionalField5] = useState("");
  const[isAlert, setisAlert] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlContacPerson=new ContacPersonController();
  const [Countrys, setCountrys] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const { t, i18n } = useTranslation();

  const [FHid, setFHid] = useState('');

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
    const fhGenderitems = [
      { name: '女', code: '0' },
      { name: '男', code: '1' },
    ];
    async function getCountrys()
    {
        const ctlCountry=new CountryController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }
    async function getLanguages()
    {
        const ctlCountry=new LanguagesController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }

    



    
 
    useEffect(() => {
      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      });   
      
      getLanguages().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setLanguages(data);
      }); 
      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlContacPerson.getContacPersonById(Id).then((data)=>{
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
            setemail(data.email);
            setislogin(data.islogin);
            setisnotiﬁcation(data.isnotiﬁcation);
            setisemail(data.isemail);
            setjobTitle(data.jobTitle);
            setclient(data.client);
            setaccount(data.account);
            setphoneNumber(data.phoneNumber);
            setmobileNumber(data.mobileNumber);
            setfaxNumber(data.faxNumber);
            setgender(data.gender);
            setdateofBirth(data.dateofBirth);
            setlanguage(data.language);
            setincome(data.income);

            setchildren(data.children);
            setstreet(data.street);
            setcity(data.city);
            setstate(data.state);
            setpostCode(data.postCode);
            setcountry(data.country);
            setemergency(data.emergency);
            setsecurityCourse(data.securityCourse);
            setadditionalField3(data.additionalField3);
            setadditionalField4(data.additionalField4);
            setadditionalField5(data.additionalField5);
            setisAlert(data.isAlert);
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


      });



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
        setaccount(FHids[0].name);
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
              <td  colSpan={4}>
              <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>    
              </td>

            </tr>           
            <tr>
              <td style={{  width: '10%' }}>
              <label htmlFor="name">{t("contacPerson.name")}</label>
              </td>
              <td style={{  width: '40%' }}>
              <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />

              </td>
              <td style={{  width: '10%' }}>
              <label htmlFor="firstname1">{t("contacPerson.email")}</label>


              </td>
              <td style={{  width: '40%' }}>

              <InputText 
                    id="email"
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
              </td>
            </tr>

        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.islogin")}</label>
          </td>
          <td>
          <Dropdown 
                      id="islogin"
                      options={fhitems} 
                      value={islogin}
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setislogin(e.value);
                      }}
                      />
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.isnotiﬁcation")}</label>
          </td>
          <td>
          <Dropdown 
                    id="isnotiﬁcation"
                    value={isnotiﬁcation}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setisnotiﬁcation(e.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.isemail")}</label>
          </td>
          <td>
          <Dropdown 
                      id="isemail"
                      value={isemail}
                      options={fhitems} 
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setisemail(e.value);
                      }}
                      />           
          </td>
          <td> 
            <label htmlFor="firstname1">{t("contacPerson.jobTitle")}</label>
          </td>
          <td>
          <InputText 
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setjobTitle(e.target.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="firstname1">{t("contacPerson.phoneNumber")}</label>
          </td>
          <td>
          <InputText 
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />

          </td>
          <td>

          <label htmlFor="firstname1">{t("contacPerson.account")}</label>
          </td>
          <td>
          <table width="100%">
                 <tr>
                   <td width="85%">



                    <InputText 
                    id="account"
                    value={account}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="15%">
                    <Button 
                    label={t('dataTable.Search')} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.mobileNumber")}</label>
          </td>
          <td>
          <InputText 
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />           
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.faxNumber")}</label>

          </td>
          <td>
          <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.gender")}</label>

          </td>
          <td>
          <Dropdown 
                    id="gender"
                    options={fhGenderitems} 
                    optionLabel="name" 
                    optionValue="code"                     
                    value={gender}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setgender(e.value);
                    }}
                    />           
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.dateofBirth")}</label>
          </td>
          <td>
          <Calendar 
                      id="dateofBirth"
                      value={dateofBirth}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setdateofBirth(e.value);
                      }}
                      />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.language")}</label>

          </td>
          <td>
          <Dropdown 
                    id="language"
                    value={language}
                    options={Languages}
                    optionLabel="name" 
                    optionValue="code"               
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setlanguage(e.value);
                    }}
                    />

          </td>
          <td>

          <label htmlFor="firstname1">{t("contacPerson.income")}</label>
          </td>
          <td>
          <InputText 
                    id="income"
                    value={income}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setincome(e.target.value);
                    }}
                    />

          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="firstname1">{t("contacPerson.status")}</label>
            </td>
          <td>
          <InputText 
                    id="status"
                    value={status}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstatus(e.target.value);
                    }}
                    />
          </td>
          <td>  <label htmlFor="firstname1">{t("contacPerson.children")}</label></td>
          <td>
          <InputNumber 
                      id="children"
                      value={children}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setchildren(e.value);
                      }}
                      />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.street")}</label>
          </td>
          <td>
          <InputText 
                    id="street"
                    value={street}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstreet(e.target.value);
                    }}
                    />

          </td>
          <td> <label htmlFor="firstname1">{t("contacPerson.city")}</label></td>
          <td>
          <InputText 
                    id="city"
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
          </td>
        </tr>  

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.state")}</label>
        </td>

        <td>
        <InputText 
                    id="state"
                    value={state}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstate(e.target.value);
                    }}
                    /> 
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.postCode")}</label>
        </td>
        <td>
        <InputText 
                    id="postCode"
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
          </td>       
        </tr> 

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.country")}</label>
        </td>

        <td>
        <Dropdown 
                    id="country"
                    value={country}
                    options={Countrys}
                    optionLabel="name" 
                    optionValue="code"                   
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setcountry(e.value);
                    }}
                    />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.emergency")}</label>
       
        </td>
        <td>
        <InputText 
                    id="emergency"
                    value={emergency}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemergency(e.target.value);
                    }}
                    />
          </td>       
        </tr>
        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.securityCourse")}</label>
        </td>

        <td>
        <InputText 
                    id="securityCourse"
                    value={securityCourse}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsecurityCourse(e.target.value);
                    }}
                    />  
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField3")}</label>
        </td>
        <td>
        <InputText 
                    id="additionalField3"
                    value={additionalField3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField3(e.target.value);
                    }}
                    />
          </td>       
        </tr>

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField4")}</label>
        </td>

        <td>
        <InputText 
                    id="additionalField4"
                    value={additionalField4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField4(e.target.value);
                    }}
                    />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField5")}</label>
          
        </td>
        <td>
        <InputText 
                    id="additionalField5"
                    value={additionalField5}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField5(e.target.value);
                    }}
                    />
          </td>       
        </tr>
        <tr>
        <td>  
    
          
          <label htmlFor="firstname1">{t("contacPerson.description")}</label>
        </td>

        <td colSpan={3}>

                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
        </td>


          </tr>
        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.isactived")}</label>
        </td>

        <td>
        <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("contacPerson.isactived")} />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.islocked")}</label>
        </td>
        <td>
        <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("contacPerson.islocked")} />
          </td>       
        </tr>

     <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.createdAt")}</label>
        </td>

        <td>
        <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("contacPerson.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.updatedAt")}</label>
        </td>
        <td>
        <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("contacPerson.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                /> 
          </td>       
        </tr>
        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.createUid")}</label>
        </td>

        <td>
        <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("contacPerson.createUid")} />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.updatedUid")}</label>
        </td>
        <td>
        <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("contacPerson.updatedUid")} />
          </td>       
        </tr>

   
        <tr>
        <td  colSpan={2}>
        <Button label="取消" onClick={(e) => {replace("/contacperson");}} style={{backgroundColor:'#4682B4'}}  />
        </td>
        <td colSpan={2}> 
        <Button
                    label="提交"
                    onClick={(e) => { 
                      const fhnew=new Date();
                      const userID=globalStorage.get("userID");
                      console.log('userID:'+userID);
                      ctlContacPerson.updateContacPersonv2({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,  
                        email:email,
                        islogin:islogin,
                        isemail:isemail,
                        jobTitle:jobTitle,
                        client:client,
                        account:account,
                        phoneNumber:phoneNumber,
                        mobileNumber:mobileNumber,
                        faxNumber:faxNumber,
                        gender:gender,
                        dateofBirth:dateofBirth,
                        language:language,
                        income:income,
                        children:children,
                        street:street,
                        city:city,
                        state:state,
                        postCode:postCode,
                        country:country,
                        emergency:emergency,
                        securityCourse:securityCourse,
                        additionalField3:additionalField3,
                        additionalField4:additionalField4,
                        additionalField5:additionalField5,
                        isAlert:isAlert,
                        
                        
                      },Id,userID);
                      replace("/contacperson");
                    }}
                    style={{backgroundColor:'#4682B4'}}
                  />
        </td>       
        </tr>


              
            </tbody>
      </table>
      </div>
    </Card>
  );
};


export const ContacPersonItemView =({ Id, Mode }: ContacPersonItemProps) => {
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
  const[email, setemail] = useState("");
  const[islogin, setislogin] = useState(null);
  const[isnotiﬁcation, setisnotiﬁcation] = useState(null);
  const[isemail, setisemail] = useState(null);
  const[jobTitle, setjobTitle] = useState("");
  const[client, setclient] = useState(null);
  const[account, setaccount] = useState("");
  const[phoneNumber, setphoneNumber] = useState("");
  const[mobileNumber, setmobileNumber] = useState("");
  const[faxNumber, setfaxNumber] = useState("");
  const[gender, setgender] = useState(null);
  const[dateofBirth, setdateofBirth] = useState<null | string | Date | Date[]>(null); 
  const[language, setlanguage] = useState(null);
  const[income, setincome] = useState("");
  const[status, setstatus] = useState("");
  const[children, setchildren] = useState(0);
  const[street, setstreet] = useState("");
  const[city, setcity] = useState("");
  const[state, setstate] = useState("");
  const[postCode, setpostCode] = useState("");
  const[country, setcountry] = useState("");
  const[emergency, setemergency] = useState("");
  const[securityCourse, setsecurityCourse] = useState("");
  const[additionalField3, setadditionalField3] = useState("");
  const[additionalField4, setadditionalField4] = useState("");
  const[additionalField5, setadditionalField5] = useState("");
  const[isAlert, setisAlert] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlContacPerson=new ContacPersonController();
  const [Countrys, setCountrys] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const { t, i18n } = useTranslation();

  const [FHid, setFHid] = useState('');

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
    const fhGenderitems = [
      { name: '女', code: '0' },
      { name: '男', code: '1' },
    ];
    async function getCountrys()
    {
        const ctlCountry=new CountryController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }
    async function getLanguages()
    {
        const ctlCountry=new LanguagesController();
        const fhojts = await ctlCountry.getAllView();
        console.log('Country_data:'+JSON.stringify(fhojts["fhok"]));
        //.map((d) => ({ code: d.id, name: d.name }))
        return JSON.parse(JSON.stringify(fhojts["fhok"])).map((d:any) => ({ code: d.id, name: d.name }));;
    }
    useEffect(() => {
      getCountrys().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setCountrys(data);
      });   
      
      getLanguages().then((data)=>{
            console.log('Country_data:'+JSON.stringify(data));
            setLanguages(data);
      }); 
      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlContacPerson.getContacPersonById(Id).then((data)=>{
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
            setemail(data.email);
            setislogin(data.islogin);
            setisnotiﬁcation(data.isnotiﬁcation);
            setisemail(data.isemail);
            setjobTitle(data.jobTitle);
            setclient(data.client);
            setaccount(data.account);
            setphoneNumber(data.phoneNumber);
            setmobileNumber(data.mobileNumber);
            setfaxNumber(data.faxNumber);
            setgender(data.gender);
            setdateofBirth(data.dateofBirth);
            setlanguage(data.language);
            setincome(data.income);
            setchildren(data.children);
            setstreet(data.street);
            setcity(data.city);
            setstate(data.state);
            setpostCode(data.postCode);
            setcountry(data.country);
            setemergency(data.emergency);
            setsecurityCourse(data.securityCourse);
            setadditionalField3(data.additionalField3);
            setadditionalField4(data.additionalField4);
            setadditionalField5(data.additionalField5);
            setisAlert(data.isAlert);
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


      });
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
        setaccount(FHids[0].name);
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
              <td  colSpan={4}>
              <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>    
              </td>

            </tr>           
            <tr>
              <td style={{  width: '10%' }}>
              <label htmlFor="name">{t("contacPerson.name")}</label>
              </td>
              <td style={{  width: '40%' }}>
              <InputText 
                id="name" 
                disabled={true}
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />

              </td>
              <td style={{  width: '10%' }}>
              <label htmlFor="firstname1">{t("contacPerson.email")}</label>


              </td>
              <td style={{  width: '40%' }}>

              <InputText 
                    id="email"
                    disabled={true}
                    value={email}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemail(e.target.value);
                    }}
                    />
              </td>
            </tr>

        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.islogin")}</label>
          </td>
          <td>
          <Dropdown 
                      id="islogin"
                      disabled={true}
                      options={fhitems} 
                      value={islogin}
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setislogin(e.value);
                      }}
                      />
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.isnotiﬁcation")}</label>
          </td>
          <td>
          <Dropdown 
                    id="isnotiﬁcation"
                    disabled={true}
                    value={isnotiﬁcation}
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code" 
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setisnotiﬁcation(e.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.isemail")}</label>
          </td>
          <td>
          <Dropdown 
                      id="isemail"
                      disabled={true}
                      value={isemail}
                      options={fhitems} 
                      optionLabel="name" 
                      optionValue="code" 
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setisemail(e.value);
                      }}
                      />           
          </td>
          <td> 
            <label htmlFor="firstname1">{t("contacPerson.jobTitle")}</label>
          </td>
          <td>
          <InputText 
                    id="jobTitle"
                    disabled={true}
                    value={jobTitle}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setjobTitle(e.target.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="firstname1">{t("contacPerson.phoneNumber")}</label>
          </td>
          <td>
          <InputText 
                    id="phoneNumber"
                    disabled={true}
                    value={phoneNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setphoneNumber(e.target.value);
                    }}
                    />

          </td>
          <td>

          <label htmlFor="firstname1">{t("contacPerson.account")}</label>
          </td>
          <td>
          <table width="100%">
                 <tr>
                   <td width="85%">



                    <InputText 
                    id="account"
                    disabled={true}
                    value={account}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setaccount(e.target.value);
                    }}
                    />

                   </td>
                   <td width="15%">
                    <Button 
                    label={t('dataTable.Search')}
                    disabled={true} 
                    icon="pi pi-external-link" 
                  
                    style={{backgroundColor:'#4682B4'}}
                    onClick={openDialog} 
                      /> 
                   </td>
                 </tr>
               </table>
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.mobileNumber")}</label>
          </td>
          <td>
          <InputText 
                    id="mobileNumber"
                    disabled={true}
                    value={mobileNumber}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setmobileNumber(e.target.value);
                    }}
                    />           
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.faxNumber")}</label>

          </td>
          <td>
          <InputText 
                    id="faxNumber"
                    value={faxNumber}
                    disabled={true}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfaxNumber(e.target.value);
                    }}
                    />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.gender")}</label>

          </td>
          <td>
          <Dropdown 
                    id="gender"
                    options={fhGenderitems} 
                    disabled={true}
                    optionLabel="name" 
                    optionValue="code"                     
                    value={gender}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setgender(e.value);
                    }}
                    />           
          </td>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.dateofBirth")}</label>
          </td>
          <td>
          <Calendar 
                      id="dateofBirth"
                      disabled={true}
                      value={dateofBirth}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setdateofBirth(e.value);
                      }}
                      />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.language")}</label>

          </td>
          <td>
          <Dropdown 
                    id="language"
                    value={language}
                    disabled={true}
                    options={Languages}
                    optionLabel="name" 
                    optionValue="code"               
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setlanguage(e.value);
                    }}
                    />

          </td>
          <td>

          <label htmlFor="firstname1">{t("contacPerson.income")}</label>
          </td>
          <td>
          <InputText 
                    id="income"
                    disabled={true}
                    value={income}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setincome(e.target.value);
                    }}
                    />

          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="firstname1">{t("contacPerson.status")}</label>
            </td>
          <td>
          <InputText 
                    id="status"
                    value={status}
                    disabled={true}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstatus(e.target.value);
                    }}
                    />
          </td>
          <td>  <label htmlFor="firstname1">{t("contacPerson.children")}</label></td>
          <td>
          <InputNumber 
                      id="children"
                      disabled={true}
                      value={children}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setchildren(e.value);
                      }}
                      />
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("contacPerson.street")}</label>
          </td>
          <td>
          <InputText 
                    id="street"
                    disabled={true}
                    value={street}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstreet(e.target.value);
                    }}
                    />

          </td>
          <td> <label htmlFor="firstname1">{t("contacPerson.city")}</label></td>
          <td>
          <InputText 
                    id="city"
                    disabled={true}
                    value={city}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcity(e.target.value);
                    }}
                    />
          </td>
        </tr>  

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.state")}</label>
        </td>

        <td>
        <InputText 
                    id="state"
                    value={state}
                    disabled={true}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setstate(e.target.value);
                    }}
                    /> 
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.postCode")}</label>
        </td>
        <td>
        <InputText 
                    id="postCode"
                    disabled={true}
                    value={postCode}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpostCode(e.target.value);
                    }}
                    />
          </td>       
        </tr> 

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.country")}</label>
        </td>

        <td>
        <Dropdown 
                    id="country"
                    disabled={true}
                    value={country}
                    options={Countrys}
                    optionLabel="name" 
                    optionValue="code"                   
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setcountry(e.value);
                    }}
                    />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.emergency")}</label>
       
        </td>
        <td>
        <InputText 
                    id="emergency"
                    disabled={true}
                    value={emergency}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setemergency(e.target.value);
                    }}
                    />
          </td>       
        </tr>
        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.securityCourse")}</label>
        </td>

        <td>
        <InputText 
                    id="securityCourse"
                    disabled={true}
                    value={securityCourse}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsecurityCourse(e.target.value);
                    }}
                    />  
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField3")}</label>
        </td>
        <td>
        <InputText 
                    id="additionalField3"
                    disabled={true}
                    value={additionalField3}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField3(e.target.value);
                    }}
                    />
          </td>       
        </tr>

        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField4")}</label>
        </td>

        <td>
        <InputText 
                    id="additionalField4"
                    disabled={true}
                    value={additionalField4}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField4(e.target.value);
                    }}
                    />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.additionalField5")}</label>
          
        </td>
        <td>
        <InputText 
                    id="additionalField5"
                    disabled={true}
                    value={additionalField5}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setadditionalField5(e.target.value);
                    }}
                    />
          </td>       
        </tr>
        <tr>
        <td>  
    
          
          <label htmlFor="firstname1">{t("contacPerson.description")}</label>
        </td>

        <td colSpan={3}>

                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
        </td>


          </tr>
        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.isactived")}</label>
        </td>

        <td>
        <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("contacPerson.isactived")} />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.islocked")}</label>
        </td>
        <td>
        <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("contacPerson.islocked")} />
          </td>       
        </tr>

     <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.createdAt")}</label>
        </td>

        <td>
        <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("contacPerson.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.updatedAt")}</label>
        </td>
        <td>
        <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("contacPerson.updatedAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                      console.log('e.value' + e.value);
                      setUpdatedAt(e.value);
                    }
                  }}
                /> 
          </td>       
        </tr>
        <tr>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.createUid")}</label>
        </td>

        <td>
        <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("contacPerson.createUid")} />
        </td>
        <td>
        <label htmlFor="firstname1">{t("contacPerson.updatedUid")}</label>
        </td>
        <td>
        <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("contacPerson.updatedUid")} />
          </td>       
        </tr>

    
        <tr>
        <td  colSpan={2}>
        <Button label="取消" onClick={(e) => {replace("/contacperson");}}  style={{backgroundColor:'#4682B4'}}  />
        </td>
        <td colSpan={2}> 
        <Button
                    label="确认"
                    onClick={(e) => {replace("/contacperson");}}
                    style={{backgroundColor:'#4682B4'}}
                  />
        </td>       
        </tr>

            </tbody>
      </table>     
      </div>
    </Card>
  );
};
