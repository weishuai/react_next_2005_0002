
"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'

import  ComboChart from '../../../src/views/Chart/ComboChart';
export default function Page() {
  const { t, i18n } = useTranslation();
  return (

      <ComboChart />

  );
}
