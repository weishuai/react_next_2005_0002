"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { StockValuationLayerList } from '../../../src/views/StockValuationLayer/StockValuationLayerList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <StockValuationLayerList />

  );
}
