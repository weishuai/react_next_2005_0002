"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { AccountingVoucherListList } from '../../../src/views/AccountingVoucherList/AccountingVoucherListList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <AccountingVoucherListList />

  );
}
