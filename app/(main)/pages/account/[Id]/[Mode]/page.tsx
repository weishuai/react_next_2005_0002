"use client"
// import '../../../../../../src/i18n';
// import '../../../../../../src/utils/addLocale';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
//import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';     
import React from 'react';
import { useTranslation } from 'react-i18next'
// import {useNavigate,useParams} from "react-router-dom";
import { AccountTagItem } from '../../../../../../src/views/AccountTag/AccountTagList';
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

    // var result =pathname; 
    // let strSplitVal=result.split("/");
    // Id =strSplitVal[3];
    // Mode =strSplitVal[4];
  
    console.info('pathname:'+JSON.stringify(pathname));

  }, []);
  return (
   
     <AccountTagItem  Id={Id} Mode={Mode}/>
   
  );
}