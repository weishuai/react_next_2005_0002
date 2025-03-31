
//import { WarrantyList } from '../../src/views/Warranty/WarrantyList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { WarrantyList } from '../../../src/views/Warranty/WarrantyList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <WarrantyList />
  );
}

