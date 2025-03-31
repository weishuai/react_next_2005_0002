"use client"
// import '../../../../../src/i18n';
// import '../../../../../src/utils/addLocale';
import React from 'react';
import { useTranslation } from 'react-i18next'
//import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
        
import { InvoiceDetailsList } from '../../../../src/views/InvoiceDetails/InvoiceDetailsList';
export default function Page() {
  const { t, i18n } = useTranslation();
  //locale('cn');
  return (
   
    <InvoiceDetailsList />
     
  );
}