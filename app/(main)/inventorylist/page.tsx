"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { InventoryListList } from '../../../src/views/InventoryList/InventoryListList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <InventoryListList />

  );
}
