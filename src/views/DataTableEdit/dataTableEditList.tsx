
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProductService } from '../../controllers/ProductService';


export const DataTableEdit = () => {

    const [products2, setProducts2] = useState(null);
    const [editingRows, setEditingRows] = useState({});
    const toast = useRef(null);
    ///表格列表头
    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Price' }
    ];

    const statuses = [
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];
    ///数据加载
    const dataTableFuncMap = {
        'products2': setProducts2,
    };

    const productService = new ProductService();
    useEffect(() => {
        fetchProductData('products2');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProductData = (productStateKey) => {
        productService.getProductsSmall().then(data => dataTableFuncMap[`${productStateKey}`](data));
    }



    const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    //行显示模版,值转换
    const getStatusLabel = (status) => {
        switch (status) {
            case 'INSTOCK':
                return 'In Stock';

            case 'LOWSTOCK':
                return 'Low Stock';

            case 'OUTOFSTOCK':
                return 'Out of Stock';

            default:
                return 'NA';
        }
    }


    //编辑行业
    const onRowEditComplete1 = (e) => {
        let _products2 = [...products2];
        let { newData, index } = e;

        _products2[index] = newData;
        console.info("newData:");
        console.info(newData);
        setProducts2(_products2);
    }
    //编辑行内文本框
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }
    //编辑行内下拉框
    const statusEditor = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
                }} />
        );
    }
   //编辑行内数字框
    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />
    }

   //行显示模版
    const statusBodyTemplate = (rowData) => {
        return getStatusLabel(rowData.inventoryStatus);
    }
   //行显示模版
    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
    }

    return (
        <div className="datatable-editing-demo">
            <Toast ref={toast} />
            <div className="card p-fluid">
              
                <DataTable 
                    value={products2} 
                    editMode="row" 
                    dataKey="id" 
                    onRowEditComplete={onRowEditComplete1} 
                    responsiveLayout="scroll">
                    <Column 
                        field="code" 
                        header="Code" 
                        editor={(options) => textEditor(options)} 
                        style={{ width: '20%' }}
                    ></Column>
                    <Column 
                        field="name" 
                        header="Name" 
                        editor={(options) => textEditor(options)} 
                        style={{ width: '20%' }}
                    ></Column>
                    <Column 
                        field="inventoryStatus" 
                        header="Status" 
                        body={statusBodyTemplate} 
                        editor={(options) => statusEditor(options)} 
                        style={{ width: '20%' }}
                    ></Column>
                    <Column 
                        field="price" 
                        header="Price" 
                        body={priceBodyTemplate} 
                        editor={(options) => priceEditor(options)} 
                        style={{ width: '20%' }}
                    ></Column>
                    <Column 
                        rowEditor 
                        headerStyle={{ width: '10%', minWidth: '8rem' }} 
                        bodyStyle={{ textAlign: 'center' }}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
}
        