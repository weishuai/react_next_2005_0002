"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ProcurePlanList } from '../../../src/views/ProcurePlan/ProcurePlanList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <ProcurePlanList />

  );
}
