
//import { PurchaseOrderList } from '../../src/views/PurchaseOrder/PurchaseOrderList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { PurchaseOrderList } from '../../../src/views/PurchaseOrder/PurchaseOrderList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <PurchaseOrderList />
  );
}
