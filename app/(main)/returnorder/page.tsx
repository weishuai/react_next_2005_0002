"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
import { ReturnorderList } from '../../../src/views/Returnorder/ReturnorderList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

      <ReturnorderList />

  );
}
