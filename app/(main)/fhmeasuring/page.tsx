"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { FhmeasuringList } from '../../../src/views/Fhmeasuring/FhmeasuringList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <FhmeasuringList />

  );
}
