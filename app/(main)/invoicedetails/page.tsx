
//import { InvoiceDetailsList } from '../../src/views/InvoiceDetails/InvoiceDetailsList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { InvoiceDetailsList } from '../../../src/views/InvoiceDetails/InvoiceDetailsList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <InvoiceDetailsList />
  );
}
