"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { TbreturnvisitList } from '../../../src/views/Tbreturnvisit/TbreturnvisitList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <TbreturnvisitList />

  );
}
