"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import PdfExporter from '../../../src/views/myJpdf/myJpdfList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <PdfExporter/>

  );
}
