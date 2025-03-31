"use client"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; 
import React from 'react';
import { useTranslation } from 'react-i18next'
//import { Item} from '../../../../../src/views/languages/languagesItem';
import { FHcrmTable1Item } from '../../../../../src/views/FHcrmTable1/FHcrmTable1Item';
export default function Page() {
  const { t, i18n } = useTranslation();
  let Id ="0";
  let Mode ="0";
  const pathname = usePathname();
  var result =pathname; 
  let strSplitVal=result.split("/");
  Id =strSplitVal[2];
  Mode =strSplitVal[3];
  React.useEffect(() => {
    console.info('pathname:'+JSON.stringify(pathname));
    console.info('Id:'+Id);
    console.info('Mode:'+Mode);
  }, []);
  return (
   
     <FHcrmTable1Item  Id={Id} Mode={Mode}/>
   
  );
}