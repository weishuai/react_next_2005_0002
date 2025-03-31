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
import { NoteController } from '../../controllers/NoteController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
const { nanoid } = require('nanoid');
export type NoteItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function NoteItem({ Id, Mode }: NoteItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <NoteItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <NoteItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <NoteItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <NoteItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const NoteItemAdd =({ Id, Mode }: NoteItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[subject, setsubject] = useState(null);
  const[relatedType, setrelatedType] = useState('');
  const[relatedTo, setrelatedTo] = useState(null);
  const[note, setnote] = useState(null);
  const[attachment, setattachment] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlNote=new NoteController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    const fhTypesItems = [
      { name: 'Event', code: '0' },
      { name: 'Task', code: '1' },
      { name: 'Note', code: '2' },
      { name: 'Email', code: '3' },
      { name: 'Call Log', code: '4' },
      { name: 'SMS', code: '5' },
    ];
    const items = [
      {label: 'Personal'},
      {label: 'Seat'},
      {label: 'Payment'},
      {label: 'Confirmation'}
  ];
    const fhitems = [
      { name: 'Ok', code: '0' },
      { name: 'No', code: '1' },
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
          {/* <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("note.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("note.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr> */}
           <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("note.subject")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="subject"
                    value={subject}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsubject(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>

          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("note.relatedType")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="relatedType"
                    value={relatedType}
                    options={fhTypesItems} 
                    optionLabel="name" 
                    optionValue="code"  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrelatedType(e.value);
                     
                    }}
                    />



                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("note.relatedTo")}</label>
                      <div style={{height:10}}> </div>
                      <InputTextarea 
                      id="relatedTo"
                      value={relatedTo}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setrelatedTo(e.target.value);
                      }}
                      />

                      </div>
                </td>
        </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("note.note")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="note"
                    value={note}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setnote(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("note.attachment")}</label>
                      <div style={{height:10}}> </div>

                 <InputText 
                    id="attachment"
                    value={attachment}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setattachment(e.target.value);
                    }}
                    />

                      </div>
                </td>
                </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.isactived")}</label>
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
                }}  placeholder={t("note.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.islocked")}</label>
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
                }}  placeholder={t("note.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("note.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("note.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("note.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("note.createUid")}</label>
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
                }}  placeholder={t("note.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.updatedUid")}</label>
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
                }}  placeholder={t("note.updatedUid")} />
               </div>  
          </td>
          </tr>

          {/* <tr>
            <td colSpan={4}>
             
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="定单跟踪">
                    <DataTableReorder></DataTableReorder>
                    </TabPanel>
                   
                </TabView>
             
            </td>
          </tr> */}


          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/note");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlNote.createNote({
                        id:FHid,
                        name:name,
                        subject:subject,
                        description:description,
                        relatedType:relatedType,
                        relatedTo:relatedTo,
                        note:note,
                        attachment:attachment,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,                        
                      });
                      push("/note");
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

export const NoteItemEdit =({ Id, Mode }: NoteItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[subject, setsubject] = useState(null);
  const[relatedType, setrelatedType] = useState('');
  const[relatedTo, setrelatedTo] = useState(null);
  const[note, setnote] = useState(null);
  const[attachment, setattachment] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlNote=new NoteController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    const fhTypesItems = [
      { name: 'Event', code: '0' },
      { name: 'Task', code: '1' },
      { name: 'Note', code: '2' },
      { name: 'Email', code: '3' },
      { name: 'Call Log', code: '4' },
      { name: 'SMS', code: '5' },
    ];



   const items = [
        {label: 'Personal'},
        {label: 'Seat'},
        {label: 'Payment'},
        {label: 'Confirmation'}
    ];
    const fhitems = [
      { name: 'Ok', code: '0' },
      { name: 'No', code: '1' },
    ];
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlNote.getNoteById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));

            // relatedType:relatedType,
            // relatedTo:relatedTo,
            // note:note,
            // attachment:attachment,
            //const[subject, setsubject] = useState(null);
            setsubject(data.subject);
            setrelatedType(data.relatedType);
            setrelatedTo(data.relatedTo);
            setnote(data.note);
            setattachment(data.attachment);

            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setdDescription(data.description);
            setFHid(data.id);
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
          {/* <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("note.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="name" 
                value={name}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("note.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr> */}

           <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("note.subject")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="subject"
                    value={subject}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsubject(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("note.relatedType")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="relatedType"
                    value={relatedType}
                    options={fhTypesItems} 
                    optionLabel="name" 
                    optionValue="code"  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrelatedType(e.value);
                     
                    }}
                    />



                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("note.relatedTo")}</label>
                      <div style={{height:10}}> </div>
                      <InputTextarea 
                      id="relatedTo"
                      value={relatedTo}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setrelatedTo(e.target.value);
                      }}
                      />

                      </div>
                </td>
        </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("note.note")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="note"
                    value={note}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setnote(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("note.attachment")}</label>
                      <div style={{height:10}}> </div>
                      <InputText 
                    id="attachment"
                    value={attachment}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setattachment(e.target.value);
                    }}
                    />
                      </div>
                </td>
                </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.isactived")}</label>
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
                }}  placeholder={t("note.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.islocked")}</label>
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
                }}  placeholder={t("note.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("note.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("note.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("note.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("note.createUid")}</label>
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
                }}  placeholder={t("note.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.updatedUid")}</label>
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
                }}  placeholder={t("note.updatedUid")} />
               </div>  
          </td>
          </tr>

          {/* <tr>
            <td colSpan={4}>
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="定单跟踪">
                    <DataTableReorder></DataTableReorder>
                    </TabPanel>
                   
                </TabView>
            </td>
          </tr> */}
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/note");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlNote.updateNotev2({
                        id:FHid,
                        name:name,
                        subject:subject,
                        description:description,
                        relatedType:relatedType,
                        relatedTo:relatedTo,
                        note:note,
                        attachment:attachment,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,                        
                      },Id,userID);
                      push("/note");
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


