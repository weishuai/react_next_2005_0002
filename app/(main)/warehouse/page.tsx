"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { WarehouseList } from '../../../src/views/Warehouse/WarehouseList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <WarehouseList />

  );
}
