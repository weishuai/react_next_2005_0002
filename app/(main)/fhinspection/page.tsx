"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FhinspectionList } from '../../../src/views/Fhinspection/FhinspectionList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <FhinspectionList />

  );
}
