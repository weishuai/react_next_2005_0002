"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import ExcelImporter from '../../../src/views/MyExlce/myExlceList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <ExcelImporter/>

  );
}
