"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { StockQuantList } from '../../../src/views/StockQuant/StockQuantList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <StockQuantList />

  );
}
