"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { BankCashList } from '../../../src/views/BankCash/BankCashList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <BankCashList />

  );
}
