import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
import { Image } from 'primereact/image';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { UserController } from '../../controllers/UserController';

import { FhinspectionController } from '../../controllers/FhinspectionController';
import { globalStorage } from '../../utils/Globalstorage';


const { nanoid } = require('nanoid');
export type FhinspectionItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function FhinspectionItem({ Id, Mode }: FhinspectionItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <FhinspectionItemAdd  Id={Id} Mode={Mode}/>;
    }
    else if(Mode == '1')
    {
      return <FhinspectionItemEdit Id={Id} Mode={Mode} />;
    }
    else if(Mode == '2')
    {
      return <FhinspectionItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <FhinspectionItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const FhinspectionItemAdd =({ Id, Mode }: FhinspectionItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[fhF1, setfhF1] = useState(null);
  const[fhF2, setfhF2] = useState(null);
  const[fhF3, setfhF3] = useState(null);
  const[fhF4, setfhF4] = useState(null);
  const[fhF5, setfhF5] = useState(null);
  const[fhF6, setfhF6] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlFhinspection=new FhinspectionController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    const FHnans = [
      { name: 'Ok', code: '0' },
      { name: 'No', code: '1' },
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
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhname")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhname"
                    value={fhname}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhname(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF1")}</label>
                          <div style={{height:10}}> </div>
                          <Calendar 
                          id="fhF1"
                          value={fhF1}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF1(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhF2")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhF2"
                    value={fhF2}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF2(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF3")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF3"
                          value={fhF3}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF3(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("fhinspection.fhF4")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF4"
                          value={fhF4}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF4(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF5")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF5"
                          value={fhF5}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF5(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                   <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhF6")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="fhF6"
                    value={fhF6}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF6(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
              <td  width="46%">
                
              </td>
              </tr> 


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.isactived")}</label>
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
                }}  placeholder={t("fhinspection.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.islocked")}</label>
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
                }}  placeholder={t("fhinspection.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}

                  placeholder={t("fhinspection.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("fhinspection.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}

                  placeholder={t("fhinspection.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("fhinspection.createUid")}</label>
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
                }}  placeholder={t("fhinspection.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.updatedUid")}</label>
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
                }}  placeholder={t("fhinspection.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/fhinspection");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => {
                      ctlFhinspection.createFhinspection({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,
                      });
                      push("/fhinspection");
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

export const FhinspectionItemEdit =({ Id, Mode }: FhinspectionItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[fhF1, setfhF1] = useState(null);
  const[fhF2, setfhF2] = useState(null);
  const[fhF3, setfhF3] = useState(null);
  const[fhF4, setfhF4] = useState(null);
  const[fhF5, setfhF5] = useState(null);
  const[fhF6, setfhF6] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlFhinspection=new FhinspectionController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }


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
          ctlFhinspection.getFhinspectionById(Id).then((data)=>{
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
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhname")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhname"
                    value={fhname}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhname(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF1")}</label>
                          <div style={{height:10}}> </div>
                          <Calendar 
                          id="fhF1"
                          value={fhF1}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF1(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhF2")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhF2"
                    value={fhF2}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF2(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF3")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF3"
                          value={fhF3}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF3(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("fhinspection.fhF4")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF4"
                          value={fhF4}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF4(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF5")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF5"
                          value={fhF5}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF5(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                   <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhF6")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="fhF6"
                    value={fhF6}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF6(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
              <td  width="46%">
                
              </td>
              </tr> 


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.isactived")}</label>
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
                }}  placeholder={t("fhinspection.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.islocked")}</label>
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
                }}  placeholder={t("fhinspection.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("fhinspection.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("fhinspection.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("fhinspection.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("fhinspection.createUid")}</label>
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
                }}  placeholder={t("fhinspection.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.updatedUid")}</label>
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
                }}  placeholder={t("fhinspection.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/fhinspection");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlFhinspection.updateFhinspectionv2({
                        id:FHid,
                        name:name,
                        description:description,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,
                      },Id,userID);
                      push("/fhinspection");
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


export const FhinspectionItemView =({ Id, Mode }: FhinspectionItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[fhF1, setfhF1] = useState(null);
  const[fhF2, setfhF2] = useState(null);
  const[fhF3, setfhF3] = useState(null);
  const[fhF4, setfhF4] = useState(null);
  const[fhF5, setfhF5] = useState(null);
  const[fhF6, setfhF6] = useState(null);

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlFhinspection=new FhinspectionController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }


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
          ctlFhinspection.getFhinspectionById(Id).then((data)=>{
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
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhname")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhname"
                    value={fhname}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhname(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF1")}</label>
                          <div style={{height:10}}> </div>
                          <Calendar 
                          id="fhF1"
                          value={fhF1}                    
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF1(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhF2")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhF2"
                    value={fhF2}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF2(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF3")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF3"
                          value={fhF3}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF3(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("fhinspection.fhF4")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF4"
                          value={fhF4}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF4(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("fhinspection.fhF5")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF5"
                          value={fhF5}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setfhF5(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                   <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhinspection.fhF6")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="fhF6"
                    value={fhF6}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF6(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
              <td  width="46%">
                
              </td>
              </tr> 

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.isactived")}</label>
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
                }}  placeholder={t("fhinspection.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.islocked")}</label>
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
                }}  placeholder={t("fhinspection.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("fhinspection.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("fhinspection.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("fhinspection.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("fhinspection.createUid")}</label>
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
                }}  placeholder={t("fhinspection.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("fhinspection.updatedUid")}</label>
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
                }}  placeholder={t("fhinspection.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/fhinspection");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/fhinspection");}}
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

