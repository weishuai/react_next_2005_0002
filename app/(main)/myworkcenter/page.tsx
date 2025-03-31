"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { MyWorkCenterList } from '../../../src/views/MyWorkCenter/MyWorkCenterList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <MyWorkCenterList />

  );
}
