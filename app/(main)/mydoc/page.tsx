"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import WordExporter from '../../../src/views/Mydoc/MydocxList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <WordExporter/>

  );
}
