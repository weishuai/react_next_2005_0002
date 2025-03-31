import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../controllers/ProductService';
import { Toast } from 'primereact/toast';

export const DataTableReorder = () => {
    const [products, setProducts] = useState([]);
    const toast = useRef(null);
    const isMounted = useRef(false);
    const columns = [
        {field: 'code', header: 'Code'},
        {field: 'name', header: 'Name'},
        {field: 'category', header: 'Category'},
        {field: 'quantity', header: 'Quantity'}
    ];

    const productService = new ProductService();

    useEffect(() => {
        if (isMounted.current) {
            ///toast.current.show({severity:'success', summary: 'Rows Reordered', life: 3000});
        }
    }, [products]);

    useEffect(() => {
        isMounted.current = true;
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onColReorder = () => {
        toast.current.show({severity:'success', summary: 'Column Reordered', life: 3000});
    }

    const onRowReorder = (e) => {
        setProducts(e.value);
    }

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} columnKey={col.field} field={col.field} header={col.header} />;
    });

    return (
        <div>
            <Toast ref={toast}></Toast>

            <div className="card">
                <DataTable value={products} reorderableColumns onRowReorder={onRowReorder} onColReorder={onColReorder} responsiveLayout="scroll">
                    <Column rowReorder style={{width: '3em'}} />
                    {dynamicColumns}
                </DataTable>
            </div>
        </div>
    );
}