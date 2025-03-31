"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { AccountingVoucherList } from '../../../src/views/AccountingVoucher/AccountingVoucherList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <AccountingVoucherList />

  );
}
