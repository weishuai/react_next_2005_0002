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
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("campaign.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setname(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("campaign.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="name"
                    value={name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setname(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("campaign.starts")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      dateFormat="dd/mm/yy"
                      id="starts"
                      value={starts}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setstarts(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.ends")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    id="ends"
                    dateFormat="dd/mm/yy"
                    value={ends}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setends(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("campaign.owner")}</label>
                      <div style={{height:10}}> </div>


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



                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.budget")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="budget"
                    value={budget}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setbudget(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("campaign.status")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                value={status} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setstatus(e.value);
                }}   />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("campaign.description")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="description"
                    value={description}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setdescription(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.isactived")}</label>
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
                }}  placeholder={t("campaign.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.islocked")}</label>
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
                }}  placeholder={t("campaign.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.createdAt")}</label>
                <div style={{height:10}}> </div>
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
               </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.updatedAt")}</label>
                <div style={{height:10}}> </div>
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
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.createUid")}</label>
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
                }}  placeholder={t("campaign.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.updatedUid")}</label>
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
                }}  placeholder={t("campaign.updatedUid")} />
               </div>  
          </td>
          </tr>




          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/campaign");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
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
                </div>
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
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("campaign.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setname(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("campaign.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>

          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="name"
                    value={name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setname(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("campaign.starts")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      dateFormat="dd/mm/yy"
                      id="starts"
                      value={starts}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setstarts(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.ends")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    dateFormat="dd/mm/yy"
                    id="ends"
                    value={ends}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setends(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("campaign.owner")}</label>
                      <div style={{height:10}}> </div>
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
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.budget")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="budget"
                    value={budget}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setbudget(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("campaign.status")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                value={status} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setstatus(e.value);
                }}   />
                    </div>
              </td>
              </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.isactived")}</label>
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
                }}  placeholder={t("campaign.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.islocked")}</label>
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
                }}  placeholder={t("campaign.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.createdAt")}</label>
                <div style={{height:10}}> </div>
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
               </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.updatedAt")}</label>
                <div style={{height:10}}> </div>
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
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.createUid")}</label>
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
                }}  placeholder={t("campaign.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.updatedUid")}</label>
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
                }}  placeholder={t("campaign.updatedUid")} />
               </div>  
          </td>
          </tr>


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/campaign");}} style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
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
                </div>
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
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("campaign.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="name" 
                value={name}  
                disabled={true}
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setname(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("campaign.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                disabled={true}
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr>
          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    disabled={true}
                    id="name"
                    value={name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setname(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("campaign.starts")}</label>
                      <div style={{height:10}}> </div>
                      <Calendar 
                      disabled={true}
                      dateFormat="dd/mm/yy"
                      id="starts"
                      value={starts}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setstarts(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.ends")}</label>
                    <div style={{height:10}}> </div>
                    <Calendar 
                    disabled={true}
                    dateFormat="dd/mm/yy"
                    id="ends"
                    value={ends}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setends(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("campaign.owner")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      disabled={true}
                      id="owner"
                        value={owner} 
                       
                        options={FHUsers} 
                        optionLabel="name" 
                        optionValue="code"
                        onChange={(e: { value: any}) => {
                        console.info('e.value:'+JSON.stringify(e.value));
                        setowner(e.value);
                        }}  placeholder={t("campaign.owner")} />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("campaign.budget")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    disabled={true}
                    id="budget"
                    value={budget}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setbudget(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("campaign.status")}</label>
                    <div style={{height:10}}> </div>


                <Dropdown 
                disabled={true}
                value={status} 
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setstatus(e.value);
                }}   />



                    </div>
              </td>
              </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.isactived")}</label>
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
                }}  placeholder={t("campaign.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.islocked")}</label>
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
                }}  placeholder={t("campaign.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.createdAt")}</label>
                <div style={{height:10}}> </div>
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
               </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.updatedAt")}</label>
                <div style={{height:10}}> </div>
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
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.createUid")}</label>
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
                }}  placeholder={t("campaign.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("campaign.updatedUid")}</label>
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
                }}  placeholder={t("campaign.updatedUid")} />
               </div>  
          </td>
          </tr>



          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/campaign");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/campaign");}}
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
