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
import { UserController } from '../../controllers/UserController';
import { CampaignController } from '../../controllers/CampaignController';
import { DatetiemController } from '../../controllers/DatetiemController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
const { nanoid } = require('nanoid');
export type CampaignItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function CampaignItem({ Id, Mode }: CampaignItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <CampaignItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <CampaignItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <CampaignItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <CampaignItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const CampaignItemAdd =({ Id, Mode }: CampaignItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const[name, setname] = useState(null);
  const[starts, setstarts] = useState(null);
  const[ends, setends] = useState(null);
  const[owner, setowner] = useState(null);
  const[budget, setbudget] = useState(0);
  const[status, setstatus] = useState(null);
  const[description, setdescription] = useState('');

  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlCampaign=new CampaignController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
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
    }, []);
  
  return (
  <Card>     
      <div className="p-fluid p-formgrid p-grid">
      <table width="98%">
      <thead>
      </thead>
      <tbody>
        <tr>
          <td>
            <label htmlFor="name">{t("campaign.name")}</label>
          </td>
          <td colSpan={3}>
          <InputText 
                        id="name" 
                        value={name}  
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setname(e.target.value);
                        }}  
                        />
          </td>
    
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.description")}</label>

          </td>
          <td colSpan={3}>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdescription(e.target.value);
                }}                 
                
                ></InputTextarea>

          </td>
     
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.name")}</label>
          </td>
          <td >
                    <InputText 
                      id="name"
                      value={name}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.target.value));
                       setname(e.target.value);
                      }}
                      />          
          </td>
          <td>

          <label htmlFor="firstname1">{t("campaign.starts")}</label>
          </td>
          <td>
                      <Calendar 
                         dateFormat="dd/mm/yy"
                         id="starts"
                         value={starts}
                         onChange={(e)=>{
                          console.info('e.value:'+JSON.stringify(e.value));
                          setstarts(e.value);
                         }}
                         />         
          </td>
        </tr>   
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.ends")}</label>
          </td>
          <td>
                                <Calendar 
                                id="ends"
                                dateFormat="dd/mm/yy"
                                value={ends}
                                onChange={(e)=>{
                                 console.info('e.value:'+JSON.stringify(e.value));
                                 setends(e.value);
                                }}
                                />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.owner")}</label>
          </td>
          <td>
                       <Dropdown 
                       id="owner"
                         value={owner} 
                        
                         options={FHUsers} 
                         optionLabel="name" 
                         optionValue="code"
                         onChange={(e: { value: any}) => {
                         console.info('e.value:'+JSON.stringify(e.value));
                         setowner(e.value);
                         }}  placeholder={t("campaign.owner")} />           
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.budget")}</label>
          </td>
          <td>
                    <InputNumber 
                    id="budget"
                    value={budget}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setbudget(e.value);
                    }}
                    />

          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.status")}</label>
          </td>
          <td>
                   <Dropdown 
                    value={status} 
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e: { value: any}) => {
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstatus(e.value);
                    }}   />        
          </td>
        </tr>
        <tr>
          <td> <label htmlFor="firstname1">{t("campaign.description")}</label></td>
          <td colSpan={3}>  
                                <InputText 
                                id="description"
                                value={description}
                                onChange={(e)=>{
                                 console.info('e.value:'+JSON.stringify(e.target.value));
                                 setdescription(e.target.value);
                                }}
                                />
          </td>
       
        </tr>
        <tr>
          <td>  <label htmlFor="firstname1">{t("campaign.isactived")}</label>
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
                            }}  placeholder={t("campaign.isactived")} />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.islocked")}</label>
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
                            }}  placeholder={t("campaign.islocked")} />
          </td>
        </tr>      
        <tr>
          <td> 
            <label htmlFor="firstname1">{t("campaign.createdAt")}</label>
          </td>
          <td>
                <Calendar
                              showTime 
                              showSeconds
                              dateFormat="dd/mm/yy"
                              id="createdAt"
                              value={createAt}
                              disabled={true}
                              placeholder={t("campaign.createdAtPlaceholder")}
                              onChange={(e) => {
                                if (e.value != null) {
                                console.log('e.value' + e.value);
                                setCreateAt(e.value);
                                }
                              }}
                            />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.updatedAt")}</label>
          </td>
          <td>
                <Calendar
                  showTime 
                  showSeconds
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("campaign.updatedAtPlaceholder")}
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
          <label htmlFor="firstname1">{t("campaign.createUid")}</label>
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
                    }}  placeholder={t("campaign.createUid")} />        
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.updatedUid")}</label>
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
                            }}  placeholder={t("campaign.updatedUid")} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
             <Button label="取消" onClick={(e) => {replace("/campaign");}}  style={{backgroundColor:'#4682B4'}}  />
          </td>
          <td colSpan={2}>
                  <Button
                            label="提交"
                            onClick={(e) => { 
                              ctlCampaign.createCampaign({
                                id:FHid,
                                name:name,
        
                                description:description,
                                isactived:isactived,
                                islocked:islocked,
                                createdAt:createAt,
                                updatedAt:updatedAt,
                                createUid:createUid,
                                updatedUid:updatedUid,    
                                starts:starts,
                                ends:ends,  
                                owner:owner,
                                budget:budget,
                                status:status,
        
                              });
                              replace("/campaign");
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

export const CampaignItemEdit =({ Id, Mode }: CampaignItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const[name, setname] = useState(null);
  const[starts, setstarts] = useState(null);
  const[ends, setends] = useState(null);
  const[owner, setowner] = useState(null);
  const[budget, setbudget] = useState(0);
  const[status, setstatus] = useState(null);
  const[description, setdescription] = useState('');

  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctltiem=new DatetiemController();
  const ctlCampaign=new CampaignController();

  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  ///globalStorage.set("locale",'cn');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
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
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
     
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlCampaign.getCampaignById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));


           const fhupdatedAt= ctltiem.getItemDatetime(data.updatedAt);
            setUpdatedAt(fhupdatedAt);
            setname(data.name);
            setdescription(data.description);
            setFHid(data.id);


           const mydata= ctltiem.getItemDate(data.starts);
            setstarts(mydata);

            setends(new Date(data.ends));
            setowner(data.owner);
            setbudget(data.budget);
            setstatus(data.status);
          });
      });
    }, []);
  
  return (
  <Card>     
      <div className="p-fluid p-formgrid p-grid">
      <table width="98%">
      <thead>
      </thead>
      <tbody>
        <tr>
          <td>
            <label htmlFor="name">{t("campaign.name")}</label>
            </td>
          <td colSpan={3}>
          <InputText 
                        id="name" 
                        value={name}  
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setname(e.target.value);
                        }}  
                        />
          </td>

        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.description")}</label>

          </td>
          <td colSpan={3}>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdescription(e.target.value);
                }}                 
                
                ></InputTextarea>

          </td>
     
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.name")}</label>
          </td>
          <td >
                    <InputText 
                      id="name"
                      value={name}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.target.value));
                       setname(e.target.value);
                      }}
                      />          
          </td>
          <td>

          <label htmlFor="firstname1">{t("campaign.starts")}</label>
          </td>
          <td>
                      <Calendar 
                         dateFormat="dd/mm/yy"
                         id="starts"
                         value={starts}
                         onChange={(e)=>{
                          console.info('e.value:'+JSON.stringify(e.value));
                          setstarts(e.value);
                         }}
                         />         
          </td>
        </tr>   
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.ends")}</label>
          </td>
          <td>
                                <Calendar 
                                id="ends"
                                dateFormat="dd/mm/yy"
                                value={ends}
                                onChange={(e)=>{
                                 console.info('e.value:'+JSON.stringify(e.value));
                                 setends(e.value);
                                }}
                                />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.owner")}</label>
          </td>
          <td>
                       <Dropdown 
                       id="owner"
                         value={owner} 
                        
                         options={FHUsers} 
                         optionLabel="name" 
                         optionValue="code"
                         onChange={(e: { value: any}) => {
                         console.info('e.value:'+JSON.stringify(e.value));
                         setowner(e.value);
                         }}  placeholder={t("campaign.owner")} />           
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.budget")}</label>
          </td>
          <td>
                    <InputNumber 
                    id="budget"
                    value={budget}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setbudget(e.value);
                    }}
                    />

          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.status")}</label>
          </td>
          <td>
                   <Dropdown 
                    value={status} 
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e: { value: any}) => {
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstatus(e.value);
                    }}   />        
          </td>
        </tr>
        <tr>
          <td> <label htmlFor="firstname1">{t("campaign.description")}</label></td>
          <td colSpan={3}>  
                                <InputText 
                                id="description"
                                value={description}
                                onChange={(e)=>{
                                 console.info('e.value:'+JSON.stringify(e.target.value));
                                 setdescription(e.target.value);
                                }}
                                />
          </td>
       
        </tr>
        <tr>
          <td>  <label htmlFor="firstname1">{t("campaign.isactived")}</label>
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
                            }}  placeholder={t("campaign.isactived")} />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.islocked")}</label>
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
                            }}  placeholder={t("campaign.islocked")} />
          </td>
        </tr>      
        <tr>
          <td> 
            <label htmlFor="firstname1">{t("campaign.createdAt")}</label>
          </td>
          <td>
                <Calendar
                              showTime 
                              showSeconds
                              dateFormat="dd/mm/yy"
                              id="createdAt"
                              value={createAt}
                              disabled={true}
                              placeholder={t("campaign.createdAtPlaceholder")}
                              onChange={(e) => {
                                if (e.value != null) {
                                console.log('e.value' + e.value);
                                setCreateAt(e.value);
                                }
                              }}
                            />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.updatedAt")}</label>
          </td>
          <td>
                <Calendar
                  showTime 
                  showSeconds
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("campaign.updatedAtPlaceholder")}
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
          <label htmlFor="firstname1">{t("campaign.createUid")}</label>
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
                    }}  placeholder={t("campaign.createUid")} />        
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.updatedUid")}</label>
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
                            }}  placeholder={t("campaign.updatedUid")} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
             <Button label="取消" onClick={(e) => {replace("/campaign");}}  style={{backgroundColor:'#4682B4'}}  />
          </td>
          <td colSpan={2}>
                  <Button
                    label="提交"
                    onClick={(e) => { 

                      const fhnew=ctltiem.setItemDate();

                      console.log('fhnew:'+fhnew.toString());
                      const userID=globalStorage.get("userID");
                      console.log('userID:'+userID);

                      const mydata= ctltiem.setItemDatetime(starts);
                      setstarts(mydata);

                      ctlCampaign.updateCampaignv2({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        starts:starts,
                        ends:ends,  
                        owner:owner,
                        budget:budget,
                        status:status,
                                                                                       
                      },Id,userID);
                      const fhtime=new Date();
                      replace("/campaign");
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


export const CampaignItemView =({ Id, Mode }: CampaignItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const[name, setname] = useState(null);
  const[starts, setstarts] = useState(null);
  const[ends, setends] = useState(null);
  const[owner, setowner] = useState(null);
  const[budget, setbudget] = useState(0);
  const[status, setstatus] = useState(null);
  const[description, setdescription] = useState('');

  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlCampaign=new CampaignController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
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
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlCampaign.getCampaignById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setname(data.name);
            setdescription(data.description);
            setFHid(data.id);
            setstarts(new Date(data.starts));
            setends(new Date(data.ends));
            setowner(data.owner);
            setbudget(data.budget);
            setstatus(data.status);           
          });
      });
    }, []);
  
  return (
  <Card>     
      <div className="p-fluid p-formgrid p-grid">
      <table width="98%">
      <thead>
      </thead>
      <tbody>
        <tr>
          <td>
            <label htmlFor="name">{t("campaign.name")}</label>
            </td>
          <td colSpan={3}>

          <InputText 
                        id="name" 
                        value={name}  
                        onChange={(e)=>{
                         console.info('e.value:'+JSON.stringify(e.target.value));
                         setname(e.target.value);
                        }}  
                        />          
          </td>

        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.description")}</label>

          </td>
          <td colSpan={3}>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdescription(e.target.value);
                }}                 
                
                ></InputTextarea>

          </td>
     
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.name")}</label>
          </td>
          <td >
                    <InputText 
                      id="name"
                      value={name}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.target.value));
                       setname(e.target.value);
                      }}
                      />          
          </td>
          <td>

          <label htmlFor="firstname1">{t("campaign.starts")}</label>
          </td>
          <td>
                      <Calendar 
                         dateFormat="dd/mm/yy"
                         id="starts"
                         value={starts}
                         onChange={(e)=>{
                          console.info('e.value:'+JSON.stringify(e.value));
                          setstarts(e.value);
                         }}
                         />         
          </td>
        </tr>   
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.ends")}</label>
          </td>
          <td>
                                <Calendar 
                                id="ends"
                                dateFormat="dd/mm/yy"
                                value={ends}
                                onChange={(e)=>{
                                 console.info('e.value:'+JSON.stringify(e.value));
                                 setends(e.value);
                                }}
                                />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.owner")}</label>
          </td>
          <td>
                       <Dropdown 
                       id="owner"
                         value={owner} 
                        
                         options={FHUsers} 
                         optionLabel="name" 
                         optionValue="code"
                         onChange={(e: { value: any}) => {
                         console.info('e.value:'+JSON.stringify(e.value));
                         setowner(e.value);
                         }}  placeholder={t("campaign.owner")} />           
          </td>
        </tr>
        <tr>
          <td>
          <label htmlFor="firstname1">{t("campaign.budget")}</label>
          </td>
          <td>
                    <InputNumber 
                    id="budget"
                    value={budget}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setbudget(e.value);
                    }}
                    />

          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.status")}</label>
          </td>
          <td>
                   <Dropdown 
                    value={status} 
                    options={fhitems} 
                    optionLabel="name" 
                    optionValue="code"
                    onChange={(e: { value: any}) => {
                     console.info('e.value:'+JSON.stringify(e.value));
                     setstatus(e.value);
                    }}   />        
          </td>
        </tr>
        <tr>
          <td> <label htmlFor="firstname1">{t("campaign.description")}</label></td>
          <td colSpan={3}>  
                                <InputText 
                                id="description"
                                value={description}
                                onChange={(e)=>{
                                 console.info('e.value:'+JSON.stringify(e.target.value));
                                 setdescription(e.target.value);
                                }}
                                />
          </td>
       
        </tr>
        <tr>
          <td>  <label htmlFor="firstname1">{t("campaign.isactived")}</label>
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
                            }}  placeholder={t("campaign.isactived")} />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.islocked")}</label>
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
                            }}  placeholder={t("campaign.islocked")} />
          </td>
        </tr>      
        <tr>
          <td> 
            <label htmlFor="firstname1">{t("campaign.createdAt")}</label>
          </td>
          <td>
                <Calendar
                              showTime 
                              showSeconds
                              dateFormat="dd/mm/yy"
                              id="createdAt"
                              value={createAt}
                              disabled={true}
                              placeholder={t("campaign.createdAtPlaceholder")}
                              onChange={(e) => {
                                if (e.value != null) {
                                console.log('e.value' + e.value);
                                setCreateAt(e.value);
                                }
                              }}
                            />
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.updatedAt")}</label>
          </td>
          <td>
                <Calendar
                  showTime 
                  showSeconds
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("campaign.updatedAtPlaceholder")}
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
          <label htmlFor="firstname1">{t("campaign.createUid")}</label>
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
                    }}  placeholder={t("campaign.createUid")} />        
          </td>
          <td>
          <label htmlFor="firstname1">{t("campaign.updatedUid")}</label>
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
                            }}  placeholder={t("campaign.updatedUid")} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
             <Button label="取消" onClick={(e) => {replace("/campaign");}}  style={{backgroundColor:'#4682B4'}}  />
          </td>
          <td colSpan={2}>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/campaign");}}
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
