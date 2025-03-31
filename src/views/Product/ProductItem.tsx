import _ from 'lodash';
import React, { useRef,useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation';

import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

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
import { ProductController } from '../../controllers/ProductController';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTableReorder } from '../../views/DataTableReorder/DataTableReorderList';
const { nanoid } = require('nanoid');
export type ProductItemProps = {
  Id: string;
  ///0 新增 1 编辑 2 查看
  Mode: string;
};
export function ProductItem({ Id, Mode }: ProductItemProps) {
    console.log('Mode:'+ Mode);
    if (Mode == '0') {
      return <ProductItemAdd  Id={Id} Mode={Mode}/>;
    } 
    else if(Mode == '1')
    {
      return <ProductItemEdit Id={Id} Mode={Mode} />;
    } 
    else if(Mode == '2')
    {
      return <ProductItemView Id={Id} Mode={Mode} />;
    }
    else
    {
      return <ProductItemAdd  Id={Id} Mode={Mode}/>;
    }

}

export const ProductItemAdd =({ Id, Mode }: ProductItemProps) => {
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
  const[product_name, setproduct_name] = useState("");
  const[photo, setphoto] = useState("");
  const[manufacturer, setmanufacturer] = useState(null);
  const[category, setcategory] = useState(null);
  const[unit, setunit] = useState(null);
  const[currency, setcurrency] = useState(null);
  const[list_price, setlist_price] = useState(null);
  const[cost, setcost] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 
  const ctl=new UserController();
  const ctlProduct=new ProductController();
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
      setphoto("http://127.0.0.1:85/xHbqW9XRdb.jpg");
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
                    <label htmlFor="firstname1">{t("product.product_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="product_name"
                    value={product_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproduct_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.photo")}</label>
                      <div style={{height:10}}> </div>
                      <Image 
                      src={photo}
                      width="80px"
                      preview
                      />
                      </div>
                </td>
                </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("product.description")}</label>
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
          </tr>

         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.manufacturer")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="manufacturer"
                    value={manufacturer}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setmanufacturer(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.category")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="category"
                      value={category}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcategory(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.unit")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="unit"
                    value={unit}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setunit(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.currency")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="currency"
                      value={currency}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcurrency(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.list_price")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="list_price"
                    value={list_price}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setlist_price(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.cost")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="cost"
                      value={cost}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcost(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.isactived")}</label>
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
                }}  placeholder={t("product.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.islocked")}</label>
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
                }}  placeholder={t("product.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("product.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("product.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("product.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("product.createUid")}</label>
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
                }}  placeholder={t("product.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.updatedUid")}</label>
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
                }}  placeholder={t("product.updatedUid")} />
               </div>  
          </td>
          </tr>




          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/product");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="提交"
                    onClick={(e) => { 
                      ctlProduct.createProduct({
                        id:FHid,
                        name:name,
                        description:description,
                        product_name:product_name,
                        photo:photo,
                        manufacturer:manufacturer,
                        category:category,
                        unit:unit,
                        currency:currency,
                        list_price:list_price,
                        cost:cost,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:updatedAt,
                        createUid:createUid,
                        updatedUid:updatedUid,                        
                      });
                      replace("/product");
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

export const ProductItemEdit =({ Id, Mode }: ProductItemProps) => {
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
  const[product_name, setproduct_name] = useState("");
  const[photo, setphoto] = useState("");
  const[manufacturer, setmanufacturer] = useState(null);
  const[category, setcategory] = useState(null);
  const[unit, setunit] = useState(null);
  const[currency, setcurrency] = useState(null);
  const[list_price, setlist_price] = useState(null);
  const[cost, setcost] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 

  const ctl=new UserController();
  const ctlProduct=new ProductController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [url, seturl] = useState("");

    async function getFHusers()
    {
        const ctl=new UserController();
        const fhojts = await ctl.getFHUserAll();
        return JSON.parse(fhojts["fhok"]).map((d:any) => ({ code: d.id, name: d.userName }))
    }
 
    const onBasicUpload = (xhr:any) => {
      console.info("xhr:"+JSON.stringify(xhr));
      //toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
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
    ///let url="";
    useEffect(() => {

      const userID=globalStorage.get("userID");
      console.log('userID:'+userID);

      setUpdatedUid(userID);

      
      getFHusers().then((data)=>{
        console.log('data:'+JSON.stringify(data));
        setFHUsers(data);
          ctlProduct.getProductById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setFHid(data.id);
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setdDescription(data.description);
            setproduct_name(data.productName);
            //setphoto(data.photo),
            setphoto("http://127.0.0.1:85/xHbqW9XRdb.jpg");
            setmanufacturer(data.manufacturer),
            setcategory(data.category),
            setunit(data.unit),
            setcurrency(data.currency),
            setlist_price(data.listPrice),
            setcost(data.cost),
            setFHid(data.id);
            seturl("http://127.0.0.1:3009/upload/doAdd/"+data.id);  
          }
          );
         
      });
    }, []);
    const chooseOptions = {label: '选择文件', icon: 'pi pi-fw pi-plus'};
  return (
  <Card>     
     <Toast ref={toast}></Toast>
      <div className="p-fluid p-formgrid p-grid">
     <table width="98%">
      <thead>
      </thead>
      <tbody>

  
          <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.product_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="product_name"
                    value={product_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproduct_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.photo")}</label>
                      <div style={{height:10}}> </div>
                      <Image 
                      src={photo}
                      width="110px"
                      preview
                      />
                         <FileUpload mode="basic"  chooseOptions={chooseOptions} name="pic" url={url} accept="image/*" maxFileSize={1000000} onUpload={(xhr) => {
                          console.info("xhr"+JSON.stringify(xhr));
                          //toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
                         }}
                         uploadHandler={ (event) => {
                          console.info("event"+JSON.stringify(event));
                        }}
                         
                         />
                      </div>
                </td>
                </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("product.description")}</label>
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
          </tr>


         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.manufacturer")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="manufacturer"
                    value={manufacturer}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setmanufacturer(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.category")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="category"
                      value={category}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcategory(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.unit")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="unit"
                    value={unit}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setunit(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.currency")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="currency"
                      value={currency}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcurrency(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.list_price")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="list_price"
                    value={list_price}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setlist_price(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.cost")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="cost"
                      value={cost}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcost(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>


          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.isactived")}</label>
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
                }}  placeholder={t("product.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.islocked")}</label>
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
                }}  placeholder={t("product.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("product.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("product.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("product.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("product.createUid")}</label>
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
                }}  placeholder={t("product.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.updatedUid")}</label>
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
                }}  placeholder={t("product.updatedUid")} />
               </div>  
          </td>
          </tr>

  
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/product");}} style={{backgroundColor:'#4682B4'}}  />
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
                      ctlProduct.updateProductv2({
                        id:FHid,
                        name:name,
                        description:description,
                        productName:product_name,
                        photo:photo,
                        manufacturer:manufacturer,
                        category:category,
                        unit:unit,
                        currency:currency,
                        listPrice:list_price,
                        cost:cost,
                        isactived:isactived,
                        islocked:islocked,
                        createdAt:createAt,
                        updatedAt:fhnew,
                        createUid:createUid,
                        updatedUid:updatedUid,                        
                      },Id,userID);
                      replace("/product");
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


export const ProductItemView =({ Id, Mode }: ProductItemProps) => {
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
  const[product_name, setproduct_name] = useState("");
  const[photo, setphoto] = useState("");
  const[manufacturer, setmanufacturer] = useState(null);
  const[category, setcategory] = useState(null);
  const[unit, setunit] = useState(null);
  const[currency, setcurrency] = useState(null);
  const[list_price, setlist_price] = useState(null);
  const[cost, setcost] = useState(null);

  const [FHUsers, setFHUsers] = useState([]);
  const { pathname, push,replace } = useRouter(); 

  const ctl=new UserController();
  const ctlProduct=new ProductController();
  const { t, i18n } = useTranslation();
  const [FHid, setFHid] = useState('');
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [url, seturl] = useState("");
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
         ctlProduct.getProductById(Id).then((data)=>{
            console.log('data:ok1'+JSON.stringify(data));
            setIslocked(data.islocked);
            setIsactived(data.isactived);
            setCreateUid(data.createUid);
            setUpdatedUid(data.updatedUid);
            setCreateAt(new Date(data.createdAt));
            setUpdatedAt(new Date(data.updatedAt));
            setName(data.name);
            setdDescription(data.description);
            setproduct_name(data.productName);
            //setphoto(data.photo),
            setphoto("http://127.0.0.1:85/xHbqW9XRdb.jpg");
            setmanufacturer(data.manufacturer);
            setcategory(data.category);
            setunit(data.unit);
            setcurrency(data.currency);
            setlist_price(data.listPrice);
            setcost(data.cost);
            setFHid(data.id);            
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
                    <label htmlFor="firstname1">{t("product.product_name")}</label>
                    <div style={{height:10}}> </div>
                    <InputText 
                    id="product_name"
                    value={product_name}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.target.value));
                     setproduct_name(e.target.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.photo")}</label>
                      <div style={{height:10}}> </div>
                      <Image 
                       src={photo}
                       width="110px"
                       preview
                      />
                      </div>
                </td>
                </tr>
          <tr>
            <td colSpan={4}>
                <div className="p-field p-col-12 p-md-12">
                <label htmlFor="firstname1">{t("product.description")}</label>
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
          </tr>

         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.manufacturer")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="manufacturer"
                    value={manufacturer}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setmanufacturer(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.category")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="category"
                      value={category}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcategory(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.unit")}</label>
                    <div style={{height:10}}> </div>
                    <Dropdown 
                    id="unit"
                    value={unit}
                    onChange={(e)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setunit(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.currency")}</label>
                      <div style={{height:10}}> </div>
                      <Dropdown 
                      id="currency"
                      value={currency}
                      onChange={(e)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcurrency(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>
         <tr>
              <td  width="46%">
                    <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="firstname1">{t("product.list_price")}</label>
                    <div style={{height:10}}> </div>
                    <InputNumber 
                    id="list_price"
                    value={list_price}
                    onChange={(e:any)=>{
                     console.info('e.value:'+JSON.stringify(e.value));
                     setlist_price(e.value);
                    }}
                    />
                    </div>
              </td>
              <td width="2%"></td>
          <td  width="46%">
                      <div className="p-field p-col-12 p-md-6">
                       <label htmlFor="firstname1">{t("product.cost")}</label>
                      <div style={{height:10}}> </div>
                      <InputNumber 
                      id="cost"
                      value={cost}
                      onChange={(e:any)=>{
                       console.info('e.value:'+JSON.stringify(e.value));
                       setcost(e.value);
                      }}
                      />
                      </div>
                </td>
                </tr>

          <tr>
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.isactived")}</label>
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
                }}  placeholder={t("product.isactived")} />
                </div>
          </td>
          <td width="2%"></td> 
          <td  width="46%">
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.islocked")}</label>
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
                }}  placeholder={t("product.islocked")} />
                </div> 
          </td>
          </tr>
          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.createdAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="createdAt"
                  value={createAt}
                  disabled={true}
                  placeholder={t("product.createdAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("product.updatedAt")}</label>
                <div style={{height:10}}> </div>
                <Calendar
                  dateFormat="dd/mm/yy"
                  id="updatedAt"
                  value={updatedAt}
                  disabled={true}
                  placeholder={t("product.updatedAtPlaceholder")}
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
                <label htmlFor="firstname1">{t("product.createUid")}</label>
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
                }}  placeholder={t("product.createUid")} />
              
                </div>
          </td>
          <td ></td>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname1">{t("product.updatedUid")}</label>
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
                }}  placeholder={t("product.updatedUid")} />
               </div>  
          </td>
          </tr>



          <tr>
          <td >
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                <Button label="取消" onClick={(e) => {replace("/product");}}  style={{backgroundColor:'#4682B4'}}  />
                </div>
          </td>
          <td ></td>
          <td>
                <div className="p-field p-col-12 p-md-6">
                <div style={{height:10}}> </div>
                  <Button
                    label="确认"
                    onClick={(e) => {replace("/product");}}
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
