
//import { ProductTypeList} from '../../src/views/ProductType/ProductTypeList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ProductTypeList} from '../../../src/views/ProductType/ProductTypeList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <ProductTypeList />
  );
}
