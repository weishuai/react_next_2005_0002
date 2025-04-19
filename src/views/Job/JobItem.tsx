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
import { JobController } from '../../controllers/JobController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
import { JobItemList } from '../JobItem/JobItemList';
const { nanoid } = require('nanoid');
export type JobItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function JobItem({ Id, Mode }: JobItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <JobItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <JobItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <JobItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <JobItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const JobItemAdd =({ Id, Mode }: JobItemProps) => {
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
  const[title, settitle] = useState(null);
  const[wi_type, setwi_type] = useState(null);
  const[clients, setclients] = useState(null);
  const[enabled, setenabled] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlJob=new JobController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
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
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>  
          <tr>
            <td>
            <label htmlFor="name">{t("job.name")}</label>
            </td>
          <td colSpan={3}>      
        
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
             
          </td>
          </tr>  
          <tr>
            <td>
            <label htmlFor="name">{t("job.wi_type")}</label>
            </td>
          <td colSpan={3}>      
      
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                
          </td>
          </tr>  
  
          <tr>
            <td>
            <label htmlFor="name">{t("job.clients")}</label>
            </td>
          <td colSpan={3}>      
          
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
         
          </td>

          </tr>  
          <tr>
        <td>
        <label htmlFor="name">{t("job.mycreateUid")}</label>
        </td>
          <td colSpan={3}>      
                
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
              
          </td>
          </tr>  
          <tr>
        <td>
        <label htmlFor="name">{t("job.num")}</label>
        </td>
          <td colSpan={3}>      
             
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
            
          </td>        

          </tr>

          <tr>
            <td  width="10%">
            <label htmlFor="firstname1">{t("job.mycreatedAt")}</label>
            </td>
          <td  width="40%">
           
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("job.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td   width="10%"> <label htmlFor="firstname1">{t("job.myupdatedAt")}</label></td>
          <td  width="40%">
             
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("job.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("job.description")}</label>
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
            <label htmlFor="firstname1">{t("job.isactived")}</label>
            </td>
          <td  >
             
                <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("job.isactived")} />
              
          </td>
          <td>
          <label htmlFor="firstname1">{t("job.islocked")}</label>
           </td> 
          <td >
               
              
               
                <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("job.islocked")} />
               
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("job.createdAt")}</label>
            </td>
          <td >
      
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("job.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
            
          </td>
          <td >
          <label htmlFor="firstname1">{t("job.updatedAt")}</label>
          </td>
          <td >
         
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("job.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("job.createUid")}</label>
            </td>
          <td >
               
                <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("job.createUid")} />
              
               
          </td>
          <td >
          <label htmlFor="firstname1">{t("job.updatedUid")}</label>
          </td>
          <td >
               
                <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("job.updatedUid")} />
              
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
                <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="工序信息">
                    <JobItemList mid={FHid}
                     FHonChange={(e:any) => {
                      setVal(e);
                    }}> 

                    </JobItemList>
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>
          <tr>
          <td colSpan={2} >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/job");}} style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
         
          <td colSpan={2}> 
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlJob.createJob({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        title:title,
                        wi_type:wi_type,
                        clients:clients,
                        enabled:enabled,                       
                      });
                      replace("/job");
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

export const JobItemEdit =({ Id, Mode }: JobItemProps) => {
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
  const[title, settitle] = useState(null);
  const[wi_type, setwi_type] = useState(null);
  const[clients, setclients] = useState(null);
  const[enabled, setenabled] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlJob=new JobController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  const [val, setVal] = useState("");
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
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlJob.getJobById(Id).then((data)=>{
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
            settitle(data.title);
            setwi_type(data.wi_type);
            setclients(data.clients);
            setenabled(data.enabled);
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
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>  
          <tr>
            <td>
            <label htmlFor="name">{t("job.name")}</label>
            </td>
          <td colSpan={3}>      
        
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
             
          </td>
          </tr>  
          <tr>
            <td>
            <label htmlFor="name">{t("job.wi_type")}</label>
            </td>
          <td colSpan={3}>      
      
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                
          </td>
          </tr>  
  
          <tr>
            <td>
            <label htmlFor="name">{t("job.clients")}</label>
            </td>
          <td colSpan={3}>      
          
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
         
          </td>

          </tr>  
          <tr>
        <td>
        <label htmlFor="name">{t("job.mycreateUid")}</label>
        </td>
          <td colSpan={3}>      
                
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
              
          </td>
          </tr>  
          <tr>
        <td>
        <label htmlFor="name">{t("job.num")}</label>
        </td>
          <td colSpan={3}>      
             
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
            
          </td>        

          </tr>

          <tr>
            <td  width="10%">
            <label htmlFor="firstname1">{t("job.mycreatedAt")}</label>
            </td>
          <td  width="40%">
           
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("job.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td   width="10%"> <label htmlFor="firstname1">{t("job.myupdatedAt")}</label></td>
          <td   width="40%">
             
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("job.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("job.description")}</label>
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
            <label htmlFor="firstname1">{t("job.isactived")}</label>
            </td>
          <td  >
             
                <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("job.isactived")} />
              
          </td>
          <td>
          <label htmlFor="firstname1">{t("job.islocked")}</label>
           </td> 
          <td >
               
              
               
                <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("job.islocked")} />
               
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("job.createdAt")}</label>
            </td>
          <td >
      
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("job.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
            
          </td>
          <td >
          <label htmlFor="firstname1">{t("job.updatedAt")}</label>
          </td>
          <td >
         
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("job.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("job.createUid")}</label>
            </td>
          <td >
               
                <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("job.createUid")} />
              
               
          </td>
          <td >
          <label htmlFor="firstname1">{t("job.updatedUid")}</label>
          </td>
          <td >
               
                <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("job.updatedUid")} />
              
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
                <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="工序信息">
                    <JobItemList mid={FHid}
                     FHonChange={(e:any) => {
                      setVal(e);
                    }}> 

                    </JobItemList>
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>
          <tr>
          <td colSpan={2} >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/job");}} style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
         
          <td colSpan={2}> 
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      const fhnew=new Date();
                      const userID=globalStorage.get("userID");
                      console.log('userID:'+userID);
                      ctlJob.updateJobv2({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:"0",
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid, 
                        title:title,
                        wi_type:wi_type,
                        clients:clients,
                        enabled:enabled,                       
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


export const JobItemView =({ Id, Mode }: JobItemProps) => {
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
  const[title, settitle] = useState(null);
  const[wi_type, setwi_type] = useState(null);
  const[clients, setclients] = useState(null);
  const[enabled, setenabled] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlJob=new JobController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
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
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlJob.getJobById(Id).then((data)=>{
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
            settitle(data.title);
            setwi_type(data.wi_type);
            setclients(data.clients);
            setenabled(data.enabled);
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
            <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
          </td>
          </tr>  
          <tr>
            <td>
            <label htmlFor="name">{t("job.name")}</label>
            </td>
          <td colSpan={3}>      
        
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
             
          </td>
          </tr>  
          <tr>
            <td>
            <label htmlFor="name">{t("job.wi_type")}</label>
            </td>
          <td colSpan={3}>      
      
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                
          </td>
          </tr>  
  
          <tr>
            <td>
            <label htmlFor="name">{t("job.clients")}</label>
            </td>
          <td colSpan={3}>      
          
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
         
          </td>

          </tr>  
          <tr>
        <td>
        <label htmlFor="name">{t("job.mycreateUid")}</label>
        </td>
          <td colSpan={3}>      
                
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
              
          </td>
          </tr>  
          <tr>
        <td>
        <label htmlFor="name">{t("job.num")}</label>
        </td>
          <td colSpan={3}>      
             
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
            
          </td>        

          </tr>

          <tr>
            <td  width="10%">
            <label htmlFor="firstname1">{t("job.mycreatedAt")}</label>
            </td>
          <td  width="40%">
           
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("job.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
               
          </td>
          <td   width="10%"> <label htmlFor="firstname1">{t("job.myupdatedAt")}</label></td>
          <td  width="40%">
             
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("job.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("job.description")}</label>
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
            <label htmlFor="firstname1">{t("job.isactived")}</label>
            </td>
          <td  >
             
                <Dropdown 
                value={isactived} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIsactived(e.value);
                }}  placeholder={t("job.isactived")} />
              
          </td>
          <td>
          <label htmlFor="firstname1">{t("job.islocked")}</label>
           </td> 
          <td >
               
              
               
                <Dropdown 
                value={islocked} 
                disabled={true}
                options={fhitems} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setIslocked(e.value);
                }}  placeholder={t("job.islocked")} />
               
          </td>
          </tr>
          <tr>
            <td>
            <label htmlFor="firstname1">{t("job.createdAt")}</label>
            </td>
          <td >
      
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("job.createdAtPlaceholder")}
                  onChange={(e) => {
                    if (e.value != null) {
                    console.log('e.value' + e.value);
                    setCreateAt(e.value);
                    }
                  }}
                />
            
          </td>
          <td >
          <label htmlFor="firstname1">{t("job.updatedAt")}</label>
          </td>
          <td >
         
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("job.updatedAtPlaceholder")}
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
            <label htmlFor="firstname1">{t("job.createUid")}</label>
            </td>
          <td >
               
                <Dropdown 
                value={createUid} 
                disabled={true}
                options={FHUsers} 
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setCreateUid(e.value);
                }}  placeholder={t("job.createUid")} />
              
               
          </td>
          <td >
          <label htmlFor="firstname1">{t("job.updatedUid")}</label>
          </td>
          <td >
               
                <Dropdown 
                value={updatedUid} 
                disabled={true}
                options={FHUsers}
                optionLabel="name" 
                optionValue="code"
                onChange={(e: { value: any}) => {
                 console.info('e.value:'+JSON.stringify(e.value));
                 setUpdatedUid(e.value);
                }}  placeholder={t("job.updatedUid")} />
              
          </td>
          </tr>

          <tr>
            <td colSpan={4}>
                <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="工序信息">
                    <JobItemList mid={FHid}
                     FHonChange={(e:any) => {
                      setVal(e);
                    }}> 

                    </JobItemList>
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr>
          <tr>
          <td colSpan={2} >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/job");}} style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
         
          <td colSpan={2}> 
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                 <Button
                      label="确认"
                      onClick={(e) => {replace("/job");}}
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
