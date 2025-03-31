
//import { ProductList } from '../../src/views/Product/ProductList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ProductList } from '../../../src/views/Product/ProductList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <ProductList />
  );
}

