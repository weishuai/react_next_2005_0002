"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { InventoryList } from '../../../src/views/Inventory/InventoryList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <InventoryList />

  );
}
