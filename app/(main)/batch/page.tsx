"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { BatchList } from '../../../src/views/Batch/BatchList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <BatchList />

  );
}
