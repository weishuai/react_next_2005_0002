"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FhservicetbList } from '../../../src/views/Fhservicetb/FhservicetbList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <FhservicetbList />

  );
}
