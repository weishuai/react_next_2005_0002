
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'

import  BarChart from '../../../src/views/Chart/BarChart';
export default function Page() {
  const { t, i18n } = useTranslation();
  return (

      <BarChart />

  );
}
