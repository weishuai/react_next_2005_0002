
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'

import  PieChart from '../../../src/views/Chart/PieChart';
export default function Page() {
  const { t, i18n } = useTranslation();
  return (
 
  
      <PieChart />
  
  );
}
