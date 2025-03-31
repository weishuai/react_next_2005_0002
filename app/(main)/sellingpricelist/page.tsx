"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { SellingPriceListList } from '../../../src/views/SellingPriceList/SellingPriceListList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <SellingPriceListList />

  );
}
