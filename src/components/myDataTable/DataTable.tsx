import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
export type fhTypeProps = {
    children: never[];
    FHColumns: any;
    fhvalue: any;
    fhHeight:any;
    FHfilters:any;
  };
///export const MyDataTable = ({FHColumns,fhvalue,fhHeight,FHfilters}:fhTypeProps) => {
export const MyDataTable = (props: any) => {
    const { t, i18n } = useTranslation();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [totalRecords, setTotalRecords] = useState(0);
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [fhvalue, setfhvalue] = useState("");
    const [fhevent, setfhevent] = React.useState({'first':0,'rows':10,'page':0,'search':'','sort':''});    
    const [currentPage, setCurrentPage] = useState(0);
    const dt = React.useRef(null);
    useEffect(() => { }, []); 

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;


    const onCustomPage = (event:any) => {
        console.info('event:'+JSON.stringify(event));
        console.info('event.rows1:'+event.rows);
        console.info('event.page1:'+Number(event.page));
        event.page=Number(event.page);
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page);
        event['search']=fhvalue;
        event['sort']='';
        setfhevent(event.page);
        /*
        setfhevent(event.page);
        event["search"]={"search":fhvalue};
        console.info('FHfhevent10000:'+JSON.stringify(event));
        */
        props.onCustomPage(event);
    }
    /*
    //1.数据过滤代码:
    const [filters, setFilters] = useState(props.FHfilters);

    ///规范代码 开始
    const filtersMap = {
        'filters': { value: filters, callback: setFilters },
    };
    */
    const onGlobalFilterChange = (event:any, filtersKey:any) => {
        /*
        const value = event.target.value;
        let filters = { ...filtersMap[filtersKey].value };
        filters['global'].value = value;
        filtersMap[filtersKey].callback(filters);
        */
        setfhvalue(event.target.value);
        props.SearchonChange(event.target.value);
    }
    // const clearAllFilters = () => {
    //     if (dt.current) {
    //         //setfhvalue("");
    //         dt.current.reset();
            
    //         // 重置过滤器后通知父组件
    //         props.myonChange({
    //             filters: {
    //                 // product_orgin_code: null,
    //                 // product_name: null,
    //                 // state: null,
    //                 // date: null
    //             }
    //         });
    //     }
    // };

    const clearAllFilters = () => {
        if (dt.current) {
            dt.current.reset();
            
            // 重置过滤器后通知父组件，显式包含 date 字段设为 null


            try {
                // 可能出错的代码
                props.myonChange({
                    filters: {
                        // product_orgin_code: null,
                        // product_name: null,
                        // state: null,
                        // date: null  // 明确设置 date 为 null
                    }
                });     
              } catch (error) {
                // 处理错误
                console.error('操作失败:', error);
        
              } finally {
                // 无论成功失败都执行
               
              }



        }
    };

    const renderHeader = (filtersKey: string) => {
    ///const filters = filtersMap[`${filtersKey}`].value;

        return (
            <span className="p-input-icon-left">
                {/* <i className="pi pi-search" /> */}
              
                <table>
            <tbody>
                <tr>
                <td>     
                <div className="p-inputgroup">         
                <Button label="搜索" />           
                <InputText type="search" value={fhvalue} onChange={(e) => onGlobalFilterChange(e, filtersKey)} placeholder={t("dataTable.placeholder")} />
                </div>
                </td>
                <td>
                <Button 
                    icon="pi pi-refresh" 
                    label="重置表头过滤器" 
                    className="p-button-outlined" 
                    onClick={clearAllFilters}
                />
                 </td>
                </tr>
                </tbody>
                </table>
            </span>
        );
    }

    const header = renderHeader('filters');
    ///规范代码 结束


    return (
        <>
        <style>
        {`
            .p-column-filter-clear-button {
                display: none !important;
            }
        `}
    </style>
                <DataTable 
                ref={dt}
                lazy
                //stripedRows
                value={props.fhvalue} 
                //scrollable 
                //scrollHeight="flex"
                //scrollHeight="800px" 
                ///responsiveLayout="scroll"
                scrollable 
                scrollHeight={props.fhHeight}
                paginator 
                totalRecords={props.totalRecords}
                first={first1} 
                rows={rows1}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate={t("dataTable.currentPageReportTemplate")}
                rowsPerPageOptions={[10,20,50]}
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}

                onPage={onCustomPage}
                
                header={header} 
                ///filters={filters} 
                //globalFilterFields={props.globalFilterFields}
                // filters={props.filters} 

             
                onFilter={(e) => {
                    //console.info('onFilter_e.value:'+JSON.stringify(e));  
                    //console.info('onFilter_e.value:'+JSON.stringify(e.filters)); 
                    // console.info('onFilter_e.value:'+JSON.stringify(e.filters.state?.value));
                    try {
                        // 可能出错的代码
                        props.myonChange(e);
                      } catch (error) {
                        // 处理错误
                        console.error('操作失败:', error);
                
                      } finally {
                        // 无论成功失败都执行
                       
                      }
        

                    
                }}
                filterDisplay="row" 
                selection={selectedCustomers} 
                onSelectionChange={e => {
                    console.info('e.value:'+JSON.stringify(e.value));
                    setSelectedCustomers(e.value);
                    props.FHonChange(e.value);
                }} 
                
                dataKey="id"  
                emptyMessage={t("dataTable.emptyMessage")}
                >
                 {props.FHColumns}
                </DataTable>
         </>
    );
}
                 