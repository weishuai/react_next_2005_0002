
//import { QuotationList } from '../../src/views/Quotation/quotationList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { QuotationList } from '../../../src/views/Quotation/QuotationList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <QuotationList />
  );
}
