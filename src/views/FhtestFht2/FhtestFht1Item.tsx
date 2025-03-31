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

import { FhtestFht1Controller2 } from '../../controllers/FhtestFht1Controller2';
import { globalStorage } from '../../utils/Globalstorage';

// import * as odoots from 'tsodoo';
// const odoo = new odoots('http://127.0.0.1:8069', 'dbname')

const { nanoid } = require('nanoid');
export type FhtestFht1ItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function FhtestFht1Item({ Id, Mode }: FhtestFht1ItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <FhtestFht1ItemAdd  Id={Id} Mode={Mode}/>;
    }
    else if(Mode == '1')
    {
      return <FhtestFht1ItemEdit Id={Id} Mode={Mode} />;
    }
    else if(Mode == '2')
    {
      return <FhtestFht1ItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <FhtestFht1ItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const FhtestFht1ItemAdd =({ Id, Mode }: FhtestFht1ItemProps) => {
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
  const [FHproducts, setFHproducts] = useState(null);
  const { push,replace } = useRouter();
  const ctl=new UserController();

  const ctlFhtestFht1=new FhtestFht1Controller2();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');



    var items=[];
    var fhcount=0;
      async function getFHusers()
      {
          const ctl=new UserController();
          const fhojts = await ctl.getFHUserAll();
          return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
      }
      async function getFHproducts()
      {
      
          const fhojts = await ctlFhtestFht1.getMyproductAll();
          //console.log('datafhojts:'+JSON.stringify(fhojts));
          console.log('datafhojts:'+JSON.stringify(fhojts));
          //var ojt=eval('(' + fhojts["fhok"] + ')');
          var ojt=fhojts["fhok"];
          console.log('data9899:'+JSON.stringify(ojt));         
         
           for(var i=0;i<ojt.length;i++)
           {
            var myOjt=eval('(' + ojt[i]["name"] + ')');
            items.push({code:parseInt(ojt[i]["id"]),name:myOjt["zh_CN"]});
           }
           items.push({code:"show",name:"更多"});
           return items;
  
      }
      
      const fhitems = [
        { name: '项目一', code: '0' },
        { name: '项目二', code: '1' },
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
  


      getFHproducts().then((data)=>{
        setFHproducts(data);
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
                    <label htmlFor="firstname1">{t("fhtestFht1.fhname")}</label>
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
                     <label htmlFor="firstname1">{t("fhtestFht1.fhF1")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhF1"
                    value={fhF1}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF1(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhtestFht1.fhF2")}</label>
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
                           <label htmlFor="firstname1">{t("fhtestFht1.fhF3")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF3"
                          value={fhF3}  
                          options={fhitems}
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
                        <label htmlFor="firstname1">{t("fhtestFht1.fhF4")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="fhF4"
                        value={fhF4}
                        dateFormat="yy-mm-dd"
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
                           <label htmlFor="firstname1">{t("fhtestFht1.fhF5")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF5"
                          value={fhF5}  
                          options={FHproducts}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           if(e.value=="show")
                           {
                            alert("ok");
                           }
                           setfhF5(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("fhtestFht1.fhF6")}</label>
                          <div style={{height:10}}> </div>
                          <MultiSelect 
                          id="fhF6"
                          options={FHproducts} 
                          optionLabel="name" 
                          optionValue="code"                          
                          value={fhF6}
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           if("show" == e.value[e.value.length-1])
                           {
                            alert("ok");
                           } 
                       
                           setfhF6(e.value);
                          }}
                          />
                        
                          </div>
                    </td>
                    <td width="2%"></td>
                    <td  width="46%">
        
                    </td>
                    </tr> 



          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/fhtestfht2");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => {
                      ctlFhtestFht1.createFhtestFht1({
                        fhname:fhname,
                        fhF1:fhF1,
                        fhF2:fhF2,
                        fhF3:fhF3,
                        fhF4:fhF4,
                        fhF5:fhF5,
                        fhF6:fhF6
                      });
                      push("/fhtestfht2");
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

export const FhtestFht1ItemEdit =({ Id, Mode }: FhtestFht1ItemProps) => {
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
  const [FHproducts, setFHproducts] = useState(null);
  const { push,replace } = useRouter();
  const ctl=new UserController();

  const ctlFhtestFht1=new FhtestFht1Controller2();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  var items=[];
  var fhcount=0;
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    async function getFHproducts()
    {
    
        const fhojts = await ctlFhtestFht1.getMyproductAll();
        //console.log('datafhojts:'+JSON.stringify(fhojts));
        console.log('datafhojts:'+JSON.stringify(fhojts));
        //var ojt=eval('(' + fhojts["fhok"] + ')');
        var ojt=fhojts["fhok"];
        console.log('data9899:'+JSON.stringify(ojt));         
       
         for(var i=0;i<ojt.length;i++)
         {
          var myOjt=eval('(' + ojt[i]["name"] + ')');
          items.push({code:parseInt(ojt[i]["id"]),name:myOjt["zh_CN"]});
         }
         items.push({code:"show",name:"更多"});
         return items;

    }
    
    const fhitems = [
      { name: '项目一', code: '0' },
      { name: '项目二', code: '1' },
    ];

    useEffect(() => {

      if(fhcount==0)
      {
        fhcount=fhcount+1;
        getFHproducts().then((data)=>{

          setFHproducts(data);
          ctlFhtestFht1.getFhtestFht1ById(Id).then((data)=>{
            var ojt=eval('(' + data["fhok"] + ')');
            var fhmodel=ojt[0];
            setfhname(fhmodel["fhname"]);
            setfhF1(fhmodel["fhF1"]);
            setfhF2(fhmodel["fhF2"]);
            setfhF3(fhmodel["fhF3"]);
            setfhF4(new Date(fhmodel["fhF4"]));
  
            var myfhF5=fhmodel["fhF5"];
            setfhF5(myfhF5["id"]);
            setfhF6(fhmodel["fhF6"]);
          });

        });
      }
  

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
                    <label htmlFor="firstname1">{t("fhtestFht1.fhname")}</label>
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
                     <label htmlFor="firstname1">{t("fhtestFht1.fhF1")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhF1"
                    value={fhF1}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF1(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhtestFht1.fhF2")}</label>
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
                           <label htmlFor="firstname1">{t("fhtestFht1.fhF3")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF3"
                          value={fhF3}  
                          options={fhitems}
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
                        <label htmlFor="firstname1">{t("fhtestFht1.fhF4")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="fhF4"
                        value={fhF4}
                        dateFormat="yy-mm-dd"
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
                           <label htmlFor="firstname1">{t("fhtestFht1.fhF5")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF5"
                          value={fhF5}  
                          options={FHproducts}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           if(e.value=="show")
                           {
                            alert("ok");
                           }
                           setfhF5(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("fhtestFht1.fhF6")}</label>
                          <div style={{height:10}}> </div>
                          <MultiSelect 
                          id="fhF6"
                          options={FHproducts} 
                          optionLabel="name" 
                          optionValue="code"                          
                          value={fhF6}
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           if("show" == e.value[e.value.length-1])
                           {
                            alert("ok");
                           } 
                       
                           setfhF6(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
                    <td  width="46%">
        
                    </td>
                    </tr> 



          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/fhtestfht2");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlFhtestFht1.updateFhtestFht1v2({
                        fhname:fhname,
                        fhF1:fhF1,
                        fhF2:fhF2,
                        fhF3:fhF3,
                        fhF4:fhF4,
                        fhF5:fhF5,
                        fhF6:fhF6
                      },Id,userID);
                      push("/fhtestfht2");
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


export const FhtestFht1ItemView=({ Id, Mode }: FhtestFht1ItemProps) => {
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
  const [FHproducts, setFHproducts] = useState(null);
  const { push,replace } = useRouter();
  const ctl=new UserController();

  const ctlFhtestFht1=new FhtestFht1Controller2();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  var items=[];
  var fhcount=0;
    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
    }
    async function getFHproducts()
    {
    
        const fhojts = await ctlFhtestFht1.getMyproductAll();
        //console.log('datafhojts:'+JSON.stringify(fhojts));
        console.log('datafhojts:'+JSON.stringify(fhojts));
        //var ojt=eval('(' + fhojts["fhok"] + ')');
        var ojt=fhojts["fhok"];
        console.log('data9899:'+JSON.stringify(ojt));         
       
         for(var i=0;i<ojt.length;i++)
         {
          var myOjt=eval('(' + ojt[i]["name"] + ')');
          items.push({code:parseInt(ojt[i]["id"]),name:myOjt["zh_CN"]});
         }
         items.push({code:"show",name:"更多"});
         return items;

    }
    
    const fhitems = [
      { name: '项目一', code: '0' },
      { name: '项目二', code: '1' },
    ];

    useEffect(() => {

      if(fhcount==0)
      {
        fhcount=fhcount+1;
        getFHproducts().then((data)=>{

          setFHproducts(data);
          ctlFhtestFht1.getFhtestFht1ById(Id).then((data)=>{
            var ojt=eval('(' + data["fhok"] + ')');
            var fhmodel=ojt[0];
            setfhname(fhmodel["fhname"]);
            setfhF1(fhmodel["fhF1"]);
            setfhF2(fhmodel["fhF2"]);
            setfhF3(fhmodel["fhF3"]);
            setfhF4(new Date(fhmodel["fhF4"]));
  
            var myfhF5=fhmodel["fhF5"];
            setfhF5(myfhF5["id"]);
            setfhF6(fhmodel["fhF6"]);
          });

        });
      }
  

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
                    <label htmlFor="firstname1">{t("fhtestFht1.fhname")}</label>
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
                     <label htmlFor="firstname1">{t("fhtestFht1.fhF1")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="fhF1"
                    value={fhF1}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setfhF1(e.target.value);
                    }}
                    />
                    </div>
              </td>
              </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("fhtestFht1.fhF2")}</label>
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
                           <label htmlFor="firstname1">{t("fhtestFht1.fhF3")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF3"
                          value={fhF3}  
                          options={fhitems}
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
                        <label htmlFor="firstname1">{t("fhtestFht1.fhF4")}</label>
                        <div style={{height:10}}> </div>
                        <Calendar 
                        id="fhF4"
                        value={fhF4}
                        dateFormat="yy-mm-dd"
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
                           <label htmlFor="firstname1">{t("fhtestFht1.fhF5")}</label>
                          <div style={{height:10}}> </div>
                          <Dropdown 
                          id="fhF5"
                          value={fhF5}  
                          options={FHproducts}
                          optionLabel="name"
                          optionValue="code"                                              
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           if(e.value=="show")
                           {
                            alert("ok");
                           }
                           setfhF5(e.value);
                          }}
                          />
                          </div>
                    </td>
                    </tr>
          <tr>
                         <td  width="46%">
                          <div className="p-field p-col-12 p-md-6">
                          <label htmlFor="firstname1">{t("fhtestFht1.fhF6")}</label>
                          <div style={{height:10}}> </div>
                          <MultiSelect 
                          id="fhF6"
                          options={FHproducts} 
                          optionLabel="name" 
                          optionValue="code"                          
                          value={fhF6}
                          onChange={(e)=>{
                           console.info('e.value:'+JSON.stringify(e.value));
                           if("show" == e.value[e.value.length-1])
                           {
                            alert("ok");
                           } 
                       
                           setfhF6(e.value);
                          }}
                          />
                          </div>
                    </td>
                    <td width="2%"></td>
                    <td  width="46%">
        
                    </td>
                    </tr> 



          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/fhtestfht2");}} style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确定"
                    onClick={(e) => {
                      const fhnew=new Date();
                      const userID=globalStorage.get("userID");
                      console.log('userID:'+userID);
                      push("/fhtestfht2");
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
