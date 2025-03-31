"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import  FHBarChart  from '../../../src/views/Chart/FHBarChart';
export default function Page() {
  const { t, i18n } = useTranslation();
  return (
  
      <FHBarChart />

  );
}
