
import React, { useState, useEffect } from 'react';
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { globalStorage } from '../../utils/Globalstorage';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
//import { CustomerService } from '../service/CustomerService';
//import './DataTableDemo.css';

export const List = () => {


    return (
        <div className="datatable-filter-demo">

            <Button label="EN" onClick={() => {
                locale('en');
                globalStorage.set("locale",'en');
                }} />
            <Button label="CN" onClick={() => {
                locale('cn');
                globalStorage.set("locale",'cn');
                }} />

           
        </div>
    );
}