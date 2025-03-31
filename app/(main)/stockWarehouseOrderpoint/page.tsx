"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { StockWarehouseOrderpointList } from '../../../src/views/StockWarehouseOrderpoint/StockWarehouseOrderpointList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <StockWarehouseOrderpointList />

  );
}
