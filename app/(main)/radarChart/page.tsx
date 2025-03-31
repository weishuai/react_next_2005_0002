"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'

import  RadarChart from '../../../src/views/Chart/RadarChart';
export default function Page() {
  const { t, i18n } = useTranslation();
  return (

      <RadarChart />

  );
}
