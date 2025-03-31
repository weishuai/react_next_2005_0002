"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { QualityInspectionList } from '../../../src/views/QualityInspection/QualityInspectionList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <QualityInspectionList />

  );
}
