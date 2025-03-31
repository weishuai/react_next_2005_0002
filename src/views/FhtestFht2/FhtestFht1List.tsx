import React,{useState} from 'react';
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { FhtestFht1Controller2 } from '../../controllers/FhtestFht1Controller2';
import { TimesController } from '../../utils/TimesController';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar'; // 引入Calendar组件
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { MyDataTable } from '../../components/myDataTable/DataTable';
export const FhtestFht1List = () => {
    const { t, i18n } = useTranslation();
    const [customers, setCustomers] = React.useState(null);



    
    const [dialogVisible, setDialogVisible] = useState(false);
    const [FHids, setFHids] = useState(null);
    const ctlFhtestFht1 = new FhtestFht1Controller2();
    const ctlTiems=new TimesController();
    const { push,replace } = useRouter();
    const [FHcount, setcount] = useState(0);
    let [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});
    let [fhfilters, setfhfilters] = React.useState({"product_orgin_code":null,"product_name":null,"state":null,"date":null});

    const [representatives] = useState([
        { name: '可定制化桌子', code: '可定制化桌子' },
        { name: 'DESK0005', code: 'DESK0005' },
        { name: 'DESK0006', code: 'DESK0006' }

    ]);

    var fhcount=0;
    const fn=async (fhevent:any,fhfilters:any)=>{
        await     ctlFhtestFht1.getFhtestFht1All(fhevent,fhfilters).then(data =>{

  
                // console.log('mylist:'+data["fhok"]);
                var list=eval('(' + data["fhok"] + ')');
 
                if(data["fhok"]!="")
                {
                // console.log('mylist2:'+list["mylist"]["count"]);
                var mydata=eval('(' + list["mylist"]["mydata"] + ')');
                // console.log('mylist3_ mydata:'+ mydata);
                setCustomers(mydata);
                setcount(list["mylist"]["count"]); 
               }
               else
               {
                setCustomers([]);
                setcount(0);               
               }


        }); 
        }

        React.useEffect(() => {
            // if(fhcount==0)
            // {
                //fhcount=fhcount+1;
                fn(fhevent,fhfilters);
            // }
            
        }, [fhevent,fhfilters]);
         React.useEffect(() => {
        // if(fhcount==0)
        // {
            //fhcount=fhcount+1;
            fn(fhevent,fhfilters);
        // }
        
        }, []);

    //1.数据过滤代码:

    const filters={
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };

    // const [FHfilters, setFHfilters] = useState(filters);
    // const [statuses] = useState(['confirmed', 'pending']);
    const statuses = [

        { name: '全部选项', code: 'all' },
        { name: '项目一', code: '0' },
        { name: '项目二', code: '1' },
        { name: '待确认', code: 'false' }
      ];

    //2.弹出窗体
    const openDialog = () => {
        setDialogVisible(true);
    }

    const closeDialog = () => {
        setDialogVisible(false);
    }


   const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown 
            value={options.value} 
            options={statuses} 
            optionLabel="name"
            optionValue="code"  
            onChange={(e) => {
                options.filterApplyCallback(e.value);
                console.log('Selected value:', e.value); // 安全地记录值
            }
            // } itemTemplate={statusItemTemplate} placeholder="选择状态" className="p-column-filter" showClear={true} style={{ minWidth: '4rem' }} />
        }  placeholder="选择状态" className="p-column-filter" showClear={true} style={{ minWidth: '4rem' }} />
        );
    };


    const dialogFooterTemplate = () => {
        return (
            <div>
                <Button label={t('dataTable.Cancel')} icon="pi pi-times" onClick={closeDialog}  style={{backgroundColor:'#4682B4'}}/>
                &nbsp;&nbsp;&nbsp;
                <Button label={t('dataTable.Submit')} icon="pi pi-check" onClick={closeDialog}  autoFocus  style={{backgroundColor:'#4682B4'}}/>
            </div>
        );
    }
