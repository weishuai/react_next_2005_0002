"use client"
// import '../../../../../src/i18n';
// import '../../../../../src/utils/addLocale';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next'
//import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
        
import { InvoiceDetailsItem } from '../../../../../../src/views/InvoiceDetails/InvoiceDetailsItem';
export default function Page() {
  const { t, i18n } = useTranslation();
  let Id ="0";
  let Mode ="0";
  const pathname = usePathname();
  var result =pathname; 
  let strSplitVal=result.split("/");
  Id =strSplitVal[3];
  Mode =strSplitVal[4];
  React.useEffect(() => {
  
    console.info('pathname:'+JSON.stringify(pathname));

  }, []);
  return (
   
    <InvoiceDetailsItem  Id={Id} Mode={Mode}/>
   
     
  );
}