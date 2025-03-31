"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { TbaftersaleList } from '../../../src/views/Tbaftersale/TbaftersaleList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <TbaftersaleList />

  );
}
