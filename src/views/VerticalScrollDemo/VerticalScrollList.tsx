
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from '../../service/CustomerService';

export default function VerticalScrollDemo() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    }, []);

    return (
        <div className="card">
            <DataTable 
                value={customers} 
                scrollable scrollHeight="400px" 
                style={{ minWidth: '50rem' }}>
                <Column 
                    field="name" 
                    header="Name"
                    ></Column>
                <Column 
                    field="country.name" 
                    header="Country"
                    ></Column>
                <Column 
                    field="representative.name" 
                    header="Representative"
                    ></Column>
                <Column 
                    field="company" 
                    header="Company"
                    ></Column>
            </DataTable>
        </div>
    );
}
        