"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FhrunningList } from '../../../src/views/Fhrunning/FhrunningList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <FhrunningList />

  );
}
