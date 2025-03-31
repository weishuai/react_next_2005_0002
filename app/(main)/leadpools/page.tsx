
//import { LeadPoolsList } from '../../src/views/LeadPools/LeadPoolsList';
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { LeadPoolsList } from '../../../src/views/LeadPools/LeadPoolsList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (
      <LeadPoolsList />
  );
}
