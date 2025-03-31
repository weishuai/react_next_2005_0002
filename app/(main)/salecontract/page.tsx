"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { SaleContractList } from '../../../src/views/SaleContract/SaleContractList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <SaleContractList />

  );
}
