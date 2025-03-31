"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { QualitylnspectionItemList } from '../../../src/views/QualitylnspectionItem/QualitylnspectionItemList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <QualitylnspectionItemList />

  );
}
