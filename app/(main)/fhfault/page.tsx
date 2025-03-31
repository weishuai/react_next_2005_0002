"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FhfaultList } from '../../../src/views/Fhfault/FhfaultList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <FhfaultList />

  );
}