export const NoteItemView =({ Id, Mode }: NoteItemProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[subject, setsubject] = useState(null);
  const[relatedType, setrelatedType] = useState('');
  const[relatedTo, setrelatedTo] = useState(null);
  const[note, setnote] = useState(null);
  const[attachment, setattachment] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlNote=new NoteController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    const items = [
      {label: 'Personal'},
      {label: 'Seat'},
      {label: 'Payment'},
      {label: 'Confirmation'}
    ];  
    const fhTypesItems = [
      { name: 'Event', code: '0' },
      { name: 'Task', code: '1' },
      { name: 'Note', code: '2' },
      { name: 'Email', code: '3' },
      { name: 'Call Log', code: '4' },
      { name: 'SMS', code: '5' },
    ];
    const fhitems = [
      { name: 'Ok', code: '0' },
      { name: 'No', code: '1' },
    ];
 
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);
      setCreateUid(userID);
      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
         ctlNote.getNoteById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setsubject(data.subject);
            setrelatedType(data.relatedType);
            setrelatedTo(data.relatedTo);
            setnot(data.note);
            setattachment(data.attachment);
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setdDescription(data.description);
            setFHid(data.id);
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
          {/* <tr>
          <td colSpan={4}>      
                <div className="p-field" >
                <label htmlFor="name">{t("note.name")}</label>
                <div style={{height:10}}> </div>
                <InputText 
                id="name" 
                value={name}  
                disabled={true}
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setName(e.target.value);
                }}  
                />
                </div>
          </td>
          </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("note.description")}</label>
                <div style={{height:10}}> </div>
                <InputTextarea 
                id="description"
                value={description}  
                disabled={true}
                onChange={(e)=>{
                 console.info('e.value:'+JSON.stringify(e.target.value));
                 setdDescription(e.target.value);
                }}                 
                
                ></InputTextarea>
                </div>
            </td>
          </tr> */}
           <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("note.subject")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="subject"
                    value={subject}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsubject(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
              <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("note.relatedType")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="relatedType"
                    value={relatedType}
                    options={fhTypesItems} 
                    optionLabel="name" 
                    optionValue="code"  
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrelatedType(e.value);
                     
                    }}
                    />



                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("note.relatedTo")}</label>
                      <div style={{height:10}}> </div>
                      <InputTextarea 
                      id="relatedTo"
                      value={relatedTo}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setrelatedType(e.target.value);
                      }}
                      />

                      </div>
                </td>
        </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("note.note")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="note"
                    value={note}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setnote(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("note.attachment")}</label>
                      <div style={{height:10}}> </div>
                      <InputText 
                    id="attachment"
                    value={attachment}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setattachment(e.target.value);
                    }}
                    />
                      </div>
                </td>
                </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.isactived")}</label>
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
                }}  placeholder={t("note.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.islocked")}</label>
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
                }}  placeholder={t("note.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("note.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("note.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("note.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("note.createUid")}</label>
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
                }}  placeholder={t("note.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("note.updatedUid")}</label>
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
                }}  placeholder={t("note.updatedUid")} />
               </div>  
          </td>
          </tr>

          {/* <tr>
            <td colSpan={4}>
              <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                    <TabPanel header="定单跟踪">
                    <DataTableReorder></DataTableReorder>
                    </TabPanel>
                   
                </TabView>

            </td>
          </tr> */}

          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/note");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/note");}}
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
