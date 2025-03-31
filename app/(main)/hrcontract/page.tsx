"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { HrContractList } from '../../../src/views/HrContract/HrContractList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <HrContractList />

  );
}
