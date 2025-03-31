"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FhreformList } from '../../../src/views/Fhreform/FhreformList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <FhreformList />

  );
}
