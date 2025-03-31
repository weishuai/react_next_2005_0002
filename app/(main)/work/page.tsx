
//import { WarrantyList } from '../../src/views/Warranty/WarrantyList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { WorkList } from '../../../src/views/Work/WorkList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <WorkList />
  );
}

