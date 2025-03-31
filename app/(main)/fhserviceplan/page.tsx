"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FhservicePlanList } from '../../../src/views/FhservicePlan/FhservicePlanList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <FhservicePlanList />

  );
}