// 日期范围筛选模板
const dateRangeFilterTemplate = (options) => {
    // console.info('dateRangeFilterTemplate:'+JSON.stringify(options));
    // const [dates, setDates] = React.useState(options.value || [null, null]);
    
    // const onDateChange = (e) => {
    //     const newDates = [...dates];
    //     if (e.target.id === 'start-date') {
    //         newDates[0] = e.value;
    //     } else {
    //         newDates[1] = e.value;
    //     }
    //     setDates(newDates);
        
    //     // 只有当两个日期都有值时才应用筛选
    //     if (newDates[0] && newDates[1]) {
    //         options.filterApplyCallback(newDates);
    //     }
    // };
    const [dates, setDates] = React.useState(options.value || [null, null]);
    
    // 添加 useEffect 来监听 options.value 的变化
    React.useEffect(() => {
        if (!options.value) {
            setDates([null, null]);
        }
    }, [options.value]);

    const onDateChange = (e) => {
        const newDates = [...dates];
        if (e.target.id === 'start-date') {
            newDates[0] = e.value;
        } else {
            newDates[1] = e.value;
        }
        setDates(newDates);
        
        // 修改筛选逻辑，允许空值
        options.filterApplyCallback(newDates);
    };
    return (
        <div className="p-d-flex p-flex-column">
            <table>
            <tbody>
                <tr>
                <td>
                <div className="p-mb-2">
                {/* <label htmlFor="start-date" className="p-d-block p-mb-1">开始日期</label> */}
                <Calendar
                    id="start-date"
                    value={dates[0]}
                    onChange={onDateChange}
                    dateFormat="yy-mm-dd"
                    placeholder="开始日期"
                    showIcon
                    showButtonBar={true}
                    className="p-column-filter"
                />
            </div>
                </td>
                <td>
                    <div>
                    {/* <label htmlFor="end-date" className="p-d-block p-mb-1">结束日期</label> */}
                    <Calendar
                        id="end-date"
                        value={dates[1]}
                        onChange={onDateChange}
                        dateFormat="yy-mm-dd"
                        placeholder="结束日期"
                        showIcon
                        showButtonBar={true}
                        className="p-column-filter"
                        minDate={dates[0]}
                    />
                  </div>

                </td>
                </tr>
                </tbody>
           </table>
        </div>
    );
};


    //下拉框
    const representativeRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={representatives}
                optionLabel="name"
                optionValue="code" 
                // itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="请选择产品"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };

    //3.选择框设置:
    //多选 selectionMode="multiple"
    //单选 selectionMode="single"
    return (
        <div>
       <div >
          <hr></hr>
         <span className="p-buttonset">
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Save')} icon="pi pi-check"  onClick={()=>{replace("/fhtestfht2/0/0");}} style={{backgroundColor:'#4682B4'}}  />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Delete')} icon="pi pi-trash" style={{backgroundColor:'#4682B4'}} onClick={()=>{
                for(let item of FHids)
                {
                    ctlFhtestFht1.removeFhtestFht1([item.id]).then(()=>{
                        fn(fhevent);  
                    });
                }
                //fn();
                }}   />
            <span style={{width:100}}></span>
            <Button label={t('dataTable.Import')} icon="pi pi-sign-in"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Export')} icon="pi pi-sign-out"  style={{backgroundColor:'#4682B4'}} />
            <Button label={t('dataTable.Report')} icon="pi pi-file-pdf" />
        </span>
        <hr></hr>
        </div>

            <div className="card" >
            <MyDataTable
     
                    fhvalue={customers}
                    totalRecords={FHcount}
                    onCustomPage = {(event:any) => {
                        console.info('FHevent:'+event);
                        if(1==1)
                        {
                           
                            setfhevent(event);  
                            fn(event);                         
                        }
                    }
                    }                     
                    FHonChange={(e:any) => {
                        console.log('e_ok:' +JSON.stringify(e));
                        setFHids(e);
                      }}
                    myonChange={(e:any) => {
                        //console.log('myonChangee_ok:' +JSON.stringify(e));
                        // console.log({"product_orgin_code":e.filters.product_orgin_code,"product_name":e.filters.product_name,"state":e.filters.state?.value,"date":e.filters.date?.value});
                        setfhfilters({"product_orgin_code":e.filters.product_orgin_code,"product_name":e.filters.product_name,"state":e.filters.state?.value,"date":e.filters.date?.value});
                        //{state:e.filters.state?.value,date:e.filters.date?.value}
                        // setFHids(e);
                      }}  
                    SearchonChange={(e:any) => {
                        console.log('fhevent["search"]:' +JSON.stringify(e));
                        console.log('fhevent1:' +JSON.stringify(fhevent));
                        fhevent={'first':0,'rows':10,'page':0,'search':'','sort':''};
                        fhevent["search"]=e;
                        setfhevent(fhevent);
                        fn(fhevent);
                      }}  
                    fhHeight={'600px'} 
                    //globalFilterFields={['date']} 
                    // filters={filters} 
                    FHColumns={
                        [
                            <Column selectionMode="multiple" headerStyle={{}} key={0}></Column>,
                            <Column header ="产品编码"  field = "product_orgin_code"  filter filterPlaceholder="产品编码"   style={{ minWidth: '10rem' }} sortable={false}  key =  {100012}  ></Column>,

                            // <Column header ="产品名称" field = "product_name"       filter filterPlaceholder="产品名称"   style={{ minWidth: '13rem' }} sortable={false}  key =  {100013}  ></Column>,

                            <Column header ="产品名称" field = "product_name"      filter filterElement={representativeRowFilterTemplate}   style={{ minWidth: '8rem' }} sortable={false}  key =  {100013}  ></Column>,

                            // <Column header ="产品名称" field = "product_name"     style={{ minWidth: '13rem' }} sortable={false}  key =  {100013}  ></Column>,  

                            <Column header ="拣货状态" field = "state"     filter filterElement={statusRowFilterTemplate}  style={{ width: '12rem' }}  sortable={false}  key =  {10006}   body={(rowData) => {
                                if(rowData.state=="0")
                                    return(
                                        <div style={{textAlign:'center',flex:1}}>
                                             项目一
                                        </div>
                                    );
                                if(rowData.state=="1")
                                    return(
                                        <div style={{textAlign:'center',flex:1}}>
                                            项目二
                                        </div>
                                    );
                                    if(rowData.state=="false")
                                        return(
                                           <div style={{textAlign:'center',flex:1}}>
                                            其他
                                           </div>
                                        );
                            }
                            }></Column>,
                            
                            <Column header ="安排的日期"  field = "date"   style={{ minWidth: '20rem' }}  sortable={false} key =  {10005}  
                            filter
                            filterElement={dateRangeFilterTemplate}
                            showFilterMenu={true}
                            filterMenuStyle={{ width: '14rem' }}
                            dataType="date" // 指定数据类型为日期
                            ></Column>,

                            <Column header ="安排的日期"  field = "date"   style={{ minWidth: '8rem' }}  sortable={false} key =  {10005}  ></Column>,                           
              
                            <Column header ="需求数量" field = "product_uom_qty" style={{ minWidth: '6rem' }} sortable={false}  key =  {10007}  ></Column>,
                            <Column header ="移动数量" field = "quantity"  style={{ minWidth: '6rem' }}  sortable={false}  key =  {10007}  ></Column>,

                            <Column header ="可用数量" field = "availability"  style={{ minWidth: '6rem' }}  sortable={false}  key =  {10008}  ></Column>,
                            <Column header ="在手数量" field = "availability"  style={{ minWidth: '6rem' }}  sortable={false}  key =  {10008}  ></Column>,
                            <Column header ="预测数量" field = "virtual_available" style={{ minWidth: '6rem' }} sortable={false}  key =  {10009}  ></Column>,
                            <Column header ="可用数量" field = "free_qty" style={{ minWidth: '6rem' }} sortable={false}  key =  {10009}  ></Column>,                           
                            <Column header ="入库数量" field = "incoming_qty"  style={{ minWidth: '6rem' }} sortable={false}  key =  {100010}  ></Column>,

                            <Column header ="出库数量" field = "outgoing_qty"  style={{ minWidth: '6rem' }} sortable={false}  key =  {100010}  ></Column>,


                            <Column header ="品牌" field = "brand_code"  style={{ minWidth: '8rem' }}  sortable={false}  key =  {100011}  ></Column>,

                            <Column header ="订单创建日期" field = "order_create_date" style={{ minWidth: '8rem' }} sortable={false}  key =  {100014}  ></Column>,
                            <Column header ="订单日期" field = "order_date"  style={{ minWidth: '8rem' }} sortable={false}  key =  {100015}  ></Column>,
                            <Column header ="订单名称" field = "order_name"  style={{ minWidth: '8rem' }} sortable={false}  key =  {100016}  ></Column>,
                            <Column header ="客户" field = "partner_name" style={{ minWidth: '10rem' }}  sortable={false}  key =  {100017}  ></Column>,
                            <Column   header={t('dataTable.Info')} field="id"  sortable={false}  alignHeader="center" headerStyle={{minWidth: '16rem'}} style={{ width: '16rem'}}   body={(rowData) => {
                                return(
                                    <div style={{textAlign:'center',flex:1}}>
                                     <Button label={t('dataTable.HeadInfo')} style={{height:25}} className="p-button-sm p-button-info"  onClick={()=>{replace("/fhtestfht2/"+rowData.id+"/2");}}></Button>                                        
                                     <Button label={t('dataTable.Edit')}  style={{height:25}}  className="p-button-sm p-button-secondary"  onClick={()=>{replace("/fhtestfht2/"+rowData.id+"/1");}} />
                                     <Button label={t('dataTable.Delete')}  style={{height:25}}  className="p-button-sm p-button-danger" onClick={() => {
                                         ctlFhtestFht1.removeFhtestFht1([rowData.id]).then(()=>{
                                             fn(fhevent);
                                            });
                                         }}  />
                                   </div>
                                );
                            }
                            }  sortField="id" key={7}></Column>,


                        ]
                    }

                    >
            </MyDataTable>
        
            </div>
        </div>
    );
}
