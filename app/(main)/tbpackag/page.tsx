"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { TbpackagList } from '../../../src/views/Tbpackag/TbpackagList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <TbpackagList />

  );
}
