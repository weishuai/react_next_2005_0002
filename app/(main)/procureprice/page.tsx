"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ProcurePriceList } from '../../../src/views/ProcurePrice/ProcurePriceList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <ProcurePriceList />

  );
}
