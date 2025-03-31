"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ProcurePlanListList } from '../../../src/views/ProcurePlanList/ProcurePlanListList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <ProcurePlanListList />

  );
}
