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

import { QualityInspectionController } from '../../controllers/QualityInspectionController';
import { globalStorage } from '../../utils/Globalstorage';


const { nanoid } = require('nanoid');
export type QualityInspectionItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function QualityInspectionItem({ Id, Mode }: QualityInspectionItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <QualityInspectionItemAdd  Id={Id} Mode={Mode}/>;
    }
    else if(Mode == '1')
    {
      return <QualityInspectionItemEdit Id={Id} Mode={Mode} />;
    }
    else if(Mode == '2')
    {
      return <QualityInspectionItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <QualityInspectionItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const QualityInspectionItemAdd =({ Id, Mode }: QualityInspectionItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[title, settitle] = useState(null);
  const[team, setteam] = useState(null);
  const[productTmlp, setproductTmlp] = useState(null);
  const[head, sethead] = useState(null);
  const[product, setproduct] = useState(null);
  const[label, setlabel] = useState(null);
  const[batch, setbatch] = useState(null);
  const[rootCause, setrootCause] = useState('');
  const[pick, setpick] = useState(null);
  const[priority, setpriority] = useState(null);
  const[fhtxt, setfhtxt] = useState('');
  const[inspectionItems, setinspectionItems] = useState(null);
  const[checkAddress, setcheckAddress] = useState(null);
  const[correctiveAction, setcorrectiveAction] = useState('');
  const[preventiveActions, setpreventiveActions] = useState('');
  const[sundry, setsundry] = useState('');

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlQualityInspection=new QualityInspectionController();
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
                    <label htmlFor="firstname1">{t("qualityInspection.fhname")}</label>
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
                     <label htmlFor="firstname1">{t("qualityInspection.title")}</label>
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
                    <label htmlFor="firstname1">{t("qualityInspection.team")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="team"
                    value={team}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setteam(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.productTmlp")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="productTmlp"
                          value={productTmlp}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setproductTmlp(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("qualityInspection.head")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="head"
                          value={head}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           sethead(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.product")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="product"
                          value={product}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setproduct(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.label")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="label"
                    value={label}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlabel(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.batch")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="batch"
                          value={batch}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setbatch(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.rootCause")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="rootCause"
                    value={rootCause}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrootCause(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.pick")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="pick"
                          value={pick}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setpick(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("qualityInspection.priority")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="priority"
                          value={priority}
                          options={FHnans}
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

                    </td>
                    </tr> 
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.fhtxt")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="fhtxt"
                    value={fhtxt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhtxt(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.inspectionItems")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="inspectionItems"
                    value={inspectionItems}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinspectionItems(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("qualityInspection.checkAddress")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="checkAddress"
                    value={checkAddress}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcheckAddress(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.correctiveAction")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="correctiveAction"
                    value={correctiveAction}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcorrectiveAction(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.preventiveActions")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="preventiveActions"
                    value={preventiveActions}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpreventiveActions(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.sundry")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="sundry"
                    value={sundry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsundry(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.isactived")}</label>
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
                }}  placeholder={t("qualityInspection.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.islocked")}</label>
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
                }}  placeholder={t("qualityInspection.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}

                  placeholder={t("qualityInspection.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("qualityInspection.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}

                  placeholder={t("qualityInspection.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("qualityInspection.createUid")}</label>
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
                }}  placeholder={t("qualityInspection.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.updatedUid")}</label>
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
                }}  placeholder={t("qualityInspection.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/qualityinspection");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => {
                      ctlQualityInspection.createQualityInspection({
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
                      push("/qualityinspection");
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

export const QualityInspectionItemEdit =({ Id, Mode }: QualityInspectionItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[title, settitle] = useState(null);
  const[team, setteam] = useState(null);
  const[productTmlp, setproductTmlp] = useState(null);
  const[head, sethead] = useState(null);
  const[product, setproduct] = useState(null);
  const[label, setlabel] = useState(null);
  const[batch, setbatch] = useState(null);
  const[rootCause, setrootCause] = useState('');
  const[pick, setpick] = useState(null);
  const[priority, setpriority] = useState(null);
  const[fhtxt, setfhtxt] = useState('');
  const[inspectionItems, setinspectionItems] = useState(null);
  const[checkAddress, setcheckAddress] = useState(null);
  const[correctiveAction, setcorrectiveAction] = useState('');
  const[preventiveActions, setpreventiveActions] = useState('');
  const[sundry, setsundry] = useState('');

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlQualityInspection=new QualityInspectionController();
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
          ctlQualityInspection.getQualityInspectionById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("qualityInspection.fhname")}</label>
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
                     <label htmlFor="firstname1">{t("qualityInspection.title")}</label>
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
                    <label htmlFor="firstname1">{t("qualityInspection.team")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="team"
                    value={team}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setteam(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.productTmlp")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="productTmlp"
                          value={productTmlp}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setproductTmlp(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("qualityInspection.head")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="head"
                          value={head}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           sethead(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.product")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="product"
                          value={product}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setproduct(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.label")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="label"
                    value={label}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlabel(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.batch")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="batch"
                          value={batch}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setbatch(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.rootCause")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="rootCause"
                    value={rootCause}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrootCause(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.pick")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="pick"
                          value={pick}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setpick(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("qualityInspection.priority")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="priority"
                          value={priority}
                          options={FHnans}
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

                    </td>
                    </tr> 
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.fhtxt")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="fhtxt"
                    value={fhtxt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhtxt(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.inspectionItems")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="inspectionItems"
                    value={inspectionItems}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinspectionItems(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("qualityInspection.checkAddress")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="checkAddress"
                    value={checkAddress}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcheckAddress(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.correctiveAction")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="correctiveAction"
                    value={correctiveAction}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcorrectiveAction(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.preventiveActions")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="preventiveActions"
                    value={preventiveActions}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpreventiveActions(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.sundry")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="sundry"
                    value={sundry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsundry(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.isactived")}</label>
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
                }}  placeholder={t("qualityInspection.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.islocked")}</label>
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
                }}  placeholder={t("qualityInspection.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("qualityInspection.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("qualityInspection.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("qualityInspection.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("qualityInspection.createUid")}</label>
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
                }}  placeholder={t("qualityInspection.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.updatedUid")}</label>
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
                }}  placeholder={t("qualityInspection.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/qualityinspection");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlQualityInspection.updateQualityInspectionv2({
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
                      push("/qualityinspection");
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


export const QualityInspectionItemView =({ Id, Mode }: QualityInspectionItemProps) => {
  const [islocked, setIslocked] = useState("0");
  const [isactived, setIsactived] = useState("0");
  const [createUid, setCreateUid] = useState(null);
  const [updatedUid, setUpdatedUid] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [name, setName] = useState("");
  const [description, setdDescription] = useState("");
  const[fhname, setfhname] = useState(null);
  const[title, settitle] = useState(null);
  const[team, setteam] = useState(null);
  const[productTmlp, setproductTmlp] = useState(null);
  const[head, sethead] = useState(null);
  const[product, setproduct] = useState(null);
  const[label, setlabel] = useState(null);
  const[batch, setbatch] = useState(null);
  const[rootCause, setrootCause] = useState('');
  const[pick, setpick] = useState(null);
  const[priority, setpriority] = useState(null);
  const[fhtxt, setfhtxt] = useState('');
  const[inspectionItems, setinspectionItems] = useState(null);
  const[checkAddress, setcheckAddress] = useState(null);
  const[correctiveAction, setcorrectiveAction] = useState('');
  const[preventiveActions, setpreventiveActions] = useState('');
  const[sundry, setsundry] = useState('');

  const [FHUsers, setFHUsers] = useState(null);

  const { pathname, push,replace } = useRouter();
  const ctl=new UserController();

  const ctlQualityInspection=new QualityInspectionController();
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
          ctlQualityInspection.getQualityInspectionById(Id).then((data)=>{
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
                    <label htmlFor="firstname1">{t("qualityInspection.fhname")}</label>
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
                     <label htmlFor="firstname1">{t("qualityInspection.title")}</label>
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
                    <label htmlFor="firstname1">{t("qualityInspection.team")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="team"
                    value={team}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setteam(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.productTmlp")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="productTmlp"
                          value={productTmlp}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setproductTmlp(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
                    <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("qualityInspection.head")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="head"
                          value={head}
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                            
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           sethead(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.product")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="product"
                          value={product}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setproduct(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.label")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="label"
                    value={label}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setlabel(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.batch")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="batch"
                          value={batch}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setbatch(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.rootCause")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="rootCause"
                    value={rootCause}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setrootCause(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                           <label htmlFor="firstname1">{t("qualityInspection.pick")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="pick"
                          value={pick}  
                          options={FHnans}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           setpick(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("qualityInspection.priority")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="priority"
                          value={priority}
                          options={FHnans}
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

                    </td>
                    </tr> 
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.fhtxt")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="fhtxt"
                    value={fhtxt}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhtxt(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("qualityInspection.inspectionItems")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="inspectionItems"
                    value={inspectionItems}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setinspectionItems(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                     <label htmlFor="firstname1">{t("qualityInspection.checkAddress")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="checkAddress"
                    value={checkAddress}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcheckAddress(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.correctiveAction")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="correctiveAction"
                    value={correctiveAction}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setcorrectiveAction(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.preventiveActions")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="preventiveActions"
                    value={preventiveActions}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setpreventiveActions(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>
          <tr>
                <td colSpan={4}>
                    <div className="p-field p-col-12 p-md-12">
                    <label htmlFor="firstname1">{t("qualityInspection.sundry")}</label>
                    <div style={{height:10}}> </div>
                    <InputTextarea 
                    id="sundry"
                    value={sundry}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setsundry(e.target.value);
                    }}
                    />
                    </div>
                </td>
              </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.isactived")}</label>
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
                }}  placeholder={t("qualityInspection.isactived")} />
                </div>
          </td>
          <td width="2%"></td>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.islocked")}</label>
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
                }}  placeholder={t("qualityInspection.islocked")} />
                </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("qualityInspection.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("qualityInspection.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  showTime
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("qualityInspection.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("qualityInspection.createUid")}</label>
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
                }}  placeholder={t("qualityInspection.createUid")} />

                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("qualityInspection.updatedUid")}</label>
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
                }}  placeholder={t("qualityInspection.updatedUid")} />
               </div>
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/qualityinspection");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/qualityinspection");}}
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

